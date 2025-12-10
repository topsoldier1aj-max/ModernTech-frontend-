// employee-dashboard.js - COMPLETE VERSION WITH LINKING

console.log('Employee dashboard script loaded');

// Authentication check - RUNS FIRST
document.addEventListener('DOMContentLoaded', function() {
    console.log('Employee dashboard initializing...');
    
    // Check authentication using global Auth object from login.js
    if (!window.Auth || !window.Auth.requireAuth('employee')) {
        return;
    }
    
    // Get current user
    const user = window.Auth.getCurrentUser();
    if (!user) return;
    
    console.log('User authenticated:', user.name);
    
    // Update UI with user info
    updateUserInfo(user);
    
    // Initialize the dashboard
    initializeEmployeeDashboard(user);
});

function updateUserInfo(user) {
    // Update welcome message
    const welcomeName = document.getElementById('welcomeName');
    const userName = document.getElementById('userName');
    const userAvatar = document.getElementById('userAvatar');
    const userRole = document.getElementById('userRole');
    
    if (user.name) {
        const firstName = user.name.split(' ')[0];
        if (welcomeName) welcomeName.textContent = firstName;
        if (userName) userName.textContent = user.name;
        
        // Update avatar initials
        if (userAvatar) {
            const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();
            userAvatar.textContent = initials.substring(0, 2);
        }
    }
    
    // Update role if available
    if (user.position && userRole) {
        userRole.textContent = user.position;
    }
    
    // Store current user for later use
    window.currentUser = user;
}

function initializeEmployeeDashboard(user) {
    console.log('Initializing dashboard for user:', user.name);
    
    // Set current date
    updateCurrentDate();
    
    // Initialize stats with demo data
    initStats();
    
    // Initialize modals
    initModals();
    
    // Set up event listeners
    setupEventListeners();
    
    // Setup logout functionality
    setupLogout();
    
    // Show welcome notification
    showNotification(`Welcome back, ${user.name}!`, 'success');
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

function initStats() {
    // Demo data - in a real app, this would come from an API
    const stats = {
        daysPresent: 21,
        leaveBalance: 12,
        monthlySalary: 'R 65,000',
        hoursWorked: 168
    };
    
    Object.keys(stats).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = stats[key];
        }
    });
}

function initModals() {
    // Set default dates in leave request modal
    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');
    const daysCount = document.getElementById('daysCount');
    
    if (startDate && endDate && daysCount) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        startDate.value = formatDateForInput(tomorrow);
        endDate.value = formatDateForInput(tomorrow);
        
        // Calculate days when dates change
        [startDate, endDate].forEach(input => {
            input.addEventListener('change', calculateDays);
        });
        
        function calculateDays() {
            if (startDate.value && endDate.value) {
                const start = new Date(startDate.value);
                const end = new Date(endDate.value);
                const diffTime = Math.abs(end - start);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                daysCount.value = diffDays;
            }
        }
        
        // Initial calculation
        calculateDays();
    }
}

