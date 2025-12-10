// admin-dashboard.js - SIMPLIFIED WORKING VERSION

console.log('Admin dashboard script loaded');

// Check if user is logged in and is admin
document.addEventListener('DOMContentLoaded', function() {
    console.log('Admin dashboard initializing...');
    
    // First check: Look for session data directly
    const sessionData = localStorage.getItem('workSphereSession');
    
    if (!sessionData) {
        console.log('No session found, redirecting to login...');
        window.location.href = 'Login.html';
        return;
    }
    
    try {
        const user = JSON.parse(sessionData);
        console.log('User found:', user);
        
        // Check if user is admin
        if (user.role !== 'admin') {
            console.log('User is not admin, redirecting to employee dashboard...');
            alert('Access denied. Admin privileges required.');
            window.location.href = 'Employee Dashboard.html';
            return;
        }
        
        // Update UI with user info
        updateUserInfo(user);
        
        // Initialize the dashboard
        initializeAdminDashboard();
        
    } catch (error) {
        console.error('Error parsing session data:', error);
        window.location.href = 'Login.html';
    }
});

function updateUserInfo(user) {
    // Update user name
    const userNameElement = document.querySelector('.user-name');
    if (userNameElement && user.name) {
        userNameElement.textContent = user.name;
    }
    
    // Update user role
    const userRoleElement = document.querySelector('.user-role');
    if (userRoleElement) {
        if (user.position) {
            userRoleElement.textContent = user.position;
        } else if (user.role) {
            userRoleElement.textContent = user.role.charAt(0).toUpperCase() + user.role.slice(1);
        }
    }
    
    // Update avatar
    const userAvatar = document.querySelector('.user-avatar');
    if (userAvatar) {
        if (user.profileImage) {
            userAvatar.style.backgroundImage = `url(${user.profileImage})`;
            userAvatar.style.backgroundSize = 'cover';
            userAvatar.style.backgroundPosition = 'center';
            userAvatar.textContent = '';
        } else {
            const initials = user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'AU';
            userAvatar.textContent = initials.substring(0, 2);
            userAvatar.style.backgroundImage = 'none';
        }
    }
}

function initializeAdminDashboard() {
    console.log('Initializing admin dashboard...');
    
    // Set current date
    updateCurrentDate();
    
    // Initialize all data and UI
    initializeData();
    initializeUI();
    
    // Setup all event listeners
    setupEventListeners();
    
    // Setup logout functionality
    setupLogout();
    
    // Show welcome message
    const sessionData = localStorage.getItem('workSphereSession');
    if (sessionData) {
        const user = JSON.parse(sessionData);
        showNotification(`Welcome back, ${user.name}!`, 'success');
    }
}

function updateCurrentDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        dateElement.innerHTML = `
            <i class="fas fa-calendar"></i>
            <span>${now.toLocaleDateString('en-US', options)}</span>
        `;
    }
}

// ===== DUMMY DATA =====
const employeeInfo = {
    "employeeInformation": [
        {
            "employeeId": 1,
            "name": "Sibongile Nkosi",
            "position": "Software Engineer",
            "department": "Development",
            "salary": 70000,
            "employmentHistory": "Joined in 2015, promoted to Senior in 2018",
            "contact": "sibongile.nkosi@moderntech.com"
        },
        {
            "employeeId": 2,
            "name": "Lungile Moyo",
            "position": "HR Manager",
            "department": "HR",
            "salary": 80000,
            "employmentHistory": "Joined in 2013, promoted to Manager in 2017",
            "contact": "lungile.moyo@moderntech.com"
        },
        {
            "employeeId": 3,
            "name": "Thabo Molefe",
            "position": "Quality Analyst",
            "department": "QA",
            "salary": 55000,
            "employmentHistory": "Joined in 2018",
            "contact": "thabo.molefe@moderntech.com"
        },
        {
            "employeeId": 4,
            "name": "Keshav Naidoo",
            "position": "Sales Representative",
            "department": "Sales",
            "salary": 60000,
            "employmentHistory": "Joined in 2020",
            "contact": "keshav.naidoo@moderntech.com"
        },
        {
            "employeeId": 5,
            "name": "Zanele Khumalo",
            "position": "Marketing Specialist",
            "department": "Marketing",
            "salary": 58000,
            "employmentHistory": "Joined in 2019",
            "contact": "zanele.khumalo@moderntech.com"
        },
        {
            "employeeId": 6,
            "name": "Sipho Zulu",
            "position": "UI/UX Designer",
            "department": "Design",
            "salary": 65000,
            "employmentHistory": "Joined in 2016",
            "contact": "sipho.zulu@moderntech.com"
        },
        {
            "employeeId": 7,
            "name": "Naledi Moeketsi",
            "position": "DevOps Engineer",
            "department": "IT",
            "salary": 72000,
            "employmentHistory": "Joined in 2017",
            "contact": "naledi.moeketsi@moderntech.com"
        },
        {
            "employeeId": 8,
            "name": "Farai Gumbo",
            "position": "Content Strategist",
            "department": "Marketing",
            "salary": 56000,
            "employmentHistory": "Joined in 2021",
            "contact": "farai.gumbo@moderntech.com"
        },
        {
            "employeeId": 9,
            "name": "Karabo Dlamini",
            "position": "Accountant",
            "department": "Finance",
            "salary": 62000,
            "employmentHistory": "Joined in 2018",
            "contact": "karabo.dlamini@moderntech.com"
        },
        {
            "employeeId": 10,
            "name": "Fatima Patel",
            "position": "Customer Support Lead",
            "department": "Support",
            "salary": 58000,
            "employmentHistory": "Joined in 2016",
            "contact": "fatima.patel@moderntech.com"
        }
    ]
};

