let employees = [...mockEmployees];
let filteredEmployees = [...employees];
let currentPage = 1;
let itemsPerPage = 5;
let currentSort = '';

function renderEmployees() {
    const list = document.getElementById('employee-list-container');
    if (!list) return;
    list.innerHTML = '';
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginated = filteredEmployees.slice(start, end);
    if (paginated.length === 0) {
        list.innerHTML = '<p>No employees found.</p>';
        return;
    }
    paginated.forEach(emp => {
        const card = document.createElement('div');
        card.className = 'employee-card';
        card.innerHTML = `
            <h3>${emp.firstName} ${emp.lastName}</h3>
            <p><b>Email:</b> ${emp.email}</p>
            <p><b>Department:</b> ${emp.department}</p>
            <p><b>Role:</b> ${emp.role}</p>
            <div class="card-actions">
                <button class="edit-btn" data-id="${emp.id}">Edit</button>
                <button class="delete-btn" data-id="${emp.id}">Delete</button>
            </div>
        `;
        list.appendChild(card);
    });
    renderPagination();
}

function renderPagination() {
    const controls = document.getElementById('pagination-controls');
    if (!controls) return;
    controls.innerHTML = '';
    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
    if (totalPages <= 1) return;
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.className = (i === currentPage) ? 'active' : '';
        btn.onclick = () => {
            currentPage = i;
            renderEmployees();
        };
        controls.appendChild(btn);
    }
}

function handleSearch() {
    const input = document.getElementById('search-input');
    if (!input) return;
    input.addEventListener('input', () => {
        const val = input.value.toLowerCase();
        filteredEmployees = employees.filter(emp =>
            emp.firstName.toLowerCase().includes(val) ||
            emp.lastName.toLowerCase().includes(val) ||
            emp.email.toLowerCase().includes(val)
        );
        currentPage = 1;
        renderEmployees();
    });
}

function handleDelete() {
    document.getElementById('employee-list-container').addEventListener('click', e => {
        if (e.target.classList.contains('delete-btn')) {
            const id = Number(e.target.getAttribute('data-id'));
            employees = employees.filter(emp => emp.id !== id);
            filteredEmployees = filteredEmployees.filter(emp => emp.id !== id);
            renderEmployees();
        }
    });
}

function handleAdd() {
    document.getElementById('add-employee-btn').addEventListener('click', () => {
        showEmployeeForm();
    });
}

function handleEdit() {
    document.getElementById('employee-list-container').addEventListener('click', e => {
        if (e.target.classList.contains('edit-btn')) {
            const id = Number(e.target.getAttribute('data-id'));
            const emp = employees.find(emp => emp.id === id);
            if (emp) showEmployeeForm(emp);
        }
    });
}

function showEmployeeForm(emp = null) {
    const modal = document.getElementById('employee-form-modal');
    modal.classList.remove('hidden');

    // Get unique departments and roles from mockEmployees
    const departments = Array.from(new Set(mockEmployees.map(e => e.department)));
    const roles = Array.from(new Set(mockEmployees.map(e => e.role)));

    // Generate options for department
    const departmentOptions = departments.map(dept =>
        `<option value="${dept}"${emp && emp.department === dept ? ' selected' : ''}>${dept}</option>`
    ).join('');

    // Generate options for role
    const roleOptions = roles.map(role =>
        `<option value="${role}"${emp && emp.role === role ? ' selected' : ''}>${role}</option>`
    ).join('');

    modal.innerHTML = `
        <form class="employee-form" id="employee-form">
            <h2>${emp ? 'Edit' : 'Add'} Employee</h2>
            <label>First name
                <input type="text" name="firstName" value="${emp ? emp.firstName : ''}" required>
            </label>
            <label>Last name
                <input type="text" name="lastName" value="${emp ? emp.lastName : ''}" required>
            </label>
            <div class="form-row">
                <label>Email
                    <input type="email" name="email" value="${emp ? emp.email : ''}" required>
                </label>
                <label>Department
                    <select name="department" required>
                        <option value="" disabled${!emp ? ' selected' : ''}>Select department</option>
                        ${departmentOptions}
                    </select>
                </label>
            </div>
            <label>Role
                <select name="role" required>
                    <option value="" disabled${!emp ? ' selected' : ''}>Select role</option>
                    ${roleOptions}
                </select>
            </label>
            <div class="form-actions">
                <button type="button" class="cancel-btn" id="cancel-btn">Cancel</button>
                <button type="submit" class="add-btn">${emp ? 'Save' : 'Add'}</button>
            </div>
        </form>
    `;
    // Add outside click listener to close modal
    setTimeout(() => {
        document.addEventListener('mousedown', closeModalOnClickOutside);
    }, 0);
    function closeModalOnClickOutside(e) {
        if (!modal.contains(e.target)) {
            modal.classList.add('hidden');
            modal.innerHTML = '';
            document.removeEventListener('mousedown', closeModalOnClickOutside);
        }
    }
    document.getElementById('cancel-btn').onclick = () => {
        modal.classList.add('hidden');
        modal.innerHTML = '';
        document.removeEventListener('mousedown', closeModalOnClickOutside);
    };
    document.getElementById('employee-form').onsubmit = function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const newEmp = {
            id: emp ? emp.id : Date.now(),
            firstName: formData.get('firstName').trim(),
            lastName: formData.get('lastName').trim(),
            email: formData.get('email').trim(),
            department: formData.get('department').trim(),
            role: formData.get('role').trim()
        };
        if (!validateEmail(newEmp.email)) {
            alert('Invalid email format.');
            return;
        }
        if (emp) {
            // Edit
            const idx = employees.findIndex(e => e.id === emp.id);
            if (idx !== -1) employees[idx] = newEmp;
        } else {
            // Add
            employees.push(newEmp);
        }
        filteredEmployees = [...employees];
        modal.classList.add('hidden');
        modal.innerHTML = '';
        document.removeEventListener('mousedown', closeModalOnClickOutside);
        renderEmployees();
    };
}

