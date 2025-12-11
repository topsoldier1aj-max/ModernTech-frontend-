// login.js - UPDATED FOR INTEGRATION

console.log('WorkSphere Login System Loading...');

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Login page initializing...');
    
    // Check for existing session
    checkExistingSession();
    
    // Initialize login system
    initializeLoginSystem();
});

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
            // DON'T auto-redirect - let user choose where to go
            console.log('Session valid, but not auto-redirecting');
            showNotification(`Welcome back, ${user.name}! You can login again or continue to dashboard.`, 'info');
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

function initializeLoginSystem() {
    console.log('Setting up login system...');
    
    // Setup tab switching
    setupTabSwitching();
    
    // Setup form submission
    setupFormSubmission();
    
    // Setup show/hide password
    setupPasswordToggle();
    
    // Setup image preview
    setupImagePreview();
    
    // Initialize demo users if needed
    initializeDemoUsers();
    
    console.log('Login system ready');
}

function setupTabSwitching() {
    const employeeTab = document.getElementById('employeeTab');
    const adminTab = document.getElementById('adminTab');
    const employeeForm = document.getElementById('employeeForm');
    const adminForm = document.getElementById('adminForm');
    const showSignup = document.getElementById('showSignup');
    const showLogin = document.getElementById('showLogin');
    const loginContainer = document.getElementById('loginContainer');
    const signupContainer = document.getElementById('signupContainer');
    
    if (employeeTab && adminTab) {
        employeeTab.addEventListener('click', function() {
            switchTab('employee');
        });
        
        adminTab.addEventListener('click', function() {
            switchTab('admin');
        });
    }
    
    if (showSignup) {
        showSignup.addEventListener('click', function(e) {
            e.preventDefault();
            showSignupForm();
        });
    }
    
    if (showLogin) {
        showLogin.addEventListener('click', function(e) {
            e.preventDefault();
            showLoginForm();
        });
    }
}

function switchTab(tab) {
    const employeeTab = document.getElementById('employeeTab');
    const adminTab = document.getElementById('adminTab');
    const employeeForm = document.getElementById('employeeForm');
    const adminForm = document.getElementById('adminForm');
    
    if (tab === 'employee') {
        employeeTab.classList.add('active');
        adminTab.classList.remove('active');
        employeeForm.classList.add('active');
        adminForm.classList.remove('active');
    } else {
        adminTab.classList.add('active');
        employeeTab.classList.remove('active');
        adminForm.classList.add('active');
        employeeForm.classList.remove('active');
    }
}

function showSignupForm() {
    const loginContainer = document.getElementById('loginContainer');
    const signupContainer = document.getElementById('signupContainer');
    
    if (loginContainer) loginContainer.classList.remove('active');
    if (signupContainer) signupContainer.classList.add('active');
}

function showLoginForm() {
    const loginContainer = document.getElementById('loginContainer');
    const signupContainer = document.getElementById('signupContainer');
    
    if (signupContainer) signupContainer.classList.remove('active');
    if (loginContainer) loginContainer.classList.add('active');
}

function setupFormSubmission() {
    const employeeForm = document.getElementById('employeeForm');
    const adminForm = document.getElementById('adminForm');
    const signupForm = document.getElementById('signupForm');
    
    if (employeeForm) {
        employeeForm.addEventListener('submit', handleEmployeeLogin);
    }
    
    if (adminForm) {
        adminForm.addEventListener('submit', handleAdminLogin);
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
}

async function handleEmployeeLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('employeeEmail').value.trim();
    const password = document.getElementById('employeePassword').value;
    
    // Validate
    if (!validateLoginForm(email, password, 'employee')) {
        return;
    }
    
    // Show loading
    const submitBtn = document.querySelector('#employeeForm .btn-login');
    if (submitBtn) submitBtn.classList.add('loading');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Process login
    const success = await processLogin(email, password, 'employee');
    
    // Hide loading
    if (submitBtn) submitBtn.classList.remove('loading');
    
    if (success) {
        showNotification('Login successful! Redirecting...', 'success');
        setTimeout(() => {
            window.location.href = 'Employee Dashboard.html';
        }, 1500);
    }
}

async function handleAdminLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('adminEmail').value.trim();
    const password = document.getElementById('adminPassword').value;
    
    // Validate
    if (!validateLoginForm(email, password, 'admin')) {
        return;
    }
    
    // Show loading
    const submitBtn = document.querySelector('#adminForm .btn-login');
    if (submitBtn) submitBtn.classList.add('loading');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Process login
    const success = await processLogin(email, password, 'admin');
    
    // Hide loading
    if (submitBtn) submitBtn.classList.remove('loading');
    
    if (success) {
        showNotification('Login successful! Redirecting...', 'success');
        setTimeout(() => {
            window.location.href = 'Admin Dashboard.html';
        }, 1500);
    }
}

