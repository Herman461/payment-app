'use client'

import { AlertIcon } from "@/components/icons/icons";
import Link from "next/link"
import { Dispatch, SetStateAction } from "react"

interface PaymentCheckboxProps {
    saveCard: boolean;
    isSavedCard: boolean;
    setSaveCard: Dispatch<SetStateAction<boolean>>;
}

export default function PaymentCheckbox({saveCard, setSaveCard, isSavedCard}: PaymentCheckboxProps) {

    const handleChange = () => {
        if (isSavedCard) return 

        setSaveCard(!saveCard)
    }
    return (
        <label className="payment__checkbox checkbox">
            <input
                onChange={handleChange}
                checked={saveCard} 
                className="checkbox__input" 
                type="checkbox"
                name="card_save" 
            />
            <span className="checkbox__text">
                <span>
                    <span>
                        Запомнить эту карту. Это безопасно.
                        <AlertIcon className="checkbox__alert" />
                    </span>

                    <br />
                    Сохраняя карту, вы соглашаетесь с <Link href="">условиями привязки карты.</Link>
                </span>
            </span>
        </label>
    )
}