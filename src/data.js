// Initial default habits data for first-time users
export const getInitialHabitsData = () => [
  {
    id: "habit-1",
    name: "Read",
    color: "bg-orange-500",
    createdAt: "2024-02-01",
    records: {
      "2024-02-05": true,
      "2024-02-07": true,
      "2024-02-08": true,
      "2024-02-09": true,
      "2024-02-10": true,
      "2024-02-11": true,
      "2024-02-18": true, // Monday (today)
    },
  },
  {
    id: "habit-2",
    name: "Workout",
    color: "bg-purple-600",
    createdAt: "2024-02-01",
    records: {
      "2024-02-05": true,
      "2024-02-06": true,
      "2024-02-09": true,
      "2024-02-10": true,
      "2024-02-18": true, // Monday (today)
    },
  },
  {
    id: "habit-3",
    name: "Meditate",
    color: "bg-cyan-400",
    createdAt: "2024-02-01",
    records: {
      "2024-02-05": true,
      "2024-02-06": true,
      "2024-02-07": true,
      "2024-02-08": true,
      "2024-02-09": true,
      "2024-02-10": true,
      "2024-02-11": true,
    },
  },
  {
    id: "habit-4",
    name: "Journal",
    color: "bg-orange-600",
    createdAt: "2024-02-01",
    records: {
      "2024-02-05": true,
      "2024-02-06": true,
      "2024-02-07": true,
      "2024-02-09": true,
      "2024-02-10": true,
    },
  },
  {
    id: "habit-5",
    name: "Alcohol",
    color: "bg-blue-600",
    createdAt: "2024-02-01",
    records: {
      "2024-02-05": true,
      "2024-02-06": true,
      "2024-02-07": true,
      "2024-02-10": true,
      "2024-02-11": true,
    },
  },
  {
    id: "habit-6",
    name: "Weed",
    color: "bg-green-500",
    createdAt: "2024-02-01",
    records: {
      "2024-02-09": true,
      "2024-02-10": true,
    },
  },
];

export const staticOverallData = {
  greetingName: "XD labs",
  timeTillBedtime: "5 hrs 42 mins",
};

export const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const dayNamesShort = ["M", "T", "W", "T", "F", "S", "S"];

export const tabOptions = ["Week", "Month", "Year", "All Time"];

export const availableColors = [
  "bg-red-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-yellow-500",
  "bg-lime-500",
  "bg-green-500",
  "bg-emerald-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-sky-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-violet-500",
  "bg-purple-500",
  "bg-fuchsia-500",
  "bg-pink-500",
];

// Utility functions for date handling
export const formatDate = (date) => {
  return date.toISOString().split("T")[0]; // YYYY-MM-DD format
};

export const getCurrentWeekDates = (baseDate = new Date()) => {
  const currentDate = new Date(baseDate);
  const day = currentDate.getDay();
  const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
  const monday = new Date(currentDate.setDate(diff));

  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    weekDates.push(formatDate(date));
  }

  return weekDates;
};

export const getWeekRange = (baseDate = new Date()) => {
  const dates = getCurrentWeekDates(baseDate);
  const startDate = new Date(dates[0]);
  const endDate = new Date(dates[6]);

  const formatDisplayDate = (date) => {
    const options = { weekday: "short", month: "numeric", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return `${formatDisplayDate(startDate)} - ${formatDisplayDate(endDate)}`;
};

export const getCurrentDateFormatted = (date = new Date()) => {
  const options = { weekday: "short", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

// localStorage utility functions
export const saveHabitsToStorage = (habits) => {
  localStorage.setItem("habitTracker_habits", JSON.stringify(habits));
};

export const loadHabitsFromStorage = () => {
  try {
    const stored = localStorage.getItem("habitTracker_habits");
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error("Error loading habits from localStorage:", error);
    return null;
  }
};
