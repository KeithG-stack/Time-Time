Time-Time
Time-Time is a productivity application that helps users manage their time effectively. It includes features such as a timer, notifications, achievements, streak tracking, and customizable settings.

Features
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
Notifications are triggered when new achievements are unlocked.

4. Session Tracking
Tracks completed sessions and total minutes.
Displays progress visually using a progress bar.
Notifications for milestones (e.g., "5 sessions completed!").

5. Chart Stats
A dedicated page to visualize completed sessions.
View session data in daily, weekly, monthly, or yearly charts.
Interactive buttons to toggle between different views.
Option to download session data as a CSV file.

6. Ranking System Page
Displays all available achievements and their requirements.
Shows the user's progress toward unlocking new titles and rewards.
Includes a share feature to share progress via social media or copy a link.

7. Task Management
Plan future sessions with a date and time picker.
Add task descriptions for planned sessions.
Mark tasks as completed or delete them.
Displays a list of planned tasks with completion status.

8. Dynamic Backgrounds
Background changes dynamically based on the timer's progress.
Smooth transitions between colors to enhance the user experience.

9. Break Timer
Option to take short or long breaks after completing a session.
Tracks break time separately from focus sessions.

10. Notifications
Real-time notifications for achievements, session milestones, and task completions.
Toast notifications with success, error, and info types.
Notifications automatically disappear after a few seconds.

PAGES

1. Home Page
Displays the timer and motivational quotes.
Shows the user's current unlocked title in the top-left corner.
Includes buttons to start, pause, and reset the timer.

2. Settings Page
Allows users to:
Customize the timer duration (hours, minutes, seconds).
Toggle sound notifications on/off.
Enable or disable dark mode.
Plan future sessions with a date and time picker.
Displays a list of completed sessions.

3. Chart Stats Page
Visualizes session data using interactive charts.
Users can toggle between daily, weekly, monthly, and yearly views.
Includes a button to download session data as a CSV file.

4. Ranking System Page
Displays all available achievements and their requirements.
Shows the user's progress toward unlocking new titles and rewards.
Includes a share feature to share progress via social media or copy a link.

5. Task Management Page
Displays a list of planned tasks with their scheduled time.
Allows users to mark tasks as completed or delete them.


Technologies Used
React: Frontend framework for building the user interface.
React Router: For navigation between pages.
Chart.js: For visualizing session data in charts.
Framer Motion: For smooth animations and transitions.
CSS Modules: For styling components with scoped CSS.
Service Workers: For offline functionality.


Latest Updates
Achievements System
Achievements have been moved to a dedicated page.
Added progress tracking for time-based achievements.
Implemented lock icons for incomplete achievements.
Maintained consistent styling across the application.


Timer Improvements
Removed achievements from the home page.
Focused the home page on timer functionality.
Added motivational quotes during sessions.


Task Management
Added a new page to manage planned tasks.
Users can add, complete, or delete tasks.
Notifications are triggered when tasks are completed.


Chart Stats
Added yearly view for session data.
Users can download session data as a CSV file.


Dark Mode
Added a toggle for dark mode in the settings page.
The theme is saved in localStorage and persists across sessions.


Installation:

1.Clone the repository:
git clone https://github.com/your-username/time-time.git

2.Navigate to the project directory:
cd time-time

time
Install the dependencies:
npm install

Start the development server:
npm run dev

Open the application in your browser:
http://localhost:3000

Use the navigation bar to switch between the timer, settings, chart stats, ranking system, and task management pages.

Start the timer to begin a focus session. You will receive notifications about the timer status and unlock achievements based on your actions.

Customize the timer duration, theme, and sound settings in the Settings Page.

Plan tasks and track their completion in the Task Management Page.

Components

TimerDisplay
Displays the timer and handles timer-related actions such as start, stop, and reset.
Tracks streaks and achievements.


Settings

Allows users to customize the timer, theme, and sound settings.
Includes a navigation bar for easy navigation between different sections.


Notifications

Displays real-time notifications to keep users informed about their timer status, achievements, and task completions.


Navbar

Provides navigation links to different sections of the application, such as the home page, settings, and chart stats.


Toast

Displays toast notifications with different types (success, warning, info, error) and automatically removes them after a certain time.

Task

Manages planned tasks, allowing users to add, complete, or delete tasks.

Hooks
useAnalytics
Tracks user actions, manages achievements, and provides notifications.

useTheme
Manages the application's theme (light/dark mode).

useNotifications
Provides access to the notification context, allowing components to add and remove notifications.

Context
NotificationProvider
Provides the notification context to its children, allowing them to access and manage notifications.


Common Utilities

achievements
Defines a list of achievements with their criteria.
streaks
Handles streak tracking by checking the last visit date, updating the streak count if necessary, and saving the updated information to localStorage.


License
This project is licensed under the Apache License 2.0. See the LICENSE file for details.

Contributing
Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request.

Let me know if you need further adjustments or additional sections!