const attendanceData = {
    "attendanceAndLeave": [
        {
            "employeeId": 1,
            "name": "Sibongile Nkosi",
            "attendance": [
                { "date": "2025-07-25", "status": "Present" },
                { "date": "2025-07-26", "status": "Absent" },
                { "date": "2025-07-27", "status": "Present" },
                { "date": "2025-07-28", "status": "Present" },
                { "date": "2025-07-29", "status": "Present" }
            ],
            "leaveRequests": [
                { "date": "2025-07-22", "reason": "Sick Leave", "status": "Approved" },
                { "date": "2024-12-01", "reason": "Personal", "status": "Pending" }
            ]
        },
        {
            "employeeId": 2,
            "name": "Lungile Moyo",
            "attendance": [
                { "date": "2025-07-25", "status": "Present" },
                { "date": "2025-07-26", "status": "Present" },
                { "date": "2025-07-27", "status": "Absent" },
                { "date": "2025-07-28", "status": "Present" },
                { "date": "2025-07-29", "status": "Present" }
            ],
            "leaveRequests": [
                { "date": "2025-07-15", "reason": "Family Responsibility", "status": "Denied" },
                { "date": "2024-12-02", "reason": "Vacation", "status": "Approved" }
            ]
        },
        {
            "employeeId": 3,
            "name": "Thabo Molefe",
            "attendance": [
                { "date": "2025-07-25", "status": "Present" },
                { "date": "2025-07-26", "status": "Present" },
                { "date": "2025-07-27", "status": "Present" },
                { "date": "2025-07-28", "status": "Absent" },
                { "date": "2025-07-29", "status": "Present" }
            ],
            "leaveRequests": [
                { "date": "2025-07-10", "reason": "Medical Appointment", "status": "Approved" },
                { "date": "2024-12-05", "reason": "Personal", "status": "Pending" }
            ]
        },
        {
            "employeeId": 4,
            "name": "Keshav Naidoo",
            "attendance": [
                { "date": "2025-07-25", "status": "Absent" },
                { "date": "2025-07-26", "status": "Present" },
                { "date": "2025-07-27", "status": "Present" },
                { "date": "2025-07-28", "status": "Present" },
                { "date": "2025-07-29", "status": "Present" }
            ],
            "leaveRequests": [
                { "date": "2025-07-20", "reason": "Bereavement", "status": "Approved" }
            ]
        },
        {
            "employeeId": 5,
            "name": "Zanele Khumalo",
            "attendance": [
                { "date": "2025-07-25", "status": "Present" },
                { "date": "2025-07-26", "status": "Present" },
                { "date": "2025-07-27", "status": "Absent" },
                { "date": "2025-07-28", "status": "Present" },
                { "date": "2025-07-29", "status": "Present" }
            ],
            "leaveRequests": [
                { "date": "2024-12-01", "reason": "Childcare", "status": "Pending" }
            ]
        },
        {
            "employeeId": 6,
            "name": "Sipho Zulu",
            "attendance": [
                { "date": "2025-07-25", "status": "Present" },
                { "date": "2025-07-26", "status": "Present" },
                { "date": "2025-07-27", "status": "Absent" },
                { "date": "2025-07-28", "status": "Present" },
                { "date": "2025-07-29", "status": "Present" }
            ],
            "leaveRequests": [
                { "date": "2025-07-18", "reason": "Sick Leave", "status": "Approved" }
            ]
        },
        {
            "employeeId": 7,
            "name": "Naledi Moeketsi",
            "attendance": [
                { "date": "2025-07-25", "status": "Present" },
                { "date": "2025-07-26", "status": "Present" },
                { "date": "2025-07-27", "status": "Present" },
                { "date": "2025-07-28", "status": "Absent" },
                { "date": "2025-07-29", "status": "Present" }
            ],
            "leaveRequests": [
                { "date": "2025-07-22", "reason": "Vacation", "status": "Pending" }
            ]
        },
        {
            "employeeId": 8,
            "name": "Farai Gumbo",
            "attendance": [
                { "date": "2025-07-25", "status": "Present" },
                { "date": "2025-07-26", "status": "Absent" },
                { "date": "2025-07-27", "status": "Present" },
                { "date": "2025-07-28", "status": "Present" },
                { "date": "2025-07-29", "status": "Present" }
            ],
            "leaveRequests": [
                { "date": "2024-12-02", "reason": "Medical Appointment", "status": "Approved" }
            ]
        },
        {
            "employeeId": 9,
            "name": "Karabo Dlamini",
            "attendance": [
                { "date": "2025-07-25", "status": "Present" },
                { "date": "2025-07-26", "status": "Present" },
                { "date": "2025-07-27", "status": "Present" },
                { "date": "2025-07-28", "status": "Absent" },
                { "date": "2025-07-29", "status": "Present" }
            ],
            "leaveRequests": [
                { "date": "2025-07-19", "reason": "Childcare", "status": "Denied" }
            ]
        },
        {
            "employeeId": 10,
            "name": "Fatima Patel",
            "attendance": [
                { "date": "2025-07-25", "status": "Present" },
                { "date": "2025-07-26", "status": "Present" },
                { "date": "2025-07-27", "status": "Absent" },
                { "date": "2025-07-28", "status": "Present" },
                { "date": "2025-07-29", "status": "Present" }
            ],
            "leaveRequests": [
                { "date": "2024-12-03", "reason": "Vacation", "status": "Pending" }
            ]
        }
    ]
};

const payrollData = {
    "payrollData": [
        {
            "employeeId": 1,
            "hoursWorked": 160,
            "leaveDeductions": 8,
            "finalSalary": 69500
        },
        {
            "employeeId": 2,
            "hoursWorked": 150,
            "leaveDeductions": 10,
            "finalSalary": 79000
        },
        {
            "employeeId": 3,
            "hoursWorked": 170,
            "leaveDeductions": 4,
            "finalSalary": 54800
        },
        {
            "employeeId": 4,
            "hoursWorked": 165,
            "leaveDeductions": 6,
            "finalSalary": 59700
        },
        {
            "employeeId": 5,
            "hoursWorked": 158,
            "leaveDeductions": 5,
            "finalSalary": 57850
        },
        {
            "employeeId": 6,
            "hoursWorked": 168,
            "leaveDeductions": 2,
            "finalSalary": 64800
        },
        {
            "employeeId": 7,
            "hoursWorked": 175,
            "leaveDeductions": 3,
            "finalSalary": 71800
        },
        {
            "employeeId": 8,
            "hoursWorked": 160,
            "leaveDeductions": 0,
            "finalSalary": 56000
        },
        {
            "employeeId": 9,
            "hoursWorked": 155,
            "leaveDeductions": 5,
            "finalSalary": 61500
        },
        {
            "employeeId": 10,
            "hoursWorked": 162,
            "leaveDeductions": 4,
            "finalSalary": 57750
        }
    ]
};

