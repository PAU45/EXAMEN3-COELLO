import Navbar from '../src/components/Navbar';
import { Box, Typography, Paper } from '@mui/material';
import { FC } from 'react';

const Home: FC = () => {
  return (
    <Box sx={{ background: '#f7f7f7', minHeight: '100vh', pb: 4 }}>
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        <Paper elevation={3} sx={{ p: 5, textAlign: 'center', maxWidth: 500 }}>
          <Typography variant="h3" sx={{ color: '#1976d2', mb: 2 }}>
            Bienvenido a la Farmacia
          </Typography>
          <Typography variant="h6" sx={{ color: '#333' }}>
            Sistema de gestión de medicamentos, órdenes y más.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Home;
