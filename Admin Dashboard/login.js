// login.js - COMPLETE PROFESSIONAL VERSION

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('WorkSphere Login System Initializing...');
    
    // Show login modal immediately
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        loginModal.style.display = 'flex';
        loginModal.classList.add('active');
    }
    
    // Initialize the login system
    initializeLoginSystem();
    
    // Check for existing session
    checkExistingSession();
});

function initializeLoginSystem() {
    console.log('Initializing login system...');
    
    // Setup tab switching
    setupTabSwitching();
    
    // Setup modal navigation
    setupModalNavigation();
    
    // Setup form handlers
    setupFormHandlers();
    
    // Initialize demo users
    initializeDemoUsers();
    
    // Setup image upload preview
    setupImageUpload();
    
    console.log('Login system initialized successfully');
}

// ===== TAB SWITCHING =====
function setupTabSwitching() {
    const tabs = document.querySelectorAll('.tab');
    const forms = document.querySelectorAll('.login-form');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Get target form ID
            const targetId = this.getAttribute('data-target');
            
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active to clicked tab
            this.classList.add('active');
            
            // Hide all forms
            forms.forEach(f => f.classList.remove('active'));
            // Show target form
            document.getElementById(targetId).classList.add('active');
        });
    });
}

// ===== MODAL NAVIGATION =====
function setupModalNavigation() {
    // Show signup modal
    const showSignupBtn = document.getElementById('openSignup');
    if (showSignupBtn) {
        showSignupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showModal('signupModal');
        });
    }
    
    // Show login modal
    const showLoginBtn = document.getElementById('backToLogin');
    if (showLoginBtn) {
        showLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showModal('loginModal');
        });
    }
}

function showModal(modalId) {
    // Hide all modals
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
        modal.classList.remove('active');
    });
    
    // Show selected modal
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
        targetModal.style.display = 'flex';
        setTimeout(() => {
            targetModal.classList.add('active');
        }, 10);
    }
}

// ===== FORM HANDLERS =====
function setupFormHandlers() {
    // Employee login
    const employeeForm = document.getElementById('employeeLogin');
    if (employeeForm) {
        employeeForm.addEventListener('submit', handleEmployeeLogin);
    }
    
    // Admin login
    const adminForm = document.getElementById('adminLogin');
    if (adminForm) {
        adminForm.addEventListener('submit', handleAdminLogin);
    }
    
    // Signup form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
}

async function handleEmployeeLogin(e) {
    e.preventDefault();
    
    const emailInput = document.querySelector('#employeeLogin input[type="email"]');
    const passwordInput = document.querySelector('#employeeLogin input[type="password"]');
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    // Validate input
    if (!validateFormInput(email, password, 'employee')) {
        return;
    }
    
    // Show loading state
    const submitBtn = document.getElementById('employeeSubmitBtn');
    if (submitBtn) submitBtn.classList.add('loading');
    
    // Simulate API delay
    await simulateDelay(1000);
    
    // Process login
    processLogin(email, password, 'employee');
    
    // Remove loading state
    if (submitBtn) submitBtn.classList.remove('loading');
}

async function handleAdminLogin(e) {
    e.preventDefault();
    
    const emailInput = document.querySelector('#adminLogin input[type="email"]');
    const passwordInput = document.querySelector('#adminLogin input[type="password"]');
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    // Validate input
    if (!validateFormInput(email, password, 'admin')) {
        return;
    }
    
    // Show loading state
    const submitBtn = document.getElementById('adminSubmitBtn');
    if (submitBtn) submitBtn.classList.add('loading');
    
    // Simulate API delay
    await simulateDelay(1000);
    
    // Process login
    processLogin(email, password, 'admin');
    
    // Remove loading state
    if (submitBtn) submitBtn.classList.remove('loading');
}

async function handleSignup(e) {
    e.preventDefault();
    
    const nameInput = document.getElementById('signupName');
    const emailInput = document.getElementById('signupEmail');
    const passwordInput = document.getElementById('signupPassword');
    const confirmPasswordInput = document.getElementById('signupConfirmPassword');
    const agreeTerms = document.getElementById('agreeTerms');
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    // Clear previous errors
    clearFormErrors();
    
    // Validate inputs
    let isValid = true;
    
    if (!name) {
        showError('signupNameError', 'Full name is required');
        isValid = false;
    }
    
    if (!email || !isValidEmail(email)) {
        showError('signupEmailError', 'Valid email is required');
        isValid = false;
    }
    
    if (!password || password.length < 6) {
        showError('signupPasswordError', 'Password must be at least 6 characters');
        isValid = false;
    }
    
    if (password !== confirmPassword) {
        showError('signupConfirmPasswordError', 'Passwords do not match');
        isValid = false;
    }
    
    if (!agreeTerms || !agreeTerms.checked) {
        showError('termsError', 'You must agree to the terms');
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem('workSphereUsers') || '[]');
    if (existingUsers.some(user => user.email === email)) {
        showError('signupEmailError', 'Email already registered');
        return;
    }
    
    // Show loading state
    const submitBtn = document.getElementById('signupSubmitBtn');
    if (submitBtn) submitBtn.classList.add('loading');
    
    // Simulate API delay
    await simulateDelay(1500);
    
    // Process signup
    processSignup(name, email, password);
    
    // Remove loading state
    if (submitBtn) submitBtn.classList.remove('loading');
}

