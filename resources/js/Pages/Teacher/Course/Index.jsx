import React, { useState } from 'react';
import {
    AppBar,
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
    IconButton,
    Container,
    Drawer, List, ListItem, ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';

const TeacherDashboard = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [labs, setLabs] = useState([
        { id: 1, title: 'Physics Lab 1', due_date: '2024-09-30' },
        { id: 2, title: 'Chemistry Lab 2', due_date: '2024-10-05' },
        { id: 3, title: 'Biology Lab 3', due_date: '2024-09-25' },
        { id: 4, title: 'Computer Science Lab 4', due_date: '2024-09-28' },
        { id: 5, title: 'Math Lab 5', due_date: '2024-09-20' },
        { id: 6, title: 'Electrical Lab 6', due_date: '2024-10-01' },
        { id: 7, title: 'Mechanical Lab 7', due_date: '2024-09-18' },
        { id: 8, title: 'Thermodynamics Lab 8', due_date: '2024-09-22' },
    ]);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleSearch = (e) => {
        e.preventDefault();
    };

    const handleNewLab = () => {
        alert('Redirect to create lab page');
    };

    return (
        <Box sx={{ display: 'flex' }}>
            {/* Навигационная панель */}
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Teacher's Dashboard
                    </Typography>
                    <Button color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>

            {/* Drawer */}
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer}
                sx={{ width: 240, flexShrink: 0 }}
            >
                <List>
                    <ListItem button>
                        <ListItemText primary="My Labs" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Add Lab" />
                    </ListItem>
                    {/* Добавьте другие ссылки, если необходимо */}
                </List>
            </Drawer>

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
                            onClick={handleNewLab}
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

                    {/* Таблица лабораторных */}
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
                                            >
                                                Edit
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