function validateEmail(email) {
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

function handleSort() {
    document.getElementById('sort-select').addEventListener('change', function() {
        currentSort = this.value;
        sortEmployees();
        renderEmployees();
    });
}

function sortEmployees() {
    if (currentSort === 'name') {
        filteredEmployees.sort((a, b) => (a.firstName + a.lastName).localeCompare(b.firstName + b.lastName));
    } else if (currentSort === 'department') {
        filteredEmployees.sort((a, b) => a.department.localeCompare(b.department));
    }
}

function handleShowCount() {
    document.getElementById('show-count').addEventListener('change', function() {
        itemsPerPage = Number(this.value);
        currentPage = 1;
        renderEmployees();
    });
}

function handleFilterPanel() {
    const filterPanel = document.getElementById('filter-panel');
    const filterToggle = document.getElementById('filter-toggle');
    const filterOverlay = document.getElementById('filter-overlay');
    const closeBtn = document.getElementById('close-filter-panel');

    function openSidebar() {
        filterPanel.classList.remove('hidden');
        filterOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
    function closeSidebar() {
        filterPanel.classList.add('hidden');
        filterOverlay.classList.add('hidden');
        document.body.style.overflow = '';
    }

    filterToggle.onclick = openSidebar;
    closeBtn.onclick = closeSidebar;
    filterOverlay.onclick = closeSidebar;

    // Also close on Escape key
    document.addEventListener('keydown', function(e) {
        if (!filterPanel.classList.contains('hidden') && (e.key === 'Escape' || e.key === 'Esc')) {
            closeSidebar();
        }
    });

    document.getElementById('apply-filter').onclick = () => {
        const fname = document.getElementById('filter-firstname').value.toLowerCase();
        const dept = document.getElementById('filter-department').value.toLowerCase();
        const role = document.getElementById('filter-role').value.toLowerCase();
        filteredEmployees = employees.filter(emp =>
            (fname === '' || emp.firstName.toLowerCase().includes(fname)) &&
            (dept === '' || emp.department.toLowerCase().includes(dept)) &&
            (role === '' || emp.role.toLowerCase().includes(role))
        );
        currentPage = 1;
        sortEmployees();
        renderEmployees();
        closeSidebar();
    };
    document.getElementById('reset-filter').onclick = () => {
        document.getElementById('filter-firstname').value = '';
        document.getElementById('filter-department').value = '';
        document.getElementById('filter-role').value = '';
        filteredEmployees = [...employees];
        currentPage = 1;
        sortEmployees();
        renderEmployees();
        closeSidebar();
    };
}

window.onload = function() {
    renderEmployees();
    handleSearch();
    handleDelete();
    handleAdd();
    handleEdit();
    handleSort();
    handleShowCount();
    handleFilterPanel();
}; 