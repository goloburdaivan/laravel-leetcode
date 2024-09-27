import {Card, CardContent, Typography} from "@mui/material";
import {Pie} from "react-chartjs-2";
import React from "react";

const CourseProgressChart = () => {
    const data = {
        labels: ['React', 'Python', 'JavaScript'],
        datasets: [
            {
                label: 'Прогресс по курсам',
                data: [75, 50, 90],
                backgroundColor: ['#42a5f5', '#66bb6a', '#ffa726'],
                hoverOffset: 4
            }
        ]
    };

    return (
        <Card variant="outlined" style={{ marginBottom: 16 }}>
            <CardContent>
                <Typography variant="h6">Прогрес по курсам</Typography>
                <Pie data={data} />
            </CardContent>
        </Card>
    );
};

export default CourseProgressChart;
