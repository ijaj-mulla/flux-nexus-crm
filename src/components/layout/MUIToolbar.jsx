import React from 'react';
import {
  Paper,
  Typography,
  IconButton,
  Tooltip,
  Box,
  useTheme
} from '@mui/material';
import {
  Search,
  Sort,
  PieChart,
  FilterList,
  Add,
  Refresh,
  MoreHoriz
} from '@mui/icons-material';

export const MUIToolbar = ({ title, onAction }) => {

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        p: 3,
        mb: 2,
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        border: '1px solid #e2e8f0',
        borderRadius: 3
      }}
    >
      <Typography 
        variant="h4" 
        sx={{ 
          fontWeight: 700,
          background: 'linear-gradient(135deg, #004B87 0%, #1976D2 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}
      >
        {title}
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Tooltip title="Search">
          <IconButton 
            sx={{ 
              color: '#004B87',
              backgroundColor: '#f0f7ff',
              '&:hover': { backgroundColor: '#e0f2fe', transform: 'scale(1.05)' },
              transition: 'all 0.2s'
            }}
          >
            <Search />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Sort">
          <IconButton 
            sx={{ 
              color: '#004B87',
              backgroundColor: '#f0f7ff',
              '&:hover': { backgroundColor: '#e0f2fe', transform: 'scale(1.05)' },
              transition: 'all 0.2s'
            }}
          >
            <Sort />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Analytics">
          <IconButton 
            sx={{ 
              color: '#004B87',
              backgroundColor: '#f0f7ff',
              '&:hover': { backgroundColor: '#e0f2fe', transform: 'scale(1.05)' },
              transition: 'all 0.2s'
            }}
          >
            <PieChart />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Filter">
          <IconButton 
            sx={{ 
              color: '#004B87',
              backgroundColor: '#f0f7ff',
              '&:hover': { backgroundColor: '#e0f2fe', transform: 'scale(1.05)' },
              transition: 'all 0.2s'
            }}
          >
            <FilterList />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Add New">
          <IconButton 
            onClick={() => onAction('add')}
            sx={{ 
              color: '#ffffff',
              background: 'linear-gradient(135deg, #38a169 0%, #2f855a 100%)',
              '&:hover': { 
                background: 'linear-gradient(135deg, #2f855a 0%, #276749 100%)',
                transform: 'scale(1.05)',
                boxShadow: '0 4px 12px rgba(56, 161, 105, 0.3)'
              },
              transition: 'all 0.2s'
            }}
          >
            <Add />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Refresh">
          <IconButton 
            sx={{ 
              color: '#004B87',
              backgroundColor: '#f0f7ff',
              '&:hover': { backgroundColor: '#e0f2fe', transform: 'scale(1.05)' },
              transition: 'all 0.2s'
            }}
          >
            <Refresh />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="More Options">
          <IconButton 
            sx={{ 
              color: '#004B87',
              backgroundColor: '#f0f7ff',
              '&:hover': { backgroundColor: '#e0f2fe', transform: 'scale(1.05)' },
              transition: 'all 0.2s'
            }}
          >
            <MoreHoriz />
          </IconButton>
        </Tooltip>
      </Box>
    </Paper>
  );
};