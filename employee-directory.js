// Update employee status
function updateStatus(button, status) {
  const row = button.closest("tr");
  row.cells[2].textContent = status;
}

// Modal functions
function openModal(name) {
  document.getElementById("modalTitle").textContent = name + " - Details";
  document.getElementById("modalBody").textContent = "Additional employee information goes here.";
  document.getElementById("modal").style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// Add employee form
document.getElementById("employeeForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const role = document.getElementById("role").value;

  const table = document.getElementById("employeeTable");
  const newRow = table.insertRow();

  newRow.innerHTML = `
    <td>${name}</td>
    <td>${role}</td>
    <td>Pending</td>
    <td>
      <button class="btn accept" onclick="updateStatus(this, 'Accepted')">Accept</button>
      <button class="btn decline" onclick="updateStatus(this, 'Declined')">Decline</button>
    </td>
  `;

  document.getElementById("employeeForm").reset();
});