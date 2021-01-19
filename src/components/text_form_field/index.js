import React from 'react';

const TextFormField = props => {
    const { 
        label,
        name,
        id,
        value,
        pattern,
        onChange,
        disabled,
        errors
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
            />
            {
                errors.length > 0
                &&
                errors.map(error => {
                    return <small className="mt-0" key={error}>{error}</small>
                })
            }
        </div>
    );
}

export default TextFormField;