// Global variables
let employees = [];
let attendance = {};
let payroll = {};
let currentFilter = 'all';
let currentSort = 'name-asc';
let currentView = 'grid';
let currentSearch = '';

function initializeData() {
    // Process employee information
    employees = employeeInfo.employeeInformation.map(emp => ({
        id: emp.employeeId,
        firstName: emp.name.split(' ')[0],
        lastName: emp.name.split(' ').slice(1).join(' '),
        fullName: emp.name,
        email: emp.contact,
        position: emp.position,
        department: emp.department,
        salary: emp.salary,
        employmentHistory: emp.employmentHistory,
        status: 'available',
        location: 'Johannesburg, SA',
        leaveBalance: { annual: 15, sick: 8, emergency: 5 }
    }));

    // Process attendance data
    attendanceData.attendanceAndLeave.forEach(att => {
        attendance[att.employeeId] = att;
    });

    // Process payroll data
    payrollData.payrollData.forEach(pay => {
        payroll[pay.employeeId] = pay;
    });
}

function initializeUI() {
    // Render all components
    renderEmployees();
    renderLeaveRequests();
    renderPayrollSummary();
    renderRecentAttendance();
    
    // Populate employee select
    populateEmployeeSelect();
    
    // Update stats
    updateStats();
}

function renderEmployees() {
    let filteredEmployees = filterEmployees(employees);
    filteredEmployees = sortEmployees(filteredEmployees, currentSort);
    
    const container = document.getElementById('employeeList');
    const resultsCount = document.getElementById('resultsCount');
    
    if (!container) {
        console.error('Employee list container not found!');
        return;
    }
    
    if (filteredEmployees.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-users"></i>
                <h3>No Employees Found</h3>
                <p>Try adjusting your search or filter criteria</p>
                <button class="btn btn-primary" onclick="resetSearch()">
                    <i class="fas fa-redo"></i>
                    Reset Search
                </button>
            </div>
        `;
    } else {
        container.innerHTML = filteredEmployees.map(employee => createEmployeeCard(employee)).join('');
    }
    
    if (resultsCount) {
        resultsCount.textContent = filteredEmployees.length;
    }
}

function filterEmployees(employeesList) {
    let filtered = employeesList;
    
    // Apply department filter
    if (currentFilter !== 'all') {
        filtered = filtered.filter(emp => 
            emp.department.toLowerCase().replace(' ', '-') === currentFilter
        );
    }
    
    // Apply search filter
    if (currentSearch.trim()) {
        const searchTerm = currentSearch.toLowerCase();
        filtered = filtered.filter(emp =>
            emp.fullName.toLowerCase().includes(searchTerm) ||
            emp.email.toLowerCase().includes(searchTerm) ||
            emp.position.toLowerCase().includes(searchTerm) ||
            emp.department.toLowerCase().includes(searchTerm)
        );
    }
    
    return filtered;
}

function sortEmployees(employeesList, sortBy) {
    const sorted = [...employeesList];
    
    switch(sortBy) {
        case 'name-asc':
            return sorted.sort((a, b) => a.fullName.localeCompare(b.fullName));
        case 'name-desc':
            return sorted.sort((a, b) => b.fullName.localeCompare(a.fullName));
        case 'dept-asc':
            return sorted.sort((a, b) => a.department.localeCompare(b.department));
        case 'dept-desc':
            return sorted.sort((a, b) => b.department.localeCompare(a.department));
        case 'salary-high':
            return sorted.sort((a, b) => b.salary - a.salary);
        case 'salary-low':
            return sorted.sort((a, b) => a.salary - b.salary);
        default:
            return sorted;
    }
}

function createEmployeeCard(employee) {
    const initials = `${employee.firstName[0]}${employee.lastName[0]}`.toUpperCase();
    const status = getEmployeeStatus(employee.id);
    const statusClass = `status-${status}`;
    const statusText = getStatusText(status);
    const payrollInfo = payroll[employee.id] || { finalSalary: employee.salary };
    const attendanceInfo = attendance[employee.id];
    
    // Calculate attendance rate
    let attendanceRate = 'N/A';
    if (attendanceInfo && attendanceInfo.attendance.length > 0) {
        const presentDays = attendanceInfo.attendance.filter(a => a.status === 'Present').length;
        attendanceRate = Math.round((presentDays / attendanceInfo.attendance.length) * 100) + '%';
    }
    
    return `
        <div class="employee-card" data-id="${employee.id}">
            <div class="employee-header">
                <div class="employee-info">
                    <div class="employee-avatar">
                        ${initials}
                    </div>
                    <div class="employee-details">
                        <div class="employee-name">${employee.fullName}</div>
                        <div class="employee-title">${employee.position}</div>
                        <div class="employee-department">
                            <i class="fas fa-${getDepartmentIcon(employee.department)}"></i>
                            ${employee.department}
                        </div>
                    </div>
                </div>
                <div class="employee-status ${statusClass}">
                    <i class="fas fa-${getStatusIcon(status)}"></i>
                    ${statusText}
                </div>
            </div>
            
            <div class="employee-meta">
                <div class="meta-item">
                    <div class="meta-label">Email</div>
                    <div class="meta-value">${employee.email}</div>
                </div>
                <div class="meta-item">
                    <div class="meta-label">Salary</div>
                    <div class="meta-value">R ${employee.salary.toLocaleString()}</div>
                </div>
                <div class="meta-item">
                    <div class="meta-label">Attendance</div>
                    <div class="meta-value">${attendanceRate}</div>
                </div>
                <div class="meta-item">
                    <div class="meta-label">Final Salary</div>
                    <div class="meta-value">R ${payrollInfo.finalSalary.toLocaleString()}</div>
                </div>
            </div>
            
            <div class="employee-actions">
                <button class="btn btn-outline btn-sm" onclick="viewAttendance(${employee.id})">
                    <i class="fas fa-calendar-check"></i>
                    Attendance
                </button>
                <button class="btn btn-outline btn-sm" onclick="viewDetails(${employee.id})">
                    <i class="fas fa-user"></i>
                    Details
                </button>
                <button class="btn btn-primary btn-sm" onclick="requestLeaveForEmployee(${employee.id})">
                    <i class="fas fa-calendar-plus"></i>
                    Leave
                </button>
            </div>
        </div>
    `;
}

function renderLeaveRequests() {
    const container = document.getElementById('leaveRequestsList');
    if (!container) {
        console.error('Leave requests container not found!');
        return;
    }
    
    // Get all pending leave requests
    let allLeaveRequests = [];
    attendanceData.attendanceAndLeave.forEach(att => {
        att.leaveRequests.forEach(req => {
            if (req.status === 'Pending') {
                allLeaveRequests.push({
                    employeeId: att.employeeId,
                    employeeName: att.name,
                    ...req
                });
            }
        });
    });
    
    if (allLeaveRequests.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-calendar-check"></i>
                <p>No pending leave requests</p>
            </div>
        `;
        return;
    }
    
    // Show only recent 3 requests
    const recentRequests = allLeaveRequests.slice(0, 3);
    container.innerHTML = recentRequests.map(request => createLeaveRequestItem(request)).join('');
}

