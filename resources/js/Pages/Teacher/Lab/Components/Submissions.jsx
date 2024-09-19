import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const Submissions = ({ submissions }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Student Name</TableCell>
                        <TableCell>Source Code</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Output</TableCell>
                        <TableCell>Tests Passed</TableCell>
                        <TableCell>Submission Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {submissions.map((submission) => (
                        <TableRow key={submission.id}>
                            <TableCell>{submission.id}</TableCell>
                            <TableCell>{submission.user.name}</TableCell>
                            <TableCell>
                                <Box sx={{ maxWidth: '300px', overflow: 'auto', whiteSpace: 'pre-wrap' }}>
                                    {submission.source_code}
                                </Box>
                            </TableCell>
                            <TableCell>{submission.status}</TableCell>
                            <TableCell>
                                <Box sx={{ maxWidth: '300px', overflow: 'auto', whiteSpace: 'pre-wrap' }}>
                                    {submission.output}
                                </Box>
                            </TableCell>
                            <TableCell>{submission.tests_passed}</TableCell>
                            <TableCell>{new Date(submission.created_at).toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Submissions;
