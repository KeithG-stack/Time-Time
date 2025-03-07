# Time-Time

Time-Time is a productivity application that helps users manage their time effectively. It includes features such as a timer, notifications, achievements, streak tracking, and customizable settings.

## Features

- **Timer**: A focus timer that helps users manage their work sessions.
- **Notifications**: Real-time notifications to keep users informed about their timer status and achievements.
- **Achievements**: Unlock achievements based on specific actions, such as starting the timer for the first time, resetting the timer within a certain time frame, and reaching time milestones.
- **Streak Tracking**: Track consecutive days of using the application and display the current streak.
- **Customizable Settings**: Change the theme color of the application.
- **Navigation Bar**: Navigate between different sections of the application using the navigation bar.

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