function createLeaveRequestItem(request) {
    const initials = request.employeeName.split(' ').map(n => n[0]).join('').toUpperCase();
    const statusClass = `status-${request.status.toLowerCase()}`;
    
    return `
        <div class="leave-request-item" data-id="${request.employeeId}">
            <div class="leave-request-header">
                <div class="request-employee">
                    <div class="request-avatar">
                        ${initials}
                    </div>
                    <div class="request-info">
                        <div class="request-name">${request.employeeName}</div>
                        <div class="request-dept">${getEmployeeDepartment(request.employeeId)}</div>
                    </div>
                </div>
                <div class="request-status ${statusClass}">
                    ${request.status}
                </div>
            </div>
            
            <div class="request-details">
                <div class="request-detail">
                    <div class="detail-label">Type</div>
                    <div class="detail-value">
                        <i class="fas fa-${getLeaveTypeIcon(request.reason)}"></i>
                        ${request.reason}
                    </div>
                </div>
                <div class="request-detail">
                    <div class="detail-label">Date</div>
                    <div class="detail-value">${formatDate(request.date)}</div>
                </div>
            </div>
            
            <div class="request-actions">
                <button class="btn btn-success btn-sm" onclick="approveLeaveRequest(${request.employeeId}, '${request.date}')">
                    <i class="fas fa-check"></i>
                    Approve
                </button>
                <button class="btn btn-danger btn-sm" onclick="rejectLeaveRequest(${request.employeeId}, '${request.date}')">
                    <i class="fas fa-times"></i>
                    Reject
                </button>
            </div>
        </div>
    `;
}

function renderPayrollSummary() {
    const container = document.getElementById('payrollSummary');
    if (!container) {
        console.error('Payroll summary container not found!');
        return;
    }
    
    // Calculate total payroll
    const totalPayroll = payrollData.payrollData.reduce((total, pay) => total + pay.finalSalary, 0);
    const avgSalary = Math.round(totalPayroll / payrollData.payrollData.length);
    
    container.innerHTML = `
        <div style="text-align: center; padding: 16px;">
            <div style="font-size: 32px; font-weight: 700; color: var(--primary-600); margin-bottom: 8px;">
                R ${totalPayroll.toLocaleString()}
            </div>
            <div style="font-size: 14px; color: var(--gray-600); margin-bottom: 16px;">
                Total Monthly Payroll
            </div>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
                <div style="background: var(--gray-50); padding: 12px; border-radius: 8px;">
                    <div style="font-size: 12px; color: var(--gray-500);">Avg Salary</div>
                    <div style="font-size: 16px; font-weight: 600; color: var(--gray-800);">R ${avgSalary.toLocaleString()}</div>
                </div>
                <div style="background: var(--gray-50); padding: 12px; border-radius: 8px;">
                    <div style="font-size: 12px; color: var(--gray-500);">Employees</div>
                    <div style="font-size: 16px; font-weight: 600; color: var(--gray-800);">${employees.length}</div>
                </div>
            </div>
            <button class="btn btn-outline btn-sm" onclick="viewPayroll()" style="margin-top: 16px; width: 100%;">
                <i class="fas fa-eye"></i>
                View Full Report
            </button>
        </div>
    `;
}

function renderRecentAttendance() {
    const container = document.getElementById('recentAttendance');
    if (!container) {
        console.error('Recent attendance container not found!');
        return;
    }
    
    // Get recent attendance for 3 employees
    const recentEmployees = employees.slice(0, 3);
    
    container.innerHTML = recentEmployees.map(employee => {
        const att = attendance[employee.id];
        const recentDays = att ? att.attendance.slice(-3) : [];
        const presentCount = recentDays.filter(d => d.status === 'Present').length;
        
        return `
            <div class="holiday-item">
                <div class="holiday-date">
                    <span class="holiday-day">${presentCount}</span>
                    <span class="holiday-month">/3</span>
                </div>
                <div class="holiday-details">
                    <div class="holiday-name">${employee.firstName} ${employee.lastName[0]}.</div>
                    <div class="holiday-type">${employee.department}</div>
                </div>
                <div class="holiday-status">
                    <span class="badge badge-outline">${Math.round((presentCount / 3) * 100)}%</span>
                </div>
            </div>
        `;
    }).join('');
}

