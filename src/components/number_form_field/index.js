import React from 'react';

const NumberFormField = props => {
    const { 
        label,
        name,
        id,
        value,
        onChange,
        min,
        disabled,
        step
    } = props;

    return (
        <div className="form-group form-inline mx-auto my-3">
            <label 
                htmlFor={id}
                className="text-left col-sm-5">
                {label}:
            </label>
            <input 
                className="form-control col-sm-7" 
                type="number"
                name={name} 
                id={id}
                value={value}
                onChange={onChange}
                min={min}
                disabled={disabled || false}
                step={step}
                required
            />
        </div>
    );
}

export default NumberFormField;