import React from 'react';
import { Box, Button, TextField, Typography, Alert, Paper } from '@mui/material';
import { useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function RegistrationForm() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        surname: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ease: "easeOut", duration: 1 }}
        >
            <Paper
                elevation={6}
                sx={{
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                    width: '100%',
                    maxWidth: '400px',
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
                        Register
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        {errors.name && <Alert severity="error">{errors.name}</Alert>}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            value={data.name}
                            onChange={handleChange}
                            error={!!errors.name}
                            helperText={errors.name ? errors.name : ''}
                        />
                        {errors.surname && <Alert severity="error">{errors.surname}</Alert>}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="surname"
                            label="Surname"
                            name="surname"
                            autoComplete="surname"
                            value={data.surname}
                            onChange={handleChange}
                            error={!!errors.surname}
                            helperText={errors.surname ? errors.surname : ''}
                        />
                        {errors.email && <Alert severity="error">{errors.email}</Alert>}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
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
                            id="password"
                            label="Password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            value={data.password}
                            onChange={handleChange}
                            error={!!errors.password}
                            helperText={errors.password ? errors.password : ''}
                        />
                        {errors.password_confirmation && <Alert severity="error">{errors.password_confirmation}</Alert>}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="password_confirmation"
                            label="Confirm Password"
                            name="password_confirmation"
                            type="password"
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={handleChange}
                            error={!!errors.password_confirmation}
                            helperText={errors.password_confirmation ? errors.password_confirmation : ''}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={processing}
                        >
                            Register
                        </Button>
                        <Typography variant="body2" sx={{ textAlign: 'center' }}>
                            Already have an account?{' '}
                            <a href='/login'>Login</a>
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </motion.div>
    );
}
