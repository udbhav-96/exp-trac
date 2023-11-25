// src/components/Home.jsx
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Container from "@mui/material/Container"; 
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Image } from 'mui-image'


const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const redirectToLogin = () => {
    // Use history.push to navigate to another page
    navigate('/login');
  };

  // Redirect to expense tracker page if the user is already logged in
  if (user) {
    return <Navigate to="/expense-tracker" />;
  }

  return (
    <div>
    	<Container 
    		maxWidth="lg" 
    		sx={{ 
    			height: "96vh",
    			display: "flex", 
                alignItems: "center", 
    			justifyContent: 'center',
    			flexDirection: 'column'
    		}}>
      		<Grid container spacing={2}>
        		{/* First Grid Item */}
		        <Grid item xs={12} sm={6} sx={{
	      			display: "flex", 
	                alignItems: "flex-start", 
	    			justifyContent: 'center',
	    			flexDirection: 'column'
	      		}}>
		            <Typography variant="h2" sx={{fontWeight: 700, color: "#5ae4a7"}}>
		              KHA₹CHA
		            </Typography>
		            <Typography variant="body1" pt={2} pb={2}>
		              Your Personal Expense Tracker App. Where you can Add, Edit, Delete and track your personal Finance.
		            </Typography>
		            <Button variant="contained" onClick={redirectToLogin} color="success">Let's Get Started</Button>
        		</Grid>
		        {/* Second Grid Item */}
		        <Grid item xs={12} sm={6}>
		        	<Image src="../src/assets/home.jpg" />
		        </Grid>
		      </Grid>
    	</Container>
    </div>
  );
};

export default Home;
