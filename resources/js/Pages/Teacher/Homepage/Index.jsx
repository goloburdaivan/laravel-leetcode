import React, { useState } from 'react';
import { Toolbar, Typography, Button, Box, List, ListItem, ListItemText, IconButton, Container } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Courses from './Components/Courses.jsx';
import CreateCourseModal from './Components/CreateCourseModal.jsx';
import Navigation from "@/Pages/Components/Navigation.jsx";

export default function TeacherDashboard({ teacher }) {
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Navigation />
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
