import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Box, Button, TextField, Typography, Container, Alert, Paper } from '@mui/material';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <Container
            component="main"
            maxWidth="xs"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh', // Центрирование по вертикали
            }}
        >
            <Head title="Login" />
            <Paper
                elevation={6}
                sx={{
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Тень вокруг блока
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        {errors.email && <Alert severity="error">{errors.email}</Alert>}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={data.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email ? errors.email : ''}
                        />
                        {errors.password && <Alert severity="error">{errors.password}</Alert>}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={data.password}
                            onChange={handleChange}
                            error={!!errors.password}
                            helperText={errors.password ? errors.password : ''}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={processing}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}
