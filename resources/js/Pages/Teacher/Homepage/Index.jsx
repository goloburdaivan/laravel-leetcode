import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Drawer, List, ListItem, ListItemText, IconButton, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import Courses from './Components/Courses.jsx';
import CreateCourseModal from './Components/CreateCourseModal.jsx';

export default function TeacherDashboard({ teacher }) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
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

            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, mt: 8 }}
            >
                <Toolbar />
                <Container maxWidth="lg">
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                        <Typography variant="h4">My Courses</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={handleOpenModal}
                        >
                            Create Course
                        </Button>
                    </Box>
                    <Courses courses={teacher.courses} />
                </Container>
            </Box>

            <CreateCourseModal
                open={modalOpen}
                onClose={handleCloseModal}
            />
        </Box>
    );
}
