import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Box,
  Divider,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Fragment } from 'react';
import { logoutUser } from '../store/authThunks';
import { useAppDispatch } from '../store/hooks';
import { Language } from './Language';
import { useTranslation } from 'react-i18next'; // Add this import

const drawerWidth = 80;

type  SidebarItem ={
  id: string;
  text: string;
  icon: React.ReactNode;
  path?: string;
  divider?: boolean;
  action?: () => void;
}

type  SidebarProps= {
  items?: SidebarItem[];
  activeItem?: string;
  onItemClick?: (item: SidebarItem) => void;
  open?: boolean;
  variant?: 'permanent' | 'persistent' | 'temporary';
  logo?: string | React.ReactNode;
}

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
  activeItem,
  onItemClick,
  open = true,
  variant = 'permanent',
  logo = 'https://cdn.shopify.com/app-store/listing_images/c42baaedb29a5dfada3ffa6b24bbb3aa/icon/COT40q6b5fgCEAE=.jpeg',
}: SidebarProps) {
  const { t } = useTranslation(); // Add this hook for translations
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  // Use the translations from i18n
  const items: SidebarItem[] = [
    {
      id: 'home',
      text: t('sidebar.dashboard'),
      icon: <HomeIcon fontSize="large" />,
      path: '/dashboard'
    },
    {
      id: 'tracking',
      text: t('sidebar.tracking'),
      icon: <ShoppingCartIcon fontSize="large" />,
      path: '/tracking'
    },
    {
      id: 'shipments',
      text: t('sidebar.shipments'),
      icon: <LocalShippingIcon fontSize="large" />,
      path: '/shipment',
      divider: true
    },
    {
      id: 'logout',
      text: t('sidebar.logout'),
      icon: <LogoutIcon fontSize="large" />,
      action: () => handleLogout(),
      divider: true
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        width: '100%',
        overflow: 'hidden' // Prevent outer scrolling
      }}
    >
      <StyledDrawer variant={variant} open={open} anchor="left">
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src='https://cdn.shopify.com/app-store/listing_images/c42baaedb29a5dfada3ffa6b24bbb3aa/icon/COT40q6b5fgCEAE=.jpeg'
            alt="Logo"
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
        </Box>
        <Divider />
        <List
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          {items.map((item) => (
            <Fragment key={item.id}>
              <Tooltip title={item.text} placement="right">
                <ListItem disablePadding>
                  {item.path ? (
                    <ListItemButton
                      component={Link}
                      to={item.path}
                      selected={activeItem === item.id}
                      sx={{
                        justifyContent: 'center',
                        '&.Mui-selected': {
                          backgroundColor: 'primary.light',
                          '&:hover': {
                            backgroundColor: 'primary.light',
                          },
                        },
                        '&:hover': {
                          backgroundColor: 'action.hover',
                        },
                      }}
                    >
                      <ListItemIcon sx={{ justifyContent: 'center' }}>{item.icon}</ListItemIcon>
                    </ListItemButton>
                  ) : (
                    <ListItemButton
                      onClick={item.action}
                      sx={{
                        justifyContent: 'center',
                        '&:hover': {
                          backgroundColor: 'action.hover',
                        },
                      }}
                    >
                      <ListItemIcon sx={{ justifyContent: 'center' }}>{item.icon}</ListItemIcon>
                    </ListItemButton>
                  )}
                </ListItem>
              </Tooltip>
              {item.divider && <Divider sx={{ my: 1 }} />}
            </Fragment>
          ))}
        </List>
      </StyledDrawer>

      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          p: 2,
          overflow: 'auto',
          height: '100%'
        }}
      >
        <Box height={"80px"} display={"flex"} flex={1} justifyContent={"space-between"} alignItems={"center"} px={2}>
          <Language />
          <Box>
            <Tooltip title="Profile" placement="bottom">
              <ListItemIcon>
          <img
            src="https://mui.com/static/images/avatar/1.jpg"
            alt="Profile"
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
              </ListItemIcon>
            </Tooltip>
          </Box>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            boxShadow: 3,
            borderRadius: 2,
            p: 3,
            overflow: 'auto',
            height: '100%'
          }}
        >

          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
