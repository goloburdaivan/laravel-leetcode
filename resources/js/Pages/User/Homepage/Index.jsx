import React, {useState, useEffect} from 'react';
import {Typography, Container, Grid, Card, CardContent, List, Box, Snackbar, Alert} from '@mui/material';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import {usePage} from '@inertiajs/react';
import Navigation from "@/Pages/Components/Navigation.jsx";
import LabCard from "@/Pages/User/Homepage/Components/LabCard.jsx";
import SubmissionCard from "@/Pages/User/Homepage/Components/SubmissionCard.jsx";
import CourseCard from "@/Pages/User/Homepage/Components/CourseCard.jsx";
import ProgressChart from "@/Pages/User/Homepage/Components/ProgressChart.jsx";
import CourseProgressChart from "@/Pages/User/Homepage/Components/CourseProgressChart.jsx";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

export default function StudentDashboard({
    labs,
    submissions,
    courses,
}) {
    const {props} = usePage();
    const {errors} = props;

    console.log(courses);

    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        if (errors.error) {
            setOpenSnackbar(true);
        }
    }, [errors]);

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };


    return (
        <Box sx={{backgroundColor: '#f5f5f5', minHeight: '100vh', padding: 10}}>
            <Navigation/>
            <Container maxWidth="lg">
                <Grid container spacing={4}>

                    <Grid item xs={12} md={4}>
                        <Typography variant="h5" gutterBottom>Дедлайни (менше 24 годин)</Typography>
                        {labs.map((lab, index) => (
                            <LabCard key={index} lab={lab}/>
                        ))}

                        <Typography variant="h5" gutterBottom style={{marginTop: 20}}>Останні відправки</Typography>
                        <Card variant="outlined">
                            <CardContent>
                                <List>
                                    {submissions.map((submission, index) => (
                                        <SubmissionCard key={index} submission={submission}/>
                                    ))}
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <Typography variant="h5" gutterBottom>Мої курси</Typography>
                        {courses.map((course, index) => (
                            <CourseCard key={index} course={course}/>
                        ))}

                        <ProgressChart/>
                        <CourseProgressChart/>
                    </Grid>
                </Grid>
            </Container>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{width: '100%'}}>
                    {errors.error}
                </Alert>
            </Snackbar>
        </Box>
    );
};