// ===== LOGIN/SIGNUP PROCESSING =====
function processLogin(email, password, role) {
    // Get stored users
    const storedUsers = JSON.parse(localStorage.getItem('workSphereUsers') || '[]');
    
    // Find user
    let user = storedUsers.find(u => u.email === email && u.role === role);
    
    // If user doesn't exist, create demo user
    if (!user) {
        user = createDemoUser(email, password, role);
        storedUsers.push(user);
        localStorage.setItem('workSphereUsers', JSON.stringify(storedUsers));
    }
    
    // Verify password for demo accounts
    if (user.password && user.password !== password) {
        // For demo purposes, accept any password for demo accounts
        if (!isDemoAccount(email)) {
            showNotification('Invalid credentials', 'error');
            return;
        }
    }
    
    // Create session
    createUserSession(user);
    
    // Show success message
    showNotification(`Welcome ${user.name}!`, 'success');
    
    // Redirect to appropriate dashboard
    setTimeout(() => {
        if (role === 'admin') {
            window.location.href = 'Admin Dashboard.html';
        } else {
            window.location.hpathref = 'Employee Dashboard.html';
        }
    }, 1500);
}

function processSignup(name, email, password) {
    // Create new user
    const newUser = {
        id: generateUserId(),
        email: email,
        name: name,
        password: password,
        role: 'employee',
        position: 'Employee',
        department: 'General',
        createdAt: new Date().toISOString(),
        profileImage: getProfileImageData()
    };
    
    // Add to stored users
    const storedUsers = JSON.parse(localStorage.getItem('workSphereUsers') || '[]');
    storedUsers.push(newUser);
    localStorage.setItem('workSphereUsers', JSON.stringify(storedUsers));
    
    // Create session
    createUserSession(newUser);
    
    // Show success message
    showNotification('Account created successfully!', 'success');
    
    // Redirect to employee dashboard
    setTimeout(() => {
        window.location.href = 'Employee Dashboard.html';
    }, 1500);
}

// ===== SESSION MANAGEMENT =====
function createUserSession(user) {
    const sessionData = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        position: user.position,
        department: user.department,
        profileImage: user.profileImage,
        loginTime: new Date().toISOString(),
        sessionId: generateSessionId()
    };
    
    localStorage.setItem('workSphereSession', JSON.stringify(sessionData));
    console.log('Session created for:', user.email);
}

function checkExistingSession() {
    const sessionData = localStorage.getItem('workSphereSession');
    
    if (!sessionData) {
        console.log('No existing session found');
        return;
    }
    
    try {
        const user = JSON.parse(sessionData);
        console.log('Found existing session for:', user.name);
        
        // Check session expiration (24 hours)
        const loginTime = new Date(user.loginTime);
        const currentTime = new Date();
        const hoursDiff = (currentTime - loginTime) / (1000 * 60 * 60);
        
        if (hoursDiff < 24) {
            // Auto-redirect based on role
            showNotification(`Welcome back, ${user.name}!`, 'success');
            setTimeout(() => {
                if (user.role === 'admin') {
                    window.location.href = 'Admin Dashboard.html';
                } else {
                    window.location.href = 'Employee Dashboard.html';
                }
            }, 1000);
        } else {
            // Session expired
            localStorage.removeItem('workSphereSession');
            showNotification('Session expired. Please login again.', 'info');
        }
    } catch (error) {
        console.error('Error parsing session:', error);
        localStorage.removeItem('workSphereSession');
    }
}

// ===== DEMO USERS =====
function initializeDemoUsers() {
    const existingUsers = localStorage.getItem('workSphereUsers');
    if (existingUsers) return;
    
    const demoUsers = [
        {
            id: 'admin_001',
            email: 'admin@worksphere.com',
            password: 'admin123',
            name: 'Administrator',
            role: 'admin',
            position: 'HR Manager',
            department: 'Human Resources',
            createdAt: new Date().toISOString(),
            profileImage: null
        },
        {
            id: 'emp_001',
            email: 'employee@worksphere.com',
            password: 'demo123',
            name: 'John Smith',
            role: 'employee',
            position: 'Software Developer',
            department: 'Engineering',
            createdAt: new Date().toISOString(),
            profileImage: null
        },
        {
            id: 'emp_002',
            email: 'sarah.johnson@worksphere.com',
            password: 'demo123',
            name: 'Sarah Johnson',
            role: 'employee',
            position: 'Project Manager',
            department: 'Project Management',
            createdAt: new Date().toISOString(),
            profileImage: null
        }
    ];
    
    localStorage.setItem('workSphereUsers', JSON.stringify(demoUsers));
    console.log('Demo users initialized');
}

