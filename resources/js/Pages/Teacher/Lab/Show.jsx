import React, {useState} from 'react';
import { Container, Typography, Paper, Box, TextField, Button, Grid } from '@mui/material';
import { useForm } from '@inertiajs/react';
import LabForm from './Components/LabForm.jsx';

const EditLab = ({ lab }) => {
    const { data, setData, put, post, reset } = useForm({
        description: lab.description || '',
        starter_code: lab.starter_code || '// Write your code here...',
        due_date: lab.due_date ? new Date(lab.due_date).toISOString().split('T')[0] : '',
        test_cases: lab.test_cases || [{}], // Изначально показываем один тест-кейс
    });

    const [input, setInput] = useState('');
    const [expectedOutput, setExpectedOutput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/teacher/courses/${lab.course_id}/labs/update/${lab.id}`, {
            onSuccess: () => {
                alert('Lab updated successfully!');
                reset();
            },
            onError: (errors) => {
                console.error('Error:', errors);
                alert('Failed to update lab. Please try again.');
            }
        });
    };

    const handleAddTestCase = () => {
        const lastTestCase = data.test_cases[data.test_cases.length - 1] || { input: '', expected_output: '' };
        const newTestCase = { input: input, expected_output: expectedOutput };

        const updatedTestCases = [...data.test_cases, newTestCase];
        setData('test_cases', updatedTestCases);

        console.log(newTestCase);

        post(`/teacher/courses/${lab.course_id}/labs/${lab.id}/test-cases`, {
            data: {
                input: input,
                expected_output: expectedOutput,
            },
            onSuccess: () => {
                alert('Test case added successfully!');
            },
            onError: (errors) => {
                console.error('Error:', errors);
                alert('Failed to add test case. Please try again.');
            }
        });
    };

    const handleTestCaseChange = (index, key, value) => {
        // Обновляем тест-кейсы в локальном состоянии
        const updatedTestCases = data.test_cases.map((testCase, i) =>
            i === index ? { ...testCase, [key]: value } : testCase
        );
        setData('test_cases', updatedTestCases);
    };

    const handleRemoveTestCase = (index) => {
        if (data.test_cases.length > 1) {
            const testCaseToRemove = data.test_cases[index];

            // Удаляем тест-кейс из локального состояния
            const updatedTestCases = data.test_cases.filter((_, i) => i !== index);
            setData('test_cases', updatedTestCases);

            // Отправляем запрос на сервер для удаления тест-кейса
            post(`/teacher/courses/${lab.course_id}/labs/${lab.id}/test-cases/${testCaseToRemove.id}/delete`, {
                onSuccess: () => {
                    alert('Test case removed successfully!');
                },
                onError: (errors) => {
                    console.error('Error:', errors);
                    alert('Failed to remove test case. Please try again.');
                }
            });
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Edit Programming Lab
            </Typography>
            <Paper sx={{ p: 3 }}>
                <LabForm
                    onSubmit={(key, value) => setData(key, value)}
                    initialValues={{
                        description: data.description,
                        starter_code: data.starter_code,
                        due_date: data.due_date
                    }}
                    title="Edit Programming Lab"
                />

                <Box mt={4}>
                    <Typography variant="h5" gutterBottom>
                        Test Cases
                    </Typography>
                    {data.test_cases.map((testCase, index) => (
                        <Paper key={index} sx={{ p: 2, mb: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label={`Test Case ${index + 1} Input`}
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        value={input || ''}
                                        onChange={(e) => setInput(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label={`Test Case ${index + 1} Expected Output`}
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        value={expectedOutput || ''}
                                        onChange={(e) => setExpectedOutput(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    {data.test_cases.length > 1 && (
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => handleRemoveTestCase(index)}
                                        >
                                            Remove Test Case
                                        </Button>
                                    )}
                                </Grid>
                            </Grid>
                        </Paper>
                    ))}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddTestCase}
                    >
                        Add Test Case
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default EditLab;
