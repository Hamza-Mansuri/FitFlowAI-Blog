import mongoose from "mongoose";

const bodyMeasurementSchema = new mongoose.Schema(
  {
    chest: { type: Number, default: 0 },
    waist: { type: Number, default: 0 },
    hips: { type: Number, default: 0 },
    neck: { type: Number, default: 0 },
    arms: { type: Number, default: 0 },
    forearms: { type: Number, default: 0 },
    thighs: { type: Number, default: 0 },
    calves: { type: Number, default: 0 },
    bodyFat: { type: Number, default: 0 }, // Body fat percentage
    muscleMass: { type: Number, default: 0 }, // Muscle mass percentage
    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Allow one measurement entry per day per user
bodyMeasurementSchema.index({ date: 1, createdBy: 1 }, { unique: true });

const BodyMeasurement = mongoose.model("BodyMeasurement", bodyMeasurementSchema);

export default BodyMeasurement;
