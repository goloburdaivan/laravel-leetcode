import { AppBar, Button, Snackbar, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { usePage, Link, router } from "@inertiajs/react";

export default function Navigation() {
    const { props } = usePage();
    const { auth } = props;

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleLogout = (e) => {
        e.preventDefault();
        router.post('/logout');
    };

    const handleCopyId = () => {
        navigator.clipboard.writeText(auth.id)
            .then(() => {
                setSnackbarOpen(true);
            })
            .catch(err => {
                console.error('Не удалось скопировать ID: ', err);
            });
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                            Lab Tester
                        </Link>
                    </Typography>

                    <Typography variant="body1" sx={{ marginRight: 2, cursor: 'pointer' }} onClick={handleCopyId} title="Кликните, чтобы скопировать ID">
                        {auth.name} (#{auth.id})
                    </Typography>

                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>

            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={snackbarOpen}
                onClose={handleSnackbarClose}
                message="ID скопирован в буфер обмена"
                autoHideDuration={3000}
            />
        </>
    );
}
