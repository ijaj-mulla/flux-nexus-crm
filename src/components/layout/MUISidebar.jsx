import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Collapse,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
  Divider
} from '@mui/material';
import {
  Home,
  DashboardCustomize,
  CalendarMonth,
  People,
  Business,
  Contacts,
  TrendingUp,
  PersonAdd,
  Assignment,
  VisibilityOutlined,
  Extension,
  Settings,
  ExpandLess,
  ExpandMore,
  ChevronLeft,
  Email,
  Task
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 280;

export const MUISidebar = ({ open, onClose }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [expandedItems, setExpandedItems] = useState({
    customers: true,
    sales: true,
    activities: false,
    analysis: false,
    integrations: false
  });

  const toggleExpanded = (item) => {
    setExpandedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      onClose();
    }
  };

  const menuItems = [
    { label: 'Home', icon: <Home />, path: '/' },
    { label: 'Dashboard', icon: <DashboardCustomize />, path: '/dashboard' },
    { label: 'Calendar', icon: <CalendarMonth />, path: '/calendar' },
    {
      label: 'Customers',
      icon: <People />,
      expandKey: 'customers',
      children: [
        { label: 'Accounts', icon: <Business />, path: '/customers/accounts' },
        { label: 'Contacts', icon: <Contacts />, path: '/customers/contacts' },
        { label: 'Account Hierarchy', icon: <TrendingUp />, path: '/customers/hierarchy' }
      ]
    },
    {
      label: 'Sales',
      icon: <TrendingUp />,
      expandKey: 'sales',
      children: [
        { label: 'Leads', icon: <PersonAdd />, path: '/sales/leads' },
        { label: 'Opportunities', icon: <Assignment />, path: '/sales/opportunities' },
        { label: 'Sales Quotes', icon: <Assignment />, path: '/sales/quotes' },
        { label: 'Sales Orders', icon: <Assignment />, path: '/sales/orders' }
      ]
    },
    {
      label: 'Activities',
      icon: <Task />,
      expandKey: 'activities',
      children: [
        { label: 'Appointments', icon: <CalendarMonth />, path: '/activities/appointments' },
        { label: 'E-Mails', icon: <Email />, path: '/activities/emails' },
        { label: 'Tasks', icon: <Task />, path: '/activities/tasks' }
      ]
    },
    { label: 'Visits', icon: <VisibilityOutlined />, path: '/visits' },
    {
      label: 'Integrations',
      icon: <Extension />,
      expandKey: 'integrations',
      children: [
        { label: 'Email Integration', icon: <Email />, path: '/integrations/email' },
        { label: 'Google Leads Integration', icon: <Extension />, path: '/integrations/google' }
      ]
    },
    { label: 'Admin / Settings', icon: <Settings />, path: '/admin' }
  ];

  const renderMenuItem = (item, level = 0) => {
    const isActive = location.pathname === item.path;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems[item.expandKey];

    return (
      <React.Fragment key={item.label}>
        <ListItem disablePadding sx={{ pl: level * 2 }}>
          <ListItemButton
            onClick={hasChildren ? () => toggleExpanded(item.expandKey) : () => handleNavigation(item.path)}
            selected={isActive}
            sx={{
              borderRadius: 2,
              mx: 1,
              my: 0.5,
              transition: 'all 0.2s ease',
              '&.Mui-selected': {
                background: 'linear-gradient(135deg, #004B87 0%, #1976D2 100%)',
                color: 'white',
                boxShadow: '0 4px 12px rgba(0, 75, 135, 0.3)',
                transform: 'translateX(4px)',
                '& .MuiListItemIcon-root': {
                  color: 'white',
                },
                '&:hover': {
                  background: 'linear-gradient(135deg, #003366 0%, #1565C0 100%)',
                  transform: 'translateX(6px)',
                },
              },
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.08)',
                transform: 'translateX(2px)',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
            {hasChildren && (isExpanded ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
        </ListItem>
        
        {hasChildren && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children.map(child => renderMenuItem(child, level + 1))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  const drawerContent = (
    <>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: theme.spacing(3),
        background: 'linear-gradient(135deg, #004B87 0%, #1976D2 100%)',
        color: 'white'
      }}>
        <Typography variant="h5" fontWeight="bold" sx={{ 
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <Business sx={{ fontSize: 28 }} />
          CRM Pro
        </Typography>
        {isMobile && (
          <IconButton onClick={onClose} sx={{ color: 'white' }}>
            <ChevronLeft />
          </IconButton>
        )}
      </div>
      
      <List sx={{ pt: 1 }}>
        {menuItems.map(item => renderMenuItem(item))}
      </List>
    </>
  );

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'persistent'}
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: `1px solid ${theme.palette.divider}`,
        },
      }}
      ModalProps={{
        keepMounted: true, // Better mobile performance
      }}
    >
      {drawerContent}
    </Drawer>
  );
};