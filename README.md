# React Habit Tracker

A fully responsive and interactive habit tracking application built with React and Tailwind CSS. This modern habit tracker helps you monitor your daily habits with beautiful visualizations and real-time progress tracking.

![Habit Tracker Preview](https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=React+Habit+Tracker)

## ✨ Features

### 🎯 **Core Functionality**

- **Add Custom Habits**: Create new habits with custom names and color coding (16 color options)
- **Interactive Completion**: Mark habits as complete/incomplete with real-time visual feedback
- **LocalStorage Persistence**: All data automatically saved to browser's local storage
- **Dynamic Progress Tracking**: Real-time daily and weekly progress calculations

### 📊 **Multiple View Modes**

- **Week View**: Interactive 7-day grid showing daily completion status
- **Month View**: Aggregated monthly completion statistics
- **Year View**: Annual habit completion summaries
- **All Time View**: Complete habit history with creation dates

### 🎨 **Modern UI/UX**

- **Responsive Design**: Seamless experience across mobile, tablet, and desktop
- **Card-based Layout**: Clean, floating card design with subtle shadows
- **Grid & List Toggle**: Switch between grid and list views for today's habits
- **Color-coded Habits**: Visual distinction with customizable color themes
- **Blue Theme**: Professional color scheme with proper contrast

### 🔧 **Interactive Features**

- **Week Navigation**: Navigate between weeks with persistent data
- **Habit Management**: Add, complete, and undo habit completions
- **Visual Progress Bars**: Dynamic progress indicators for daily and weekly goals
- **Completion Statistics**: Track completion rates across different time periods

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/vchandana25/cline-tasks.git
   cd cline-tasks
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:3000
   ```

## 📱 Usage

### Adding New Habits

1. Click the "Add Habit" button in the top navigation
2. Enter a habit name
3. Select a color from the 16-color palette
4. Click "Add Habit" to save

### Tracking Habits

- **Mark Complete**: Click "Mark Complete" button for any habit
- **Undo**: Click "Undo" to reverse a completion
- **View Progress**: Check daily/weekly progress bars in the header

### Navigation

- **Time Periods**: Switch between Week, Month, Year, and All Time views
- **Week Navigation**: Use arrow buttons to navigate between weeks
- **View Modes**: Toggle between list and grid views using the icons

## 💻 Technology Stack

- **Frontend Framework**: React 18
- **Styling**: Tailwind CSS
- **Font**: Inter (Google Fonts)
- **Icons**: Heroicons (SVG)
- **Data Storage**: Browser LocalStorage
- **Build Tool**: Create React App

## 📁 Project Structure

```
src/
├── App.js              # Main application component
├── data.js             # Data management and utility functions
├── index.js            # React DOM entry point
public/
├── index.html          # HTML template
package.json            # Project dependencies and scripts
```

## 🔧 Key Components

### Data Management (`src/data.js`)

- Initial habit data with mock entries
- LocalStorage utility functions
- Date manipulation helpers
- Static configuration (colors, tab options)

### Main Application (`src/App.js`)

- **State Management**: React hooks for all app state
- **Header Component**: Greeting, date, and progress indicators
- **Navigation Tabs**: Time period filter tabs
- **Date Navigation**: Week/month/year navigation controls
- **Habit Grid**: Interactive weekly habit tracking grid
- **Today's Habits**: Sidebar with daily habit list
- **Add Habit Modal**: Form for creating new habits

## 🎨 Design Features

### Color Scheme

- **Primary**: Blue (#3B82F6)
- **Background**: Light blue (#F0F9FF)
- **Cards**: White with subtle shadows
- **Accent Colors**: 16 predefined colors for habit customization

### Responsive Design

- **Mobile**: Single column layout, touch-friendly buttons
- **Tablet**: Adapted grid layout with proper spacing
- **Desktop**: Full multi-column layout with sidebar

### Visual Elements

- **Rounded Corners**: Modern card-based design
- **Shadows**: Subtle depth with shadow effects
- **Progress Bars**: Animated progress indicators
- **Hover Effects**: Interactive feedback on all clickable elements

## 📊 Data Structure

### Habit Object

```javascript
{
  id: "habit-1",
  name: "Read",
  color: "bg-orange-500",
  createdAt: "2024-02-01",
  records: {
    "2024-02-05": true,
    "2024-02-06": false,
    // ... more date records
  }
}
```

### Features Implemented

- ✅ LocalStorage persistence
- ✅ Dynamic progress calculations
- ✅ Multi-view time periods
- ✅ Interactive habit completion
- ✅ Responsive design
- ✅ Custom habit creation
- ✅ Week navigation
- ✅ Grid/List view toggle

## 🔄 Available Scripts

### Development

```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject from Create React App
```

## 🌟 Future Enhancements

- **Habit Streaks**: Track consecutive completion days
- **Reminders**: Browser notifications for habit reminders
- **Analytics**: Detailed habit completion analytics
- **Data Export**: Export habit data to CSV/JSON
- **Themes**: Multiple color themes and dark mode
- **Habit Categories**: Organize habits by categories

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- **Tailwind CSS** for the excellent utility-first CSS framework
- **React** for the powerful component-based architecture
- **Heroicons** for the beautiful SVG icons
- **Inter Font** for the clean, readable typography

---

**Built with ❤️ by XD Labs**

For questions or support, please open an issue in the GitHub repository.