async function handleSignup(e) {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms');
    
    // Clear errors
    clearFormErrors();
    
    // Validate
    if (!validateSignupForm(name, email, password, confirmPassword, agreeTerms)) {
        return;
    }
    
    // Show loading
    const submitBtn = document.getElementById('signupBtn');
    if (submitBtn) submitBtn.classList.add('loading');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Process signup
    const success = await processSignup(name, email, password);
    
    // Hide loading
    if (submitBtn) submitBtn.classList.remove('loading');
    
    if (success) {
        showNotification('Account created successfully! Redirecting...', 'success');
        setTimeout(() => {
            window.location.href = 'Employee Dashboard.html';
        }, 1500);
    }
}

function validateLoginForm(email, password, role) {
    // Clear errors
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

function validateSignupForm(name, email, password, confirmPassword, agreeTerms) {
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

async function processLogin(email, password, role) {
    // Get stored users
    const storedUsers = JSON.parse(localStorage.getItem('workSphereUsers') || '[]');
    
    // Find user
    let user = storedUsers.find(u => u.email === email && u.role === role);
    
    // If user doesn't exist, check if it's a demo account
    if (!user) {
        // Check demo accounts
        const demoAccounts = {
            'employee@worksphere.com': { role: 'employee', password: 'demo123' },
            'admin@worksphere.com': { role: 'admin', password: 'admin123' },
            'sarah.johnson@worksphere.com': { role: 'employee', password: 'demo123' }
        };
        
        if (demoAccounts[email] && demoAccounts[email].role === role) {
            // Create demo user
            user = createDemoUser(email, demoAccounts[email].password, role);
            storedUsers.push(user);
            localStorage.setItem('workSphereUsers', JSON.stringify(storedUsers));
        } else {
            showNotification('Invalid credentials', 'error');
            return false;
        }
    }
    
    // Check password (for demo purposes, accept any password)
    if (user.password && user.password !== password) {
        showNotification('Invalid credentials', 'error');
        return false;
    }
    
    // Create session
    createUserSession(user);
    
    return true;
}

async function processSignup(name, email, password) {
    // Check if user already exists
    const storedUsers = JSON.parse(localStorage.getItem('workSphereUsers') || '[]');
    if (storedUsers.some(user => user.email === email)) {
        showError('signupEmailError', 'Email already registered');
        return false;
    }
    
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
        profileImage: await getProfileImageData()
    };
    
    // Add to stored users
    storedUsers.push(newUser);
    localStorage.setItem('workSphereUsers', JSON.stringify(storedUsers));
    
    // Create session
    createUserSession(newUser);
    
    return true;
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

function setupPasswordToggle() {
    document.querySelectorAll('.show-password').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            if (input.type === 'password') {
                input.type = 'text';
                this.innerHTML = '<i class="fas fa-eye-slash"></i>';
            } else {
                input.type = 'password';
                this.innerHTML = '<i class="fas fa-eye"></i>';
            }
        });
    });
}

function setupImagePreview() {
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

async function getProfileImageData() {
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

function generateUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 12);
}

function showNotification(message, type = 'info') {
    const toast = document.getElementById('toastNotification');
    const messageEl = document.getElementById('toastMessage');
    const icon = toast.querySelector('.toast-icon');
    
    if (!toast || !messageEl) return;
    
    // Set message
    messageEl.textContent = message;
    
    // Update icon and color
    if (type === 'success') {
        icon.className = 'fas fa-check-circle toast-icon';
        toast.style.background = 'var(--success-500)';
    } else if (type === 'error') {
        icon.className = 'fas fa-exclamation-circle toast-icon';
        toast.style.background = 'var(--danger-500)';
    } else {
        icon.className = 'fas fa-info-circle toast-icon';
        toast.style.background = 'var(--primary-500)';
    }
    
    // Show toast
    toast.style.display = 'flex';
    toast.classList.remove('hiding');
    
    // Auto-hide
    setTimeout(() => {
        toast.classList.add('hiding');
        setTimeout(() => {
            toast.style.display = 'none';
        }, 300);
    }, 4000);
}

// Global functions for onclick handlers
window.switchTab = switchTab;
window.showSignup = showSignupForm;
window.showLogin = showLoginForm;
window.togglePassword = function(inputId) {
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
};
window.removeProfileImage = removeProfileImage;

console.log('WorkSphere Login System Ready');
