// --- Modal Handling ---
const updateBtn = document.getElementById("updateBtn");
const actionsBtn = document.getElementById("actionsBtn");
const updateModal = document.getElementById("updateModal");
const actionsModal = document.getElementById("actionsModal");
const closeUpdate = document.getElementById("closeUpdate");
const closeActions = document.getElementById("closeActions");

updateBtn.addEventListener("click", () => updateModal.style.display = "block");
actionsBtn.addEventListener("click", () => actionsModal.style.display = "block");

closeUpdate.addEventListener("click", () => updateModal.style.display = "none");
closeActions.addEventListener("click", () => actionsModal.style.display = "none");

window.addEventListener("click", (e) => {
    if (e.target === updateModal) updateModal.style.display = "none";
    if (e.target === actionsModal) actionsModal.style.display = "none";
});

// --- Active Status Toggle ---
const activeToggle = document.getElementById("activeStatus");
const activeLabel = document.getElementById("activeLabel");
activeToggle.addEventListener("change", () => {
    activeLabel.textContent = activeToggle.checked ? "Active" : "Inactive";
});

// --- Action Content ---
const leaveBtn = document.getElementById("leaveBtn");
const payrollBtn = document.getElementById("payrollBtn");
const actionContent = document.getElementById("actionContent");

// --- Leave Form ---
leaveBtn.addEventListener("click", () => {
    actionContent.innerHTML = `
        <div class="leave-form">
            <h4>Apply for Leave</h4>
            <textarea id="leaveReason" rows="3" placeholder="Reason"></textarea>
            <input type="date" id="leaveDate">
            <label>
                Status:
                <label class="switch">
                    <input type="checkbox" id="leaveStatus">
                    <span class="slider"></span>
                </label>
                <span class="status-label" id="statusLabel">Pending</span>
            </label>
            <button id="submitLeave">Submit</button>
        </div>
    `;

    const leaveStatus = document.getElementById("leaveStatus");
    const statusLabel = document.getElementById("statusLabel");
    leaveStatus.addEventListener("change", () => {
        statusLabel.textContent = leaveStatus.checked ? "Approved" : "Pending";
    });

    document.getElementById("submitLeave").addEventListener("click", () => {
        alert(`Leave for ${document.getElementById("leaveDate").value} applied.\nReason: ${document.getElementById("leaveReason").value}`);
    });
});

// --- Payroll Payslip ---
payrollBtn.addEventListener("click", async () => {
    actionContent.innerHTML = "Loading payroll data...";
    try {
        const response = await fetch("payroll_data.json");
        if (!response.ok) throw new Error("Network error");
        const data = await response.json();
        const empId = 3; // Example: Employee ID 3
        const payroll = data.payrollData.find(p => p.employeeId === empId);

        if (!payroll) {
            actionContent.innerHTML = "No payroll data found.";
            return;
        }

        actionContent.innerHTML = `
            <div class="payslip">
                <h4>Payslip</h4>
                <ul>
                    <li><strong>Employee ID:</strong> ${payroll.employeeId}</li>
                    <li><strong>Hours Worked:</strong> ${payroll.hoursWorked}</li>
                    <li><strong>Leave Deductions:</strong> ${payroll.leaveDeductions}</li>
                    <li><strong>Final Salary:</strong> R${payroll.finalSalary}</li>
                </ul>
            </div>
        `;
    } catch (error) {
        actionContent.innerHTML = "Error loading payroll data.";
        console.error(error);
    }
});
