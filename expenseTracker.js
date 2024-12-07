    // Function to add expense/income
    async function addExpense() {
      const date = document.getElementById('date').value;
      const amount = parseFloat(document.getElementById('amount').value);
      const category = document.getElementById('category').value;
      const type = document.getElementById('type').value;

      const response = await fetch('http://localhost:3000/api/addExpense', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, amount, category, type }),
      });
      const result = await response.json();
      alert(result.message);
    }

    // Function to view all expenses
    async function viewExpenses() {
  const response = await fetch('http://localhost:3000/api/viewExpenses');
  const expenses = await response.json();
  
  console.log('All Expenses:', expenses);
  
  // Loop through the expenses and display them
  expenses.forEach(expense => {
    const amount = parseFloat(expense.amount); 
    if (isNaN(amount)) {
      console.error(`Invalid amount for expense: ${expense.amount}`);
    } else {
      console.log(`${expense.date} | ${expense.category} | ${expense.type} | $${amount.toFixed(2)}`);
    }
  });
}


    // Function to view total spending
async function viewTotalSpending() {
  const response = await fetch('http://localhost:3000/api/viewTotalSpending');
  const data = await response.json();
  
  const total = parseFloat(data.total); 
  if (isNaN(total)) {
    console.error(`Invalid total spending amount: ${data.total}`);
  } else {
    console.log(`Total Spending: $${total.toFixed(2)}`);
  }
}


async function viewSpendingByCategory() {
  const response = await fetch('http://localhost:3000/api/viewSpendingByCategory');
  const categories = await response.json();
  
  console.log('Spending by Category:');
  
  categories.forEach(category => {
    const total = parseFloat(category.total); 
    if (isNaN(total)) {
      console.error(`Invalid spending total for category ${category.category}: ${category.total}`);
    } else {
      console.log(`${category.category}: $${total.toFixed(2)}`);
    }
  });
}

