export const buildProfileContext = (profile) => {
  if (!profile) return "";

  const goal = profile.goal || "general fitness";
  const experience = profile.experience || "beginner";
  const gender = profile.gender || "male";
  const age = profile.age || 25;
  const height = profile.height || 170;
  const weight = profile.weight || 70;
  const activityLevel = profile.activityLevel || "moderate";
  const preferredWorkout = profile.preferredWorkout || "gym";
  const preferredDiet = profile.preferredDiet || "none";
  const injuries = (profile.injuries || []).join(", ") || "None";
  const medicalConditions = (profile.medicalConditions || []).join(", ") || "None";
  const allergies = (profile.allergies || []).join(", ") || "None";
  const sleepHours = profile.sleepHours || 8;
  const waterIntake = profile.waterIntake || 3;

  return `
--- Current User Fitness Profile ---
Fitness Goal: ${goal}
Experience Level: ${experience}
Gender: ${gender}
Age: ${age} years old
Height: ${height} cm
Weight: ${weight} kg
Activity Level: ${activityLevel}
Workout Location Preference: ${preferredWorkout}
Dietary Preference: ${preferredDiet}
Injuries: ${injuries}
Allergies: ${allergies}
Medical Conditions: ${medicalConditions}
Daily Sleep Duration: ${sleepHours} hours
Daily Water Target: ${waterIntake} liters

CRITICAL ADVICE INSTRUCTIONS:
- Tailor all exercises and recommendations directly based on this profile.
- If the user has injuries listed (e.g. "${injuries}"), DO NOT recommend movements that stress those areas (e.g. avoid squats/lunges if knee injury is listed).
- If the user has allergies (e.g. "${allergies}"), ensure your nutrition suggestions avoid those items completely.
- If the user is vegetarian or vegan, ensure all suggested protein sources conform strictly (e.g. recommend paneer, lentils, tofu, soy, instead of chicken/fish).
`;
};
