import React, {useState, useEffect} from 'react';
import {Head, useForm} from '@inertiajs/react';
import {Box, Button, TextField, Typography, Container, Alert, Paper, Link, Skeleton} from '@mui/material';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import {motion} from "framer-motion"

const programmingTips = [
    "Write clean and maintainable code.",
    "Always test your code thoroughly.",
    "Keep learning and stay updated with new technologies.",
    "Use version control systems like Git.",
    "Write meaningful commit messages.",
    "Document your code and make it readable.",
    "Break problems into smaller, manageable tasks.",
    "Ask for code reviews and provide constructive feedback.",
    "Optimize your code but avoid premature optimization.",
    "Understand the problem before jumping to solutions."
];

export default function Login() {
    const {data, setData, post, processing, errors} = useForm({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/teacher/login');
    };

    const getRandomTip = () => {
        const randomIndex = Math.floor(Math.random() * programmingTips.length);
        return programmingTips[randomIndex];
    };

    const [tip, setTip] = useState(null);

    useEffect(() => {
        setTip(getRandomTip());
    }, []);

    return (
        <Container
            maxWidth={false}
            disableGutters
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: {xs: 'column', md: 'row'},
            }}
        >
            <Box
                sx={{
                    width: {xs: '100%', md: '50%'},
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fff',
                    padding: 2,
                }}
            >
                <motion.div
                    initial={{opacity: 0, scale: 0.8}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{ease: "easeOut", duration: 1}}
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
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
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
                                    sx={{mt: 3, mb: 2}}
                                    disabled={processing}
                                >
                                    Sign In
                                </Button>
                                <Typography variant="body2" sx={{textAlign: 'center'}}>
                                    Don't have an account?{' '}
                                    <Link href="/teacher/register" variant="body2" sx={{textDecoration: 'none'}}>
                                        Register
                                    </Link>
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </motion.div>
            </Box>
            <Box
                sx={{
                    width: {xs: '100%', md: '50%'},
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: {xs: '50vh', md: '100vh'},
                    background: 'linear-gradient(90deg, #f5f5f5 0%, #e0e0e0 100%)',
                }}
            >
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8, ease: "easeOut"}}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <motion.div
                            initial={{scale: 0}}       // иконка начинается с 0
                            animate={{scale: 1}}        // иконка масштабируется до 1
                            transition={{duration: 0.6}} // время анимации иконки
                        >
                            <TipsAndUpdatesIcon sx={{fontSize: 50, marginBottom: 2}}/>
                        </motion.div>

                        <motion.div
                            initial={{opacity: 0, y: -10}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.8, ease: "easeOut"}}
                        >
                            <Typography variant="h4" component="div" sx={{textAlign: 'center', padding: 2}}>
                                Порада дня:
                            </Typography>
                        </motion.div>
                        <motion.div
                            initial={{opacity: 0, x: -20}}
                            animate={{opacity: 1, x: 0}}
                            transition={{duration: 1, ease: "easeOut"}}
                        >
                            <Typography
                                variant="h4"
                                component="div"
                                sx={{textAlign: 'center', padding: 2, fontStyle: 'italic'}}
                            >
                                "{tip}"
                            </Typography>
                        </motion.div>
                    </Box>
                </motion.div>
            </Box>
        </Container>
    );
}
