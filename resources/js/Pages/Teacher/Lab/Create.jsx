import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import { useForm } from '@inertiajs/react';
import LabForm from './Components/LabForm.jsx';
import Navigation from "@/Pages/Components/Navigation.jsx";

const CreateLab = ({ course }) => {
    const { setData, post, data } = useForm({
        title: '',
        description: '',
        starter_code: '',
        due_date: '',
    });

    const handleFieldChange = (key, value) => {
        setData(key, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/teacher/courses/${course.id}/labs/store`);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Navigation />
            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
                <Container maxWidth="lg" sx={{ mt: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        Create Lab
                    </Typography>
                    <Paper sx={{ p: 3 }}>
                        <LabForm
                            onFieldChange={handleFieldChange}
                            initialValues={data}
                            handleSubmit={handleSubmit}
                            title="Create New Programming Lab"
                        />
                    </Paper>
                </Container>
            </Box>
        </Box>
    );
};

export default CreateLab;
