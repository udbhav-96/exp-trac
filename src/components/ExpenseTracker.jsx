// src/components/ExpenseTracker.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { firestore } from '../firebase';
import { signOut } from 'firebase/auth';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { Navigate, useNavigate } from 'react-router-dom';
import { Typography, Button, TextField, Paper, List, 
  ListItem, ListItemText, ListItemSecondaryAction,
  IconButton, Divider,Dialog,
  DialogTitle,
  DialogContent,
  MenuItem, FormControl, InputLabel, Select,
  DialogActions, } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import WarningIcon from '@mui/icons-material/Warning';

// *************************************************************************************
// *************************************************************************************

const ExpenseTracker = () => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState('');
  const navigate = useNavigate();

   const handleLogout = async () => {
    try {
      await signOut(user.auth);
      navigate('/login'); // Navigate directly after signOut
    } catch (error) {
      console.error('Error signing out:', error);
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
    const fetchData = async () => {
      if (user) {
        const expensesCollection = collection(firestore, 'expenses');
        const expensesSnapshot = await getDocs(expensesCollection);
        setExpenses(expensesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      }
    };

    fetchData();
  }, [user]);


  const handleAddExpense = async () => {
    try {
       if (!newExpense.amount || !newExpense.category || !newExpense.date || !newExpense.description) {
          alert('Please fill in all required fields.');
          return;
        }
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

  // const handleAddExpense = async () => {
  //   if (user) {
  //     const expensesCollection = collection(firestore, 'expenses');
  //     await addDoc(expensesCollection, { text: newExpense, userId: user.uid });
  //     setNewExpense('');
  //   }
  // };

  const handleEditExpense = async (id, newText) => {
    if (user) {
      const expenseDocRef = doc(firestore, 'expenses', id);
      await updateDoc(expenseDocRef, { text: newText });
    }
  };

  // const handleDeleteExpense = async (id) => {
  //   if (user) {
  //     const expenseDocRef = doc(firestore, 'expenses', id);
  //     await deleteDoc(expenseDocRef);
  //   }
  // };

   const [selectedExpense, setSelectedExpense] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteExpense = (expenseId) => {
    setSelectedExpense(expenseId);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteExpense = async () => {
    try {
      const expenseRef = doc(firestore, 'expenses', selectedExpense);
      await deleteDoc(expenseRef);
      // Close the delete dialog
      setDeleteDialogOpen(false);
      // Refresh the list of expenses after deleting one
      fetchExpenses();
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  return (
    <div>
      {user ? (
        <div style={{ padding: '20px' }}>
      <Typography variant="h4">Welcome, {user.displayName}!</Typography>
      <Button variant="contained" color="primary" onClick={handleLogout} style={{ marginTop: '10px' }}>
        Logout
      </Button>

      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5">Add Expense</Typography>
        
        <TextField
          label="Amount"
          type="text"
          value={newExpense.amount}
          onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
          fullWidth
          margin="normal"
          required
        />
        <FormControl fullWidth>
          <InputLabel id="category-label">Category *</InputLabel>
          <Select
            labelId="category-label"
            id="category-select"
            value={newExpense.category}
            label="Category *"
            onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
          >
            <MenuItem value="" disabled>
              <em>Select Category</em>
            </MenuItem>
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="Travel">Travel</MenuItem>
            <MenuItem value="Grocery">Grocery</MenuItem>
            <MenuItem value="Entertainment">Entertainment</MenuItem>
          </Select>
        </FormControl>

        <TextField
          // label="Date"
          type="date"
          value={newExpense.date}
          onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          type="text"
          value={newExpense.description}
          onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
          fullWidth
          margin="normal"
          required
        />
        {/*<Button variant="contained" color="primary" onClick={handleAddExpense} style={{ marginTop: '10px' }}>
                  Add Expense
                </Button>*/}
        <Button variant="contained" color="primary" onClick={handleAddExpense} style={{ marginTop: '10px', marginRight: '10px' }}>
          <AddCircleIcon style={{ marginRight: '5px' }} />
          Add Expense
        </Button>
        {/*<Button variant="contained" color="warning" onClick={handleAddExpense} style={{ marginTop: '10px' }}>
          <WarningIcon style={{ marginRight: '5px' }} />
          Add Warning Expense
        </Button>*/}
      </Paper>

      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5">Expense List</Typography>
        <List>
          {expenses.map((expense) => (
            <div key={expense.id}>
              <ListItem>
                <ListItemText
                  primary={`Amount: ${expense.amount}, Category: ${expense.category}, Date: ${expense.date}, Description: ${expense.description}`}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteExpense(expense.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </Paper>

      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Are you sure you want to delete this expense?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDeleteExpense} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>




      ) : (
        <p>Please log in to use the Expense Tracker.</p>
      )}
    </div>
  );
}

export default ExpenseTracker;
