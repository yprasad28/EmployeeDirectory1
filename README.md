# Employee Directory (AJACKUS Assignment)

## Overview

This is a responsive Employee Directory web application built for the AJACKUS Company Assignment. It demonstrates clean frontend development using HTML, CSS, JavaScript, and Freemarker for initial templating. All data is handled locally using a mock array (injected via Freemarker), with no backend or network calls.

---

## Features

- List, add, edit, and delete employees
- Search, filter (sidebar), sort, and paginate employees
- Responsive design for all devices
- Form validation (required fields, email format)
- All interactivity handled in vanilla JavaScript
- Clean, modular code structure

---

## Project Structure

```
EmployeeDirectory/
├── css/
│   └── style.css         # All styles
├── js/
│   ├── app.js            # Main JS logic (DOM, interactivity)
│   └── data.js           # (Commented out) mock data, now injected by Freemarker
├── index.ftl             # Freemarker template (entry point)
├── README.md             # This file
```

---

## Setup & Run Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/EmployeeDirectory.git
   cd EmployeeDirectory
   ```

2. **Run the project:**
   - If using a Java/Freemarker backend, place `index.ftl` in your templates directory and serve as your main page.
   - If running as static HTML, you can use `index.html` (but for the assignment, use `index.ftl`).

3. **Open in your browser:**
   - Navigate to `http://127.0.0.1:5500/index.html` (or your configured port).

---

## Screenshots

![img](https://github.com/yprasad28/EmployeeDirectory1/blob/2c901a96d75a0363c309ce9b01d557c2f23e84b6/Screenshot%202025-07-12%20133345.png)

---

## Reflection

**Challenges Faced:**
- Ensuring full responsiveness and a modern UI across all devices.
- Integrating Freemarker for initial data injection without disrupting frontend logic.
- Handling modal and sidebar overlays for a smooth user experience.

**What I’d Improve with More Time:**
- Add inline error messages for form validation (not just alerts).
- Enhance accessibility (ARIA roles, keyboard navigation).
- Add unit tests for JS logic.
- Polish UI with more animations and transitions.

---

## License

MIT 