function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Quick Action buttons
    const requestLeaveBtn = document.getElementById('requestLeaveBtn');
    const updateProfileBtn = document.getElementById('updateProfileBtn');
    const scheduleLeaveBtn = document.getElementById('scheduleLeaveBtn');
    const viewPayslipBtn = document.getElementById('viewPayslipBtn');
    const viewScheduleBtn = document.getElementById('viewScheduleBtn');
    const reportIssueBtn = document.getElementById('reportIssueBtn');
    const companyDirectoryBtn = document.getElementById('companyDirectoryBtn');
    
    // Modal open handlers
    if (requestLeaveBtn) {
        requestLeaveBtn.addEventListener('click', () => openModal('leaveRequestModal'));
    }
    
    if (updateProfileBtn) {
        updateProfileBtn.addEventListener('click', () => openModal('profileUpdateModal'));
    }
    
    if (scheduleLeaveBtn) {
        scheduleLeaveBtn.addEventListener('click', () => openModal('leaveRequestModal'));
    }
    
    // Modal close handlers
    const closeLeaveModal = document.getElementById('closeLeaveModal');
    const closeProfileModal = document.getElementById('closeProfileModal');
    const cancelLeaveBtn = document.getElementById('cancelLeaveBtn');
    const cancelProfileBtn = document.getElementById('cancelProfileBtn');
    
    if (closeLeaveModal) {
        closeLeaveModal.addEventListener('click', () => closeModal('leaveRequestModal'));
    }
    
    if (closeProfileModal) {
        closeProfileModal.addEventListener('click', () => closeModal('profileUpdateModal'));
    }
    
    if (cancelLeaveBtn) {
        cancelLeaveBtn.addEventListener('click', () => closeModal('leaveRequestModal'));
    }
    
    if (cancelProfileBtn) {
        cancelProfileBtn.addEventListener('click', () => closeModal('profileUpdateModal'));
    }
    
    // Form submission handlers
    const submitLeaveBtn = document.getElementById('submitLeaveBtn');
    const saveProfileBtn = document.getElementById('saveProfileBtn');
    
    if (submitLeaveBtn) {
        submitLeaveBtn.addEventListener('click', submitLeaveRequest);
    }
    
    if (saveProfileBtn) {
        saveProfileBtn.addEventListener('click', saveProfileChanges);
    }
    
    // Other action buttons
    if (viewPayslipBtn) {
        viewPayslipBtn.addEventListener('click', () => {
            showNotification('Payslip would open in a new window.', 'info');
        });
    }
    
    if (viewScheduleBtn) {
        viewScheduleBtn.addEventListener('click', () => {
            showNotification('Work schedule would display here.', 'info');
        });
    }
    
    if (reportIssueBtn) {
        reportIssueBtn.addEventListener('click', () => {
            showNotification('Issue reporting form would open.', 'info');
        });
    }
    
    if (companyDirectoryBtn) {
        companyDirectoryBtn.addEventListener('click', () => {
            showNotification('Company directory would open.', 'info');
        });
    }
    
    // Quick links
    document.querySelectorAll('.quick-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification(`${link.querySelector('span').textContent} would open.`, 'info');
        });
    });
    
    // View all leave button
    const viewAllLeaveBtn = document.getElementById('viewAllLeaveBtn');
    if (viewAllLeaveBtn) {
        viewAllLeaveBtn.addEventListener('click', () => {
            showNotification('View all leave requests functionality would open here.', 'info');
        });
    }
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Pre-fill profile modal with current user data
        if (modalId === 'profileUpdateModal' && window.currentUser) {
            const user = window.currentUser;
            const fullNameInput = document.getElementById('fullName');
            const emailInput = document.getElementById('profileEmail');
            const phoneInput = document.getElementById('phoneNumber');
            
            if (fullNameInput) fullNameInput.value = user.name || '';
            if (emailInput) emailInput.value = user.email || '';
            if (phoneInput) phoneInput.value = user.phone || '';
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset form
        const form = modal.querySelector('form');
        if (form) {
            form.reset();
        }
    }
}

function submitLeaveRequest() {
    const leaveType = document.getElementById('leaveType')?.value;
    const startDate = document.getElementById('startDate')?.value;
    const endDate = document.getElementById('endDate')?.value;
    const daysCount = document.getElementById('daysCount')?.value;
    const leaveReason = document.getElementById('leaveReason')?.value;
    
    if (!leaveType || !startDate || !endDate || !leaveReason) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Validate dates
    if (new Date(startDate) < new Date()) {
        showNotification('Start date cannot be in the past.', 'error');
        return;
    }
    
    if (new Date(endDate) < new Date(startDate)) {
        showNotification('End date must be after start date.', 'error');
        return;
    }
    
    // Simulate API call
    console.log('Leave Request Submitted:', {
        employeeId: window.currentUser?.id,
        employeeName: window.currentUser?.name,
        leaveType,
        startDate,
        endDate,
        daysCount,
        leaveReason
    });
    
    // Update leave balance
    const leaveBalanceEl = document.getElementById('leaveBalance');
    if (leaveBalanceEl) {
        const currentBalance = parseInt(leaveBalanceEl.textContent) || 0;
        const requestedDays = parseInt(daysCount) || 1;
        if (currentBalance >= requestedDays) {
            leaveBalanceEl.textContent = currentBalance - requestedDays;
        }
    }
    
    showNotification('Leave request submitted successfully! It will be reviewed by your manager.', 'success');
    closeModal('leaveRequestModal');
}

