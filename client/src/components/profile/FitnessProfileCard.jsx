import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import API from "../../services/api";
import GoalSelector from "./GoalSelector";
import ProfileProgress from "./ProfileProgress";
import { FaUserShield, FaSave, FaEdit, FaSlidersH, FaExclamationTriangle } from "react-icons/fa";
import { motion } from "framer-motion";

function FitnessProfileCard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    goal: "general fitness",
    experience: "beginner",
    gender: "male",
    age: "",
    height: "",
    weight: "",
    activityLevel: "moderate",
    preferredWorkout: "gym",
    preferredDiet: "none",
    injuries: "",
    medicalConditions: "",
    allergies: "",
    sleepHours: 8,
    waterIntake: 3,
  });

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/profile");
      if (data.profile) {
        setProfile(data.profile);
        setFormData({
          goal: data.profile.goal || "general fitness",
          experience: data.profile.experience || "beginner",
          gender: data.profile.gender || "male",
          age: data.profile.age || "",
          height: data.profile.height || "",
          weight: data.profile.weight || "",
          activityLevel: data.profile.activityLevel || "moderate",
          preferredWorkout: data.profile.preferredWorkout || "gym",
          preferredDiet: data.profile.preferredDiet || "none",
          injuries: (data.profile.injuries || []).join(", "),
          medicalConditions: (data.profile.medicalConditions || []).join(", "),
          allergies: (data.profile.allergies || []).join(", "),
          sleepHours: data.profile.sleepHours || 8,
          waterIntake: data.profile.waterIntake || 3,
        });
      } else {
        setProfile(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load fitness profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const calculateProgress = () => {
    let fieldsFilled = 0;
    if (formData.goal) fieldsFilled += 20;
    if (formData.age && formData.gender) fieldsFilled += 20;
    if (formData.height && formData.weight) fieldsFilled += 20;
    if (formData.activityLevel && formData.preferredWorkout && formData.preferredDiet !== "none") fieldsFilled += 20;
    else if (formData.preferredWorkout) fieldsFilled += 15; // partial credit
    if (formData.sleepHours && formData.waterIntake) fieldsFilled += 20;
    return Math.min(fieldsFilled, 100);
  };

  const progressVal = calculateProgress();

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.age || !formData.height || !formData.weight) {
      toast.error("Please fill in required fields (Age, Height, Weight)");
      return;
    }

    setSaving(true);

    // Format comma-separated strings into arrays
    const formattedData = {
      ...formData,
      age: Number(formData.age),
      height: Number(formData.height),
      weight: Number(formData.weight),
      sleepHours: Number(formData.sleepHours),
      waterIntake: Number(formData.waterIntake),
      injuries: formData.injuries ? formData.injuries.split(",").map(i => i.trim()).filter(Boolean) : [],
      medicalConditions: formData.medicalConditions ? formData.medicalConditions.split(",").map(c => c.trim()).filter(Boolean) : [],
      allergies: formData.allergies ? formData.allergies.split(",").map(a => a.trim()).filter(Boolean) : [],
    };

    try {
      if (profile) {
        // PATCH
        const { data } = await API.patch("/profile", formattedData);
        setProfile(data.profile);
        toast.success("Fitness profile updated successfully!");
      } else {
        // POST
        const { data } = await API.post("/profile", formattedData);
        setProfile(data.profile);
        toast.success("Fitness profile created successfully!");
      }
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="rounded-[2.5rem] border border-slate-200/50 bg-white/40 dark:border-slate-800/40 dark:bg-slate-950/40 backdrop-blur-xl p-6 sm:p-8 shadow-xl relative overflow-hidden transition-all duration-300">
      
      {/* Header and completeness check */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/50 dark:border-slate-800/40 pb-6 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 dark:text-emerald-450 border border-emerald-500/25">
            <FaSlidersH size={16} />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Personalized AI Fitness Profile
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-light mt-0.5">
              Personalize FitCoach AI coaching by setting your targets and restrictions.
            </p>
          </div>
        </div>

        <ProfileProgress percentage={progressVal} />
      </div>

      {/* Profile does not exist banner */}
      {!profile && !isEditing && (
        <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center dark:border-slate-800 my-4 space-y-4">
          <FaUserShield className="mx-auto text-3xl text-emerald-500 animate-pulse" />
          <h3 className="text-base font-bold text-slate-850 dark:text-white">
            Setup Your Custom FitCoach AI Coach
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto font-light leading-relaxed">
            Fill out your fitness profile so FitCoach AI can suggest personalized protein targets, workout locations, and avoid conflict with injuries.
          </p>
          <button
            onClick={() => setIsEditing(true)}
            className="rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-2.5 text-xs font-bold text-slate-950 hover:shadow-lg transition cursor-pointer"
          >
            Complete Fitness Profile
          </button>
        </div>
      )}

      {/* Read View */}
      {profile && !isEditing && (
        <div className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Fitness Goal</span>
              <span className="text-sm font-extrabold text-slate-800 dark:text-white capitalize">{profile.goal}</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">Experience Level</span>
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-extrabold text-slate-800 dark:text-white capitalize">{profile.experience}</span>
                <div className="flex gap-1">
                  <div className={`h-1.5 flex-grow rounded-full transition-colors duration-500 ${profile.experience?.toLowerCase() === 'beginner' || profile.experience?.toLowerCase() === 'intermediate' || profile.experience?.toLowerCase() === 'advanced' ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-800'}`} />
                  <div className={`h-1.5 flex-grow rounded-full transition-colors duration-500 ${profile.experience?.toLowerCase() === 'intermediate' || profile.experience?.toLowerCase() === 'advanced' ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-800'}`} />
                  <div className={`h-1.5 flex-grow rounded-full transition-colors duration-500 ${profile.experience?.toLowerCase() === 'advanced' ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-800'}`} />
                </div>
              </div>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Metrics</span>
              <span className="text-sm font-extrabold text-slate-800 dark:text-white">
                {profile.height} cm / {profile.weight} kg (Age {profile.age})
              </span>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Workout Location</span>
              <span className="text-sm font-extrabold text-slate-800 dark:text-white capitalize">{profile.preferredWorkout}</span>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 border-t border-slate-200/50 dark:border-slate-800/40 pt-6">
            <div>
              <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Preferred Diet</span>
              <span className="text-sm font-extrabold text-slate-800 dark:text-white capitalize">{profile.preferredDiet}</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">Activity Level</span>
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-extrabold text-slate-800 dark:text-white capitalize">{profile.activityLevel}</span>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ 
                      width: 
                        profile.activityLevel?.toLowerCase() === 'sedentary' ? '20%' :
                        profile.activityLevel?.toLowerCase() === 'light' ? '40%' :
                        profile.activityLevel?.toLowerCase() === 'moderate' ? '60%' :
                        profile.activityLevel?.toLowerCase() === 'active' ? '80%' : '100%'
                    }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-green-400"
                  />
                </div>
              </div>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">Sleep Hours</span>
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-extrabold text-slate-800 dark:text-white">{profile.sleepHours} hrs / night</span>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((profile.sleepHours / 9) * 100, 100)}%` }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                  />
                </div>
              </div>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">Water Intake</span>
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-extrabold text-slate-800 dark:text-white">{profile.waterIntake} L / day</span>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((profile.waterIntake / 4.5) * 100, 100)}%` }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-gradient-to-r from-teal-450 to-cyan-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {(profile.injuries?.length > 0 || profile.allergies?.length > 0 || profile.medicalConditions?.length > 0) && (
            <div className="border-t border-slate-200/50 dark:border-slate-800/40 pt-6 space-y-4">
              {profile.injuries?.length > 0 && (
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold text-red-500 tracking-wider">
                    <FaExclamationTriangle /> Injuries
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-medium capitalize mt-1">
                    {profile.injuries.join(", ")}
                  </p>
                </div>
              )}
              {profile.allergies?.length > 0 && (
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold text-amber-500 tracking-wider">
                    <FaExclamationTriangle /> Food Allergies
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-medium capitalize mt-1">
                    {profile.allergies.join(", ")}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end pt-4 border-t border-slate-200/50 dark:border-slate-800/40">
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white/50 px-5 py-2.5 text-xs font-extrabold text-slate-800 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white transition cursor-pointer hover:bg-slate-100"
            >
              <FaEdit size={12} />
              <span>Edit Fitness Profile</span>
            </button>
          </div>
        </div>
      )}

      {/* Edit Form View */}
      {isEditing && (
        <form onSubmit={handleSave} className="space-y-6">
          {/* Goal Selector */}
          <div className="space-y-3">
            <span className="block text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
              1. What is your fitness goal?
            </span>
            <GoalSelector
              selectedGoal={formData.goal}
              onChange={(goal) => setFormData(prev => ({ ...prev, goal }))}
              disabled={saving}
            />
          </div>

          {/* Core Metrics */}
          <div className="grid gap-4 sm:grid-cols-3 border-t border-slate-200/50 dark:border-slate-800/40 pt-6">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Age (Years) *</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                placeholder="e.g. 24"
                required
                className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white/40 dark:border-slate-800 dark:bg-slate-950/40 text-sm outline-none focus:border-emerald-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Height (cm) *</label>
              <input
                type="number"
                value={formData.height}
                onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
                placeholder="e.g. 176"
                required
                className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white/40 dark:border-slate-800 dark:bg-slate-950/40 text-sm outline-none focus:border-emerald-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Weight (kg) *</label>
              <input
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                placeholder="e.g. 74"
                required
                className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white/40 dark:border-slate-800 dark:bg-slate-950/40 text-sm outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Preferences */}
          <div className="grid gap-4 sm:grid-cols-5 border-t border-slate-200/50 dark:border-slate-800/40 pt-6">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-white/40 dark:border-slate-800 dark:bg-slate-950/40 text-xs outline-none focus:border-emerald-500"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Experience</label>
              <select
                value={formData.experience}
                onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-white/40 dark:border-slate-800 dark:bg-slate-950/40 text-xs outline-none focus:border-emerald-500"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Activity Level</label>
              <select
                value={formData.activityLevel}
                onChange={(e) => setFormData(prev => ({ ...prev, activityLevel: e.target.value }))}
                className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-white/40 dark:border-slate-800 dark:bg-slate-955/40 text-xs outline-none focus:border-emerald-500"
              >
                <option value="sedentary">Sedentary</option>
                <option value="light">Light</option>
                <option value="moderate">Moderate</option>
                <option value="active">Active</option>
                <option value="very active">Very Active</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Workout Location</label>
              <select
                value={formData.preferredWorkout}
                onChange={(e) => setFormData(prev => ({ ...prev, preferredWorkout: e.target.value }))}
                className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-white/40 dark:border-slate-800 dark:bg-slate-950/40 text-xs outline-none focus:border-emerald-500"
              >
                <option value="gym">Gym</option>
                <option value="home">Home</option>
                <option value="both">Both</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Diet Style</label>
              <select
                value={formData.preferredDiet}
                onChange={(e) => setFormData(prev => ({ ...prev, preferredDiet: e.target.value }))}
                className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-white/40 dark:border-slate-800 dark:bg-slate-950/40 text-xs outline-none focus:border-emerald-500"
              >
                <option value="none">None (No preference)</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="non vegetarian">Non-Vegetarian</option>
                <option value="keto">Keto</option>
                <option value="high protein">High Protein</option>
              </select>
            </div>
          </div>

          {/* Safeguard Settings */}
          <div className="grid gap-4 sm:grid-cols-2 border-t border-slate-200/50 dark:border-slate-800/40 pt-6">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Injuries (comma separated)</label>
              <input
                type="text"
                value={formData.injuries}
                onChange={(e) => setFormData(prev => ({ ...prev, injuries: e.target.value }))}
                placeholder="e.g. shoulder strain, knee injury"
                className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white/40 dark:border-slate-800 dark:bg-slate-955/40 text-sm outline-none focus:border-emerald-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Food Allergies (comma separated)</label>
              <input
                type="text"
                value={formData.allergies}
                onChange={(e) => setFormData(prev => ({ ...prev, allergies: e.target.value }))}
                placeholder="e.g. peanuts, dairy"
                className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white/40 dark:border-slate-800 dark:bg-slate-955/40 text-sm outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t border-slate-200/50 dark:border-slate-800/40">
            <button
              type="button"
              onClick={() => {
                if (!profile) {
                  setIsEditing(false);
                } else {
                  setIsEditing(false);
                }
              }}
              disabled={saving}
              className="rounded-xl border border-slate-200 bg-transparent px-5 py-3 text-xs font-extrabold text-slate-600 dark:border-slate-800 dark:text-slate-400 transition cursor-pointer disabled:opacity-40"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-3 text-xs font-extrabold text-slate-950 shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/20 cursor-pointer disabled:opacity-50"
            >
              <FaSave size={12} />
              <span>{saving ? "Saving..." : "Save Details"}</span>
            </button>
          </div>
        </form>
      )}

    </div>
  );
}

export default FitnessProfileCard;
