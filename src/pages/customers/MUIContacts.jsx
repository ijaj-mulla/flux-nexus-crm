import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme
} from '@mui/material';
import { MUIToolbar } from '../../components/layout/MUIToolbar.jsx';

const MUIContacts = () => {
  const theme = useTheme();
  const [showForm, setShowForm] = useState(false);
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@abc.com',
      phone: '+1-555-0123',
      mobile: '+1-555-0124',
      role: 'CEO'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@xyz.com',
      phone: '+1-555-0125',
      mobile: '+1-555-0126',
      role: 'CTO'
    },
    {
      id: 3,
      name: 'Michael Brown',
      email: 'michael.brown@global.com',
      phone: '+1-555-0127',
      mobile: '+1-555-0128',
      role: 'VP Sales'
    }
  ]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    mobile: '',
    address: ''
  });

  const handleToolbarAction = (action) => {
    if (action === 'add') {
      setShowForm(true);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setContacts(prev => [...prev, { ...formData, id: Date.now() }]);
    setFormData({
      name: '',
      email: '',
      phone: '',
      mobile: '',
      address: ''
    });
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  if (showForm) {
    return (
      <Box>
        <MUIToolbar title="Contacts - New Contact" onAction={handleToolbarAction} />
        
        <Box sx={{ p: 3 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom color="primary" fontWeight="bold">
              Contact Information
            </Typography>
            
            <form onSubmit={handleSubmit}>
              <Typography variant="h6" sx={{ mt: 3, mb: 2, color: theme.palette.text.secondary }}>
                Contact Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Mobile"
                    value={formData.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button variant="outlined" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button variant="contained" type="submit">
                  Save Contact
                </Button>
              </Box>
            </form>
          </Paper>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <MUIToolbar title="Contacts" onAction={handleToolbarAction} />
      
      <Box sx={{ p: 3 }}>
        <Paper sx={{ 
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem' }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem' }}>Phone</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem' }}>Mobile</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem' }}>Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contacts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                      <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center',
                        gap: 2
                      }}>
                        <Contacts sx={{ fontSize: 48, color: 'grey.400' }} />
                        <Typography variant="h6" color="textSecondary">
                          No contacts found
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Click the Add button to create your first contact
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : (
                  contacts.map((contact, index) => (
                    <TableRow 
                      key={contact.id}
                      sx={{ 
                        '&:hover': { 
                          backgroundColor: '#f8fafc',
                          transform: 'scale(1.001)',
                          transition: 'all 0.2s'
                        },
                        cursor: 'pointer'
                      }}
                    >
                      <TableCell sx={{ fontWeight: 600 }}>{contact.name}</TableCell>
                      <TableCell>{contact.email}</TableCell>
                      <TableCell>{contact.phone}</TableCell>
                      <TableCell>{contact.mobile}</TableCell>
                      <TableCell>
                        <Box sx={{
                          display: 'inline-block',
                          px: 2,
                          py: 0.5,
                          borderRadius: 20,
                          backgroundColor: '#e0f2fe',
                          color: '#004B87',
                          fontSize: '0.75rem',
                          fontWeight: 600
                        }}>
                          {contact.role}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  );
};

export default MUIContacts;