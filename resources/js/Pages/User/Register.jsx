import React from 'react';
import { Container, Box } from '@mui/material';
import TipOfTheDay from "@/Pages/Components/TipOfTheDay.jsx";
import RegistrationForm from "@/Pages/User/Components/RegistrationForm.jsx";

export default function Register() {
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
                <RegistrationForm />
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
