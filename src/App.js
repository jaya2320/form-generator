import React, { useState } from 'react';
import FormBuilder from "./components/FormBuilder";
import './App.css';
import {Container} from "@mui/material";

const JsonDisplay = ({ data }) => {
    return (
        <div className="json-display">
            <h3>Form Configuration (JSON)</h3>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};
const App = () => {
    const [formConfig, setFormConfig] = useState([]);

    const saveConfig = () => {
        const json = JSON.stringify(formConfig);
        localStorage.setItem('formConfig', json);
        alert('Configuration saved!');
    };

    const loadConfig = () => {
        const json = localStorage.getItem('formConfig');
        if (json) {
            setFormConfig(JSON.parse(json));
            alert('Configuration loaded!');
        } else {
            alert('No configuration found.');
        }
    };

    return (
        <div className="app">
            <h1>Dynamic Form Generator</h1>
            <FormBuilder formConfig={formConfig} setFormConfig={setFormConfig} />
            <div className="button-group">
                <button onClick={saveConfig}>Save Configuration</button>
                <button onClick={loadConfig}>Load Configuration</button>
            </div>
            <JsonDisplay data={formConfig} /> {/* Display the JSON configuration */}
        </div>
    );
};

export default App;
