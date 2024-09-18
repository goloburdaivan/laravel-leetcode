import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField } from '@mui/material';

export default function AddCourseDialog({ open, onClose }) {
    const [courseName, setCourseName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        console.log('Course Added:', { courseName, description });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add New Course</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter the name and description of the course you want to create.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Course Name"
                    fullWidth
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Description"
                    fullWidth
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Create</Button>
            </DialogActions>
        </Dialog>
    );
}
