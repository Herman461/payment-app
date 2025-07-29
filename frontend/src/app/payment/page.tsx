import { API_URL } from "@/utils/config"
import PaymentContainer from "./_components/PaymentContainer"
import { CardInterface } from "./_types/CardInterface"

export default async function PaymentPage() {

    const response = await fetch(API_URL + '/api/payment/saved-cards')
    const data = await response.json()
    
    const transformedCards = data.cards.map((card: CardInterface) => ({...card, cvv: ''}))
    
    return <PaymentContainer initialCards={transformedCards} />
}