import React, { useState, useEffect } from 'react';
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
import AddIcon from '@mui/icons-material/Add';
import Navigation from "@/Pages/Components/Navigation.jsx";
import { router } from '@inertiajs/react';

const TeacherDashboard = ({ course, labs }) => {
    const [filters, setFilters] = useState({
        id: '',
        title: ''
    });

    const [currentPage, setCurrentPage] = useState(labs.currentPage || 1);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        setFilters({
            id: urlParams.get('id') || '',
            title: urlParams.get('title') || '',
        });
    }, []);

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        const queryParams = {
            id: filters.id,
            title: filters.title,
        };
        router.get(`/teacher/courses/${course.id}`, queryParams);
    };

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage); // Update the current page in state
        const queryParams = {
            id: filters.id,
            title: filters.title,
            page: newPage, // Include the new page number in the query
        };
        router.get(`/teacher/courses/${course.id}`, queryParams);
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

                    <Box component="form" onSubmit={handleFilterSubmit} sx={{ mb: 4, display: 'flex', gap: 2 }}>
                        <TextField
                            label="Filter by ID"
                            name="id"
                            variant="outlined"
                            value={filters.id}
                            onChange={handleFilterChange}
                        />
                        <TextField
                            label="Filter by Title"
                            name="title"
                            variant="outlined"
                            value={filters.title}
                            onChange={handleFilterChange}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Apply Filters
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
                                {labs.paginated.map((lab) => (
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
                            count={labs.totalPages}
                            page={labs.page} // Use local state for current page
                            onChange={handlePageChange} // Attach the page change handler
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
