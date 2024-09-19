import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import { useForm } from '@inertiajs/react';
import LabForm from './Components/LabForm.jsx';
import Navigation from "@/Pages/Components/Navigation.jsx";
import TestCases from "@/Pages/Teacher/Lab/Components/TestCases.jsx";

const EditLab = ({ lab }) => {
    const { data, setData, put, post } = useForm({
        title: lab.title,
        description: lab.description || '',
        starter_code: lab.starter_code,
        due_date: lab.due_date ? new Date(lab.due_date).toISOString().split('T')[0] : '',
    });

    const handleFieldChange = (key, value) => {
        setData(key, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/teacher/courses/${lab.course_id}/labs/${lab.id}`);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Navigation />
            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
                <Container maxWidth="lg" sx={{ mt: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        Edit Lab
                    </Typography>
                    <Paper sx={{ p: 3 }}>
                        <LabForm
                            handleSubmit={handleSubmit}
                            onFieldChange={handleFieldChange}
                            initialValues={{
                                title: data.title,
                                description: data.description,
                                starter_code: data.starter_code,
                                due_date: data.due_date,
                            }}
                            title="Edit Programming Lab"
                        />

                        <Box mt={4}>
                            <Typography variant="h5" gutterBottom>
                                Test Cases
                            </Typography>
                            <TestCases lab={lab} />
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </Box>
    );
};

export default EditLab;
