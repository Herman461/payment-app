'use client'

import BaseInput from "@/components/BaseInput"
import { BaseInputInterface } from "@/types/BaseInputInterface";
import { ChangeEvent, useEffect } from "react"

interface AmountBlockProps {
    fromAmount: BaseInputInterface;
    toAmount: BaseInputInterface;

}

export default function AmountBlock({fromAmount, toAmount}: AmountBlockProps) {

    const roundTwoDecimals = (num: number) => Math.round(num * 100) / 100

    useEffect(() => {
        if (toAmount.value === '' && fromAmount.value === '') return
        if (toAmount.value === '' && fromAmount.value !== '') fromAmount.setValue('')

        const result = roundTwoDecimals(Number(toAmount.value) / 15).toString()

        if (result !== fromAmount.value) {
            fromAmount.onChange(Number(result) === 0 ? '' : result)
        }


    }, [toAmount.value])

    useEffect(() => {
        if (toAmount.value === '' && fromAmount.value === '') return
        if (fromAmount.value === '' && toAmount.value !== '') toAmount.setValue('')

        const result = roundTwoDecimals(Number(fromAmount.value) * 15).toString()

        if (result !== toAmount.value) {

            toAmount.onChange(Number(result) === 0 ? '' : result)
        }


    }, [fromAmount.value])

    const onlyNumericRegExp = /^\d*(\.\d{0,2})?$/

    const handleFromCurrencyChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value: string = e.target.value

        if (!onlyNumericRegExp.test(value)) return

        fromAmount.onChange(value)
    }

    const handleToCurrencyChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value: string = e.target.value

        if (!onlyNumericRegExp.test(value)) return

        toAmount.onChange(value)
    }
    return (
        <div className="payment__amount amount-payment">
            <div className="amount-payment__label label label_dark">Укажите сумму</div>
            <div className="amount-payment__fields">
                <div className="amount-payment__field">
                    <BaseInput 
                        isDirty={fromAmount.isDirty}
                        onBlur={fromAmount.onBlur}
                        errorMessage={fromAmount.errorMessage} 
                        name="from_currency" 
                        onChange={handleFromCurrencyChange} 
                        value={fromAmount.value} 
                        placeholder="0000.00" 
                    />
                    <div className="amount-payment__currency">ֆ</div>
                </div>
                <div className="amount-payment__field">
                    <BaseInput
                        isHiddenErrorMessage={true}
                        isDirty={toAmount.isDirty}
                        onBlur={toAmount.onBlur}
                        errorMessage={fromAmount.errorMessage}
                        name="to_currency" 
                        onChange={handleToCurrencyChange} 
                        value={toAmount.value} 
                        placeholder="0000.00" 
                    />
                    <div className="amount-payment__currency">₽</div>
                </div>
            </div>
        </div>
    )
}