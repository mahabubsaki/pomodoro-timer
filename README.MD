# Deployed Link

- [Link](https://client-alpha-one-62.vercel.app/)

## Prerequisites

Make sure you have Docker and Docker Compose installed on your machine.

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

To get started with the project, follow these steps:

1.  **Clone the repository**

    ```bash
    git clone https://github.com/mahabubsaki/pomodoro-timer
    cd pomodoro-timer
    ```

2.  **Build & Run the Docker images**

    ```bash
    docker-compose up --build
    ```

3.  **Access the application**

        The frontend application will be running on `http://localhost:3000` and the backend application will be running on `http://localhost:5000`.

# Productivity Tracker

A powerful productivity tool designed to help you stay focused, track progress, and celebrate achievements.

## 🚀 Features

### 📆 25-Minute Focus Session with 5-Minute Break

- **Pomodoro Technique**: Work in 25-minute focused sessions followed by a 5-minute break.
- **Customizable Timer**: Adjustable session and break durations to match your workflow.
- **Session Alerts**: Notifications to remind you when sessions start and end.

---

### 🔑 Authentication

- **Secure Login**: Authenticate using email and password or third-party providers (Google, GitHub).
- **User Management**: Personal accounts for saving progress and accessing personal analytics.
- **Data Protection**: Built-in security practices for safe data handling.

---

### 📊 Daily and Weekly Analytics

- **Progress Overview**: Visualize your productivity with interactive daily and weekly charts.
- **Focus Metrics**: Track total focus time, completed sessions, and break duration.
- **Data Trends**: Identify patterns and optimize your work schedule based on historical data.

---

### 🏆 Achievements

- **Milestone Badges**: Earn badges for completing focus sessions and productivity milestones.
- **Streaks and Rewards**: Maintain focus streaks and unlock rewards for consistent productivity.
- **Motivational Insights**: Personalized feedback to encourage long-term productivity habits.

---

## 📦 Tech Stack

- **Frontend**: React, TypeScript
- **Backend**: Node.js, Prisma, PostgreSQL,
- **Authentication**: Next Auth
- **State Management**: Tenstack Query
- **UI Framework**: TailwindCSS

---

# Focus Session API

This API manages focus sessions, including creating, fetching, and handling streaks and completed sessions. The system uses **Node.js**, **Prisma** with **PostgreSQL**, and **Redis** for caching.

---

## Endpoints

### **Create Focus Session**

**POST** `/api/focus/create`

**Description:** Create a new focus session.

**Request Body:**

```json
{
  "completed": true,
  "paused": false,
  "duration": 25,
  "userId": "123"
}
```

**Response:**

```json
{
  "status": true,
  "message": "Focus session created successfully"
}
```

---

### **Get Specific Focus Session**

**GET** `/api/focus/:userId`

**Description:** Fetch the latest focus session for a user.

**Response:**

```json
{
  "status": true,
  "data": {
    "id": "123",
    "completed": true,
    "paused": false,
    "duration": 25,
    "userId": "123",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### **Get Streak Count**

**GET** `/api/focus/streak/:userId`

**Description:** Fetch the current streak count for a user.

**Response:**

```json
{
  "status": true,
  "streak": 5
}
```

---

### **Get Completed Sessions**

**GET** `/api/focus/completed/:userId`

**Description:** Fetch the total number of completed sessions for a user.

**Response:**

```json
{
  "status": true,
  "completedSessions": 50
}
```

---

### **Get Daily Focus Sessions**

**GET** `/api/focus/daily/:userId`

**Description:** Fetch all focus sessions for the current day for a user.

**Response:**

```json
{
  "status": true,
  "data": [
    {
      "completed": true,
      "paused": false,
      "duration": 25
    }
  ]
}
```

---

## Error Handling

The API uses a centralized error handling mechanism. Errors are returned in the following format:

```json
{
  "status": false,
  "error": "Error message"
}
```

---

## Caching Strategy

- **Redis** is used for caching frequently accessed data like:
  - Streak count
  - Completed sessions
  - Latest focus session
- Cache keys follow the pattern: `get{DataType}{userId}`

---