function populateEmployeeSelect() {
    const select = document.getElementById('leaveEmployee');
    if (!select) {
        console.error('Leave employee select not found!');
        return;
    }
    
    select.innerHTML = '<option value="">Select Employee</option>' +
        employees.map(emp => 
            `<option value="${emp.id}">${emp.fullName} - ${emp.department}</option>`
        ).join('');
}

function updateStats() {
    const totalEmployeesEl = document.getElementById('totalEmployees');
    const activeNowEl = document.getElementById('activeNow');
    const onLeaveEl = document.getElementById('onLeave');
    const totalSalaryEl = document.getElementById('totalSalary');
    
    if (totalEmployeesEl) totalEmployeesEl.textContent = employees.length;
    
    // Calculate active today based on attendance
    const today = new Date().toISOString().split('T')[0];
    let activeToday = 0;
    
    attendanceData.attendanceAndLeave.forEach(att => {
        const todayAttendance = att.attendance.find(a => a.date === today);
        if (todayAttendance && todayAttendance.status === 'Present') {
            activeToday++;
        }
    });
    
    if (activeNowEl) activeNowEl.textContent = activeToday;
    
    // Calculate on leave (has approved leave for today)
    let onLeaveCount = 0;
    attendanceData.attendanceAndLeave.forEach(att => {
        const todayLeave = att.leaveRequests.find(req => 
            req.date === today && req.status === 'Approved'
        );
        if (todayLeave) onLeaveCount++;
    });
    
    if (onLeaveEl) onLeaveEl.textContent = onLeaveCount;
    
    // Calculate total payroll
    const totalPayroll = payrollData.payrollData.reduce((total, pay) => total + pay.finalSalary, 0);
    if (totalSalaryEl) totalSalaryEl.textContent = 'R ' + totalPayroll.toLocaleString();
    
    // Update filter counts
    updateFilterCounts();
}

function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearBtn');
    const searchBtn = document.getElementById('searchBtn');
    const filterBtn = document.getElementById('filterBtn');
    const resetFiltersBtn = document.getElementById('resetFiltersBtn');
    const addEmployeeBtn = document.getElementById('addEmployeeBtn');
    const requestLeaveBtn = document.getElementById('requestLeaveBtn');
    const viewPayrollBtn = document.getElementById('viewPayrollBtn');
    const filterChips = document.querySelectorAll('.filter-chip');
    const viewBtns = document.querySelectorAll('.view-btn');
    const sortSelect = document.getElementById('sortSelect');

    // Search input events
    if (searchInput && clearBtn) {
        searchInput.addEventListener('input', function(e) {
            const hasValue = e.target.value.trim().length > 0;
            clearBtn.classList.toggle('visible', hasValue);
        });

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            if (searchInput) searchInput.value = '';
            clearBtn.classList.remove('visible');
            currentSearch = '';
            renderEmployees();
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }

    // Filter toggle
    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            const filtersPanel = document.getElementById('filtersPanel');
            if (filtersPanel) {
                filtersPanel.classList.toggle('hidden');
                filterBtn.innerHTML = filtersPanel.classList.contains('hidden') ? 
                    '<i class="fas fa-sliders-h"></i><span>Show Filters</span>' : 
                    '<i class="fas fa-times"></i><span>Hide Filters</span>';
            }
        });
    }

    // Filter chips
    filterChips.forEach(chip => {
        chip.addEventListener('click', function() {
            // Remove active class from all chips
            filterChips.forEach(c => c.classList.remove('active'));
            // Add active class to clicked chip
            this.classList.add('active');
            
            currentFilter = this.dataset.dept;
            renderEmployees();
        });
    });

    // Reset filters
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', function() {
            filterChips.forEach(chip => chip.classList.remove('active'));
            const allChip = document.querySelector('.filter-chip[data-dept="all"]');
            if (allChip) allChip.classList.add('active');
            if (searchInput) searchInput.value = '';
            if (clearBtn) clearBtn.classList.remove('visible');
            currentFilter = 'all';
            currentSearch = '';
            renderEmployees();
        });
    }

    // Sort select
    if (sortSelect) {
        sortSelect.addEventListener('change', function(e) {
            currentSort = e.target.value;
            renderEmployees();
        });
    }

    // View toggle
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentView = this.dataset.view;
            updateViewMode();
        });
    });

    // Add employee button
    if (addEmployeeBtn) {
        addEmployeeBtn.addEventListener('click', function() {
            openModal('addEmployeeModal');
            resetForm('addEmployeeForm');
        });
    }

    // Request leave button
    if (requestLeaveBtn) {
        requestLeaveBtn.addEventListener('click', function() {
            openModal('requestLeaveModal');
            resetForm('requestLeaveForm');
            
            // Set default date to tomorrow
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const leaveDateInput = document.getElementById('leaveDate');
            if (leaveDateInput) {
                leaveDateInput.value = formatDateForInput(tomorrow);
            }
        });
    }

    // View payroll button
    if (viewPayrollBtn) {
        viewPayrollBtn.addEventListener('click', viewPayroll);
    }
    
    // Modal close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal-overlay');
            if (modal) {
                closeModal(modal.id);
            }
        });
    });
}

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        currentSearch = searchInput.value.trim();
        renderEmployees();
    }
}

function updateViewMode() {
    const container = document.getElementById('employeeList');
    if (!container) return;
    
    container.classList.toggle('list-view', currentView === 'list');
    container.classList.toggle('employees-grid', currentView === 'grid');
    
    if (currentView === 'list') {
        container.style.gridTemplateColumns = '1fr';
    } else {
        container.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
    }
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function resetForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.reset();
        // Clear all error messages
        const errors = form.querySelectorAll('.form-error');
        errors.forEach(error => {
            error.classList.remove('visible');
        });
    }
}

