'use client'

import { forwardRef, ChangeEvent, FocusEvent, ForwardedRef } from "react";

interface BaseInputProps {
    value: string;
    name: string;
    isHiddenErrorMessage?: boolean,
    htmlFor?: string;
    isDirty?: boolean;
    errorMessage?: string;
    type?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    placeholder?: string;
    className?: string;
}

export default forwardRef<HTMLInputElement, BaseInputProps>(({
    value, 
    name,
    htmlFor, 
    isDirty, 
    errorMessage = '',
    type = "text", 
    onChange,
    onBlur,
    disabled = false,
    isHiddenErrorMessage = false,
    placeholder, 
    className = ''
}, ref: ForwardedRef<HTMLInputElement>) => {

    return (
        <div className="base-input">
            {(isDirty && errorMessage && !isHiddenErrorMessage && !disabled) &&
                <div className="error-message">{errorMessage}</div>
            }
            <input
                name={name}
                placeholder={placeholder}
                autoComplete="off"
                ref={ref}
                onBlur={onBlur}
                onChange={onChange}
                className={
                    "input" +
                    (errorMessage !== '' ? ' has-error' : '') +
                    (className ? (' ' + className) : '')
                }
                type={type}
                id={htmlFor}
                value={value}
                disabled={disabled}
            />

        </div>
    );

})
