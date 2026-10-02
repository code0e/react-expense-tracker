import { useState } from "react";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!description || !amount) {
      setError("Please enter a description and amount");
      return;
    }

    setError("");

    const newTransaction = {
      id: Date.now(),
      description,
      amount: Number(amount),
      type,
    };

    setTransactions([...transactions, newTransaction]);

    setDescription("");
    setAmount("");
    setType("expense");
  }

  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const balance = income - expenses;

  function deleteTransaction(id) {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id),
    );
  }

  return (
    <div className="app">
      <h1>Expense Tracker</h1>

      <div className="summary">
        <div className="summary-card">
          <p>Balance</p>
          <h2>₦{balance}</h2>
        </div>

        <div className="summary-card">
          <p>Income</p>
          <h2>₦{income}</h2>
        </div>

        <div className="summary-card">
          <p>Expenses</p>
          <h2>₦{expenses}</h2>
        </div>
      </div>

      <div className="transaction-section">
        <h2>Add Transaction</h2>

        {error && <p className="form-error">{error}</p>}

        <form className="transaction-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Description"
          />

          <input
            type="number"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="Amount"
          />

          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <button type="submit">Add Transaction</button>
        </form>
      </div>

      <div className="transactions">
        <h2>Transactions</h2>

        {transactions.map(function (transaction) {
          return (
            <div
              className={`transaction-item ${
                transaction.type === "income" ? "income" : "expense"
              }`}
              key={transaction.id}
            >
              <h3>{transaction.description}</h3>
              <p>₦{transaction.amount}</p>
              <p>{transaction.type === "income" ? "Income" : "Expense"}</p>
              <button onClick={() => deleteTransaction(transaction.id)}>
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
