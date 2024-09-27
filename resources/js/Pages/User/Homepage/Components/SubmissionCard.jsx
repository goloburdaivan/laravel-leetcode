import {Avatar, ListItem, ListItemText, Typography, Chip} from "@mui/material";
import {Send} from "@mui/icons-material";
import React from "react";

const SubmissionCard = ({ submission }) => {
    // Функция для получения свойств статуса
    const getStatusProps = (status) => {
        switch (status) {
            case 'processing':
                return { label: 'Processing', color: 'warning' };
            case 'success':
                return { label: 'Success', color: 'success' };
            case 'failed':
                return { label: 'Failed', color: 'error' };
            default:
                return { label: 'Unknown', color: 'default' };
        }
    };

    const statusProps = getStatusProps(submission.status);

    return (
        <ListItem>
            <ListItemText
                primary={submission.lab.title}
                secondary={
                    <>
                        <Typography variant="body2" color="textSecondary">
                            Відправлено: {submission.created_at}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Пройдено тестів: {submission.tests_passed}/{submission.test_cases_count}
                        </Typography>
                        <Chip
                            label={statusProps.label}
                            color={statusProps.color}
                            style={{ marginTop: 8 }}
                        />
                    </>
                }
            />
            <Avatar>
                <Send />
            </Avatar>
        </ListItem>
    );
};

export default SubmissionCard;
