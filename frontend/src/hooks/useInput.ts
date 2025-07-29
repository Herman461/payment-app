import { useState } from "react"
import { useValidation } from "./useValidation"
import { Validations } from "@/types/Validations"
import { FocusEvent } from 'react'

export const useInput = (initialValue: string, validations: Validations) => {
    const [value, setValue] = useState<string>(initialValue)
    const [isDirty, setIsDirty] = useState<boolean>(false)
    const valid = useValidation(validations)

    const onBlur = (e: FocusEvent<HTMLInputElement>) => {
        if (!isDirty) {
            setIsDirty(true)
        }
        
        valid.validate(e.target.value)
    }

    const reset = () => {
        setValue("")
        setIsDirty(false)

        valid.setErrorMessage("")
    }

    const onChange = (value: string) => {

        setValue(value)

        if (isDirty && valid.errorMessage) valid.setErrorMessage("")
    }

    return {
        value,
        isDirty,
        onBlur,
        onChange,
        reset,
        setValue,
        ...valid
    }
}