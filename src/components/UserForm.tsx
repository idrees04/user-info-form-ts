import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
    TextField,
    Button,
    MenuItem,
    Select,
    Grid,
    FormControl,
    InputLabel,
    FormHelperText
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { setFormData } from '../redux/formSlice';
import { AppDispatch } from '../redux/store';
import logo from '../logo.svg';

interface FormValues {
    name: string;
    age: number;
    country: string;
}

// List of countries for the dropdown
const countries = ['USA', 'Canada', 'Germany', 'Australia'];

// Validation schema using Yup
const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    age: Yup.number()
        .required('Age is required')
        .moreThan(Yup.ref('name.length'), 'Age must be greater than name length'),
    country: Yup.string().required('Country is required'),
});

const UserForm: React.FC<{ openModal: () => void }> = ({ openModal }) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = (values: FormValues) => {
        dispatch(setFormData(values)); // Save form data to the Redux store
        openModal(); 
    };

    return (
        <Formik
            initialValues={{ name: '', age: 0, country: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched, handleChange }) => (
                <Form>
                    <Grid container spacing={2} justifyContent="center">
                        {/* Logo */}
                        <Grid item xs={12} display="flex" justifyContent="center">
                            <img src={logo} alt="Logo" style={{ width: '150px', height: 'auto' }} />
                        </Grid>

                        {/* Name Input */}
                        <Grid item xs={12} md={6}>
                            <Field
                                name="name"
                                as={TextField}
                                label="Name"
                                fullWidth
                                error={touched.name && Boolean(errors.name)}
                                helperText={touched.name && errors.name}
                                onChange={handleChange}
                            />
                        </Grid>

                        {/* Age Input */}
                        <Grid item xs={12} md={6}>
                            <Field
                                name="age"
                                as={TextField}
                                label="Age"
                                type="number"
                                fullWidth
                                error={touched.age && Boolean(errors.age)}
                                helperText={touched.age && errors.age}
                                onChange={handleChange}
                            />
                        </Grid>

                        {/* Country Dropdown */}
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth error={touched.country && Boolean(errors.country)}>
                                <InputLabel>Country</InputLabel>
                                <Field
                                    name="country"
                                    as={Select}
                                    label="Country" 
                                    fullWidth
                                    onChange={handleChange}
                                    defaultValue="" 
                                >
                                    {countries.map((country) => (
                                        <MenuItem key={country} value={country}>
                                            {country}
                                        </MenuItem>
                                    ))}
                                </Field>
                                {/* Display error message if country field is touched and has an error */}
                                {touched.country && errors.country && (
                                    <FormHelperText>{errors.country}</FormHelperText>
                                )}
                            </FormControl>
                        </Grid>

                        {/* Submit Button */}
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                style={{ float: 'left' }}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
};

export default UserForm;
