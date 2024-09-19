import {AppBar, Button, Drawer, IconButton, List, ListItem, ListItemText, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, {useState} from "react";

export default function Navigation() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <>
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

            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer}
                sx={{ width: 240, flexShrink: 0 }}
            >
                <List>
                    <ListItem button>
                        <ListItemText primary="My Courses" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Invitations" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Add Students" />
                    </ListItem>
                </List>
            </Drawer>
        </>
    )
}
