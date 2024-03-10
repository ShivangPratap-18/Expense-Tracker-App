// script.js
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    const totalExpense = document.getElementById('total-expense');
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const category = document.getElementById('category').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const date = document.getElementById('date').value;

        if (category && amount && date) {
            const expense = {
                category,
                amount,
                date
            };
            expenses.push(expense);
            displayExpenses();
            calculateTotalExpense();
            saveExpenses();
            form.reset();
        } else {
            alert('Please fill out all fields.');
        }
    });

    function displayExpenses() {
        expenseList.innerHTML = '';
        expenses.forEach((expense, index) => {
            const listItem = document.createElement('div');
            listItem.classList.add('expense-item');
            listItem.innerHTML = `
                <strong>${expense.category}</strong> - ₹ ${expense.amount.toFixed(2)} - ${expense.date}
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            expenseList.appendChild(listItem);
        });
    }

    function calculateTotalExpense() {
        const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);
        totalExpense.textContent = `Total Expenses: ₹ ${total.toFixed(2)}`;
    }

    function deleteExpense(index) {
        expenses.splice(index, 1);
        displayExpenses();
        calculateTotalExpense();
        saveExpenses();
    }

    function saveExpenses() {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    // Event delegation for delete buttons
    expenseList.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.getAttribute('data-index');
            deleteExpense(index);
        }
    });

    // Initial rendering
    displayExpenses();
    calculateTotalExpense();
});
