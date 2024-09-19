import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import { useForm, usePage } from '@inertiajs/react';
import LabForm from './Components/LabForm.jsx';

const CreateLab = () => {
    const { post } = useForm({
        description: '',
        starter_code: '// Write your code here...',
        due_date: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/teacher/courses/30/labs/store`);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Create New Programming Lab
            </Typography>
            <Paper sx={{ p: 3 }}>
                <LabForm
                    onSubmit={(key, value) => setData(key, value)}
                    initialValues={{ description: '', starter_code: '// Write your code here...', due_date: '' }}
                    title="Create New Programming Lab"
                />
            </Paper>
        </Container>
    );
};

export default CreateLab;
