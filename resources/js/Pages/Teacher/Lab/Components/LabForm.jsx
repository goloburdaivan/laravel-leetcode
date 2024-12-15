import React from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Grid,
    FormControl,
    InputAdornment, MenuItem,
} from '@mui/material';
import {Editor} from '@monaco-editor/react';
import SaveIcon from '@mui/icons-material/Save';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const LabForm = ({onFieldChange, initialValues, handleSubmit, languages}) => {
    const {description, starter_code, due_date, title, language, execution_time, memory_limit} = initialValues;

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        Lab Title
                    </Typography>
                    <TextField
                        label="Title"
                        variant="outlined"
                        fullWidth
                        value={title}
                        onChange={(e) => onFieldChange('title', e.target.value)}
                    />
                    <Typography variant="h6" gutterBottom>
                        Language
                    </Typography>
                    <TextField
                        select
                        label="Language"
                        variant="outlined"
                        fullWidth
                        value={language}
                        onChange={(e) => onFieldChange('language', e.target.value)}
                    >
                        {Object.entries(languages).map(([key, value]) => (
                            <MenuItem key={key} value={key}>{value}</MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                        Description
                    </Typography>
                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={8}
                        value={description}
                        onChange={(e) => onFieldChange('description', e.target.value)}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                        Starter Code
                    </Typography>
                    <Editor
                        height="217px"
                        defaultLanguage={language}
                        value={starter_code}
                        onChange={(value) => onFieldChange('starter_code', value || '')}
                        theme="vs-dark"
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <Typography variant="h6" gutterBottom>
                        Due Date
                    </Typography>
                    <FormControl fullWidth>
                        <TextField
                            type="date"
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CalendarTodayIcon/>
                                    </InputAdornment>
                                ),
                            }}
                            value={due_date}
                            onChange={(e) => onFieldChange('due_date', e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Typography variant="h6" gutterBottom>
                        Time Limit (s)
                    </Typography>
                    <TextField
                        label="Time Limit"
                        variant="outlined"
                        fullWidth
                        type="number"
                        value={execution_time}
                        onChange={(e) => onFieldChange('execution_time', e.target.value)}
                        inputProps={{min: 0}}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <Typography variant="h6" gutterBottom>
                        Memory Limit (MB)
                    </Typography>
                    <TextField
                        label="Memory Limit"
                        variant="outlined"
                        fullWidth
                        type="number"
                        value={memory_limit}
                        onChange={(e) => onFieldChange('memory_limit', e.target.value)}
                        inputProps={{min: 0}}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            startIcon={<SaveIcon/>}
                        >
                            Save Lab
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default LabForm;
