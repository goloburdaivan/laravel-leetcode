import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Tabs,
    Tab,
    Card,
    CardContent,
    Button,
    Divider,
    List,
    Snackbar,
    Alert,
    Modal,
    Dialog, DialogTitle, DialogContent
} from '@mui/material';
import { styled } from '@mui/system';
import { Editor } from "@monaco-editor/react";
import Navigation from "@/Pages/Components/Navigation.jsx";
import Hint from "@/Pages/Teacher/Lab/Components/Hint.jsx";
import SubmissionCard from "@/Pages/User/Lab/Components/SubmissionCard.jsx";

const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
}));

const StyledModalBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
}));

export default function LabPage({ lab }) {
    const [tabValue, setTabValue] = useState(0);
    const [code, setCode] = useState(lab.starter_code);
    const [output, setOutput] = useState('');
    const [pollingInterval, setPollingInterval] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const [openModal, setOpenModal] = useState(false);
    const [modalContent, setModalContent] = useState({ source_code: '', output: '' });  // данные для модалки

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleCodeChange = (newValue) => {
        setCode(newValue);
    };

    const checkSubmissionStatus = async (submissionId) => {
        try {
            const response = await axios.get(`/submissions/${submissionId}/status`);
            const status = response.data.status;

            if (status !== 'processing') {
                clearInterval(pollingInterval);
                setPollingInterval(null);
                window.location.reload();
            }
        } catch (error) {
            console.error('Ошибка при проверке статуса:', error);
        }
    };

    const startPolling = (submissionId) => {
        if (pollingInterval) {
            clearInterval(pollingInterval);
        }
        const interval = setInterval(() => checkSubmissionStatus(submissionId), 2000); // Периодичность 2 секунды
        setPollingInterval(interval);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`/labs/${lab.id}/submit`, {
                source_code: code
            });

            setSnackbarMessage(response.data.message || 'Код отправлен!');
            setSnackbarOpen(true);

            if (response.data.submission_id) {
                startPolling(response.data.submission_id);
            }
        } catch (error) {
            console.error('Ошибка при отправке кода:', error);
            setOutput('Ошибка при выполнении тестов.');
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <>
            <Navigation />
            <Container maxWidth="xl" sx={{ display: 'flex', height: '100vh', paddingTop: 10 }}>
                <Box sx={{ width: '35%', display: 'flex', flexDirection: 'column', pr: 2 }}>
                    <StyledCard>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>{lab.title}</Typography>
                            <Typography variant="body1" color="text.secondary" gutterBottom>
                                {lab.description}
                            </Typography>

                            <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
                                <Tab label="Відправки" />
                                <Tab label="Підказки" />
                            </Tabs>

                            {tabValue === 0 && (
                                <Box>
                                    {lab.submissions.length > 0 ? (
                                        <List>
                                            {lab.submissions.map((submission, index) => (
                                                <SubmissionCard
                                                    key={index}
                                                    submission={submission}
                                                    lab={lab}
                                                />
                                            ))}
                                        </List>
                                    ) : (
                                        <Typography variant="body2" color="text.secondary">Поки немає відправок.</Typography>
                                    )}
                                </Box>
                            )}

                            {tabValue === 1 && (
                                <Box>
                                    {lab.tips.length > 0 ? (
                                        <List>
                                            {lab.tips.map((hint, index) => (
                                                <Hint tip={hint} number={index + 1} />
                                            ))}
                                        </List>
                                    ) : (
                                        <Typography variant="body2" color="text.secondary">Підказки не надані.</Typography>
                                    )}
                                </Box>
                            )}
                        </CardContent>
                    </StyledCard>
                </Box>

                <Box sx={{ width: '65%', display: 'flex', flexDirection: 'column' }}>
                    <StyledCard sx={{ mb: 2, flexGrow: 1 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Редактор кода</Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Editor
                                width="100%"
                                height="400px"
                                language="python"
                                theme="vs-dark"
                                value={code}
                                onChange={handleCodeChange}
                            />
                        </CardContent>
                    </StyledCard>

                    <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mb: 2 }}>
                        Відправити
                    </Button>
                    <StyledCard>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Тестові кейси</Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Box>
                                {lab.test_cases.slice(0, 2).map((testCase, index) => (
                                    <Box key={index} sx={{ mb: 2 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            Тест-кейс {index + 1}:
                                        </Typography>

                                        <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 1 }}>
                                            Вхід:
                                        </Typography>
                                        <Box sx={{
                                            backgroundColor: '#f5f5f5',
                                            padding: '10px',
                                            borderRadius: '5px',
                                            border: '1px solid #e0e0e0',
                                            fontFamily: 'Courier, monospace',
                                            whiteSpace: 'pre-wrap',
                                            overflowX: 'auto'
                                        }}>
                                            {testCase.input.split('\n').map((str, idx) => (
                                                <span key={idx}>{str}<br/></span>
                                            ))}
                                        </Box>

                                        <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 1 }}>
                                            Очікуваний результат:
                                        </Typography>
                                        <Box sx={{
                                            backgroundColor: '#f0f8ff',
                                            padding: '10px',
                                            borderRadius: '5px',
                                            border: '1px solid #e0e0e0',
                                            fontFamily: 'Courier, monospace',
                                            whiteSpace: 'pre-wrap',
                                            overflowX: 'auto'
                                        }}>
                                            {testCase.expected_output.split('\n').map((str, idx) => (
                                                <span key={idx}>{str}<br/></span>
                                            ))}
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </CardContent>
                    </StyledCard>
                </Box>
            </Container>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="warning" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
}
