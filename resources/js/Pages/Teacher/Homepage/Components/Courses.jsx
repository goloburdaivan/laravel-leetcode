import React from 'react';
import { Grid, Card, CardContent, Typography, Button, CardActions } from '@mui/material';

const courses = [
    { id: 1, title: 'Programming in C++', description: 'Course on basic C++ programming' },
    { id: 2, title: 'Java for Beginners', description: 'Introduction to Java programming' },
    { id: 3, title: 'Python Algorithms', description: 'Learn Python through algorithms' },
];

export default function Courses() {
    return (
        <Grid container spacing={3}>
            {courses.map((course) => (
                <Grid item xs={12} sm={6} md={4} key={course.id}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {course.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {course.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">View Course</Button>
                            <Button size="small">Edit</Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}
