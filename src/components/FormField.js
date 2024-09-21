import React from 'react';
import './FormField.css';

const FormField = ({ field, removeField }) => {
    const renderField = () => {
        const validationProps = {};
        if (field.validation.required) {
            validationProps.required = true;
        }
        if (field.validation.minLength) {
            validationProps.minLength = field.validation.minLength;
        }
        if (field.validation.maxLength) {
            validationProps.maxLength = field.validation.maxLength;
        }
        if (field.validation.format) {
            validationProps.pattern = field.validation.format === 'email' ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/ : undefined;
            validationProps.title = field.validation.format === 'email' ? 'Invalid email format' : '';
        }

        switch (field.type) {
            case 'text':
                return <input type="text" placeholder={field.label} {...validationProps} />;
            case 'textarea':
                return <textarea placeholder={field.label} {...validationProps} />;
            case 'dropdown':
                return (
                    <select {...validationProps}>
                        <option value="">Select...</option>
                        {field.options.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                );
            case 'checkbox':
                return (
                    <div>
                        {field.options.map((option, index) => (
                            <label key={index}>
                                <input type="checkbox" value={option} /> {option}
                            </label>
                        ))}
                    </div>
                );
            case 'radio':
                return (
                    <div>
                        {field.options.map((option, index) => (
                            <label key={index}>
                                <input type="radio" name={field.label} value={option} {...validationProps} /> {option}
                            </label>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="form-field">
            <label>{field.label}</label>
            {renderField()}
            <button onClick={() => removeField(field.id)}>Remove</button>
        </div>
    );
};

export default FormField;
