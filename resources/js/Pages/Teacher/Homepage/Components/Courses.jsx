import React from 'react';
import { Grid, Card, CardContent, Typography, Button, CardActions } from '@mui/material';
import { Link } from '@inertiajs/react';

export default function Courses({ courses }) {
    return (
        <Grid container spacing={3}>
            {courses.map((course) => (
                <Grid item xs={12} sm={6} md={4} key={course.id}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {course.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {course.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                size="small"
                                color="primary"
                                component={Link}
                                href={`/teacher/courses/${course.id}`}
                            >
                                View Course
                            </Button>
                            <Button size="small" color="secondary">Edit</Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}
