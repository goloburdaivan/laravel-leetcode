import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, CircularProgress, Alert } from '@mui/material';
import { useForm } from '@inertiajs/react';

export default function CreateCourseModal({ open, onClose }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: ''
    });

    const handleCreate = (e) => {
        e.preventDefault();
        post('/teacher/courses', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create a New Course</DialogTitle>
            <DialogContent>
                {Object.keys(errors).length > 0 && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {Object.keys(errors).map((key) => (
                            <div key={key}>{errors[key].join(', ')}</div>
                        ))}
                    </Alert>
                )}
                <TextField
                    autoFocus
                    margin="dense"
                    label="Course Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    error={!!errors.name}
                    helperText={errors.name ? errors.name.join(', ') : ''}
                    disabled={processing}
                />
                <TextField
                    margin="dense"
                    label="Course Description"
                    type="text"
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={4}
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    error={!!errors.description}
                    helperText={errors.description ? errors.description.join(', ') : ''}
                    disabled={processing}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={processing}>
                    Cancel
                </Button>
                <Button onClick={handleCreate} disabled={processing}>
                    {processing ? <CircularProgress size={24} /> : 'Create'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
