import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, IconButton, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

const Hint = ({ tip, number }) => {
    return (
        <Accordion sx={{ mt: 2 }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`hint${tip.id}-content`}
                id={`hint${tip.id}-header`}
            >
                <Box display="flex" alignItems="center">
                    <EmojiObjectsIcon sx={{ mr: 1 }} />
                    <Typography variant="subtitle1">Підказка {number}</Typography>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>{tip.text}</Typography>
            </AccordionDetails>
        </Accordion>
    );
};

export default Hint;
