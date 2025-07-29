'use client'

import { TickIcon } from "@/components/icons/icons"
import { Dispatch, SetStateAction } from "react"

interface PaymentSuccessWindowProps {
    setIsOpenSuccessWindow: Dispatch<SetStateAction<boolean>>
}

export default function PaymentSuccessWindow({setIsOpenSuccessWindow}: PaymentSuccessWindowProps) {
    return (
        <div className="payment-status payment-block">
            <div className="payment-status__block">
                <div className="payment-status__icon">
                    <TickIcon />
                </div>
                <div className="payment-status__message">Оплата прошла успешно!</div>
            </div>
            <div className="payment-status__bottom">
                <button 
                    onClick={(() => setIsOpenSuccessWindow(false))} 
                    type="button" 
                    className="payment-status__button base-button">Вернуться к оплате</button>
            </div>
        </div>
    )
}