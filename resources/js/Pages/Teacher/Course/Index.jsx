import React, { useState } from 'react';
import {
    Toolbar,
    Typography,
    Button,
    Box,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Pagination,
    Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import Navigation from "@/Pages/Components/Navigation.jsx";

const TeacherDashboard = ({ course, labs }) => {
    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
    };

    const handleNewLab = () => {
        alert('Redirect to create lab page');
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Navigation />
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, mt: 8 }}
            >
                <Toolbar />
                <Container maxWidth="lg">
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                        <Typography variant="h4">My Labs</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            href={`/teacher/courses/${course.id}/labs/create`}
                        >
                            Create New Lab
                        </Button>
                    </Box>

                    <Box component="form" onSubmit={handleSearch} sx={{ mb: 4 }}>
                        <TextField
                            label="Search labs..."
                            variant="outlined"
                            fullWidth
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            sx={{ mr: 2 }}
                        />
                        <Button
                            variant="contained"
                            color="secondary"
                            type="submit"
                        >
                            Search
                        </Button>
                    </Box>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Due Date</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {labs.map((lab) => (
                                    <TableRow key={lab.id}>
                                        <TableCell>{lab.id}</TableCell>
                                        <TableCell>{lab.title}</TableCell>
                                        <TableCell>{lab.due_date}</TableCell>
                                        <TableCell align="center">
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                size="small"
                                                href={`/teacher/courses/${course.id}/labs/${lab.id}`}
                                            >
                                                Show
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Pagination
                            count={10}
                            color="primary"
                            variant="outlined"
                        />
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default TeacherDashboard;
