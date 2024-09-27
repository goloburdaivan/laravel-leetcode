import {Card, CardContent, Typography} from "@mui/material";
import {Line} from "react-chartjs-2";
import React from "react";

const ProgressChart = () => {
    const data = {
        labels: ['Лаба 1', 'Лаба 2', 'Лаба 3', 'Лаба 4', 'Лаба 5'],
        datasets: [
            {
                label: 'Прогрес виконання',
                data: [80, 70, 85, 60, 90],
                fill: false,
                borderColor: '#42a5f5',
                tension: 0.1
            }
        ]
    };

    return (
        <Card variant="outlined" style={{ marginBottom: 16 }}>
            <CardContent>
                <Typography variant="h6">Прогрес по лабам</Typography>
                <Line data={data} />
            </CardContent>
        </Card>
    );
};

export default ProgressChart;
