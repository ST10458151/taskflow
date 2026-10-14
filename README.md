<div align="center">

# TaskFlow ✦

**Make room for what matters.**

A responsive, browser-based task manager to help you organise tasks, track deadlines and celebrate progress.

[**Live App ↗**](https://st10458151.github.io/taskflow/) · [**Developer Portfolio**](https://st10458151.github.io/developer-portfolio/) · [**GitHub Profile**](https://github.com/ST10458151)

![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black) ![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Ready-24292f?logo=github)

</div>

## Overview

TaskFlow is a small, fully client-side productivity app built to practice **JavaScript DOM manipulation, CRUD operations, data validation, filtering, sorting, responsive design and browser persistence**. No account, database or API key is needed.

## Features

- Create, edit, complete and delete tasks
- Choose **Work**, **Study** or **Personal** categories
- Set **high**, **medium** or **low** priority
- Add an optional due date and description
- View tasks due **today**, **upcoming**, **completed** or by category
- Search tasks, filter by status and priority, and sort by date or priority
- See live totals, completed tasks and completion percentage
- Save tasks in **localStorage** between refreshes
- Responsive desktop and mobile layout; keyboard-friendly modal form

## Tech stack

| Technology | Purpose |
|---|---|
| HTML5 | Semantic structure, forms and native dialog |
| CSS3 | Layout, responsive styling, progress indicators |
| Vanilla JavaScript | Task management, filters, search and DOM updates |
| Browser localStorage | Local persistent storage |
| GitHub Pages | Static website hosting |

## Run locally

Clone the project and open `index.html`:

```bash
git clone https://github.com/ST10458151/taskflow.git
cd taskflow
open index.html
```

Alternatively, run a local web server:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Publish with GitHub Pages

In the repository, go to **Settings → Pages**. Select **Deploy from a branch**, choose **main** and **/(root)**, and save.

When GitHub finishes deploying, the app will be available at:
https://st10458151.github.io/taskflow/

## Data and privacy

TaskFlow saves tasks **only in your current browser's localStorage**. Tasks are not uploaded to GitHub, synced across devices or shared with anyone. Clearing site data or switching browsers/devices can remove or hide your tasks. This is a learning project, **not a secure or backed-up data storage service**.

No analytics or task API is used. Google Fonts is an optional third-party font service.

## Folder structure

```text
taskflow/
├── index.html   # App layout and task dialog
├── styles.css   # Dashboard design and responsive rules
├── app.js       # Task CRUD, localStorage, filters, sorting, UI
└── README.md    # Documentation
```

## Learning outcomes

This project demonstrates how to build a useful application without a frontend framework or backend: data-driven rendering, event handling, browser persistence, basic form validation and accessible interaction patterns.

---

Created by **Shakeelah Khan** · [Portfolio](https://st10458151.github.io/developer-portfolio/) · [LinkedIn](https://www.linkedin.com/in/shakeelah-k-867b13320/)
