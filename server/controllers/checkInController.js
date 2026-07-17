import DailyCheckIn from "../models/DailyCheckIn.js";
import { calculateRecoveryScore, generateCoachingFeedback } from "../services/recoveryCalculator.js";
import { generateWeeklyReport } from "../services/weeklyReportGenerator.js";

// Helper to get formatted local date (YYYY-MM-DD)
const getLocalDateString = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const submitCheckIn = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const dateStr = req.body.date || getLocalDateString();

    // Check if check-in already exists for today
    const existing = await DailyCheckIn.findOne({ date: dateStr, createdBy: userId });
    if (existing) {
      return res.status(400).json({ message: "You have already completed your check-in for today." });
    }

    // 1. Calculate recovery score
    const score = calculateRecoveryScore(req.body);

    // 2. Generate AI adaptive feedback
    const aiFeedback = await generateCoachingFeedback(req.body, score);

    // 3. Save check-in
    const checkIn = new DailyCheckIn({
      ...req.body,
      date: dateStr,
      recoveryScore: score,
      aiRecommendations: aiFeedback,
      createdBy: userId,
    });

    await checkIn.save();
    return res.status(201).json({ message: "Daily check-in logged successfully!", checkIn });
  } catch (error) {
    console.error("Submit check-in error:", error);
    return res.status(500).json({ message: error.message || "Failed to log daily check-in" });
  }
};

export const getTodayCheckIn = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const dateStr = getLocalDateString();
    
    const checkIn = await DailyCheckIn.findOne({ date: dateStr, createdBy: userId });
    return res.status(200).json({ checkIn });
  } catch (error) {
    console.error("Get today check-in error:", error);
    return res.status(500).json({ message: "Failed to query today's check-in status" });
  }
};

export const getCheckInHistory = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const history = await DailyCheckIn.find({ createdBy: userId }).sort({ date: -1 }).limit(30);
    return res.status(200).json({ history });
  } catch (error) {
    console.error("Get check-in history error:", error);
    return res.status(500).json({ message: "Failed to load check-in logs" });
  }
};

export const getWeeklySummaryReport = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    
    // Fetch last 7 check-ins
    const checkIns = await DailyCheckIn.find({ createdBy: userId }).sort({ date: -1 }).limit(7);
    if (!checkIns || checkIns.length === 0) {
      return res.status(404).json({ message: "No check-in history found for this week. Log your check-ins to generate a report." });
    }

    const report = await generateWeeklyReport(checkIns.reverse());
    return res.status(200).json({ report });
  } catch (error) {
    console.error("Weekly report controller error:", error);
    return res.status(500).json({ message: error.message || "Failed to generate weekly report" });
  }
};

export const getStreaks = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const checkIns = await DailyCheckIn.find({ createdBy: userId }).sort({ date: -1 });

    if (checkIns.length === 0) {
      return res.status(200).json({
        checkInStreak: 0,
        longestStreak: 0,
        workoutStreak: 0,
        nutritionStreak: 0,
      });
    }

    let checkInStreak = 0;
    let longestStreak = 0;
    let currentStreak = 0;

    // Calculate check-in streak
    const dateSet = new Set(checkIns.map(c => c.date));
    let checkDate = new Date();
    
    // Check if logged today or yesterday
    const todayStr = getLocalDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    const hasLogRecent = dateSet.has(todayStr) || dateSet.has(yesterdayStr);

    if (hasLogRecent) {
      let isConsequent = true;
      while (isConsequent) {
        const checkStr = checkDate.toISOString().split("T")[0];
        if (dateSet.has(checkStr)) {
          checkInStreak++;
          checkDate.setDate(checkDate.getDate() - 1);
        } else {
          // If we checked today and it's missing, continue check to yesterday
          if (checkStr === todayStr) {
            checkDate.setDate(checkDate.getDate() - 1);
          } else {
            isConsequent = false;
          }
        }
      }
    }

    // Longest streak calculation
    const sortedDates = Array.from(dateSet).sort();
    if (sortedDates.length > 0) {
      currentStreak = 1;
      longestStreak = 1;
      for (let i = 1; i < sortedDates.length; i++) {
        const prev = new Date(sortedDates[i - 1]);
        const curr = new Date(sortedDates[i]);
        const diffTime = Math.abs(curr - prev);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          currentStreak++;
          longestStreak = Math.max(longestStreak, currentStreak);
        } else if (diffDays > 1) {
          currentStreak = 1;
        }
      }
    }

    // Workout & Nutrition Streaks (consecutive completions)
    let workoutStreak = 0;
    for (const c of checkIns) {
      if (c.workoutCompleted) workoutStreak++;
      else break;
    }

    let nutritionStreak = 0;
    for (const c of checkIns) {
      if (c.mealPlanFollowed) nutritionStreak++;
      else break;
    }

    return res.status(200).json({
      checkInStreak,
      longestStreak: Math.max(longestStreak, checkInStreak),
      workoutStreak,
      nutritionStreak,
    });
  } catch (error) {
    console.error("Get streaks error:", error);
    return res.status(500).json({ message: "Failed to calculate streaks" });
  }
};
