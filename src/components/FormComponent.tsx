import React, { useState } from 'react';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    RadioGroup,
    FormControlLabel,
    Radio,
    Checkbox,
    Button,
    Typography,
    Box,
    FormGroup,
    FormLabel,
    TextField,
    Paper,
    Divider,
    Alert,
    FormHelperText,
    CircularProgress,
    Stack,
    Fade
} from '@mui/material';
import { Send, CheckCircleOutline } from '@mui/icons-material';

export interface FormField {
    title: string;
    label?: string;
    placeholder?: string;
    type?: string
    inputOptions?: string[];
    validationRegex?: string;
    validationMessage?: string;
    required?: boolean;
}

interface FormProps {
    form: {
        enableFormAt: number | null;
        fields: FormField[];
    };
    shouldDisplayForm: boolean;
    onSubmit: (formData: any) => void;
}

type FormValues = {
    [key: string]: any; 
};

const FormComponent: React.FC<FormProps> = ({ form, shouldDisplayForm, onSubmit }) => {
    const [formValues, setFormValues] = useState<FormValues>({});
    const [formErrors, setFormErrors] = useState<{ [key: string]: string | null }>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

    const handleFormChange = (fieldTitle: string, value: any) => {
        setFormValues((prev: FormValues) => {
            const newValues = { ...prev, [fieldTitle]: value };
            if (formErrors[fieldTitle]) {
                setFormErrors((prev: { [key: string]: string | null }) => ({ ...prev, [fieldTitle]: null }));
            }
            return newValues;
        });
    };

    const handleCheckboxChange = (fieldTitle: string, option: string, checked: boolean) => {
        setFormValues((prev: FormValues) => {
            const currentValues = prev[fieldTitle] || [];
            let newValues;
            
            if (checked) {
                newValues = [...currentValues, option];
            } else {
                newValues = currentValues.filter((item: string) => item !== option);
            }
            
            if (formErrors[fieldTitle]) {
                setFormErrors(prev => ({ ...prev, [fieldTitle]: null }));
            }
            
            return { ...prev, [fieldTitle]: newValues };
        });
    };

    const validateForm = () => {
        let isValid = true;
        const errors: any = {};

        form.fields.forEach(field => {
            if (field.required && (
                formValues[field.title] === undefined || 
                formValues[field.title] === "" || 
                (Array.isArray(formValues[field.title]) && formValues[field.title].length === 0)
            )) {
                errors[field.title] = field.validationMessage || `${field.label || field.title} is required.`;
                isValid = false;
            }

            if (field.validationRegex && formValues[field.title]) {
                const regex = new RegExp(field.validationRegex);
                const valueToTest = Array.isArray(formValues[field.title]) 
                    ? formValues[field.title].join(',') 
                    : formValues[field.title];
                    
                if (!regex.test(valueToTest)) {
                    errors[field.title] = field.validationMessage || `Invalid format for ${field.label || field.title}.`;
                    isValid = false;
                }
            }
        });

        setFormErrors(errors);
        return isValid;
    };

    const handleFormSubmit = () => {
        if (validateForm()) {
            setIsSubmitting(true);
            // Simulate API call delay
            setTimeout(() => {
                console.log("Form data:", formValues);
                onSubmit(formValues);
                setIsSubmitting(false);
                setSubmitSuccess(true);
                
                // Reset success message after 3 seconds
                setTimeout(() => {
                    setSubmitSuccess(false);
                }, 3000);
            }, 1000);
        } else {
            console.log("Form has errors.");
        }
    };

    const getOptionsArray = (options: string[] | string | undefined): string[] => {
        if (!options) return [];
        if (Array.isArray(options)) return options;
        return options.split(',');
    };

    const renderFormField = (field: FormField, index: number) => {
        const { title, label, placeholder, type = "text", inputOptions, required } = field;
        const error = formErrors[title];
        const fieldLabel = label || title;
    
        switch (type) {
            case "dropdown":
                const dropdownOptions = getOptionsArray(inputOptions);
                return (
                    <FormControl 
                        fullWidth 
                        margin="normal" 
                        required={required} 
                        error={!!error} 
                        key={`${title}-${index}`}
                        variant="outlined"
                    >
                        <InputLabel id={`${title}-label`}>{fieldLabel}</InputLabel>
                        <Select
                            labelId={`${title}-label`}
                            id={title}
                            value={formValues[title] || ''}
                            label={fieldLabel}
                            onChange={(e) => handleFormChange(title, e.target.value)}
                        >
                            {dropdownOptions.map((option) => (
                                <MenuItem key={option} value={option}>{option}</MenuItem>
                            ))}
                        </Select>
                        {error && <FormHelperText error>{error}</FormHelperText>}
                    </FormControl>
                );
            case "radio":
                const radioOptions = getOptionsArray(inputOptions);
                return (
                    <FormControl 
                        component="fieldset" 
                        fullWidth 
                        margin="normal" 
                        required={required} 
                        error={!!error} 
                        key={`${title}-${index}`}
                    >
                        <FormLabel component="legend">{fieldLabel}</FormLabel>
                        <RadioGroup
                            aria-label={fieldLabel}
                            name={title}
                            value={formValues[title] || ''}
                            onChange={(e) => handleFormChange(title, e.target.value)}
                            sx={{ ml: 1, mt: 1 }}
                        >
                            {radioOptions.map((option) => (
                                <FormControlLabel 
                                    key={option} 
                                    value={option} 
                                    control={<Radio />} 
                                    label={option} 
                                />
                            ))}
                        </RadioGroup>
                        {error && <FormHelperText error>{error}</FormHelperText>}
                    </FormControl>
                );
            case "checkbox":
                const checkboxOptions = getOptionsArray(inputOptions);
                // If there are options, render multiple checkboxes
                if (checkboxOptions.length > 0) {
                    return (
                        <FormControl 
                            component="fieldset" 
                            fullWidth 
                            margin="normal" 
                            required={required} 
                            error={!!error} 
                            key={`${title}-${index}`}
                        >
                            <FormLabel component="legend">{fieldLabel}</FormLabel>
                            <FormGroup sx={{ ml: 1, mt: 1 }}>
                                {checkboxOptions.map((option) => {
                                    const values = formValues[title] || [];
                                    const isChecked = Array.isArray(values) && values.includes(option);
                                    return (
                                        <FormControlLabel
                                            key={option}
                                            control={
                                                <Checkbox
                                                    checked={isChecked}
                                                    onChange={(e) => handleCheckboxChange(title, option, e.target.checked)}
                                                />
                                            }
                                            label={option}
                                        />
                                    );
                                })}
                            </FormGroup>
                            {error && <FormHelperText error>{error}</FormHelperText>}
                        </FormControl>
                    );
                } else {
                    // If no options, render a single checkbox
                    return (
                        <FormControl 
                            fullWidth 
                            margin="normal" 
                            required={required} 
                            error={!!error} 
                            key={`${title}-${index}`}
                        >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={!!formValues[title]}
                                        onChange={(e) => handleFormChange(title, e.target.checked)}
                                    />
                                }
                                label={fieldLabel}
                            />
                            {error && <FormHelperText error>{error}</FormHelperText>}
                        </FormControl>
                    );
                }
            case "text":
            default:
                return (
                    <TextField
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        id={title}
                        label={fieldLabel}
                        placeholder={placeholder || fieldLabel}
                        value={formValues[title] || ''}
                        onChange={(e) => handleFormChange(title, e.target.value)}
                        required={required}
                        error={!!error}
                        helperText={error}
                        key={`${title}-${index}`}
                    />
                );
        }
    };

    if (!shouldDisplayForm) {
        return null;
    }

    return (
        <Fade in={shouldDisplayForm} timeout={800}>
            <Paper 
                elevation={3} 
                sx={{ 
                    p: 3, 
                    mx: 3, 
                    my: 4, 
                    borderRadius: 2,
                    bgcolor: '#FFFFFF',
                    position: 'relative'
                }}
            >
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#374151' }}>
                    Please complete the form
                </Typography>
                
                <Typography variant="body2" sx={{ mb: 3, color: '#6B7280' }}>
                    Fill out the information below to continue the conversation.
                </Typography>
                
                <Divider sx={{ mb: 3 }} />
                
                <Box component="form" noValidate autoComplete="off">
                    <Stack spacing={1}>
                        {form.fields.map((field, index) => (
                            <React.Fragment key={`${field.title}-${index}`}>
                                {renderFormField(field, index)}
                            </React.Fragment>
                        ))}
                    </Stack>
                    
                    {Object.keys(formErrors).length > 0 && (
                        <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
                            Please correct the errors before submitting.
                        </Alert>
                    )}
                    
                    {submitSuccess && (
                        <Alert 
                            icon={<CheckCircleOutline fontSize="inherit" />} 
                            severity="success" 
                            sx={{ mt: 2, mb: 2 }}
                        >
                            Form submitted successfully!
                        </Alert>
                    )}
                    
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleFormSubmit}
                            disabled={isSubmitting}
                            endIcon={isSubmitting ? <CircularProgress size={20} /> : <Send />}
                            sx={{ 
                                borderRadius: 2,
                                px: 3,
                                py: 1,
                                textTransform: 'none',
                                fontWeight: 600
                            }}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Fade>
    );
};

export default FormComponent;