// Utility functions
function getEmployeeStatus(employeeId) {
    const att = attendance[employeeId];
    if (!att) return 'available';
    
    // Check if employee has approved leave for today
    const today = new Date().toISOString().split('T')[0];
    const todayLeave = att.leaveRequests.find(req => 
        req.date === today && req.status === 'Approved'
    );
    
    if (todayLeave) return 'on-leave';
    
    // Check attendance for today
    const todayAttendance = att.attendance.find(a => a.date === today);
    if (todayAttendance) {
        return todayAttendance.status === 'Present' ? 'available' : 'away';
    }
    
    return 'available';
}

function getStatusText(status) {
    const statusMap = {
        'available': 'Available',
        'away': 'Away',
        'busy': 'Busy',
        'on-leave': 'On Leave'
    };
    return statusMap[status] || status;
}

function getStatusIcon(status) {
    const iconMap = {
        'available': 'check-circle',
        'away': 'clock',
        'busy': 'ban',
        'on-leave': 'umbrella-beach'
    };
    return iconMap[status] || 'circle';
}

function getDepartmentIcon(department) {
    const iconMap = {
        'Development': 'code',
        'HR': 'users',
        'QA': 'check-circle',
        'Sales': 'chart-line',
        'Marketing': 'bullhorn',
        'Design': 'paint-brush',
        'IT': 'server',
        'Finance': 'chart-pie',
        'Support': 'headset'
    };
    return iconMap[department] || 'building';
}

function getLeaveTypeIcon(reason) {
    const iconMap = {
        'Sick Leave': 'heartbeat',
        'Vacation': 'umbrella-beach',
        'Personal': 'user',
        'Family Responsibility': 'users',
        'Medical Appointment': 'stethoscope',
        'Bereavement': 'heart',
        'Childcare': 'baby'
    };
    return iconMap[reason] || 'calendar-alt';
}

function getEmployeeDepartment(employeeId) {
    const employee = employees.find(emp => emp.id === employeeId);
    return employee ? employee.department : 'Unknown';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

function formatDateForInput(date) {
    return date.toISOString().split('T')[0];
}

// Action functions (exposed globally)
window.viewAttendance = function(employeeId) {
    const employee = employees.find(emp => emp.id === employeeId);
    const att = attendance[employeeId];
    
    if (!employee || !att) {
        showNotification('No attendance data found for this employee.', 'error');
        return;
    }
    
    let attendanceHtml = '<div class="attendance-grid">';
    att.attendance.forEach(day => {
        attendanceHtml += `
            <div class="attendance-day ${day.status === 'Present' ? 'attendance-present' : 'attendance-absent'}">
                <div class="attendance-date">${formatDate(day.date).split(' ')[1]}</div>
                <div class="attendance-status">${day.status}</div>
            </div>
        `;
    });
    attendanceHtml += '</div>';
    
    alert(`Attendance for ${employee.fullName}:\n\n${att.attendance.map(d => 
        `${formatDate(d.date)}: ${d.status}`
    ).join('\n')}`);
};

window.viewDetails = function(employeeId) {
    const employee = employees.find(emp => emp.id === employeeId);
    const att = attendance[employeeId];
    const pay = payroll[employeeId];
    
    if (!employee) return;
    
    let details = `
        Employee Details:
        Name: ${employee.fullName}
        Position: ${employee.position}
        Department: ${employee.department}
        Email: ${employee.email}
        Salary: R ${employee.salary.toLocaleString()}
        History: ${employee.employmentHistory}
    `;
    
    if (pay) {
        details += `\n\nPayroll Info:\nHours Worked: ${pay.hoursWorked}\nLeave Deductions: ${pay.leaveDeductions}\nFinal Salary: R ${pay.finalSalary.toLocaleString()}`;
    }
    
    alert(details);
};

window.requestLeaveForEmployee = function(employeeId) {
    openModal('requestLeaveModal');
    resetForm('requestLeaveForm');
    
    // Pre-select the employee
    const leaveEmployeeSelect = document.getElementById('leaveEmployee');
    if (leaveEmployeeSelect) {
        leaveEmployeeSelect.value = employeeId;
    }
    
    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const leaveDateInput = document.getElementById('leaveDate');
    if (leaveDateInput) {
        leaveDateInput.value = formatDateForInput(tomorrow);
    }
};

window.approveLeaveRequest = function(employeeId, date) {
    // Find and update the leave request
    const employeeAtt = attendanceData.attendanceAndLeave.find(att => att.employeeId === employeeId);
    if (employeeAtt) {
        const request = employeeAtt.leaveRequests.find(req => req.date === date);
        if (request) {
            request.status = 'Approved';
            showNotification(`Leave request approved for ${employeeAtt.name}`, 'success');
            renderLeaveRequests();
            updateStats();
        }
    }
};

window.rejectLeaveRequest = function(employeeId, date) {
    // Find and update the leave request
    const employeeAtt = attendanceData.attendanceAndLeave.find(att => att.employeeId === employeeId);
    if (employeeAtt) {
        const request = employeeAtt.leaveRequests.find(req => req.date === date);
        if (request) {
            request.status = 'Denied';
            showNotification(`Leave request denied for ${employeeAtt.name}`, 'warning');
            renderLeaveRequests();
        }
    }
};

window.viewPayroll = function() {
    openModal('viewPayrollModal');
    
    const container = document.getElementById('payrollDetails');
    if (!container) return;
    
    let payrollHtml = `
        <div style="margin-bottom: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                <div>
                    <h3 style="font-size: 18px; margin-bottom: 4px;">July 2024 Payroll</h3>
                    <p style="color: var(--gray-600); font-size: 14px;">Total: R ${payrollData.payrollData.reduce((total, pay) => total + pay.finalSalary, 0).toLocaleString()}</p>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 12px; color: var(--gray-500);">Employees</div>
                    <div style="font-size: 16px; font-weight: 600;">${employees.length}</div>
                </div>
            </div>
        </div>
    `;
    
    payrollData.payrollData.forEach(pay => {
        const employee = employees.find(emp => emp.id === pay.employeeId);
        if (employee) {
            payrollHtml += `
                <div class="payroll-item">
                    <div class="payroll-employee">
                        <div class="payroll-avatar">
                            ${employee.firstName[0]}${employee.lastName[0]}
                        </div>
                        <div>
                            <div style="font-weight: 600;">${employee.fullName}</div>
                            <div style="font-size: 12px; color: var(--gray-500);">${employee.department}</div>
                        </div>
                    </div>
                    <div class="payroll-details">
                        <div>
                            <div class="payroll-value">${pay.hoursWorked}</div>
                            <div class="payroll-label">Hours</div>
                        </div>
                        <div>
                            <div class="payroll-value">${pay.leaveDeductions}</div>
                            <div class="payroll-label">Deductions</div>
                        </div>
                        <div>
                            <div class="payroll-value">R ${pay.finalSalary.toLocaleString()}</div>
                            <div class="payroll-label">Final Pay</div>
                        </div>
                    </div>
                </div>
            `;
        }
    });
    
    container.innerHTML = payrollHtml;
};

window.addNewEmployee = function() {
    // Get form values
    const fullName = document.getElementById('fullName')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const phone = document.getElementById('phone')?.value.trim();
    const position = document.getElementById('position')?.value.trim();
    const department = document.getElementById('department')?.value;
    const salary = parseInt(document.getElementById('salary')?.value) || 0;
    const employmentHistory = document.getElementById('employmentHistory')?.value.trim();

    // Validation
    if (!fullName || !email || !position || !department || !salary) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }

    // Create new employee
    const newId = Math.max(...employees.map(emp => emp.id)) + 1;
    const nameParts = fullName.split(' ');
    const newEmployee = {
        id: newId,
        firstName: nameParts[0],
        lastName: nameParts.slice(1).join(' '),
        fullName: fullName,
        email: email,
        phone: phone || 'Not specified',
        position: position,
        department: department,
        salary: salary,
        employmentHistory: employmentHistory || 'New employee',
        status: 'available',
        location: 'Johannesburg, SA',
        leaveBalance: { annual: 15, sick: 8, emergency: 5 }
    };

    // Add to employees array
    employees.push(newEmployee);
    
    // Add to attendance data
    attendanceData.attendanceAndLeave.push({
        employeeId: newId,
        name: fullName,
        attendance: [],
        leaveRequests: []
    });
    
    // Add to payroll data
    payrollData.payrollData.push({
        employeeId: newId,
        hoursWorked: 160,
        leaveDeductions: 0,
        finalSalary: salary
    });
    
    // Update data structures
    attendance[newId] = attendanceData.attendanceAndLeave.find(att => att.employeeId === newId);
    payroll[newId] = payrollData.payrollData.find(pay => pay.employeeId === newId);

    // Update UI
    renderEmployees();
    updateStats();
    
    // Update filter counts
    updateFilterCounts();
    
    // Update employee select in leave modal
    populateEmployeeSelect();
    
    // Close modal and show success message
    closeModal('addEmployeeModal');
    showNotification(`Successfully added ${fullName} to the team!`, 'success');
};

