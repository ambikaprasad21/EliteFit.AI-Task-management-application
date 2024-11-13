# Task Management Application

A simple yet powerful Task Management application to help users organize and manage their tasks effectively. This project allows users to create, edit, delete, and filter tasks, with data stored locally so users can access their information across sessions.

**Youtube demo video link of the project**
https://www.youtube.com/watch?v=h_vPKkiwJ44

**Screenshots**
![Landing page](https://github.com/ambikaprasad21/EliteFit.AI-Task-management-application/blob/main/public/images/image%201.png)
![Dashboard](https://github.com/ambikaprasad21/EliteFit.AI-Task-management-application/blob/main/public/images/image%202.png)
![Create new task](https://github.com/ambikaprasad21/EliteFit.AI-Task-management-application/blob/main/public/images/image%203.png)
![Lists of tasks](https://github.com/ambikaprasad21/EliteFit.AI-Task-management-application/blob/main/public/images/image%204.png)
![Deleting a task](https://github.com/ambikaprasad21/EliteFit.AI-Task-management-application/blob/main/public/images/image%205.png)

## Features

1. **Dashboard**

   - A centralized dashboard displaying tasks categorized as:
     - Upcoming Tasks
     - Overdue Tasks
     - Completed Tasks
   - This allows users to stay on top of deadlines and track progress at a glance.

2. **Task Management**

   - Users can:
     - Create new tasks
     - Edit existing tasks
     - Delete tasks when completed or no longer needed
   - Each task includes a title, description, deadline, and priority level (Low, Medium, High).

3. **Task Search and Filtering**

   - Quickly search tasks by their title.
   - Filter tasks by priority (Low, Medium, or High), enabling users to focus on high-priority tasks easily.

4. **Local Storage**

   - All user information and tasks are saved in the browser's local storage.
   - Data remains persistent across sessions, allowing users to return to their tasks even after closing the application.

5. **Fake Authentication System**
   - The application uses a simple name-based "authentication" system.
   - If a user enters the same name each time they access the application, their data will persist and be accessible under that name.

## Installation

To get started with this project locally, follow these steps:

1. **Clone the Repository**  
   Clone the repository from GitHub to your local machine:
   ```bash
   [git clone https://github.com/your-username/task-management-app.git](https://github.com/ambikaprasad21/EliteFit.AI-Task-management-application.git)

   ```
2. **Navigate to the Project Directory**

   ```bash
   cd EliteFit.AI-Task-management-application

   ```

3. **Install Dependencies**
   install the required dependencies using npm

   ```bash
   npm install

   ```

4. **Run the Application**
   run the application using the below command
   ```bash
   npm run dev
   ```

application will start running on this url: http://localhost:5173

**Usage**

1. Open your browser and navigate to http://localhost:5173.
2. Enter a name to log into the app.
3. Create, view, and manage your tasks from the dashboard.
4. The tasks will remain saved under your name for future sessions.
