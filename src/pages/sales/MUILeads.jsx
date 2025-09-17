import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Card,
  CardContent,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  PersonAdd
} from '@mui/icons-material';
import { MUIToolbar } from '../../components/layout/MUIToolbar.jsx';

const MUILeads = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [leads, setLeads] = useState([
    {
      id: 1,
      name: 'Tech Solutions Lead',
      company: 'TechCorp Inc',
      email: 'contact@techcorp.com',
      status: 'In Process',
      priority: 'High'
    },
    {
      id: 2,
      name: 'Marketing Campaign Lead',
      company: 'Digital Agency Ltd',
      email: 'sales@digitalagency.com',
      status: 'Qualified',
      priority: 'Medium'
    },
    {
      id: 3,
      name: 'Enterprise Software Lead',
      company: 'Enterprise Solutions',
      email: 'info@enterprise.com',
      status: 'In Process',
      priority: 'Low'
    }
  ]);
  const [detailsTab, setDetailsTab] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    contactFirstName: '',
    contactLastName: '',
    status: '',
    qualificationLevel: '',
    source: '',
    category: '',
    priority: '',
    campaign: '',
    owner: '',
    followUpActivity: '',
    city: '',
    country: '',
    state: '',
    postalCode: '',
    language: '',
    phone: '',
    mobile: '',
    email: '',
    notes: ''
  });

  const handleToolbarAction = (action) => {
    if (action === 'add') {
      setShowForm(true);
      setShowDetails(false);
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
    setLeads(prev => [...prev, { ...formData, id: Date.now() }]);
    setFormData({
      name: '',
      company: '',
      contactFirstName: '',
      contactLastName: '',
      status: '',
      qualificationLevel: '',
      source: '',
      category: '',
      priority: '',
      campaign: '',
      owner: '',
      followUpActivity: '',
      city: '',
      country: '',
      state: '',
      postalCode: '',
      language: '',
      phone: '',
      mobile: '',
      email: '',
      notes: ''
    });
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const handleLeadClick = () => {
    setShowDetails(true);
    setShowForm(false);
  };

  const detailsTabs = [
    'Overview', 'Feed', 'Notes', 'Activities', 'Sales & Marketing Team', 
    'Conversion', 'Attachments', 'Surveys', 'Related Opportunities', 'Hubspot'
  ];

  if (showDetails) {
    return (
      <Box>
        <MUIToolbar title="Leads - Lead Details" onAction={handleToolbarAction} />
        
        <Box sx={{ p: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom color="primary" fontWeight="bold">
                Lead Details
              </Typography>
              
              <Tabs 
                value={detailsTab} 
                onChange={(e, newValue) => setDetailsTab(newValue)}
                variant={isMobile ? "scrollable" : "fullWidth"}
                scrollButtons="auto"
                sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
              >
                {detailsTabs.map((tab, index) => (
                  <Tab key={index} label={tab} />
                ))}
              </Tabs>
              
              {detailsTabs.map((tab, index) => (
                detailsTab === index && (
                  <Box key={index} sx={{ py: 3 }}>
                    <Typography color="textSecondary" align="center">
                      No {tab.toLowerCase()} data available
                    </Typography>
                  </Box>
                )
              ))}
            </CardContent>
          </Card>
          
          <Box sx={{ mt: 2 }}>
            <Button variant="outlined" onClick={() => setShowDetails(false)}>
              Back to Leads List
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }

  if (showForm) {
    return (
      <Box>
        <MUIToolbar title="Leads - New Lead" onAction={handleToolbarAction} />
        
        <Box sx={{ p: 3 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom color="primary" fontWeight="bold">
              Lead Information
            </Typography>
            
            <form onSubmit={handleSubmit}>
              {/* General Details Section */}
              <Typography variant="h6" sx={{ mt: 3, mb: 2, color: theme.palette.text.secondary }}>
                General Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Company"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Contact First Name"
                    value={formData.contactFirstName}
                    onChange={(e) => handleInputChange('contactFirstName', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Contact Last Name"
                    value={formData.contactLastName}
                    onChange={(e) => handleInputChange('contactLastName', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      label="Status"
                    >
                      <MenuItem value="in-process">In Process</MenuItem>
                      <MenuItem value="qualified">Qualified</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Qualification Level</InputLabel>
                    <Select
                      value={formData.qualificationLevel}
                      onChange={(e) => handleInputChange('qualificationLevel', e.target.value)}
                      label="Qualification Level"
                    >
                      <MenuItem value="cold">Cold</MenuItem>
                      <MenuItem value="warm">Warm</MenuItem>
                      <MenuItem value="hot">Hot</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Source"
                    value={formData.source}
                    onChange={(e) => handleInputChange('source', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Category"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Priority</InputLabel>
                    <Select
                      value={formData.priority}
                      onChange={(e) => handleInputChange('priority', e.target.value)}
                      label="Priority"
                    >
                      <MenuItem value="low">Low</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="high">High</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Campaign"
                    value={formData.campaign}
                    onChange={(e) => handleInputChange('campaign', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Owner"
                    value={formData.owner}
                    onChange={(e) => handleInputChange('owner', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Follow-up Activity"
                    value={formData.followUpActivity}
                    onChange={(e) => handleInputChange('followUpActivity', e.target.value)}
                  />
                </Grid>
              </Grid>

              {/* Account Information Section */}
              <Typography variant="h6" sx={{ mt: 3, mb: 2, color: theme.palette.text.secondary }}>
                Account Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="City"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Country/Region"
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="State"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Postal Code"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Language</InputLabel>
                    <Select
                      value={formData.language}
                      onChange={(e) => handleInputChange('language', e.target.value)}
                      label="Language"
                    >
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="es">Spanish</MenuItem>
                      <MenuItem value="fr">French</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              {/* Contact Information Section */}
              <Typography variant="h6" sx={{ mt: 3, mb: 2, color: theme.palette.text.secondary }}>
                Contact Information
              </Typography>
              <Grid container spacing={2}>
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
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </Grid>
              </Grid>

              {/* Notes Section */}
              <Typography variant="h6" sx={{ mt: 3, mb: 2, color: theme.palette.text.secondary }}>
                Notes
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Notes"
                    multiline
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button variant="outlined" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button variant="contained" type="submit">
                  Save Lead
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
      <MUIToolbar title="Leads" onAction={handleToolbarAction} />
      
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
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem' }}>Company</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem' }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem' }}>Priority</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                      <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center',
                        gap: 2
                      }}>
                        <PersonAdd sx={{ fontSize: 48, color: 'grey.400' }} />
                        <Typography variant="h6" color="textSecondary">
                          No leads found
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Click the Add button to create your first lead
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : (
                  leads.map((lead, index) => (
                    <TableRow 
                      key={lead.id} 
                      hover 
                      onClick={handleLeadClick}
                      sx={{ 
                        cursor: 'pointer',
                        '&:hover': { 
                          backgroundColor: '#f8fafc',
                          transform: 'scale(1.001)',
                          transition: 'all 0.2s'
                        }
                      }}
                    >
                      <TableCell sx={{ fontWeight: 600 }}>{lead.name}</TableCell>
                      <TableCell>{lead.company}</TableCell>
                      <TableCell sx={{ color: '#1976D2' }}>{lead.email}</TableCell>
                      <TableCell>
                        <Box sx={{
                          display: 'inline-block',
                          px: 2,
                          py: 0.5,
                          borderRadius: 20,
                          backgroundColor: lead.status === 'Qualified' ? '#e8f5e8' : '#fff3cd',
                          color: lead.status === 'Qualified' ? '#2e7d2e' : '#8a6d3b',
                          fontSize: '0.75rem',
                          fontWeight: 600
                        }}>
                          {lead.status}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{
                          display: 'inline-block',
                          px: 2,
                          py: 0.5,
                          borderRadius: 20,
                          backgroundColor: lead.priority === 'High' ? '#ffebee' : lead.priority === 'Medium' ? '#fff3e0' : '#f3e5f5',
                          color: lead.priority === 'High' ? '#c62828' : lead.priority === 'Medium' ? '#ef6c00' : '#7b1fa2',
                          fontSize: '0.75rem',
                          fontWeight: 600
                        }}>
                          {lead.priority}
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

export default MUILeads;