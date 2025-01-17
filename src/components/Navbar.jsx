import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Box,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import EmailIcon from "@mui/icons-material/Email";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logOut();
    handleMenuClose();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* ✅ App Title */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Fantasy League Dashboard
        </Typography>

        {/* ✅ Profile Avatar */}
        <IconButton onClick={handleMenuOpen} color="inherit">
          <Avatar
            src={user?.profilePicture}
            alt={user?.username}
            sx={{ width: 40, height: 40 }}
          >
            {user?.username?.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>

        {/* ✅ Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {/* ✅ Username */}
          <MenuItem disabled>
            <Typography variant="subtitle1" fontWeight="bold">
              {user?.username}
            </Typography>
          </MenuItem>

          {/* ✅ Divider */}
          <Divider />

          {/* ✅ Email */}
          <MenuItem disabled>
            <EmailIcon sx={{ marginRight: 1 }} />
            {user?.email}
          </MenuItem>

          {/* ✅ Divider */}
          <Divider />

          {/* ✅ Logout Button */}
          <MenuItem onClick={handleLogout}>
            <LogoutIcon sx={{ marginRight: 1 }} />
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