window.submitLeaveRequest = function() {
    // Get form values
    const employeeId = parseInt(document.getElementById('leaveEmployee')?.value);
    const leaveType = document.getElementById('leaveType')?.value;
    const leaveDate = document.getElementById('leaveDate')?.value;
    const reason = document.getElementById('leaveReason')?.value.trim();

    // Validation
    if (!employeeId || !leaveType || !leaveDate || !reason) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }

    // Get employee info
    const employee = employees.find(emp => emp.id === employeeId);
    if (!employee) {
        showNotification('Employee not found.', 'error');
        return;
    }

    // Create new leave request
    const employeeAtt = attendanceData.attendanceAndLeave.find(att => att.employeeId === employeeId);
    if (employeeAtt) {
        employeeAtt.leaveRequests.push({
            date: leaveDate,
            reason: leaveType.charAt(0).toUpperCase() + leaveType.slice(1) + (reason.toLowerCase().includes('leave') ? '' : ' Leave'),
            status: 'Pending'
        });
        
        // Update attendance data
        attendance[employeeId] = employeeAtt;
    }

    // Update UI
    renderLeaveRequests();
    updateStats();
    
    // Close modal and show success message
    closeModal('requestLeaveModal');
    showNotification('Leave request submitted successfully!', 'success');
};

function updateFilterCounts() {
    const counts = {
        'all': employees.length,
        'development': employees.filter(emp => emp.department === 'Development').length,
        'hr': employees.filter(emp => emp.department === 'HR').length,
        'qa': employees.filter(emp => emp.department === 'QA').length,
        'sales': employees.filter(emp => emp.department === 'Sales').length,
        'marketing': employees.filter(emp => emp.department === 'Marketing').length,
        'design': employees.filter(emp => emp.department === 'Design').length,
        'it': employees.filter(emp => emp.department === 'IT').length,
        'finance': employees.filter(emp => emp.department === 'Finance').length,
        'support': employees.filter(emp => emp.department === 'Support').length
    };

    // Update filter chip counts
    document.querySelectorAll('.filter-chip').forEach(chip => {
        const dept = chip.dataset.dept;
        if (counts[dept] !== undefined) {
            const countSpan = chip.querySelector('.filter-count');
            if (countSpan) {
                countSpan.textContent = counts[dept];
            }
        }
    });
}

window.resetSearch = function() {
    currentSearch = '';
    currentFilter = 'all';
    
    // Reset UI elements
    const searchInput = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearBtn');
    
    if (searchInput) searchInput.value = '';
    if (clearBtn) clearBtn.classList.remove('visible');
    
    document.querySelectorAll('.filter-chip').forEach(chip => chip.classList.remove('active'));
    const allChip = document.querySelector('.filter-chip[data-dept="all"]');
    if (allChip) allChip.classList.add('active');
    
    renderEmployees();
};

