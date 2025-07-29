import { Validations } from "@/types/Validations"
import { useEffect, useState } from "react"


export const useValidation = (validations: Validations) => {
    const [inputValid, setInputValid] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")


    const validate = (value: string) => {

        for (const validation in validations) {
            switch (validation) {
                case 'cvv':
                    if (validations[validation]) {
                        const onlyNumericValue = value.replace(/\D/g, "").slice(0, 3)

                        if (onlyNumericValue.length !== 3) {
                            setErrorMessage("CVV должен содержать 3 цифры")
                            return
                        }
                    }
                    break;
                case 'cardNumber':
                    if (validations[validation]) {
                        const onlyNumericValue = value.replace(/\D/g, "").slice(0, 16)

                        if (onlyNumericValue.length !== 16) {
                            setErrorMessage("Номер карты должен состоять из 16 цифр")
                            return
                        }

                    }

                    break;
                case 'isRequired':
                    if (!value.trim()) {
                        setErrorMessage("Это поле не может быть пустым.")
                        return
                    }
                    break;
                case 'minLength':
                    if (validations[validation] && value.length < validations[validation] && value.length !== 0) {

                        setErrorMessage("Это поле должно содержать минимум " + validations[validation] + " символов")
                        return

                    }
                    break;
                case 'maxLength':
                    if (validations[validation] && value.length > validations[validation]) {

                        setErrorMessage("Это поле должно содержать максимум " + validations[validation] + " символов")
                        return

                    }
                    break;
            }
        }

        setErrorMessage("")
        setInputValid(true)
    }

    useEffect(() => {
        if (errorMessage) {
          
            setInputValid(false)
        }
    }, [inputValid, errorMessage])

    return {
        setErrorMessage,
        inputValid,
        validate,
        errorMessage
    }
}