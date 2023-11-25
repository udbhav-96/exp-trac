// src/components/ExpenseTracker.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { firestore } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const ExpenseTracker = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    amount: '',
    category: '',
    date: '',
    description: '',
  });

  const handleLogout = async () => {
    try {
      await signOut(user.auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleAddExpense = async () => {
    try {
      const expensesCollection = collection(firestore, 'expenses');
      await addDoc(expensesCollection, {
        ...newExpense,
        userId: user.uid,
      });
      // Refresh the list of expenses after adding a new one
      fetchExpenses();
      setNewExpense({
        amount: '',
        category: '',
        date: '',
        description: '',
      });
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const fetchExpenses = async () => {
    try {
      const expensesCollection = collection(firestore, 'expenses');
      const expensesSnapshot = await getDocs(expensesCollection);
      setExpenses(expensesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []); // Fetch expenses on component mount

  return (
    
  );
};

export default ExpenseTracker;


// <h2>Expense Tracker</h2>
          //  <h2>Welcome, {user.displayName}!</h2>
          // <button onClick={handleLogout}>Logout</button>
          // <ul>
            {expenses.map((expense) => (
          //     <li key={expense.id}>
          //       {expense.text}
          //       <button onClick={() => handleEditExpense(expense.id, prompt('Edit expense:', expense.text))}>
          //         Edit
          //       </button>
          //       <button onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
          //     </li>
          //   ))}
          // </ul>
          // <input type="text" value={newExpense} onChange={(e) => setNewExpense(e.target.value)} />
          // <button onClick={handleAddExpense}>Add Expense</button>