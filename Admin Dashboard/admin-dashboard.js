// admin-dashboard.js - UPDATED FOR INTEGRATION

console.log('Admin dashboard script loaded');

// Global data variables
window.employeeData = [];
window.attendanceData = [];
window.payrollData = [];

// Check authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Admin dashboard initializing...');
    
    // Check if user is logged in
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

async function initializeAdminDashboard() {
    console.log('Initializing admin dashboard...');
    
    // Set current date
    updateCurrentDate();
    
    // Initialize data
    await initializeData();
    
    // Initialize UI
    initializeUI();
    
    // Setup event listeners
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

// Use the JSON data from your files
async function initializeData() {
    try {
        console.log('Loading JSON data...');
        
        // Load JSON data
        const [employeeResponse, attendanceResponse, payrollResponse] = await Promise.all([
            fetch('employee_info.json'),
            fetch('attendance.json'),
            fetch('payroll_data.json')
        ]);
        
        if (!employeeResponse.ok || !attendanceResponse.ok || !payrollResponse.ok) {
            throw new Error('Failed to load data files');
        }
        
        const employeeInfo = await employeeResponse.json();
        const attendanceData = await attendanceResponse.json();
        const payrollData = await payrollResponse.json();
        
        // Store data globally
        window.employeeData = employeeInfo.employeeInformation;
        window.attendanceData = attendanceData.attendanceAndLeave;
        window.payrollData = payrollData.payrollData;
        
        console.log('Data loaded successfully:', {
            employees: window.employeeData.length,
            attendance: window.attendanceData.length,
            payroll: window.payrollData.length
        });
        
    } catch (error) {
        console.error('Error loading data files:', error);
        // Use the embedded data from your files as fallback
        useEmbeddedData();
    }
}

function useEmbeddedData() {
    console.log('Using embedded data...');
    
    // Employee data from employee_info.json
    window.employeeData = [
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
    ];
    
    // Attendance data from attendance.json
    window.attendanceData = [
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
    ];
    
    // Payroll data from payroll_data.json
    window.payrollData = [
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
    ];
    
    showNotification('Using embedded demo data', 'info');
}

function initializeUI() {
    // Update dashboard statistics
    updateDashboardStats();
    
    // Render employee list
    renderEmployees();
    
    // Render leave requests
    renderLeaveRequests();
    
    // Render payroll summary
    renderPayrollSummary();
    
    // Render recent attendance
    renderRecentAttendance();
    
    // Populate leave request modal
    populateLeaveRequestModal();
}

function updateDashboardStats() {
    // Update total employees
    document.getElementById('totalEmployees').textContent = window.employeeData.length;
    
    // Calculate active employees today (based on attendance data)
    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const activeToday = window.attendanceData.filter(emp => {
        const todayAttendance = emp.attendance.find(a => a.date === today);
        return todayAttendance && todayAttendance.status === 'Present';
    }).length;
    document.getElementById('activeNow').textContent = activeToday;
    
    // Calculate employees on leave (pending leave requests)
    const onLeave = window.attendanceData.reduce((total, emp) => {
        const pendingLeaves = emp.leaveRequests.filter(leave => leave.status === 'Pending');
        return total + pendingLeaves.length;
    }, 0);
    document.getElementById('onLeave').textContent = onLeave;
    
    // Calculate total monthly payroll
    const totalSalary = window.payrollData.reduce((total, payroll) => total + payroll.finalSalary, 0);
    document.getElementById('totalSalary').textContent = `R ${totalSalary.toLocaleString()}`;
}

function renderEmployees() {
    const employeeList = document.getElementById('employeeList');
    const resultsCount = document.getElementById('resultsCount');
    
    if (!employeeList) return;
    
    employeeList.innerHTML = '';
    
    if (window.employeeData.length === 0) {
        employeeList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-users"></i>
                <h3>No employees found</h3>
                <p>Add your first employee to get started.</p>
                <button class="btn btn-primary" onclick="openModal('addEmployeeModal')">
                    <i class="fas fa-user-plus"></i>
                    Add Employee
                </button>
            </div>
        `;
        if (resultsCount) resultsCount.textContent = '0';
        return;
    }
    
    // Sort employees (you can implement sorting logic here)
    const sortedEmployees = [...window.employeeData];
    
    sortedEmployees.forEach(employee => {
        // Get attendance data for this employee
        const attendance = window.attendanceData.find(a => a.employeeId === employee.employeeId);
        const payroll = window.payrollData.find(p => p.employeeId === employee.employeeId);
        
        // Calculate attendance rate
        let attendanceRate = 'N/A';
        if (attendance && attendance.attendance.length > 0) {
            const presentCount = attendance.attendance.filter(a => a.status === 'Present').length;
            attendanceRate = `${Math.round((presentCount / attendance.attendance.length) * 100)}%`;
        }
        
        // Get latest leave status
        let leaveStatus = 'Available';
        if (attendance && attendance.leaveRequests.length > 0) {
            const pendingLeaves = attendance.leaveRequests.filter(l => l.status === 'Pending');
            const approvedLeaves = attendance.leaveRequests.filter(l => l.status === 'Approved');
            if (pendingLeaves.length > 0) leaveStatus = 'Pending Leave';
            else if (approvedLeaves.length > 0) leaveStatus = 'On Leave';
        }
        
        const employeeCard = document.createElement('div');
        employeeCard.className = 'employee-card';
        employeeCard.innerHTML = `
            <div class="employee-header">
                <div class="employee-info">
                    <div class="employee-avatar">
                        ${getInitials(employee.name)}
                    </div>
                    <div class="employee-details">
                        <div class="employee-name">${employee.name}</div>
                        <div class="employee-title">${employee.position}</div>
                        <div class="employee-department">
                            <i class="fas fa-building"></i>
                            ${employee.department}
                        </div>
                    </div>
                </div>
                <div class="employee-status ${getStatusClass(leaveStatus)}">
                    <i class="fas fa-circle"></i>
                    ${leaveStatus}
                </div>
            </div>
            
            <div class="employee-meta">
                <div class="meta-item">
                    <span class="meta-label">Employee ID</span>
                    <span class="meta-value">${employee.employeeId}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Salary</span>
                    <span class="meta-value">R ${employee.salary.toLocaleString()}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Attendance</span>
                    <span class="meta-value">${attendanceRate}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Hours Worked</span>
                    <span class="meta-value">${payroll ? payroll.hoursWorked : 'N/A'}</span>
                </div>
            </div>
            
            <div class="employee-actions">
                <button class="btn btn-outline btn-sm" onclick="viewEmployeeDetails(${employee.employeeId})">
                    <i class="fas fa-eye"></i>
                    View
                </button>
                <button class="btn btn-outline btn-sm" onclick="editEmployee(${employee.employeeId})">
                    <i class="fas fa-edit"></i>
                    Edit
                </button>
                <button class="btn btn-outline btn-sm" onclick="manageAttendance(${employee.employeeId})">
                    <i class="fas fa-calendar-check"></i>
                    Attendance
                </button>
            </div>
        `;
        
        employeeList.appendChild(employeeCard);
    });
    
    if (resultsCount) resultsCount.textContent = window.employeeData.length.toString();
}

function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
}

function getStatusClass(status) {
    switch(status.toLowerCase()) {
        case 'available':
            return 'status-available';
        case 'on leave':
            return 'status-on-leave';
        case 'pending leave':
            return 'status-away';
        case 'busy':
            return 'status-busy';
        default:
            return 'status-available';
    }
}

function renderLeaveRequests() {
    const leaveRequestsList = document.getElementById('leaveRequestsList');
    if (!leaveRequestsList) return;
    
    leaveRequestsList.innerHTML = '';
    
    // Collect all leave requests from all employees
    const allLeaveRequests = [];
    window.attendanceData.forEach(employee => {
        employee.leaveRequests.forEach(request => {
            allLeaveRequests.push({
                ...request,
                employeeId: employee.employeeId,
                employeeName: employee.name,
                department: window.employeeData.find(e => e.employeeId === employee.employeeId)?.department || 'N/A'
            });
        });
    });
    
    // Sort by date (most recent first)
    allLeaveRequests.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Display only pending requests in sidebar
    const pendingRequests = allLeaveRequests.filter(req => req.status === 'Pending');
    
    if (pendingRequests.length === 0) {
        leaveRequestsList.innerHTML = `
            <div class="empty-state" style="padding: 1rem;">
                <i class="fas fa-check-circle" style="font-size: 1.5rem;"></i>
                <h3 style="font-size: 0.875rem;">No pending requests</h3>
                <p style="font-size: 0.75rem;">All leave requests have been processed.</p>
            </div>
        `;
        return;
    }
    
    // Display up to 3 pending requests
    const displayRequests = pendingRequests.slice(0, 3);
    
    displayRequests.forEach(request => {
        const requestItem = document.createElement('div');
        requestItem.className = 'leave-request-item';
        requestItem.innerHTML = `
            <div class="leave-request-header">
                <div class="request-employee">
                    <div class="request-avatar">
                        ${getInitials(request.employeeName)}
                    </div>
                    <div class="request-info">
                        <div class="request-name">${request.employeeName}</div>
                        <div class="request-dept">${request.department}</div>
                    </div>
                </div>
                <div class="request-status ${request.status.toLowerCase()}">
                    ${request.status}
                </div>
            </div>
            
            <div class="request-details">
                <div class="request-detail">
                    <span class="detail-label">Date</span>
                    <span class="detail-value">
                        <i class="fas fa-calendar"></i>
                        ${formatDate(request.date)}
                    </span>
                </div>
                <div class="request-detail">
                    <span class="detail-label">Type</span>
                    <span class="detail-value">
                        <i class="fas fa-umbrella-beach"></i>
                        ${request.reason}
                    </span>
                </div>
            </div>
            
            <div class="request-actions">
                <button class="btn btn-success btn-sm" onclick="approveLeaveRequest(${request.employeeId}, '${request.date}')">
                    <i class="fas fa-check"></i>
                    Approve
                </button>
                <button class="btn btn-danger btn-sm" onclick="denyLeaveRequest(${request.employeeId}, '${request.date}')">
                    <i class="fas fa-times"></i>
                    Deny
                </button>
            </div>
        `;
        
        leaveRequestsList.appendChild(requestItem);
    });
}

function renderPayrollSummary() {
    const payrollSummary = document.getElementById('payrollSummary');
    if (!payrollSummary) return;
    
    // Calculate totals
    const totalSalary = window.payrollData.reduce((sum, p) => sum + p.finalSalary, 0);
    const avgSalary = totalSalary / window.payrollData.length;
    const totalHours = window.payrollData.reduce((sum, p) => sum + p.hoursWorked, 0);
    const avgHours = totalHours / window.payrollData.length;
    
    payrollSummary.innerHTML = `
        <div style="text-align: center; padding: 1rem;">
            <div style="font-size: 2rem; font-weight: 700; color: var(--primary-600); margin-bottom: 0.5rem;">
                R ${totalSalary.toLocaleString()}
            </div>
            <div style="font-size: 0.875rem; color: var(--gray-500); margin-bottom: 1.5rem;">
                Total Monthly Payroll
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
                <div>
                    <div style="font-size: 1rem; font-weight: 600; color: var(--gray-800);">
                        R ${Math.round(avgSalary).toLocaleString()}
                    </div>
                    <div style="font-size: 0.75rem; color: var(--gray-500);">
                        Avg. Salary
                    </div>
                </div>
                <div>
                    <div style="font-size: 1rem; font-weight: 600; color: var(--gray-800);">
                        ${Math.round(avgHours)}
                    </div>
                    <div style="font-size: 0.75rem; color: var(--gray-500);">
                        Avg. Hours
                    </div>
                </div>
            </div>
            
            <button class="btn btn-primary btn-block" onclick="openModal('viewPayrollModal')">
                <i class="fas fa-chart-bar"></i>
                View Details
            </button>
        </div>
    `;
}

function renderRecentAttendance() {
    const recentAttendance = document.getElementById('recentAttendance');
    if (!recentAttendance) return;
    
    recentAttendance.innerHTML = '';
    
    // Get today's attendance for all employees
    const today = new Date().toISOString().split('T')[0];
    
    window.attendanceData.forEach(employee => {
        const todayAttendance = employee.attendance.find(a => a.date === today);
        if (todayAttendance) {
            const attendanceItem = document.createElement('div');
            attendanceItem.className = 'holiday-item';
            attendanceItem.innerHTML = `
                <div class="holiday-date">
                    <div class="holiday-day">${new Date(today).getDate()}</div>
                    <div class="holiday-month">${new Date(today).toLocaleString('default', { month: 'short' })}</div>
                </div>
                <div class="holiday-details">
                    <div class="holiday-name">${employee.name}</div>
                    <div class="holiday-type">${employee.department}</div>
                </div>
                <div class="holiday-status">
                    <span class="badge ${todayAttendance.status === 'Present' ? 'status-available' : 'status-busy'}">
                        ${todayAttendance.status}
                    </span>
                </div>
            `;
            recentAttendance.appendChild(attendanceItem);
        }
    });
    
    // If no attendance for today, show a message
    if (recentAttendance.children.length === 0) {
        recentAttendance.innerHTML = `
            <div class="empty-state" style="padding: 1rem;">
                <i class="fas fa-calendar" style="font-size: 1.5rem;"></i>
                <h3 style="font-size: 0.875rem;">No attendance today</h3>
                <p style="font-size: 0.75rem;">Check back later for attendance updates.</p>
            </div>
        `;
    }
}

function populateLeaveRequestModal() {
    const leaveEmployeeSelect = document.getElementById('leaveEmployee');
    if (!leaveEmployeeSelect) return;
    
    leaveEmployeeSelect.innerHTML = '<option value="">Select Employee</option>';
    
    window.employeeData.forEach(employee => {
        const option = document.createElement('option');
        option.value = employee.employeeId;
        option.textContent = `${employee.name} (${employee.department})`;
        leaveEmployeeSelect.appendChild(option);
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const clearBtn = document.getElementById('clearBtn');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            clearBtn.classList.toggle('visible', this.value.length > 0);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchEmployees();
            }
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', searchEmployees);
    }
    
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            searchInput.value = '';
            this.classList.remove('visible');
            searchEmployees();
        });
    }
    
    // Filter buttons
    const filterBtn = document.getElementById('filterBtn');
    const filterChips = document.querySelectorAll('.filter-chip');
    const resetFiltersBtn = document.getElementById('resetFiltersBtn');
    
    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            const filtersPanel = document.getElementById('filtersPanel');
            filtersPanel.classList.toggle('hidden');
        });
    }
    
    filterChips.forEach(chip => {
        chip.addEventListener('click', function() {
            const dept = this.dataset.dept;
            filterEmployeesByDepartment(dept);
            
            // Update active state
            filterChips.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', function() {
            filterEmployeesByDepartment('all');
            filterChips.forEach(c => c.classList.remove('active'));
            document.querySelector('[data-dept="all"]').classList.add('active');
        });
    }
    
    // Sort functionality
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', sortEmployees);
    }
    
    // View toggle
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.dataset.view;
            toggleView(view);
            
            viewButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Modal open buttons
    const addEmployeeBtn = document.getElementById('addEmployeeBtn');
    const requestLeaveBtn = document.getElementById('requestLeaveBtn');
    const viewPayrollBtn = document.getElementById('viewPayrollBtn');
    const viewAllLeaveBtn = document.getElementById('viewAllLeaveBtn');
    
    if (addEmployeeBtn) {
        addEmployeeBtn.addEventListener('click', () => openModal('addEmployeeModal'));
    }
    
    if (requestLeaveBtn) {
        requestLeaveBtn.addEventListener('click', () => openModal('requestLeaveModal'));
    }
    
    if (viewPayrollBtn) {
        viewPayrollBtn.addEventListener('click', () => openModal('viewPayrollModal'));
    }
    
    if (viewAllLeaveBtn) {
        viewAllLeaveBtn.addEventListener('click', () => viewAllLeaveRequests());
    }
}

function searchEmployees() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const employeeList = document.getElementById('employeeList');
    const resultsCount = document.getElementById('resultsCount');
    
    if (!searchTerm) {
        renderEmployees();
        return;
    }
    
    const filteredEmployees = window.employeeData.filter(employee => 
        employee.name.toLowerCase().includes(searchTerm) ||
        employee.position.toLowerCase().includes(searchTerm) ||
        employee.department.toLowerCase().includes(searchTerm) ||
        employee.contact.toLowerCase().includes(searchTerm)
    );
    
    // Clear current list
    employeeList.innerHTML = '';
    
    if (filteredEmployees.length === 0) {
        employeeList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>No results found</h3>
                <p>Try searching with different keywords.</p>
                <button class="btn btn-outline" onclick="clearSearch()">
                    <i class="fas fa-times"></i>
                    Clear Search
                </button>
            </div>
        `;
        if (resultsCount) resultsCount.textContent = '0';
        return;
    }
    
    // Render filtered employees
    filteredEmployees.forEach(employee => {
        // Similar card creation logic as renderEmployees()
        // ... (copy from renderEmployees() but with filtered list)
    });
    
    if (resultsCount) resultsCount.textContent = filteredEmployees.length.toString();
}

function filterEmployeesByDepartment(dept) {
    const employeeList = document.getElementById('employeeList');
    const resultsCount = document.getElementById('resultsCount');
    
    if (dept === 'all') {
        renderEmployees();
        return;
    }
    
    const filteredEmployees = window.employeeData.filter(employee => 
        employee.department.toLowerCase().includes(dept.toLowerCase())
    );
    
    // Similar rendering logic as searchEmployees()
    // ... (copy from searchEmployees() but with department filter)
}

function sortEmployees() {
    const sortValue = document.getElementById('sortSelect').value;
    const sortedEmployees = [...window.employeeData];
    
    switch(sortValue) {
        case 'name-asc':
            sortedEmployees.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            sortedEmployees.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'dept-asc':
            sortedEmployees.sort((a, b) => a.department.localeCompare(b.department));
            break;
        case 'dept-desc':
            sortedEmployees.sort((a, b) => b.department.localeCompare(a.department));
            break;
        case 'salary-high':
            sortedEmployees.sort((a, b) => b.salary - a.salary);
            break;
        case 'salary-low':
            sortedEmployees.sort((a, b) => a.salary - b.salary);
            break;
    }
    
    window.employeeData = sortedEmployees;
    renderEmployees();
}

function toggleView(view) {
    const employeeList = document.getElementById('employeeList');
    if (view === 'list') {
        employeeList.classList.add('list-view');
    } else {
        employeeList.classList.remove('list-view');
    }
}

function setupLogout() {
    const userProfile = document.getElementById('userProfile');
    if (!userProfile) return;
    
    userProfile.addEventListener('click', function(e) {
        e.stopPropagation();
        const logoutMenu = document.querySelector('.logout-menu');
        if (logoutMenu) {
            logoutMenu.remove();
            return;
        }
        
        const menu = document.createElement('div');
        menu.className = 'logout-menu';
        menu.innerHTML = `
            <button class="logout-btn" onclick="logout()">
                <i class="fas fa-sign-out-alt"></i>
                Logout
            </button>
        `;
        
        this.appendChild(menu);
        
        // Close menu when clicking outside
        setTimeout(() => {
            document.addEventListener('click', function closeMenu(e) {
                if (!userProfile.contains(e.target)) {
                    menu.remove();
                    document.removeEventListener('click', closeMenu);
                }
            });
        }, 0);
    });
}

function logout() {
    localStorage.removeItem('workSphereSession');
    window.location.href = 'Login.html';
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

function addNewEmployee() {
    // Implementation for adding new employee
    showNotification('New employee added successfully!', 'success');
    closeModal('addEmployeeModal');
}

function submitLeaveRequest() {
    // Implementation for submitting leave request
    showNotification('Leave request submitted successfully!', 'success');
    closeModal('requestLeaveModal');
}

function viewAllLeaveRequests() {
    // Implementation for viewing all leave requests
    showNotification('Opening all leave requests...', 'info');
}

function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    if (!notification) {
        // Create notification element if it doesn't exist
        const notificationEl = document.createElement('div');
        notificationEl.id = 'notification';
        document.body.appendChild(notificationEl);
    }
    
    const notificationEl = document.getElementById('notification');
    notificationEl.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    notificationEl.style.background = type === 'success' ? 'var(--success-500)' : 'var(--primary-500)';
    notificationEl.style.display = 'flex';
    
    setTimeout(() => {
        notificationEl.style.display = 'none';
    }, 3000);
}

// Export this file as admin-dashboard.js