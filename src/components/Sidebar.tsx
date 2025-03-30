import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';

const drawerWidth = 240;

interface SidebarItem {
  id: string;
  text: string;
  icon: React.ReactNode;
  path: string;
  divider?: boolean;
}

// Props for the Sidebar component
interface SidebarProps {
  items?: SidebarItem[];
  activeItem?: string;
  onItemClick?: (item: SidebarItem) => void;
  open?: boolean;
  variant?: 'permanent' | 'persistent' | 'temporary';
  logo?: string | React.ReactNode;
}

// Default sidebar items if none are provided
const defaultItems: SidebarItem[] = [
  { id: 'home', text: 'Dashboard', icon: <HomeIcon />, path: '/dashboard' },
  { id: 'orders', text: 'Orders', icon: <ShoppingCartIcon />, path: '/orders' },
  { id: 'shipments', text: 'Shipments', icon: <LocalShippingIcon />, path: '/shipments', divider: true },
  { id: 'profile', text: 'Profile', icon: <PersonIcon />, path: '/profile' },
  { id: 'settings', text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.default,
  },
}));

export default function Sidebar({
  items = defaultItems,
  activeItem,
  onItemClick,
  open = true,
  variant = 'permanent',
  logo = 'Shipping App'
}: SidebarProps) {
  return (
    <StyledDrawer
      variant={variant}
      open={open}
      anchor="left"
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {typeof logo === 'string' ? (
          <Typography variant="h6" noWrap component="div">
            {logo}
          </Typography>
        ) : (
          logo
        )}
      </Box>
      <Divider />
      <List>
        {items.map((item) => (
          <React.Fragment key={item.id}>
            <ListItem disablePadding>
              <ListItemButton
                selected={activeItem === item.id}
                onClick={() => onItemClick && onItemClick(item)}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'primary.light',
                    '&:hover': {
                      backgroundColor: 'primary.light',
                    },
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
            {item.divider && <Divider sx={{ my: 1 }} />}
          </React.Fragment>
        ))}
      </List>
    </StyledDrawer>
  );
}