import React, { useState, useEffect } from "react";
import {
  getInitialHabitsData,
  staticOverallData,
  dayNames,
  tabOptions,
  availableColors,
  formatDate,
  getCurrentWeekDates,
  getWeekRange,
  getCurrentDateFormatted,
  saveHabitsToStorage,
  loadHabitsFromStorage,
} from "./data.js";

function App() {
  // State management
  const [habits, setHabits] = useState([]);
  const [activeTab, setActiveTab] = useState("Week");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAddHabitModal, setShowAddHabitModal] = useState(false);
  const [newHabitName, setNewHabitName] = useState("");
  const [newHabitColor, setNewHabitColor] = useState("bg-blue-500");
  const [viewMode, setViewMode] = useState("list"); // "list" or "grid"

  // Initialize habits from localStorage or default data
  useEffect(() => {
    const savedHabits = loadHabitsFromStorage();
    if (savedHabits && savedHabits.length > 0) {
      setHabits(savedHabits);
    } else {
      const initialHabits = getInitialHabitsData();
      setHabits(initialHabits);
      saveHabitsToStorage(initialHabits);
    }
  }, []);

  // Save habits to localStorage whenever habits change
  useEffect(() => {
    if (habits.length > 0) {
      saveHabitsToStorage(habits);
    }
  }, [habits]);

  // Utility functions
  const getTodayDateString = () => formatDate(currentDate);

  const getHabitCompletionForDate = (habit, dateString) => {
    return habit.records[dateString] || false;
  };

  const toggleHabitCompletion = (habitId, dateString) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === habitId
          ? {
              ...habit,
              records: {
                ...habit.records,
                [dateString]: !habit.records[dateString],
              },
            }
          : habit
      )
    );
  };

  const addNewHabit = () => {
    if (!newHabitName.trim()) return;

    const newHabit = {
      id: `habit-${Date.now()}`,
      name: newHabitName.trim(),
      color: newHabitColor,
      createdAt: formatDate(new Date()),
      records: {},
    };

    setHabits((prevHabits) => [...prevHabits, newHabit]);
    setNewHabitName("");
    setNewHabitColor("bg-blue-500");
    setShowAddHabitModal(false);
  };

  const calculateDailyProgress = () => {
    const today = getTodayDateString();
    const completedToday = habits.filter((habit) =>
      getHabitCompletionForDate(habit, today)
    ).length;
    return habits.length > 0
      ? Math.round((completedToday / habits.length) * 100)
      : 0;
  };

  const calculateWeeklyProgress = () => {
    const weekDates = getCurrentWeekDates(currentDate);
    let totalPossible = habits.length * weekDates.length;
    let totalCompleted = 0;

    habits.forEach((habit) => {
      weekDates.forEach((date) => {
        if (getHabitCompletionForDate(habit, date)) {
          totalCompleted++;
        }
      });
    });

    return totalPossible > 0
      ? Math.round((totalCompleted / totalPossible) * 100)
      : 0;
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + direction * 7);
    setCurrentDate(newDate);
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const navigateYear = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(newDate.getFullYear() + direction);
    setCurrentDate(newDate);
  };

  // Add Habit Modal Component
  const AddHabitModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
        <h2 className="text-2xl font-bold mb-4">Add New Habit</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Habit Name
          </label>
          <input
            type="text"
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter habit name"
            autoFocus
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Color
          </label>
          <div className="grid grid-cols-8 gap-2">
            {availableColors.map((color) => (
              <button
                key={color}
                onClick={() => setNewHabitColor(color)}
                className={`w-8 h-8 rounded-lg ${color} ${
                  newHabitColor === color
                    ? "ring-2 ring-gray-400 ring-offset-2"
                    : ""
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => setShowAddHabitModal(false)}
            className="flex-1 px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={addNewHabit}
            disabled={!newHabitName.trim()}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Add Habit
          </button>
        </div>
      </div>
    </div>
  );

  // Header Component
  const Header = () => (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 space-y-4 lg:space-y-0">
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
          Hey there, {staticOverallData.greetingName}
        </h1>
        <p className="text-gray-500 text-lg">
          {staticOverallData.timeTillBedtime} till bedtime
        </p>
      </div>

      <div className="flex flex-col items-start lg:items-end space-y-3">
        <div className="flex items-center space-x-3">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <span className="text-xl font-semibold text-gray-900">
            {getCurrentDateFormatted(currentDate)}
          </span>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        <div className="w-full lg:w-64">
          <div className="flex items-center justify-between mb-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${calculateDailyProgress()}%` }}
              ></div>
            </div>
          </div>
          <p className="text-sm text-gray-600 text-right">
            {calculateDailyProgress()}% of daily goal achieved
          </p>
        </div>
      </div>
    </div>
  );

  // Navigation Tabs Component
  const NavigationTabs = () => (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
      <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
        {tabOptions.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeTab === tab
                ? "bg-white text-black shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <button
        onClick={() => setShowAddHabitModal(true)}
        className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <span>Add Habit</span>
      </button>
    </div>
  );

  // Date Navigation Bar Component
  const DateNavigationBar = () => {
    const getNavigationContent = () => {
      switch (activeTab) {
        case "Month":
          return {
            title: currentDate.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            }),
            onPrev: () => navigateMonth(-1),
            onNext: () => navigateMonth(1),
          };
        case "Year":
          return {
            title: currentDate.getFullYear().toString(),
            onPrev: () => navigateYear(-1),
            onNext: () => navigateYear(1),
          };
        case "All Time":
          return {
            title: "All Time",
            onPrev: null,
            onNext: null,
          };
        default: // Week
          return {
            title: getWeekRange(currentDate),
            onPrev: () => navigateWeek(-1),
            onNext: () => navigateWeek(1),
          };
      }
    };

    const { title, onPrev, onNext } = getNavigationContent();

    return (
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            {onPrev && (
              <button
                onClick={onPrev}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            {onNext && (
              <button
                onClick={onNext}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "list"
                  ? "bg-blue-100 text-blue-600"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-blue-100 text-blue-600"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 0 01-2-2v-2z"
                />
              </svg>
            </button>
          </div>
        </div>

        {activeTab === "Week" && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <svg
                className="w-4 h-4 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 11l3-3 3 3m-3-3v8M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm text-gray-600">
                Up 23% from week before
              </span>
            </div>
            <span className="text-sm font-medium text-gray-900">
              {calculateWeeklyProgress()}% achieved
            </span>
          </div>
        )}
      </div>
    );
  };

  // Week View Component
  const WeekView = () => {
    const weekDates = getCurrentWeekDates(currentDate);

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-8 gap-4">
          <div className="font-medium text-gray-500 text-sm"></div>
          {dayNames.map((day, index) => (
            <div
              key={day}
              className="text-center font-medium text-gray-500 text-sm"
            >
              {day}
            </div>
          ))}

          {habits.map((habit) => (
            <React.Fragment key={habit.id}>
              <div className="flex items-center space-x-3 py-2">
                <span
                  className={`text-lg ${habit.color.replace("bg-", "text-")}`}
                >
                  ●
                </span>
                <span className="font-medium text-gray-900">{habit.name}</span>
              </div>

              {weekDates.map((date, index) => (
                <div key={date} className="flex justify-center py-2">
                  <div
                    className={`w-6 h-6 rounded-md ${
                      getHabitCompletionForDate(habit, date)
                        ? habit.color
                        : "bg-gray-200"
                    }`}
                  ></div>
                </div>
              ))}

              <div className="flex justify-center py-2">
                <span className="text-sm font-medium text-gray-600">
                  {
                    weekDates.filter((date) =>
                      getHabitCompletionForDate(habit, date)
                    ).length
                  }
                  /7
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  // Month/Year/All Time Views
  const AggregateView = () => {
    const getHabitStats = (habit) => {
      const records = Object.entries(habit.records);
      let filteredRecords = records;

      if (activeTab === "Month") {
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        filteredRecords = records.filter(([dateString]) => {
          const date = new Date(dateString);
          return (
            date.getMonth() === currentMonth &&
            date.getFullYear() === currentYear
          );
        });
      } else if (activeTab === "Year") {
        const currentYear = currentDate.getFullYear();
        filteredRecords = records.filter(([dateString]) => {
          const date = new Date(dateString);
          return date.getFullYear() === currentYear;
        });
      }

      const completedCount = filteredRecords.filter(
        ([, completed]) => completed
      ).length;
      return { completedCount, totalRecords: filteredRecords.length };
    };

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="space-y-4">
          {habits.map((habit) => {
            const { completedCount } = getHabitStats(habit);
            return (
              <div
                key={habit.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${habit.color}`}></div>
                  <span className="font-medium text-gray-900">
                    {habit.name}
                  </span>
                  {activeTab === "All Time" && (
                    <span className="text-sm text-gray-500">
                      Started {new Date(habit.createdAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-lg font-semibold text-gray-900">
                    {completedCount} times
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Today's Habits List Component
  const TodaysHabitsList = () => {
    const today = getTodayDateString();

    if (viewMode === "grid") {
      return (
        <div className="grid grid-cols-2 gap-4">
          {habits.map((habit) => {
            const isCompleted = getHabitCompletionForDate(habit, today);
            return (
              <div
                key={habit.id}
                className={`p-3 rounded-xl bg-white shadow-sm border-2 ${habit.color.replace(
                  "bg-",
                  "border-"
                )} ${isCompleted ? "bg-green-50" : ""}`}
              >
                <div className="flex items-center justify-center mb-2">
                  <div
                    className={`w-8 h-8 rounded-full ${habit.color} flex items-center justify-center`}
                  >
                    {isCompleted ? (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <span className="text-white text-sm">●</span>
                    )}
                  </div>
                </div>
                <h3 className="font-medium text-gray-900 text-center text-sm mb-2">
                  {habit.name}
                </h3>
                <button
                  onClick={() => toggleHabitCompletion(habit.id, today)}
                  className={`w-full py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    isCompleted
                      ? "text-green-600 bg-green-100 hover:bg-green-200"
                      : "text-blue-600 bg-blue-50 hover:bg-blue-100"
                  }`}
                >
                  {isCompleted ? "Undo" : "Complete"}
                </button>
              </div>
            );
          })}
        </div>
      );
    }

    // Default list view
    return (
      <div className="space-y-4">
        {habits.map((habit) => {
          const isCompleted = getHabitCompletionForDate(habit, today);
          return (
            <div
              key={habit.id}
              className={`p-4 rounded-xl border-l-4 bg-white shadow-sm ${habit.color.replace(
                "bg-",
                "border-l-"
              )}`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{habit.name}</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>

              {isCompleted ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm font-medium text-green-600">
                      Completed
                    </span>
                  </div>
                  <button
                    onClick={() => toggleHabitCompletion(habit.id, today)}
                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Undo
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => toggleHabitCompletion(habit.id, today)}
                  className="w-full py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  Mark Complete
                </button>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderMainContent = () => {
    switch (activeTab) {
      case "Week":
        return <WeekView />;
      case "Month":
      case "Year":
      case "All Time":
        return <AggregateView />;
      default:
        return <WeekView />;
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 font-inter flex items-center justify-center py-16">
      <div className="max-w-5xl w-full mx-4 bg-white rounded-3xl shadow-2xl shadow-gray-400/20 p-8 my-8">
        <Header />
        <NavigationTabs />
        <DateNavigationBar />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">{renderMainContent()}</div>
          <div className="lg:col-span-1">
            <TodaysHabitsList />
          </div>
        </div>
      </div>

      {showAddHabitModal && <AddHabitModal />}
    </div>
  );
}

export default App;
