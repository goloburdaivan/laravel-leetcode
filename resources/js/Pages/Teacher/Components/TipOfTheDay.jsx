import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { motion } from 'framer-motion';

const programmingTips = [
    "Write clean and maintainable code.",
    "Always test your code thoroughly.",
    "Keep learning and stay updated with new technologies.",
    "Use version control systems like Git.",
    "Write meaningful commit messages.",
    "Document your code and make it readable.",
    "Break problems into smaller, manageable tasks.",
    "Ask for code reviews and provide constructive feedback.",
    "Optimize your code but avoid premature optimization.",
    "Understand the problem before jumping to solutions."
];

const getRandomTip = () => {
    const randomIndex = Math.floor(Math.random() * programmingTips.length);
    return programmingTips[randomIndex];
};

export default function TipOfTheDay() {
    const [tip, setTip] = useState(null);

    useEffect(() => {
        setTip(getRandomTip());
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
            >
                <TipsAndUpdatesIcon sx={{ fontSize: 50, marginBottom: 2 }} />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <Typography variant="h4" component="div" sx={{ textAlign: 'center', padding: 2 }}>
                    Порада дня:
                </Typography>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <Typography
                    variant="h4"
                    component="div"
                    sx={{ textAlign: 'center', padding: 2, fontStyle: 'italic' }}
                >
                    "{tip}"
                </Typography>
            </motion.div>
        </Box>
    );
}
