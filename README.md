# Project Management Tool

A comprehensive project management tool, inspired by Jira, built to streamline project tracking, task management, and team collaboration. This tool allows users to create and manage projects, assign tasks, track task progress, and improve team productivity.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- **Project Management:** Create, edit, and delete projects.
- **Task Management:** Create tasks, assign them to users, and categorize them by status (To Do, In Progress, Done).
- **Real-time Updates:** Keep track of tasks and project progress in real-time.
- **User-Friendly Interface:** Responsive and intuitive UI using React and Tailwind CSS.
- **Data Persistence:** PostgreSQL database to store and manage project data.
- **Form Validation:** Integrated form validation using React Hook Form.

---

## Technologies Used
### Frontend
- **React**
- **TypeScript**
- **Tailwind CSS**
- **React Hook Form**

### Backend
- **Node.js**
- **Express.js**
- **PostgreSQL**

---

## Setup and Installation
### Prerequisites
- Node.js
- PostgreSQL

### Clone the Repository
```bash
git clone https://github.com/yourusername/project-management-tool.git
cd project-management-tool
```

### Backend Setup
1. Navigate to the backend folder:
```bash
cd backend
```
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file and configure your database connection:
```
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
DB_PORT=your_database_port
```
4. Run database migrations (if applicable) and start the server:
```bash
npm run migrate
npm run start
```

### Frontend Setup
1. Navigate to the frontend folder:
```bash
cd frontend
```
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm start
```

---

## Usage
1. Navigate to `http://localhost:3000` in your browser.
2. Create a new project by clicking the "Create a New Project" button.
3. Add tasks to your project and update their status as progress is made.
4. Monitor tasks and overall project progress from the dashboard.

---

## API Endpoints
### Projects
- **POST** `/api/projects` - Create a new project.
- **GET** `/api/projects` - Retrieve all projects.
- **GET** `/api/projects/:id` - Retrieve a specific project by ID.
- **PUT** `/api/projects/:id` - Update a specific project.
- **DELETE** `/api/projects/:id` - Delete a project.

### Tasks
- **POST** `/api/tasks` - Create a new task.
- **GET** `/api/tasks` - Retrieve all tasks.
- **GET** `/api/tasks/:id` - Retrieve a specific task by ID.
- **PUT** `/api/tasks/:id` - Update a task.
- **DELETE** `/api/tasks/:id` - Delete a task.

---

## Contributing
Contributions are welcome! Feel free to submit a pull request or open an issue to suggest improvements.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for more information.

