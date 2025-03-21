# Time-Time

Time-Time is a productivity application that helps users manage their time effectively. It includes features such as a timer, notifications, achievements, streak tracking, and customizable settings.

## Features

1. Timer
A customizable timer to help users focus on tasks.
Options to set custom hours, minutes, and seconds.
Start, pause, and reset functionality.
Sound notifications when the timer ends, with the ability to toggle sound on/off and select custom audio.
2. Motivational Quotes
Displays a random motivational quote when the timer starts.
Quotes are updated dynamically to keep users inspired.
Option to periodically change quotes during the session.
3. Achievements and Ranking System
Unlock achievements based on total minutes completed.
Titles and rewards include:
Focus Master: Bronze, Silver, and Gold badges.
Streak Champion: Bronze, Silver, and Gold trophies.
Consistency King: Daily Tracker, Weekly Insights, and Monthly Report.
Achievements are displayed with smooth unlock animations.
4. Session Tracking
Tracks completed sessions and total minutes.
Displays progress visually using a progress bar.
Notifications for milestones (e.g., "5 sessions completed!").
5. Chart Stats
A dedicated page to visualize completed sessions.
View session data in daily, weekly, or monthly charts.
Interactive buttons to toggle between different views.
6. Ranking System Page
A separate page to display all available achievements and their requirements.
Users can view their progress and unlocked titles.
7. Dynamic Backgrounds
Background changes dynamically based on the timer's progress.
Smooth transitions between colors to enhance the user experience.
8. Break Timer
Option to take short or long breaks after completing a session.
Tracks break time separately from focus sessions.


Pages
1. Home Page
Displays the timer and motivational quotes.
Shows the user's current unlocked title in the top-left corner.
Includes buttons to start, pause, and reset the timer.
2. Settings Page
Allows users to customize the theme color.
Option to plan future sessions with a date and time picker.
Displays a list of completed sessions.
3. Chart Stats Page
Visualizes session data using interactive charts.
Users can toggle between daily, weekly, and monthly views.
4. Ranking System Page
Displays all available achievements and their requirements.
Shows the user's progress toward unlocking new titles and rewards.


Technologies Used
React: Frontend framework for building the user interface.
React Router: For navigation between pages.
Chart.js: For visualizing session data in charts.
Framer Motion: For smooth animations and transitions.
CSS Modules: For styling components with scoped CSS.

Future Enhancements
Add user authentication to save progress across devices.
Implement a leaderboard to compare progress with other users.
Allow users to add custom motivational quotes.
Add dark mode for better accessibility.


## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/time-time.git

2. Navigate to the project directory:

cd time-time

3. Install the dependencies:

npm install

4. Start the development server:

npm start

Usage
Open the application in your browser:

http://localhost:3000

Use the navigation bar to switch between the timer and settings pages.

Start the timer to begin a focus session. You will receive notifications about the timer status and unlock achievements based on your actions.

Customize the theme color in the settings page.

Components
TimerDisplay
The TimerDisplay component is responsible for displaying the timer and handling timer-related actions such as start, stop, and reset. It also displays the current streak and achievements.

Settings
The Settings component allows users to customize the theme color of the application. It includes a navigation bar for easy navigation between different sections.

Notifications
The Notifications component displays real-time notifications to keep users informed about their timer status and achievements.

Navbar
The Navbar component provides navigation links to different sections of the application, such as the home page and settings page.

Toast
The Toast component displays toast notifications with different types (success, warning, info, error) and automatically removes them after a certain time.

TimerControls
The TimerControls component provides start and stop buttons for the timer.

Timer
The Timer component is a simple display component that renders the current time.

Hooks
useAnalytics
The useAnalytics hook tracks user actions, manages achievements, and provides notifications.

useDarkMode
The useDarkMode hook determines if dark mode is enabled.

useNotifications
The useNotifications hook provides access to the notification context, allowing components to add and remove notifications.

Context
NotificationProvider
The NotificationProvider component provides the notification context to its children, allowing them to access and manage notifications.

Common
achievements
The achievements module defines a list of achievements with their criteria. Each achievement has an id, description, and a criteria function that determines if the achievement is unlocked based on user actions.

streaks
The streaks module handles streak tracking by checking the last visit date, updating the streak count if necessary, and saving the updated information to local storage.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request.

