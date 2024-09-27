import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, Paper, Box, Tabs, Tab, CircularProgress } from '@mui/material';
import { useForm } from '@inertiajs/react';
import LabForm from './Components/LabForm.jsx';
import Navigation from "@/Pages/Components/Navigation.jsx";
import TestCases from "@/Pages/Teacher/Lab/Components/TestCases.jsx";
import Submissions from "@/Pages/Teacher/Lab/Components/Submissions.jsx";
import Tips from '@/Pages/Teacher/Lab/Components/Tips.jsx';

const EditLab = ({ lab, lists }) => {
    const { data, setData, put } = useForm({
        title: lab.title,
        description: lab.description || '',
        starter_code: lab.starter_code,
        due_date: lab.due_date ? new Date(lab.due_date).toISOString().split('T')[0] : '',
    });

    const [tabIndex, setTabIndex] = useState(0);
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFieldChange = (key, value) => {
        setData(key, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/teacher/courses/${lab.course_id}/labs/${lab.id}`);
    };

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);

        if (newValue === 1 && submissions.length === 0) {
            fetchSubmissions();
        }
    };

    const fetchSubmissions = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/teacher/labs/${lab.id}/submissions?page=1`);
            setSubmissions(response.data.submissions);
        } catch (error) {
            console.error("Error fetching submissions:", error);
        } finally {
            setLoading(false);
        }
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
                            <Tabs
                                value={tabIndex}
                                onChange={handleTabChange}
                                indicatorColor="primary"
                                textColor="primary"
                                centered
                            >
                                <Tab label="Test Cases" />
                                <Tab label="Submissions" />
                                <Tab label="Tips" /> {/* New Tab for Tips */}
                            </Tabs>

                            {tabIndex === 0 && (
                                <Box mt={2}>
                                    <Typography variant="h5" gutterBottom>
                                        Test Cases
                                    </Typography>
                                    <TestCases lab={lab} />
                                </Box>
                            )}

                            {tabIndex === 1 && (
                                <Box mt={2}>
                                    <Typography variant="h5" gutterBottom>
                                        Submissions
                                    </Typography>
                                    {loading ? (
                                        <CircularProgress />
                                    ) : (
                                        <Submissions
                                            lab={lab}
                                            statuses={lists.execution_status}
                                            fetchedSubmissions={submissions}
                                        />
                                    )}
                                </Box>
                            )}

                            {tabIndex === 2 && (
                                <Box mt={2}>
                                    <Tips lab={lab} />
                                </Box>
                            )}
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </Box>
    );
};

export default EditLab;
