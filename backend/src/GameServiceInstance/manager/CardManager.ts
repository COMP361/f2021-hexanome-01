import { TownCard, TravelCard, TravelCardType } from "../model/Card";

export default class CardManager {
    private townCards: TownCard[];
    private availableCards: TravelCard[];
    private playerCards: Map<string, TravelCard[]>;

    constructor(game: string) {
        if (game) {
            this.populateTownCards();
        }

        this.populateCards();
        this.playerCards = new Map();
    }

    private populateCards(): void {
        for (const type in TravelCardType) {
            this.availableCards.push(new TravelCard(TravelCardType[type] as TravelCardType));
        }

        this.availableCards.push(new TravelCard(TravelCardType.RAFT));
        this.availableCards.push(new TravelCard(TravelCardType.RAFT));

        this.availableCards.sort(() => Math.random() - 0.5);
    }

    private populateTownCards(): void {
        this.townCards.push(null);
    }

    async getRandomCards(name: string): Promise<TravelCard[]> {
        const cards: TravelCard[] = this.playerCards.has(name) ? this.playerCards.get(name): [] ;
        for (let i = cards.length; i < 8; i++) {
            cards.push(await this.getRandomCard());
        }

        this.playerCards.set(name, cards);

        return cards;
    }

    async getRandomCard(): Promise<TravelCard> {
        const index = Math.random() * this.availableCards.length - 1;
        const card = this.availableCards[index];
        this.availableCards.splice(index, 1);
        return card;
    }

}