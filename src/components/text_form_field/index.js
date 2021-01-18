import React from 'react';

const NumberFormField = props => {
    const { 
        label,
        name,
        id,
        value,
        pattern,
        onChange,
        disabled,
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
                type="text"
                name={name} 
                id={id}
                value={value}
                pattern={pattern}
                onChange={onChange}
                disabled={disabled || false}
                required
            />
        </div>
    );
}

export default NumberFormField;