function createDemoUser(email, password, role) {
    const name = email.split('@')[0];
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
    
    return {
        id: generateUserId(),
        email: email,
        password: password,
        name: formattedName,
        role: role,
        position: role === 'admin' ? 'HR Manager' : 'Employee',
        department: role === 'admin' ? 'Human Resources' : 'General',
        createdAt: new Date().toISOString(),
        profileImage: null
    };
}

function isDemoAccount(email) {
    const demoEmails = [
        'admin@worksphere.com',
        'employee@worksphere.com',
        'sarah.johnson@worksphere.com'
    ];
    return demoEmails.includes(email);
}

// ===== IMAGE UPLOAD =====
function setupImageUpload() {
    const imageInput = document.getElementById('profileImage');
    const preview = document.getElementById('imagePreview');
    
    if (!imageInput || !preview) return;
    
    imageInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            // Validate file type
            if (!file.type.match('image.*')) {
                showNotification('Please select an image file', 'error');
                return;
            }
            
            // Validate file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                showNotification('Image must be less than 5MB', 'error');
                return;
            }
            
            // Create preview
            const reader = new FileReader();
            reader.onload = function(e) {
                preview.innerHTML = `
                    <div class="preview-container">
                        <img src="${e.target.result}" alt="Profile Preview">
                        <button type="button" class="remove-image" onclick="removeProfileImage()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                `;
            };
            reader.readAsDataURL(file);
        }
    });
}

function getProfileImageData() {
    const imageInput = document.getElementById('profileImage');
    if (!imageInput || !imageInput.files[0]) return null;
    
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            resolve(e.target.result);
        };
        reader.readAsDataURL(imageInput.files[0]);
    });
}

function removeProfileImage() {
    const imageInput = document.getElementById('profileImage');
    const preview = document.getElementById('imagePreview');
    
    if (imageInput) imageInput.value = '';
    if (preview) preview.innerHTML = '';
}

// ===== UTILITY FUNCTIONS =====
function validateFormInput(email, password, role) {
    // Clear previous errors
    clearFormErrors();
    
    let isValid = true;
    
    if (!email || !isValidEmail(email)) {
        showError(`${role}EmailError`, 'Valid email is required');
        isValid = false;
    }
    
    if (!password) {
        showError(`${role}PasswordError`, 'Password is required');
        isValid = false;
    }
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function clearFormErrors() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
        el.classList.remove('visible');
    });
}

function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.classList.add('visible');
    }
}

async function simulateDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function generateUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 12);
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    const messageEl = document.getElementById('notificationMessage');
    const icon = notification.querySelector('i');
    
    if (!notification || !messageEl) return;
    
    // Set message and type
    messageEl.textContent = message;
    
    // Update icon and colors
    if (type === 'success') {
        icon.className = 'fas fa-check-circle';
        notification.style.background = '#10b981';
    } else if (type === 'error') {
        icon.className = 'fas fa-exclamation-circle';
        notification.style.background = '#ef4444';
    } else {
        icon.className = 'fas fa-info-circle';
        notification.style.background = '#3b82f6';
    }
    
    // Show notification
    notification.style.display = 'flex';
    notification.classList.remove('hiding');
    
    // Auto-hide after 4 seconds
    setTimeout(() => {
        notification.classList.add('hiding');
        setTimeout(() => {
            notification.style.display = 'none';
        }, 300);
    }, 4000);
}

// ===== PASSWORD VISIBILITY TOGGLE =====
function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    const toggleBtn = input.nextElementSibling;
    const icon = toggleBtn.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
    }
}

// ===== GLOBAL AUTH FUNCTIONS =====
window.Auth = {
    getCurrentUser: function() {
        const sessionData = localStorage.getItem('workSphereSession');
        return sessionData ? JSON.parse(sessionData) : null;
    },
    
    isAuthenticated: function() {
        const user = this.getCurrentUser();
        if (!user) return false;
        
        // Check session expiration
        const loginTime = new Date(user.loginTime);
        const currentTime = new Date();
        const hoursDiff = (currentTime - loginTime) / (1000 * 60 * 60);
        
        return hoursDiff < 24;
    },
    
    requireAuth: function(requiredRole = null) {
        const user = this.getCurrentUser();
        
        if (!user || !this.isAuthenticated()) {
            window.location.href = 'Login.html';
            return false;
        }
        
        if (requiredRole && user.role !== requiredRole) {
            showNotification(`Access denied. ${requiredRole} role required.`, 'error');
            setTimeout(() => {
                window.location.href = 'Login.html';
            }, 2000);
            return false;
        }
        
        return true;
    },
    
    logout: function() {
        localStorage.removeItem('workSphereSession');
        window.location.href = 'Login.html';
    }
};

// ===== GLOBAL FUNCTIONS =====
window.showModal = showModal;
window.togglePasswordVisibility = togglePasswordVisibility;
window.removeProfileImage = removeProfileImage;

console.log('WorkSphere Login System Ready');
