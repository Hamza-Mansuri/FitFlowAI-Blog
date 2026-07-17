import UserFitnessProfile from "../models/UserFitnessProfile.js";

export const getFitnessProfile = async (req, res) => {
  try {
    const profile = await UserFitnessProfile.findOne({ user: req.user._id || req.user.id });
    if (!profile) {
      return res.status(200).json({ profile: null });
    }
    return res.status(200).json({ profile });
  } catch (error) {
    console.error("Get fitness profile error:", error);
    return res.status(500).json({ message: "Server error fetching fitness profile" });
  }
};

export const createFitnessProfile = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    let profile = await UserFitnessProfile.findOne({ user: userId });
    
    if (profile) {
      return res.status(400).json({ message: "Fitness profile already exists. Use PATCH to update." });
    }

    profile = new UserFitnessProfile({
      user: userId,
      ...req.body,
    });

    await profile.save();
    return res.status(201).json({ message: "Fitness profile created successfully", profile });
  } catch (error) {
    console.error("Create fitness profile error:", error);
    return res.status(500).json({ message: error.message || "Server error creating fitness profile" });
  }
};

export const updateFitnessProfile = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const profile = await UserFitnessProfile.findOneAndUpdate(
      { user: userId },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res.status(404).json({ message: "Fitness profile not found" });
    }

    return res.status(200).json({ message: "Fitness profile updated successfully", profile });
  } catch (error) {
    console.error("Update fitness profile error:", error);
    return res.status(500).json({ message: error.message || "Server error updating fitness profile" });
  }
};
