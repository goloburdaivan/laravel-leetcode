import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    Box,
    Chip,
    TextField,
    MenuItem,
    Snackbar,
    Alert,
    Pagination,
} from '@mui/material';

const Submissions = ({ lab, fetchedSubmissions, statuses }) => {
    const [open, setOpen] = useState(false);
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [studentIdFilter, setStudentIdFilter] = useState('');
    const [studentNameFilter, setStudentNameFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [submissions, setSubmissions] = useState(fetchedSubmissions);

    const handleOpen = (submission) => {
        setSelectedSubmission(submission);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedSubmission(null);
    };

    const handleCopyId = (id) => {
        navigator.clipboard.writeText(id)
            .then(() => {
                setSnackbarOpen(true);
            })
            .catch(() => {
                console.error('Failed to copy ID.');
            });
    };

    const handleCopyCode = () => {
        if (selectedSubmission) {
            navigator.clipboard.writeText(selectedSubmission.source_code)
                .then(() => {
                    setSnackbarOpen(true);
                })
                .catch(() => {
                    console.error('Failed to copy code.');
                });
        }
    };

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

    const fetchSubmissions = async (page = 1) => {
        const params = new URLSearchParams();
        if (studentIdFilter) params.append('student_id', studentIdFilter);
        if (studentNameFilter) params.append('student_name', studentNameFilter);
        if (statusFilter) params.append('status', statusFilter);
        params.append('page', page); // Include current page

        try {
            const response = await fetch(`/teacher/labs/${lab.id}/submissions?${params.toString()}`);
            const data = await response.json();
            setSubmissions(data.submissions);
            setTotalPages(data.total_pages); // Set total pages from response
        } catch (error) {
            console.error("Error fetching submissions:", error);
        }
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        fetchSubmissions(1);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        fetchSubmissions(value);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box>
            <form onSubmit={handleFilterSubmit} style={{ marginBottom: '16px' }}>
                <TextField
                    label="Student ID"
                    variant="outlined"
                    value={studentIdFilter}
                    onChange={(e) => setStudentIdFilter(e.target.value)}
                    style={{ marginRight: '8px' }}
                />
                <TextField
                    label="Student Name"
                    variant="outlined"
                    value={studentNameFilter}
                    onChange={(e) => setStudentNameFilter(e.target.value)}
                    style={{ marginRight: '8px' }}
                />
                <TextField
                    select
                    label="Status"
                    variant="outlined"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    style={{ marginRight: '8px', minWidth: '120px' }}
                >
                    <MenuItem value="">All</MenuItem>
                    {Object.entries(statuses).map(([key, value]) => (
                        <MenuItem key={key} value={key}>{value}</MenuItem>
                    ))}
                </TextField>
                <Button type="submit" variant="contained" color="primary">Filter</Button>
            </form>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Student</TableCell>
                            <TableCell>Tests passed</TableCell>
                            <TableCell>Passed</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Date Submitted</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {submissions.paginated.map((submission) => (
                            <TableRow key={submission.id}>
                                <TableCell>{submission.id}</TableCell>
                                <TableCell>
                                    {submission.user.name}
                                    <span
                                        onClick={() => handleCopyId(submission.user.id)}
                                        style={{ color: 'blue', cursor: 'pointer', marginLeft: '8px' }}
                                        title="Click to copy ID"
                                    >
                                        #{submission.user.id}
                                    </span>
                                </TableCell>
                                <TableCell>{submission.tests_passed}/{lab.test_cases.length}</TableCell>
                                <TableCell>{submission.passed ? 'true' : 'false'}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={getStatusProps(submission.status).label}
                                        color={getStatusProps(submission.status).color}
                                        variant="outlined"
                                    />
                                </TableCell>
                                <TableCell>{new Date(submission.created_at).toLocaleString()}</TableCell>
                                <TableCell>
                                    <Button variant="outlined" onClick={() => handleOpen(submission)}>
                                        View Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Pagination
                count={submissions.totalPages}
                page={submissions.page}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
                style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}
            />

            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
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
                            <Button variant="outlined" onClick={handleCopyCode} sx={{ mt: 2 }}>
                                Copy Code
                            </Button>

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

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert onClose={handleSnackbarClose} severity="success">
                    Copied to clipboard!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Submissions;
