import {Avatar, Chip, ListItem, ListItemText, Typography, Dialog, DialogTitle, DialogContent, Box} from "@mui/material";
import {Send} from "@mui/icons-material";
import React, { useState } from "react";
import axios from "axios";

export default function SubmissionCard({ submission, lab }) {
    const [openModal, setOpenModal] = useState(false);
    const [selectedSubmission, setSelectedSubmission] = useState(null);

    const getStatusProps = (status) => {
        switch (status) {
            case 'processing':
                return { label: 'Processing', color: 'warning' };
            case 'success':
                return { label: 'Success', color: 'success' };
            case 'failed':
                return { label: 'Failed', color: 'error' };
            default:
                return { label: 'Unknown', color: 'default' };
        }
    };

    const statusProps = getStatusProps(submission.status);

    const handleOpenModal = async () => {
        try {
            const response = await axios.get(`/submissions/${submission.id}`);
            setSelectedSubmission(response.data.submission);
            setOpenModal(true);
        } catch (error) {
            console.error('Ошибка при получении данных отправки:', error);
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedSubmission(null);
    };

    return (
        <>
            <ListItem>
                <ListItemText
                    secondary={
                        <>
                            <Typography variant="body2" color="textSecondary">
                                Відправлено: {submission.created_at}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Пройдено тестів: {submission.tests_passed}/{lab.test_cases.length}
                            </Typography>
                            <Chip
                                label={statusProps.label}
                                color={statusProps.color}
                                style={{ marginTop: 8 }}
                            />
                        </>
                    }
                />
                <Avatar>
                    <Send
                        onClick={handleOpenModal}
                    />
                </Avatar>
            </ListItem>

            <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
                <DialogTitle>Submission Details</DialogTitle>
                <DialogContent>
                    {selectedSubmission && (
                        <Box>
                            <Typography variant="h6" gutterBottom>
                                Source Code
                            </Typography>
                            <Box
                                sx={{
                                    backgroundColor: '#f5f5f5',
                                    padding: 2,
                                    borderRadius: 1,
                                    fontFamily: 'monospace',
                                    whiteSpace: 'pre-wrap',
                                    overflowX: 'auto',
                                    maxHeight: '400px',
                                }}
                            >
                                {selectedSubmission.source_code}
                            </Box>
                            <Typography variant="h6" gutterBottom mt={3}>
                                Output
                            </Typography>
                            <Box
                                sx={{
                                    backgroundColor: '#f5f5f5',
                                    padding: 2,
                                    borderRadius: 1,
                                    fontFamily: 'monospace',
                                    whiteSpace: 'pre-wrap',
                                    overflowX: 'auto',
                                    maxHeight: '200px',
                                }}
                            >
                                {selectedSubmission.output}
                            </Box>
                        </Box>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};
