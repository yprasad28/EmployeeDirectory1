<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Employee Directory</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <div class="header-row">
            <h1>Employee Directory</h1>
            <input type="text" id="search-input" placeholder="Search by name or email">
            <button id="filter-toggle">Filter</button>
        </div>
    </header>
    <main>
        <div class="controls">
            <div>
                Sort: 
                <select id="sort-select">
                    <option value="">--Select--</option>
                    <option value="name">Name</option>
                    <option value="department">Department</option>
                </select>
                Show: 
                <select id="show-count">
                    <option value="3">3</option>
                    <option value="6">6</option>
                    <option value="9">9</option>
                    <option value="5" selected>5</option>
                </select>
            </div>
            <button id="add-employee-btn" class="add-btn">Add Employee</button>
        </div>
        <div class="main-content">
            <div id="employee-list-container"></div>
            <aside id="filter-panel" class="hidden">
                <h3>Filter Employees</h3>
                <label>First Name: <input type="text" id="filter-firstname"></label>
                <label>Department: <input type="text" id="filter-department"></label>
                <label>Role: <input type="text" id="filter-role"></label>
                <div>
                    <button id="apply-filter">Apply</button>
                    <button id="reset-filter">Reset</button>
                </div>
            </aside>
        </div>
        <div id="pagination-controls"></div>
    </main>
    <footer>
        © 2025 Employee Directory App. All rights reserved.
    </footer>
    <div id="employee-form-modal" class="modal hidden"></div>
    <script src="js/data.js"></script>
    <script src="js/app.js"></script>
</body>
</html> 