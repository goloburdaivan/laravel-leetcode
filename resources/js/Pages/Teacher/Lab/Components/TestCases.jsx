import React, {useState} from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Grid,
    Button,
    IconButton,
    Skeleton,
    Box
} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {useForm} from '@inertiajs/react';

const TestCasesComponent = ({lab}) => {
    const {data, setData, post, delete: destroy, reset} = useForm({
        input: '',
        expected_output: ''
    });

    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

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

    const deleteTestCase = (id) => {
        setDeletingId(id);
        destroy(`/teacher/courses/${lab.course_id}/labs/${lab.id}/test-cases/${id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setDeletingId(null);
            },
            onError: () => {
                setDeletingId(null);
            }
        });
    };

    return (
        <Paper sx={{p: 3}}>
            <Grid container spacing={2}>
                <Grid item xs={5}>
                    <TextField
                        multiline
                        fullWidth
                        label="Input"
                        value={data.input}
                        onChange={(e) => setData('input', e.target.value)}
                    />
                </Grid>
                <Grid item xs={5}>
                    <TextField
                        multiline
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

            <TableContainer component={Paper} sx={{mt: 4}}>
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
                                <TableCell>
                                    <Box sx={{
                                        backgroundColor: '#f5f5f5',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        border: '1px solid #e0e0e0',
                                        fontFamily: 'Courier, monospace',
                                        whiteSpace: 'pre-wrap',
                                        overflowX: 'auto'
                                    }}>
                                        {
                                            testCase.input ?
                                                testCase.input.split('\n').map((str, idx) => (
                                                    <span key={idx}>{str}<br/></span>
                                                ))
                                                : testCase.input
                                        }
                                    </Box>
                                </TableCell>
                                <TableCell>
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
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        color="secondary"
                                        onClick={() => deleteTestCase(testCase.id)}
                                        disabled={deletingId === testCase.id} // Disable button if deleting this test case
                                    >
                                        <Delete/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}

                        {loading && (
                            <TableRow>
                                <TableCell>
                                    <Skeleton variant="text" width="80%"/>
                                </TableCell>
                                <TableCell>
                                    <Skeleton variant="text" width="80%"/>
                                </TableCell>
                                <TableCell align="right">
                                    <Skeleton variant="circular" width={40} height={40}/>
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
