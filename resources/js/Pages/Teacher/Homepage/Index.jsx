import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Courses from './Components/Courses.jsx';

export default function TeacherDashboard({ teacher }) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    console.log(teacher);
    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Teacher's Dashboard
                    </Typography>
                    <Button color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer}
                sx={{ width: 240, flexShrink: 0 }}
            >
                <List>
                    <ListItem button>
                        <ListItemText primary="My Courses" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Invitations" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Add Students" />
                    </ListItem>
                </List>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {/* Компонент с курсами */}
                <Courses />
            </Box>
        </Box>
    );
}
