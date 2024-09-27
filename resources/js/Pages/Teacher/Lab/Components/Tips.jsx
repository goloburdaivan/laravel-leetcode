import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, TextField, Paper, Button } from '@mui/material';
import axios from 'axios';
import Hint from "@/Pages/Teacher/Lab/Components/Hint.jsx";

const Tips = ({ lab }) => {
    const [tips, setTips] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [newTip, setNewTip] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchTips();
    }, []);

    const fetchTips = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/teacher/labs/${lab.id}/tips`);
            setTips(response.data.tips);
        } catch (error) {
            console.error('Error fetching tips:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleNewTipChange = (e) => {
        setNewTip(e.target.value);
    };

    const handleNewTipSubmit = async (e) => {
        e.preventDefault();
        if (newTip.trim() === '') {
            return;
        }
        setSubmitting(true);
        try {
            await axios.post(`/teacher/labs/${lab.id}/tips`, { text: newTip });
            fetchTips();
            setNewTip('');
        } catch (error) {
            console.error('Error creating tip:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const filteredTips = tips.filter((tip) =>
        tip.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box mt={2}>
            <Typography variant="h5" gutterBottom>
                Tips
            </Typography>

            {/* Форма для создания новой подсказки */}
            <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6">Create a New Tip</Typography>
                <form onSubmit={handleNewTipSubmit}>
                    <TextField
                        label="New Tip"
                        value={newTip}
                        onChange={handleNewTipChange}
                        fullWidth
                        multiline
                        rows={2}
                        margin="normal"
                        variant="outlined"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={submitting}
                    >
                        {submitting ? 'Submitting...' : 'Create Tip'}
                    </Button>
                </form>
            </Paper>

            {loading ? (
                <CircularProgress />
            ) : (
                <Box>
                    {filteredTips.length > 0 ? (
                        <Box>
                            {filteredTips.map((tip, index) => (
                                <Hint key={index + 1} number={index + 1} tip={tip} />
                            ))}
                        </Box>
                    ) : (
                        <Typography>No tips available.</Typography>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default Tips;