window.exportPayroll = function() {
    // Get all payroll data
    const payrollDetails = payrollData.payrollData;
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    
    // Create PDF content
    let pdfContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Payroll Report - ${dateStr}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; }
                .header { text-align: center; margin-bottom: 30px; }
                .company-name { font-size: 24px; font-weight: bold; color: #2563eb; }
                .report-title { font-size: 20px; margin: 10px 0; }
                .report-date { color: #666; margin-bottom: 20px; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th { background-color: #3b82f6; color: white; padding: 12px; text-align: left; }
                td { padding: 10px; border-bottom: 1px solid #ddd; }
                tr:hover { background-color: #f5f5f5; }
                .total-row { font-weight: bold; background-color: #f0f9ff; }
                .footer { margin-top: 40px; text-align: center; color: #666; font-size: 12px; }
                .summary { background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
                .summary-item { display: inline-block; margin-right: 40px; }
                .summary-label { font-size: 14px; color: #666; }
                .summary-value { font-size: 18px; font-weight: bold; color: #2563eb; }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="company-name">ModernTech Solutions</div>
                <div class="report-title">Monthly Payroll Report</div>
                <div class="report-date">Generated on: ${formatDate(dateStr)}</div>
            </div>
            
            <div class="summary">
                <div class="summary-item">
                    <div class="summary-label">Total Employees</div>
                    <div class="summary-value">${employees.length}</div>
                </div>
                <div class="summary-item">
                    <div class="summary-label">Total Payroll</div>
                    <div class="summary-value">R ${payrollDetails.reduce((total, pay) => total + pay.finalSalary, 0).toLocaleString()}</div>
                </div>
                <div class="summary-item">
                    <div class="summary-label">Average Salary</div>
                    <div class="summary-value">R ${Math.round(payrollDetails.reduce((total, pay) => total + pay.finalSalary, 0) / payrollDetails.length).toLocaleString()}</div>
                </div>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Hours Worked</th>
                        <th>Leave Deductions</th>
                        <th>Base Salary</th>
                        <th>Final Salary</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    // Add employee rows
    payrollDetails.forEach(pay => {
        const employee = employees.find(emp => emp.id === pay.employeeId);
        if (employee) {
            pdfContent += `
                <tr>
                    <td>${employee.id}</td>
                    <td>${employee.fullName}</td>
                    <td>${employee.department}</td>
                    <td>${pay.hoursWorked}</td>
                    <td>${pay.leaveDeductions}</td>
                    <td>R ${employee.salary.toLocaleString()}</td>
                    <td>R ${pay.finalSalary.toLocaleString()}</td>
                </tr>
            `;
        }
    });
    
    // Calculate totals
    const totalHours = payrollDetails.reduce((sum, pay) => sum + pay.hoursWorked, 0);
    const totalDeductions = payrollDetails.reduce((sum, pay) => sum + pay.leaveDeductions, 0);
    const totalBaseSalary = payrollDetails.reduce((sum, pay) => {
        const employee = employees.find(emp => emp.id === pay.employeeId);
        return sum + (employee ? employee.salary : 0);
    }, 0);
    const totalFinalSalary = payrollDetails.reduce((sum, pay) => sum + pay.finalSalary, 0);
    
    // Add total row
    pdfContent += `
                <tr class="total-row">
                    <td colspan="3">TOTALS</td>
                    <td>${totalHours}</td>
                    <td>${totalDeductions}</td>
                    <td>R ${totalBaseSalary.toLocaleString()}</td>
                    <td>R ${totalFinalSalary.toLocaleString()}</td>
                </tr>
            </tbody>
        </table>
        
        <div class="footer">
            <p>This report is generated by WorkSphere HR Management System</p>
            <p>Confidential - For Internal Use Only</p>
            <p>© ${today.getFullYear()} ModernTech Solutions. All rights reserved.</p>
        </div>
    </body>
    </html>
    `;
    
    // Open in new window for printing/download
    const printWindow = window.open('', '_blank');
    printWindow.document.write(pdfContent);
    printWindow.document.close();
    
    // Wait for content to load, then trigger print
    printWindow.onload = function() {
        printWindow.focus();
        showNotification('Payroll report generated. You can print it from the new window.', 'info');
    };
};

function setupLogout() {
    const userProfile = document.getElementById('userProfile');
    if (userProfile) {
        userProfile.addEventListener('click', function() {
            // Create logout dropdown
            const logoutMenu = document.createElement('div');
            logoutMenu.className = 'logout-menu';
            logoutMenu.innerHTML = `
                <button class="logout-btn" onclick="logout()">
                    <i class="fas fa-sign-out-alt"></i>
                    Logout
                </button>
            `;
            
            logoutMenu.style.cssText = `
                position: absolute;
                top: 70px;
                right: 20px;
                background: white;
                border: 1px solid var(--gray-200);
                border-radius: 8px;
                padding: 8px;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                z-index: 1000;
                min-width: 150px;
            `;
            
            // Remove existing menu if any
            document.querySelectorAll('.logout-menu').forEach(menu => menu.remove());
            
            userProfile.appendChild(logoutMenu);
            
            // Close menu when clicking outside
            setTimeout(() => {
                document.addEventListener('click', function closeMenu(e) {
                    if (!userProfile.contains(e.target) && !logoutMenu.contains(e.target)) {
                        logoutMenu.remove();
                        document.removeEventListener('click', closeMenu);
                    }
                });
            }, 0);
        });
    }
}

function logout() {
    localStorage.removeItem('workSphereSession');
    window.location.href = 'Login.html';
}

function showNotification(message, type = 'info') {
    // Create notification element if it doesn't exist
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        document.body.appendChild(notification);
    }
    
    // Set notification content and style
    const icon = type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle';
    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;
    
    // Apply styles
    const bgColor = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        z-index: 2000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Show notification
    notification.style.display = 'flex';
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Make logout globally available
window.logout = logout;

console.log('Admin Dashboard System Ready');