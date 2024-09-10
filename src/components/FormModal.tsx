import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Divider
} from '@mui/material';

interface FormModalProps {
    open: boolean;
    handleClose: () => void;
}

const FormModal: React.FC<FormModalProps> = ({ open, handleClose }) => {
    const formData = useSelector((state: RootState) => state.form);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>Form Summary</DialogTitle>
            <DialogContent>
                <Typography variant="h6" gutterBottom>
                    Submitted Information:
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body1">
                    <strong>Name:</strong> {formData.name}
                </Typography>
                <Typography variant="body1">
                    <strong>Age:</strong> {formData.age}
                </Typography>
                <Typography variant="body1">
                    <strong>Country:</strong> {formData.country}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" variant="contained">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default FormModal;
