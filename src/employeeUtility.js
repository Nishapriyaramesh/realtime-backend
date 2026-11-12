/**
 * Employee Data Utility & Transformer (Node.js)
 */

const testScenarios = [
  // Scenario 1: Standard populated response
  {
    success: true,
    data: [
      { id: 1, name: "Alice Smith", department: "Engineering", salary: 95000, active: true },
      { id: 2, name: "Bob Jones", department: "Marketing", salary: 65000, active: true },
      { id: 3, name: "Charlie Brown", department: "Engineering", salary: 110000, active: false }
    ]
  },
  // Scenario 2: Empty response
  {
    success: true,
    data: []
  },
  // Scenario 3: Missing/invalid values (empty name / edge case)
  {
    success: true,
    data: [
      { id: 4, name: "", department: "HR", salary: 50000, active: true },
      { id: 5, name: "Diana Prince", department: "Engineering", salary: 125000, active: true }
    ]
  },
  // Scenario 4: API failure scenario (non-OK response structure)
  {
    success: false,
    data: [],
    error: "Unauthorized access to employee database"
  },
  // Scenario 5: Large dataset with varied salaries
  {
    success: true,
    data: [
      { id: 6, name: "Eve Davis", department: "Finance", salary: 80000, active: true },
      { id: 7, name: "Frank White", department: "Finance", salary: 92000, active: true },
      { id: 8, name: "Grace Hopper", department: "Engineering", salary: 150000, active: true }
    ]
  }
];

function processEmployeeData(response) {
  if (!response.success) {
    console.log(`[Error Scenario]: ${response.error || "Unknown network/API error"}`);
    return;
  }

  if (!response.data || response.data.length === 0) {
    console.log("[Info]: Response data is empty.");
    return;
  }

  const activeEmployees = response.data.filter(emp => emp.active && emp.salary > 0);

  const summaries = activeEmployees.map(emp => ({
    title: `${emp.name || 'Unknown Staff'} (${emp.department})`,
    annualComp: `$${emp.salary.toLocaleString()}`
  }));

  const totalPayroll = activeEmployees.reduce((sum, emp) => sum + emp.salary, 0);
  const averageSalary = activeEmployees.length > 0 ? totalPayroll / activeEmployees.length : 0;

  console.log(`Processed ${activeEmployees.length} active employee(s):`);
  summaries.forEach(s => console.log(` - ${s.title}: ${s.annualComp}`));
  console.log(` Total Payroll: $${totalPayroll.toLocaleString()}`);
  console.log(` Average Salary: $${averageSalary.toFixed(2)}\n`);
}

function runEmployeeScenarios() {
  console.log("=== Running 5 Employee Test Scenarios ===");
  testScenarios.forEach((scenario, index) => {
    console.log(`\n--- Test Scenario #${index + 1} ---`);
    processEmployeeData(scenario);
  });
}

if (require.main === module) {
  runEmployeeScenarios();
}

module.exports = { runEmployeeScenarios, processEmployeeData };