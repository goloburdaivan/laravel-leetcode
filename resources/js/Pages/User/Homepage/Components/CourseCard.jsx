import {Avatar, Button, Card, CardContent, Grid, LinearProgress, Typography} from "@mui/material";
import {Assignment} from "@mui/icons-material";
import React from "react";

const CourseCard = ({ course }) => (
    <Card variant="outlined" style={{ marginBottom: 16 }}>
        <CardContent>
            <Grid container alignItems="center" spacing={2}>
                <Grid item>
                    <Avatar>
                        <Assignment />
                    </Avatar>
                </Grid>
                <Grid item xs>
                    <Typography variant="h6">{course.name}</Typography>
                    <LinearProgress
                        variant="determinate"
                        value={((course.labs_with_passed_submissions_count / course.labs_count) * 100).toFixed(1)}
                        style={{ marginTop: 8, marginBottom: 8 }}
                    />
                    <Typography variant="body2" color="textSecondary">Прогрес %: {(course.labs_with_passed_submissions_count / course.labs_count) * 100}%</Typography>
                </Grid>
                <Grid item>
                    <Button href={`/courses/${course.id}`} variant="outlined" size="small" color="primary">
                        Відкрити
                    </Button>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);

export default CourseCard;
