// src/components/Login.js
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { signInWithGoogle } from '../auth';
import { Navigate } from 'react-router-dom';
import Button from '@mui/material/Button';  
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

const Login = () => {
  const { user } = useAuth();

  const handleGoogleSignIn = () => {
    signInWithGoogle();
  };

  // Redirect to expense tracker page if the user is already logged in
  if (user) {
    return <Navigate to="/expense-tracker" />;
  }

  return (
    <Container component="main" maxWidth="xs" sx={{
      height: "96vh",
          display: "flex", 
                alignItems: "center", 
          justifyContent: 'center',
          flexDirection: 'column'
    }}>
      <CssBaseline />
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoogleSignIn}
        >
          Login with Google
        </Button>
    </Container>

  );
};

export default Login;
