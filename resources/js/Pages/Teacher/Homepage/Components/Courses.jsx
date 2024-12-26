import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, CardActions, Modal, Box, TextField, Snackbar, Alert } from '@mui/material';
import { Link } from '@inertiajs/react';
import axios from 'axios';

export default function Courses({ courses }) {
    const [openModal, setOpenModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [userId, setUserId] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const handleOpenModal = (course) => {
        setSelectedCourse(course);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedCourse(null);
        setUserId('');
    };

    const handleInvite = async () => {
        if (!userId) {
            setSnackbar({
                open: true,
                message: "Please enter a user ID",
                severity: "warning",
            });
            return;
        }
        try {
            const response = await axios.post(`/teacher/courses/${selectedCourse.id}/invite`, {
                user_id: userId
            });
            setSnackbar({
                open: true,
                message: response.data.message,
                severity: "success",
            });
            handleCloseModal();
        } catch (error) {
            setSnackbar({
                open: true,
                message: error.response?.data?.message || 'Failed to invite user',
                severity: "error",
            });
        }
    };

    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <>
            <Grid container spacing={3}>
                {courses.map((course) => (
                    <Grid item xs={12} sm={6} md={4} key={course.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {course.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {course.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    color="primary"
                                    component={Link}
                                    href={`/teacher/courses/${course.id}`}
                                >
                                    View Course
                                </Button>
                                <Button size="small" color="success" onClick={() => handleOpenModal(course)}>
                                    Invite User
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Modal open={openModal} onClose={handleCloseModal}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    width: 300
                }}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Invite User to {selectedCourse?.name}
                    </Typography>
                    <TextField
                        label="User ID"
                        variant="outlined"
                        fullWidth
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                    <Box mt={2} display="flex" justifyContent="space-between">
                        <Button variant="contained" color="primary" onClick={handleInvite}>
                            Send Invitation
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleCloseModal}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
}
