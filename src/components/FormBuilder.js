import React, { useState } from 'react';
import FormField from './FormField';
import { v4 as uuidv4 } from 'uuid';
import './FormBuilder.css';

const FormBuilder = ({ formConfig, setFormConfig }) => {
    const [fieldType, setFieldType] = useState('text');
    const [label, setLabel] = useState('');
    const [options, setOptions] = useState('');
    const [required, setRequired] = useState(false);
    const [minLength, setMinLength] = useState('');
    const [maxLength, setMaxLength] = useState('');
    const [format, setFormat] = useState('');

    const addField = () => {
        if (label.trim() === '') {
            alert('Label cannot be empty.');
            return;
        }

        const newField = {
            id: uuidv4(),
            label,
            type: fieldType,
            options: fieldType === 'dropdown' || fieldType === 'radio' || fieldType === 'checkbox' ? options.split(',').map(opt => opt.trim()) : [],
            validation: {
                required,
                minLength: minLength ? parseInt(minLength) : undefined,
                maxLength: maxLength ? parseInt(maxLength) : undefined,
                format,
            },
        };

        setFormConfig([...formConfig, newField]);
        resetForm();
    };

    const resetForm = () => {
        setLabel('');
        setOptions('');
        setRequired(false);
        setMinLength('');
        setMaxLength('');
        setFormat('');
    };

    const removeField = (id) => {
        setFormConfig(formConfig.filter(field => field.id !== id));
    };

    return (
        <div className="form-builder">
            <h2>Form Builder</h2>
            <div className="input-group">
                <input
                    type="text"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    placeholder="Field Label"
                />
                <select value={fieldType} onChange={(e) => setFieldType(e.target.value)}>
                    <option value="text">Text</option>
                    <option value="textarea">Text Area</option>
                    <option value="dropdown">Dropdown</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="radio">Radio</option>
                </select>
                {(fieldType === 'dropdown' || fieldType === 'checkbox' || fieldType === 'radio') && (
                    <input
                        type="text"
                        value={options}
                        onChange={(e) => setOptions(e.target.value)}
                        placeholder="Comma-separated options"
                    />
                )}
                <label>
                    <input
                        type="checkbox"
                        checked={required}
                        onChange={(e) => setRequired(e.target.checked)}
                    />
                    Required
                </label>
                {(fieldType==='text' || fieldType==='textarea') && (
                    <>
                        <input
                            type="number"
                            value={minLength}
                            onChange={(e) => setMinLength(e.target.value)}
                            placeholder="Min Length"
                        />
                        <input
                        type="number"
                        value={maxLength}
                            onChange={(e) => setMaxLength(e.target.value)}
                            placeholder="Max Length"
                        />
                        <input
                            type="text"
                            value={format}
                            onChange={(e) => setFormat(e.target.value)}
                            placeholder="Format (e.g., email)"
                        />
                    </>
                )
                }

                <button onClick={addField}>Add Field</button>
            </div>
            <div className="fields-list">
                {formConfig.map(field => (
                    <FormField key={field.id} field={field} removeField={removeField} />
                ))}
            </div>
        </div>
    );
};

export default FormBuilder;
