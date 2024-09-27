import React from 'react';
import {Box, Button, TextField, Typography, Alert } from '@mui/material';
import { useForm } from '@inertiajs/react';

export default function LoginForm({ route, registerRoute }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route);
    };

    return (
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
            <Typography variant="body2" sx={{ textAlign: 'center' }}>
                Don't have an account?{' '}
                <a href={registerRoute}>
                    Register
                </a>
            </Typography>
        </Box>
    );
}
