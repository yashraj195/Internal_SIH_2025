import { useState, useEffect } from 'react';
import notificationService from '../api/notificationService';
import { IconButton, Badge, Menu, MenuItem, ListItemText } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const NotificationBell = () => {
    const [notifications, setNotifications] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        const fetchNotifications = () => {
            notificationService.getMyNotifications()
                .then(res => setNotifications(res.data))
                .catch(console.error);
        };

        fetchNotifications();
        const intervalId = setInterval(fetchNotifications, 30000);

        return () => clearInterval(intervalId);
    }, []);

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <>
            <IconButton color="inherit" onClick={handleClick}>
                <Badge badgeContent={unreadCount} color="error">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                {notifications.length > 0 ? (
                    notifications.map(n => (
                        <MenuItem key={n._id} onClick={handleClose}>
                            <ListItemText primary={n.message} />
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem onClick={handleClose}>No new notifications</MenuItem>
                )}
            </Menu>
        </>
    );
};

export default NotificationBell;