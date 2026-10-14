<div align="center">

# ✦ TaskFlow

### Make room for what matters.

A modern, responsive task-management app for organising priorities, tracking deadlines and celebrating progress — built with **HTML, CSS and vanilla JavaScript**.

[**🚀 Try TaskFlow Live**](https://st10458151.github.io/taskflow/) · [**My Developer Portfolio**](https://st10458151.github.io/developer-portfolio/) · [**LinkedIn**](https://www.linkedin.com/in/shakeelah-k-867b13320/)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Hosting](https://img.shields.io/badge/Hosting-GitHub_Pages-24292f?logo=github)
![Status](https://img.shields.io/badge/Status-Live-159c86)

</div>

---

## About TaskFlow

**TaskFlow** is a lightweight productivity dashboard that helps users manage everyday tasks without creating an account or installing an application. It brings task lists, priorities, categories, deadlines and progress tracking together in a clean interface.

I created this project for my software development portfolio to demonstrate **client-side CRUD functionality, DOM manipulation, responsive design, event-driven programming, filtering and sorting algorithms, form validation, and browser-based data persistence**.

**Live application:** https://st10458151.github.io/taskflow/

## Key Features

| Feature | Description |
|---|---|
| **Task management** | Create, view, edit, complete and delete tasks |
| **Categories** | Organise tasks by Work, Study or Personal |
| **Priorities** | Assign High, Medium or Low priority |
| **Due dates** | Add deadlines and identify overdue tasks |
| **Smart views** | Quickly view all tasks, today's tasks, upcoming tasks and completed tasks |
| **Search & filters** | Search task titles/descriptions and filter by status or priority |
| **Sorting** | Sort by newest, oldest, due date or priority |
| **Progress dashboard** | View total tasks, outstanding tasks, completed tasks and completion percentage |
| **Automatic saving** | Keep tasks between page refreshes using browser localStorage |
| **Responsive design** | Use the interface on desktop and mobile screens |

## Explore the App

1. Open the [live TaskFlow website](https://st10458151.github.io/taskflow/).
2. Select **Add new task** and enter a task name.
3. Optionally add a description, category, priority and due date.
4. Save your task, then use the checkbox to mark it complete.
5. Try the search, sorting, category and status controls.
6. Refresh the page to see your tasks saved in the same browser.

> **Privacy note:** Tasks are stored locally in your browser. They are not uploaded to a server or synchronised across devices.

## Technology Stack

| Technology | Usage |
|---|---|
| **HTML5** | Semantic page structure, forms and native dialog |
| **CSS3** | Responsive dashboard, navigation, cards and visual styling |
| **JavaScript (ES6+)** | CRUD operations, event handlers, data-driven rendering, search, filtering and sorting |
| **localStorage** | Persistent task storage on the current device/browser |
| **Git & GitHub** | Version control and source-code hosting |
| **GitHub Pages** | Static web deployment |

No JavaScript framework, backend server or database setup is required.

## Project Structure

```text
taskflow/
├── index.html     # Dashboard layout, task list and form dialog
├── styles.css     # Styling and responsive layouts
├── app.js         # CRUD operations, state, filtering and storage
└── README.md      # Project documentation
```

## Run Locally

**1. Clone the repository**

```bash
git clone https://github.com/ST10458151/taskflow.git
cd taskflow
```

**2. Open the website**

On macOS:

```bash
open index.html
```

Or start a local development server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Deployment

The project is published as a static website using **GitHub Pages** from the `main` branch.

To publish a fork: navigate to **Settings → Pages → Build and deployment**, choose **Deploy from a branch**, select `main` and `/(root)`, then save.

**Published URL:** https://st10458151.github.io/taskflow/

## What I Learned

This project demonstrates:

- Implementing create, read, update and delete (CRUD) operations with client-side JavaScript.
- Building reusable DOM-rendering functions and managing UI state.
- Working with arrays, filtering conditions and sorting functions.
- Validating user input and handling form submissions.
- Persisting structured data with JSON and `localStorage`.
- Creating responsive interfaces and keyboard-accessible controls.
- Preparing and deploying a static application using GitHub Pages.

## Limitations & Potential Improvements

TaskFlow is intentionally a **frontend portfolio project**. Tasks are stored only in the current browser's localStorage, so they cannot sync across devices, and clearing browser data may remove them. There is no login system or cloud backup.

Future enhancements could include recurring tasks, drag-and-drop organisation, optional data export/import and automated frontend tests.

---

<div align="center">

**Designed and developed by Shakeelah Khan**

[Portfolio](https://st10458151.github.io/developer-portfolio/) · [GitHub](https://github.com/ST10458151) · [LinkedIn](https://www.linkedin.com/in/shakeelah-k-867b13320/)

</div>
