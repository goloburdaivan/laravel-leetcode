import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Grid, Button, IconButton, Skeleton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useForm } from '@inertiajs/react';

const TestCasesComponent = ({ lab }) => {
    const { data, setData, post, reset } = useForm({
        input: '',
        expected_output: ''
    });

    const [loading, setLoading] = useState(false);

    const addTestCase = (e) => {
        e.preventDefault();
        setLoading(true);

        post(`/teacher/courses/${lab.course_id}/labs/${lab.id}/test-cases`, {
            preserveScroll: true,
            onSuccess: () => {
                setLoading(false);
                reset();
            },
            onError: () => {
                setLoading(false);
            }
        });
    };

    return (
        <Paper sx={{ p: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={5}>
                    <TextField
                        fullWidth
                        label="Input"
                        value={data.input}
                        onChange={(e) => setData('input', e.target.value)}
                    />
                </Grid>
                <Grid item xs={5}>
                    <TextField
                        fullWidth
                        label="Expected Output"
                        value={data.expected_output}
                        onChange={(e) => setData('expected_output', e.target.value)}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={addTestCase}
                        disabled={loading}
                    >
                        Add Test Case
                    </Button>
                </Grid>
            </Grid>

            <TableContainer component={Paper} sx={{ mt: 4 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Input</TableCell>
                            <TableCell>Expected Output</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lab.test_cases.map((testCase, index) => (
                            <TableRow key={index}>
                                <TableCell>{testCase.input}</TableCell>
                                <TableCell>{testCase.expected_output}</TableCell>
                                <TableCell align="right">
                                    <IconButton color="secondary">
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}

                        {/* Render skeleton row while loading */}
                        {loading && (
                            <TableRow>
                                <TableCell>
                                    <Skeleton variant="text" width="80%" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton variant="text" width="80%" />
                                </TableCell>
                                <TableCell align="right">
                                    <Skeleton variant="circular" width={40} height={40} />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default TestCasesComponent;
