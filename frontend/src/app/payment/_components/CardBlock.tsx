'use client'

import { ChangeEvent, Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react"
import BaseInput from "@/components/BaseInput"
import { BaseInputInterface } from "@/types/BaseInputInterface";
import BaseLabel from "@/components/BaseLabel";

interface CardBlockProps {
    isSavedCard: boolean;
    cvvInputRef: RefObject<HTMLInputElement | null>;
    numberInputRef: RefObject<HTMLInputElement | null>;
    number: BaseInputInterface;
    cvv: BaseInputInterface;
    month: BaseInputInterface;
    year: BaseInputInterface;
}

export default function CardBlock({ cvvInputRef, number, cvv, month, year, isSavedCard, numberInputRef }: CardBlockProps) {

    const monthInputRef = useRef<HTMLInputElement>(null)
    const yearInputRef = useRef<HTMLInputElement>(null)

    const [isCvvFieldFilled, setIsCvvFieldFilled] = useState<boolean>(false)

    const handleNumberFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (isSavedCard) return
        
        const value = e.target.value

        const onlyNumericValue = value.replace(/\D/g, "").slice(0, 16)
        const formattedValue = onlyNumericValue.replace(/(.{4})/g, "$1 ").trim()

        number.setValue(formattedValue)

        if (onlyNumericValue.length === 16) {
            cvvInputRef.current?.focus()
        }
    }

    const handleCvvFieldChange = (e: ChangeEvent<HTMLInputElement>) => {

        const cvvInput = e.target.value.replace(/\D/g, "").slice(0, 3)

        cvv.onChange(cvvInput)

        if (cvvInput.length === 3) {
            monthInputRef.current?.focus()
        } 
 
    }

    useEffect(() => {
        if (cvv.value.length === 3) {
            if (!isCvvFieldFilled) {
                setIsCvvFieldFilled(true)
            }

        } else {

            if (isCvvFieldFilled) {
                setIsCvvFieldFilled(false)
            }
        }
    }, [cvv.value])

    const handleMonthFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (isSavedCard) return
        let monthInput = e.target.value.replace(/\D/g, "").slice(0, 2)

        if (monthInput.length === 1 && parseInt(monthInput) > 1) {
            monthInput = "0" + monthInput
        }
        if (parseInt(monthInput) > 12) monthInput = "12"

        e.target.value = monthInput
        month.onChange(monthInput)

        if (monthInput.length === 2) {
            yearInputRef.current?.focus()
        }
    }

    const handleYearFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (isSavedCard) return

        const yearInput = e.target.value.replace(/\D/g, "").slice(0, 2)
        year.onChange(yearInput)
    }

    return (
        <div className="payment__card card">
            <div className="card__main main-card">

                <BaseLabel className="main-card__label">Номер карты</BaseLabel>
                <div className="main-card__input">
                    <BaseInput
                        disabled={isSavedCard}
                        ref={numberInputRef}
                        className="card-input"
                        placeholder="Номер карты"
                        onChange={handleNumberFieldChange}
                        value={number.value}
                        isDirty={number.isDirty}
                        onBlur={number.onBlur}
                        errorMessage={number.errorMessage}
                        name="card_number"
                    />
                </div>

                <BaseLabel className="main-card__label">Действует до</BaseLabel>
                <div className="main-card__date date-card">

                    <div className="date-card__input">
                        <BaseInput
                            disabled={isSavedCard}
                            isHiddenErrorMessage={true}
                            ref={monthInputRef}
                            className="card-input"
                            placeholder="мм"
                            onChange={handleMonthFieldChange}
                            value={month.value}
                            isDirty={month.isDirty}
                            onBlur={month.onBlur}
                            errorMessage={month.errorMessage}
                            name="card_month"
                        />
                    </div>

                    <div className="date-card__delimiter">/</div>

                    <div className="date-card__input">
                        <BaseInput
                            disabled={isSavedCard}
                            isHiddenErrorMessage={true}
                            ref={yearInputRef}
                            className="card-input"
                            placeholder="гг"
                            onChange={handleYearFieldChange}
                            value={year.value}
                            isDirty={year.isDirty}
                            onBlur={year.onBlur}
                            errorMessage={year.errorMessage}
                            name="card_year"
                        />
                    </div>

                </div>
            </div>
            <div className={"card__reverse reverse-card" + (isCvvFieldFilled ? " reverse-card_filled" : '')}>
                <div className="reverse-card__action">
                    <BaseLabel isDark={true} className="reverse-card__label">CVV/CVC</BaseLabel>
                    <div className="reverse-card__input">
                        <BaseInput
                            isHiddenErrorMessage={true}
                            ref={cvvInputRef}
                            className="card-input"
                            placeholder="000"
                            onChange={handleCvvFieldChange}
                            value={cvv.value}
                            isDirty={cvv.isDirty}
                            onBlur={cvv.onBlur}
                            errorMessage={cvv.errorMessage}
                            name="card_cvv"
                        />
                    </div>

                </div>
                <div className="reverse-card__text">
                    три цифры
                    <br />
                    с обратной стороны
                    <br />карты
                </div>
                <div className="reverse-card__bg">
                    <svg width="312" height="201" viewBox="0 0 312 201" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect y="0.138672" width="312" height="200" fill="#EBEBF0" />
                        <rect opacity="0.3" y="20.1387" width="312" height="40" fill="#C7C9D9" />
                    </svg>
                </div>
            </div>
        </div>
    )
}