function saveProfileChanges() {
    const fullName = document.getElementById('fullName')?.value;
    const email = document.getElementById('profileEmail')?.value;
    const phone = document.getElementById('phoneNumber')?.value;
    const newPassword = document.getElementById('newPassword')?.value;
    const confirmPassword = document.getElementById('confirmPassword')?.value;
    
    // Basic validation
    if (!fullName || !email) {
        showNotification('Full name and email are required.', 'error');
        return;
    }
    
    if (newPassword && newPassword !== confirmPassword) {
        showNotification('Passwords do not match.', 'error');
        return;
    }
    
    if (newPassword && newPassword.length < 6) {
        showNotification('Password must be at least 6 characters long.', 'error');
        return;
    }
    
    // Get stored users
    const storedUsers = JSON.parse(localStorage.getItem('workSphereUsers') || '[]');
    const currentUserData = window.Auth.getCurrentUser();
    
    // Update user in stored users
    const userIndex = storedUsers.findIndex(user => user.id === currentUserData?.id);
    if (userIndex !== -1) {
        storedUsers[userIndex].name = fullName;
        storedUsers[userIndex].email = email;
        if (phone) storedUsers[userIndex].phone = phone;
        localStorage.setItem('workSphereUsers', JSON.stringify(storedUsers));
    }
    
    // Update user session data
    let userData = JSON.parse(localStorage.getItem('workSphereUser') || '{}');
    
    userData.name = fullName;
    userData.email = email;
    if (phone) userData.phone = phone;
    if (newPassword) {
        // In a real app, you would hash the password
        userData.password = newPassword;
    }
    
    localStorage.setItem('workSphereUser', JSON.stringify(userData));
    
    // Update current user reference
    window.currentUser = userData;
    
    // Update UI
    updateUserInfo(userData);
    
    showNotification('Profile updated successfully!', 'success');
    closeModal('profileUpdateModal');
    
    // Reset password fields
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
}

function setupLogout() {
    const userProfile = document.getElementById('userProfile');
    if (userProfile) {
        userProfile.addEventListener('click', function() {
            // Remove existing logout menu if any
            const existingMenu = document.querySelector('.logout-menu');
            if (existingMenu) {
                existingMenu.remove();
                return;
            }
            
            // Create logout dropdown
            const logoutMenu = document.createElement('div');
            logoutMenu.className = 'logout-menu';
            logoutMenu.style.cssText = `
                position: absolute;
                top: 70px;
                right: 20px;
                background: white;
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                padding: 8px;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                z-index: 1000;
                min-width: 150px;
            `;
            
            const logoutBtn = document.createElement('button');
            logoutBtn.textContent = 'Logout';
            logoutBtn.style.cssText = `
                width: 100%;
                padding: 10px 12px;
                background: #ef4444;
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 500;
                transition: background 0.2s;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
            `;
            
            const logoutIcon = document.createElement('i');
            logoutIcon.className = 'fas fa-sign-out-alt';
            logoutIcon.style.fontSize = '12px';
            
            logoutBtn.appendChild(logoutIcon);
            logoutBtn.appendChild(document.createTextNode('Logout'));
            
            logoutBtn.onmouseenter = () => logoutBtn.style.background = '#dc2626';
            logoutBtn.onmouseleave = () => logoutBtn.style.background = '#ef4444';
            
            logoutBtn.onclick = function() {
                if (window.Auth && window.Auth.logout) {
                    window.Auth.logout();
                } else {
                    localStorage.removeItem('workSphereUser');
                    window.location.href = 'Login.html';
                }
            };
            
            logoutMenu.appendChild(logoutBtn);
            document.body.appendChild(logoutMenu);
            
            // Close menu when clicking outside
            setTimeout(() => {
                const closeMenu = function(e) {
                    if (!userProfile.contains(e.target) && !logoutMenu.contains(e.target)) {
                        logoutMenu.remove();
                        document.removeEventListener('click', closeMenu);
                    }
                };
                document.addEventListener('click', closeMenu);
            }, 0);
        });
    }
}

// Utility functions
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

// Make functions available globally for onclick handlers
window.openModal = openModal;
window.closeModal = closeModal;
window.submitLeaveRequest = submitLeaveRequest;
window.saveProfileChanges = saveProfileChanges;
