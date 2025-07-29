'use client'

import AmountBlock from "./AmountBlock"
import SavedCardsBlock from "./SavedCardsBlock"

import { useEffect, useRef, useState, FormEvent } from 'react'
import { CardInterface } from "../_types/CardInterface"
import CardBlock from "./CardBlock"
import PaymentCheckbox from "./PaymentCheckbox"
import BaseButton from "@/components/BaseButton"
import { useInput } from "@/hooks/useInput"
import { API_URL } from "@/utils/config"
import PaymentSuccessWindow from "./PaymentSuccessWindow"

interface PaymentContainerProps {
    initialCards: CardInterface[]
}

export default function PaymentContainer({ initialCards }: PaymentContainerProps) {
    const [cards, setCards] = useState(initialCards)

    const [saveCard, setSaveCard] = useState<boolean>(false)

    const [isSavedCard, setIsSavedCard] = useState<boolean>(false)
    const [wasInteracted, setWasInteracted] = useState(false)

    const fromAmount = useInput("", { isRequired: true })
    const toAmount = useInput("", { isRequired: true })
    const number = useInput("", { isRequired: true, cardNumber: true })
    const cvv = useInput("", { isRequired: true, cvv: true })
    const month = useInput("", { isRequired: true, minLength: 2 })
    const year = useInput("", { isRequired: true, minLength: 2 })
    const [savedCardId, setSavedCardId] = useState<number | null>(null)

    const [error, setError] = useState<string>("")
    const [isOpenSuccessWindow, setIsOpenSuccessWindow] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const cvvInputRef = useRef<HTMLInputElement>(null)
    const numberInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {

        let timerId

        if (error) {
            setTimeout(() => {
                setError("")
            }, 5000)
        }

        return () => {
            clearTimeout(timerId)
        }
    }, [error]);

    const handleSavedCardClick = (card: CardInterface) => {
        setWasInteracted(true)

        number.onChange("**** **** **** " + card.number)
        month.onChange(card.month)
        year.onChange(card.year)

        setSavedCardId(card.id)

        cvv.reset()
        setSaveCard(true)
        setIsSavedCard(true)
    }

    const handleSetNewCard = () => {
        setWasInteracted(true)

        number.reset()
        cvv.reset()
        month.reset()
        year.reset()

        setSavedCardId(null)

        setSaveCard(false)
        setIsSavedCard(false)
    }

    const handleSubmitForm = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
       

        try {
            if (
                !isSavedCard &&
                (!fromAmount.inputValid
                    || !number.inputValid
                    || !cvv.inputValid
                    || !month.inputValid
                    || !year.inputValid)
            ) {

                fromAmount.validate(fromAmount.value)
                toAmount.validate(toAmount.value)

                number.validate(number.value)
                cvv.validate(cvv.value)
                month.validate(month.value)
                year.validate(year.value)

                setError("Некоторые поля заполнены неверно")
             
                return;
            }

            setIsLoading(true)
            
            if (isSavedCard && (!cvv.inputValid || fromAmount.inputValid)) {
                cvv.validate(cvv.value)
                fromAmount.validate(fromAmount.value)
            }
            const currentCardData = isSavedCard
                ? { id: savedCardId, cvv: cvv.value }
                : {
                    number: number.value,
                    cvv: cvv.value,
                    month: month.value,
                    year: year.value
                }

            const response = await fetch(API_URL + '/api/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    saveCard,
                    fromAmount: fromAmount.value,
                    toAmount: toAmount.value,
                    card: currentCardData
                }),
            })

            if (!response.ok) {
                const errorData = await response.json()

                if (response.status === 422 && errorData.errors) {
                    if (errorData.errors?.fromAmount) {
                        fromAmount.setErrorMessage(errorData.errors.fromAmount[0])
                    }
                    if (errorData.errors?.fromAmount) {
                        toAmount.setErrorMessage(errorData.errors.toAmount[0])
                    }
                    if (errorData.errors?.number) {
                        number.setErrorMessage(errorData.errors.number[0])
                    }
                    if (errorData.errors?.cvv) {
                        cvv.setErrorMessage(errorData.errors.cvv[0])
                    }
                    if (errorData.errors?.month) {
                        month.setErrorMessage(errorData.errors.month[0])
                    }
                    if (errorData.errors?.year) {
                        year.setErrorMessage(errorData.errors.year[0])
                    }
                }
                setIsLoading(false)
                setError('Ошибка при отправке формы')

                return
            }

            const data = await response.json()
            const card = data.card

            setIsOpenSuccessWindow(true)
         
            if (!isSavedCard && saveCard) {
                setCards(prevState => ([...prevState, card]))
            }

            handleSetNewCard()
            toAmount.reset()
            fromAmount.reset()
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
            setError("Ошибка при отправке формы")
        }

    }

    useEffect(() => {
        if (!wasInteracted) return

        if (isSavedCard) {
            cvvInputRef.current?.focus()
        } else {
            numberInputRef.current?.focus()
        }
    }, [isSavedCard, wasInteracted])

    return (
        <>
            {
                !isOpenSuccessWindow &&
                <form onSubmit={handleSubmitForm} className="payment payment-block">
                    <h1 className="payment__title">Пополнить банковской картой</h1>
                    <AmountBlock
                        fromAmount={fromAmount}
                        toAmount={toAmount}
                    />
                    <SavedCardsBlock
                        handleSetNewCard={handleSetNewCard}
                        handleSavedCardClick={handleSavedCardClick}
                        cards={cards}
                    />
                    <CardBlock
                        isSavedCard={isSavedCard}
                        cvvInputRef={cvvInputRef}
                        numberInputRef={numberInputRef}
                        number={number}
                        cvv={cvv}
                        month={month}
                        year={year}
                    />

                    <PaymentCheckbox isSavedCard={isSavedCard} saveCard={saveCard} setSaveCard={setSaveCard} />

                    <div className="payment__bottom">
                        <div className="payment__error">{error}</div>
                        <BaseButton isLoading={isLoading} type="submit" className="payment__submit">Отправить</BaseButton>
                    </div>

                </form>
            }
            {
                isOpenSuccessWindow && <PaymentSuccessWindow setIsOpenSuccessWindow={setIsOpenSuccessWindow} />
            }
        </>


    )
}