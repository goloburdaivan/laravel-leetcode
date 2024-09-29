import {Avatar, Button, Card, CardContent, Grid, Typography} from "@mui/material";
import {AccessTime, Assignment} from "@mui/icons-material";
import React from "react";

const LabCard = ({ lab }) => (
    <Card variant="outlined" style={{ marginBottom: 16 }}>
        <CardContent>
            <Grid container alignItems="center" spacing={2}>
                <Grid item>
                    <Avatar>
                        <Assignment />
                    </Avatar>
                </Grid>
                <Grid item xs>
                    <Typography variant="h6">{lab.title}</Typography>
                    <Typography color="textSecondary" variant="body2">
                        <AccessTime fontSize="small" /> Дедлайн: {lab.due_date}
                    </Typography>
                </Grid>
                <Grid item>
                    <Button href={`/labs/${lab.id}`} variant="outlined" size="small" color="primary">
                        Відкрити
                    </Button>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);

export default LabCard;
