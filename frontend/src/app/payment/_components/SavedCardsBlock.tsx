'use client'

import { CardInterface } from "../_types/CardInterface"
import { PlusIcon } from "@/components/icons/icons";


interface SavedCardsProps {
    cards: CardInterface[];
    handleSavedCardClick: (card: CardInterface) => void,
    handleSetNewCard: () => void,

}

export default function SavedCardsBlock({ cards, handleSavedCardClick, handleSetNewCard }: SavedCardsProps) {


    return (
        <div className="payment__saved-cards saved-cards">
            {
                cards.map(card =>
                    <div onClick={() => handleSavedCardClick(card)} key={card.id} className="saved-cards__item">
                        <div className="saved-cards__body">
                            <div className="saved-cards__number">
                                <span>••••</span> {card.number}
                            </div>
                            <div className="saved-cards__date">{card.month + " / " + card.year}</div>
                        </div>
                    </div>
                )
            }
            <div className="saved-cards__action">
                <div onClick={handleSetNewCard} className="saved-cards__body">
                    <div className="saved-cards__icon">
                        <PlusIcon />
                    </div>
                    <div className="saved-cards__text">Новая карта</div>
                </div>
            </div>
        </div>
    )
}