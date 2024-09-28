import React, { useState } from 'react';
import { Typography, Container, Grid, Card, CardContent, IconButton, Collapse, Box, Snackbar, Alert, Button, Divider, LinearProgress } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import Navigation from "@/Pages/Components/Navigation.jsx";
import LabIcon from '@mui/icons-material/Science';
import { styled } from '@mui/system';
import SubmissionCard from "@/Pages/User/Homepage/Components/SubmissionCard.jsx";

const StyledCard = styled(Card)(({ theme }) => ({
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
    },
}));

export default function CoursePage({ labs, submissions, stats, progress }) {
    const [expanded, setExpanded] = useState(false);
    const [submissionsExpanded, setSubmissionsExpanded] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleExpandClick = (index) => {
        setExpanded(expanded === index ? false : index);
    };

    const handleSubmissionsExpandClick = () => {
        setSubmissionsExpanded(!submissionsExpanded);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', padding: 10 }}>
            <Navigation />
            <Container maxWidth="lg">
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" gutterBottom>{progress.name}</Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        {progress.description}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="body1" gutterBottom>Прогрес виконання курсу</Typography>
                        <Typography variant="body1" color="primary">{(progress.labs_with_passed_submissions_count / progress.labs_count) * 100}% виконано</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={(progress.labs_with_passed_submissions_count / progress.labs_count) * 100} sx={{ height: 10, borderRadius: 5 }} />
                </Box>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    Останні 5 відправок
                                    <IconButton
                                        onClick={handleSubmissionsExpandClick}
                                        aria-expanded={submissionsExpanded}
                                        aria-label="показать больше"
                                    >
                                        <ExpandMoreIcon />
                                    </IconButton>
                                </Typography>
                                <Collapse in={submissionsExpanded} timeout="auto" unmountOnExit>
                                    {submissions.length > 0 ? (
                                        submissions.map((submission, index) => (
                                            <SubmissionCard key={index + 1} submission={submission} />
                                        ))
                                    ) : (
                                        <Typography variant="body2" color="text.secondary">
                                            По цьому курсу поки немає відправлень
                                        </Typography>
                                    )}
                                </Collapse>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h5" gutterBottom>Статистика запуску коду</Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant="body1">Загальні спроби: {stats.total_submissions}</Typography>
                                    <Typography variant="body1" color="success.main">Успішні: {stats.successful_submissions}</Typography>
                                    <Typography variant="body1" color="error.main">Невдалі: {stats.failed_submissions}</Typography>
                                </Box>
                                <Divider />
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                                    Система автоматизованої перевірки дозволяє виконувати код, перевіряти його правильність і отримувати негайний зворотний зв'язок. Використовуйте ресурси для підготовки до лабораторних робіт!
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h5" gutterBottom>Лабораторні роботи:</Typography>
                        <Grid container spacing={4}>
                            {labs.map((lab, labIndex) => (
                                <Grid item xs={12} sm={6} md={4} key={lab.id}>
                                    <StyledCard variant="outlined">
                                        <CardContent>
                                            <Grid container alignItems="center">
                                                <Grid item>
                                                    <LabIcon sx={{ fontSize: 40, marginRight: 2 }} />
                                                </Grid>
                                                <Grid item xs>
                                                    <Typography variant="h6">{lab.title}</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <IconButton
                                                        onClick={() => handleExpandClick(labIndex)}
                                                        aria-expanded={expanded === labIndex}
                                                        aria-label="show more"
                                                    >
                                                        <ExpandMoreIcon />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                            <Collapse in={expanded === labIndex} timeout="auto" unmountOnExit>
                                                <Typography variant="body2" color="text.secondary" paragraph>
                                                    {lab.description.substring(0, 100)}... {/* Условие лабораторной (неполное) */}
                                                </Typography>
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    color="primary"
                                                    startIcon={<VisibilityIcon />}
                                                    href={`/labs/${lab.id}`}
                                                >
                                                    Перейти на лабу
                                                </Button>
                                            </Collapse>
                                        </CardContent>
                                    </StyledCard>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    Виникла помилка
                </Alert>
            </Snackbar>
        </Box>
    );
}
