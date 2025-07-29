import { FocusEvent, Dispatch, SetStateAction } from "react";

export interface BaseInputInterface {
    inputValid: boolean;
    errorMessage: string;
    value: string;
    isDirty: boolean;
    onBlur: (e: FocusEvent<HTMLInputElement>) => void;
    onChange: (value: string) => void;
    reset: () => void;
    setValue: Dispatch<SetStateAction<string>>;
    validate: (value: string) => void;
}