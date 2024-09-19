import React from 'react';
import { Container, Box, Paper, Typography } from '@mui/material';
import LoginForm from './Components/LoginForm';
import TipOfTheDay from './Components/TipOfTheDay';
import { motion } from 'framer-motion';

export default function Login() {
    return (
        <Container
            maxWidth={false}
            disableGutters
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
            }}
        >
            <Box
                sx={{
                    width: { xs: '100%', md: '50%' },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fff',
                    padding: 2,
                }}
            >
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
                                Login into Teacher Area
                            </Typography>
                            <LoginForm />
                        </Box>
                    </Paper>
                </motion.div>
            </Box>
            <Box
                sx={{
                    width: { xs: '100%', md: '50%' },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: { xs: '50vh', md: '100vh' },
                    background: 'linear-gradient(90deg, #f5f5f5 0%, #e0e0e0 100%)',
                }}
            >
                <TipOfTheDay />
            </Box>
        </Container>
    );
}
