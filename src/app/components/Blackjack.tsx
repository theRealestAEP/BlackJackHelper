'use client';


import React, { useState, useEffect } from 'react';
interface Shoe {
    // [key: string]: number;
    aces: number,
    kings: number,
    queens: number,
    jacks: number,
    tens: number,
    nines: number,
    eights: number,
    sevens: number,
    sixes: number,
    fives: number,
    fours: number,
    threes: number,
    twos: number
}

const initialShoeState = (numDecks: number) => ({
    aces: 4 * numDecks,
    kings: 4 * numDecks,
    queens: 4 * numDecks,
    jacks: 4 * numDecks,
    tens: 4 * numDecks,
    nines: 4 * numDecks,
    eights: 4 * numDecks,
    sevens: 4 * numDecks,
    sixes: 4 * numDecks,
    fives: 4 * numDecks,
    fours: 4 * numDecks,
    threes: 4 * numDecks,
    twos: 4 * numDecks,
});
// const cardValues = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];


const strategyChart = {
    hard: {
        8: { '2': 'H', '3': 'H', '4': 'H', '5': 'H', '6': 'H', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
        9: { '2': 'H', '3': 'D', '4': 'D', '5': 'D', '6': 'D', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
        10: { '2': 'D', '3': 'D', '4': 'D', '5': 'D', '6': 'D', '7': 'D', '8': 'D', '9': 'D', '10': 'H', 'A': 'H' },
        11: { '2': 'D', '3': 'D', '4': 'D', '5': 'D', '6': 'D', '7': 'D', '8': 'D', '9': 'D', '10': 'D', 'A': 'H' },
        12: { '2': 'H', '3': 'H', '4': 'S', '5': 'S', '6': 'S', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
        13: { '2': 'S', '3': 'S', '4': 'S', '5': 'S', '6': 'S', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
        14: { '2': 'S', '3': 'S', '4': 'S', '5': 'S', '6': 'S', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
        15: { '2': 'S', '3': 'S', '4': 'S', '5': 'S', '6': 'S', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
        16: { '2': 'S', '3': 'S', '4': 'S', '5': 'S', '6': 'S', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
        17: { '2': 'S', '3': 'S', '4': 'S', '5': 'S', '6': 'S', '7': 'S', '8': 'S', '9': 'S', '10': 'S', 'A': 'S' },
        18: { '2': 'S', '3': 'S', '4': 'S', '5': 'S', '6': 'S', '7': 'S', '8': 'S', '9': 'S', '10': 'S', 'A': 'S' },
        19: { '2': 'S', '3': 'S', '4': 'S', '5': 'S', '6': 'S', '7': 'S', '8': 'S', '9': 'S', '10': 'S', 'A': 'S' },
        20: { '2': 'S', '3': 'S', '4': 'S', '5': 'S', '6': 'S', '7': 'S', '8': 'S', '9': 'S', '10': 'S', 'A': 'S' },
        21: { '2': 'S', '3': 'S', '4': 'S', '5': 'S', '6': 'S', '7': 'S', '8': 'S', '9': 'S', '10': 'S', 'A': 'S' },
    },
    soft: {
        'A,2': { '2': 'H', '3': 'H', '4': 'H', '5': 'H', '6': 'H', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
        'A,3': { '2': 'H', '3': 'H', '4': 'H', '5': 'H', '6': 'H', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
        'A,4': { '2': 'H', '3': 'H', '4': 'H', '5': 'D', '6': 'D', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
        'A,5': { '2': 'H', '3': 'H', '4': 'H', '5': 'D', '6': 'D', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
        'A,6': { '2': 'H', '3': 'D', '4': 'D', '5': 'D', '6': 'D', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
        'A,7': { '2': 'S', '3': 'D', '4': 'D', '5': 'D', '6': 'D', '7': 'S', '8': 'S', '9': 'H', '10': 'H', 'A': 'S' },
        'A,8': { '2': 'S', '3': 'S', '4': 'S', '5': 'S', '6': 'S', '7': 'S', '8': 'S', '9': 'S', '10': 'S', 'A': 'S' },
        'A,9': { '2': 'S', '3': 'S', '4': 'S', '5': 'S', '6': 'S', '7': 'S', '8': 'S', '9': 'S', '10': 'S', 'A': 'S' }
    },
    pairs: {
        '2,2': { '2': 'P', '3': 'P', '4': 'P', '5': 'P', '6': 'P', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
        '3,3': { '2': 'P', '3': 'P', '4': 'P', '5': 'P', '6': 'P', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
        '4,4': { '2': 'H', '3': 'H', '4': 'H', '5': 'H', '6': 'H', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
        '5,5': { '2': 'D', '3': 'D', '4': 'D', '5': 'D', '6': 'D', '7': 'D', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
        '6,6': { '2': 'P', '3': 'P', '4': 'P', '5': 'P', '6': 'P', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
        '7,7': { '2': 'P', '3': 'P', '4': 'P', '5': 'P', '6': 'P', '7': 'P', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
        '8,8': { '2': 'P', '3': 'P', '4': 'P', '5': 'P', '6': 'P', '7': 'P', '8': 'P', '9': 'P', '10': 'P', 'A': 'P' },
        '9,9': { '2': 'P', '3': 'P', '4': 'P', '5': 'P', '6': 'P', '7': 'S', '8': 'P', '9': 'P', '10': 'S', 'A': 'S' },
        '10,10': { '2': 'S', '3': 'S', '4': 'S', '5': 'S', '6': 'S', '7': 'S', '8': 'S', '9': 'S', '10': 'S', 'A': 'S' },
        'A,A': { '2': 'P', '3': 'P', '4': 'P', '5': 'P', '6': 'P', '7': 'P', '8': 'P', '9': 'P', '10': 'P', 'A': 'P' },
    }
};


const cardValues = {
    'A': 11, // can be high or low 
    'K': 10,
    'Q': 10,
    'J': 10,
    '9': 9,
    '8': 8,
    '7': 7,
    '6': 6,
    '5': 5,
    '4': 4,
    '3': 3,
    '2': 2
}

type DealerCardKey = keyof typeof strategyChart.hard[8];
type PlayerHandKeySoft = keyof typeof strategyChart.soft;
type PlayerHandKeyPairs = keyof typeof strategyChart.pairs;
type PlayerHandKeyHard = keyof typeof strategyChart.hard;
type CardValueKey = keyof typeof cardValues;

const getStrategyDecision = (playerCard1: string, playerCard2: string, dealerCard: string) => {
    if(dealerCard == 'J' || dealerCard == 'Q' || dealerCard == 'K'){
        dealerCard = '10'
    }
    const dealerCardKey = dealerCard as DealerCardKey;
    const card1Key = playerCard1 as CardValueKey;
    const card2Key = playerCard2 as CardValueKey;


    if ((playerCard1 === 'A' || playerCard2 === 'A') && !(playerCard1 === 'A' && playerCard2 === 'A')) {
        // Soft case
        const playerHand = `${playerCard1},${playerCard2}` as PlayerHandKeySoft;
        return strategyChart.soft[playerHand]?.[dealerCardKey];
    } else if (playerCard1 === playerCard2) {
        // Pairs case
        const playerHand = `${playerCard1},${playerCard2}` as PlayerHandKeyPairs;
        return strategyChart.pairs[playerHand]?.[dealerCardKey];
    } else {
        // Hard case
        const playerTotal = cardValues[card1Key] + cardValues[card2Key] as PlayerHandKeyHard;
        if (playerTotal < 8) {
            return 'H'
        }
        return strategyChart.hard[playerTotal]?.[dealerCardKey]
    }
};



export default function BlackJack() {
    const [numDecks, setNumDecks] = useState(6);
    const [shoe, setShoe] = useState(initialShoeState(numDecks));
    const [favorabilityScore, setFavorabilityScore] = useState(0);
    const [trueCount, setTrueCount] = useState(0);
    const [playerHand, setPlayerHand] = useState(0);
    const [playerBust, setPlayerBust] = useState(0);


    const [playerCard1, setPlayerCard1] = useState('2');
    const [playerCard2, setPlayerCard2] = useState('2');
    const [dealerCard, setDealerCard] = useState('2');
    const [advice, setAdvice] = useState('');

    const handlePlayerCard1Change = (event: React.ChangeEvent<HTMLSelectElement>) => { setPlayerCard1(event.target.value) }
    const handlePlayerCard2Change = (event: React.ChangeEvent<HTMLSelectElement>) => { setPlayerCard2(event.target.value) }
    const handleDealerCardChange = (event: React.ChangeEvent<HTMLSelectElement>) => { setDealerCard(event.target.value) }



    const handleDeckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newNumDecks = parseInt(event.target.value, 10);
        setNumDecks(newNumDecks);
        setShoe(initialShoeState(newNumDecks));
    };

    const handlePlayerHandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const playerHand = parseInt(event.target.value, 10);
        setPlayerHand(playerHand);
        setPlayerBust(calculatePercentBust(shoe, playerHand))
    };


    const incrementCard = (cardType: keyof Shoe) => {
        const updatedCount = shoe[cardType] + 1;
        setShoe({ ...shoe, [cardType]: updatedCount });
    };

    const decrementCard = (cardType: keyof Shoe) => {
        const updatedCount = Math.max(shoe[cardType] - 1, 0);
        setShoe({ ...shoe, [cardType]: updatedCount });
    };
    const calculateTrueCount = (shoe: Shoe): number => {
        // Define weights for each card type based on their strategic value
        const weights = {
            aces: -1, // Aces are usually more valuable
            kings: -1,
            queens: -1,
            jacks: -1,
            tens: -1,
            nines: 0,
            eights: 0,
            sevens: 0,
            sixes: 1, // Lower cards might be less favorable
            fives: 1,
            fours: 1,
            threes: 1,
            twos: 1
        };
        let score = 0;
        for (const cardType in shoe) {
            if (shoe.hasOwnProperty(cardType)) {
                const weight = weights[cardType as keyof typeof weights];
                const count = shoe[cardType as keyof Shoe];
                score -= (count * weight)
            }
        }

        return score / numDecks;
    };

    const calculatePercentBust = (shoe: Shoe, playerHand: number): number => {
        // Define weights for each card type based on their strategic value
        const values = {
            aces: 1, // Aces are usually more valuable
            kings: 10,
            queens: 10,
            jacks: 10,
            tens: 10,
            nines: 9,
            eights: 8,
            sevens: 7,
            sixes: 6, // Lower cards might be less favorable
            fives: 5,
            fours: 4,
            threes: 3,
            twos: 2
        };
        let total = 0
        let busts = 0;
        for (const cardType in shoe) {
            if (shoe.hasOwnProperty(cardType)) {
                const bust = values[cardType as keyof typeof values];
                const count = shoe[cardType as keyof Shoe];
                total += count
                if (playerHand + bust > 21) {
                    busts += count
                }
                // score -= (count * weight)
                // console.log(shoe[cardType])
            }
        }

        return busts / total;
    };


    const calculateAdvancedFavorability = (shoe: Shoe): number => {
        // Define weights for each card type based on their strategic value
        const weights = {
            aces: 1.5, // Aces are usually more valuable
            kings: 1.2,
            queens: 1.1,
            jacks: 1.1,
            tens: 1.0,
            nines: 0.5,
            eights: 0.5,
            sevens: 0.4,
            sixes: -0.5, // Lower cards might be less favorable
            fives: -0.6,
            fours: -0.7,
            threes: -0.8,
            twos: -0.9
        };

        const cardCounts = Object.values(shoe).reduce((a, b) => a + b, 0);
        const maxWeight = Math.max(...Object.values(weights));
        const minWeight = Math.min(...Object.values(weights));

        const maxScore = maxWeight * cardCounts;
        const minScore = minWeight * cardCounts;

        let currentScore = 0;
        for (const cardType in shoe) {
            if (shoe.hasOwnProperty(cardType)) {
                const weight = weights[cardType as keyof typeof weights];
                const count = shoe[cardType as keyof Shoe];
                currentScore += count * weight;
            }
        }

        const normalizedScore = ((currentScore - minScore) / (maxScore - minScore)) * 100;
        return Math.max(0, Math.min(normalizedScore, 100)); // Ensuring the score is within 0-100
    };

    const giveAdvice = () => {
        const decision = getStrategyDecision(playerCard1, playerCard2, dealerCard);
        console.log(decision)
        setAdvice(decision);
    };


    useEffect(() => {
        // Calculate and set the favorability score whenever the shoe state changes
        const score = calculateAdvancedFavorability(shoe); // Implement this function as before
        const trueCount = calculateTrueCount(shoe); // Implement this function as before

        setFavorabilityScore(score);
        setTrueCount(trueCount);

        setPlayerBust(calculatePercentBust(shoe, playerHand))

    }, [shoe]);

    return (
        <>
            <div className="bg-white p-4 rounded-lg shadow-md overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold margin-right px-10 items-left">Number of Decks in Shoe</span>
                    <input
                        type="number"
                        value={numDecks}
                        onChange={handleDeckChange}
                        className="form-input px-4 py-2 border rounded"
                    />
                </div>
                {Object.entries(shoe).map(([cardType, count]) => (
                    <div key={cardType} className="flex items-center justify-between mb-2">
                        <span className="text-md font-medium">{cardType}: {count}</span>
                        <div>
                            <button
                                onClick={() => incrementCard(cardType as keyof Shoe)}
                                className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-l"
                            >
                                +
                            </button>
                            <button
                                onClick={() => decrementCard(cardType as keyof Shoe)}
                                className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-r"
                            >
                                -
                            </button>
                        </div>
                    </div>
                ))}
                <div className="mt-6">
                    <span className="text-md font-medium">Favorability Score: {favorabilityScore.toFixed(2)}</span>
                </div>
                <div className="mb-4">
                    <span className="text-md font-medium">True Count: {trueCount}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold margin-right px-10 items-left">Enter Your Hand #: </span>
                    <input
                        type="number"
                        value={playerHand}
                        onChange={handlePlayerHandChange}
                        className="form-input px-4 py-2 border rounded"
                    />
                    {playerBust && <span className="text-md font-small"> bust {(Math.trunc(playerBust * 100))}%</span>}
                </div>
            </div>
            <div>
                <div className="bg-white p-4 rounded-lg shadow-md ml-4 mr-4 mt-6 w-full md:w-1/8 max-w-2xl ">
                    <span className="block text-sm font-large mb-1" >The Book</span>
                    <div className="flex flex-col">
                        <div className="mb-4">
                            <span className="block text-sm font-medium mb-1" >Player Card 1</span>
                            <select onChange={handlePlayerCard1Change} className="form-select px-4 py-2 border rounded">
                                {Object.keys(cardValues).map(card => (
                                    <option value={card} key={card}>{card}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <span className="block text-sm font-medium mb-1" >Player Card 2</span>
                            <select onChange={handlePlayerCard2Change} className="form-select px-4 py-2 border rounded">
                                {Object.keys(cardValues).map(card => (
                                    <option value={card} key={card}>{card}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <span className="block text-sm font-medium mb-1" >Dealer Card</span>
                            <select onChange={handleDealerCardChange} className="form-select px-4 py-2 border rounded">
                                {Object.keys(cardValues).map(card => (
                                    <option value={card} key={card}>{card}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">

                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={giveAdvice}>Get Advice</button>
                        </div>
                        <div className="mb-4">
                            {/* if advice its H translate to hit if its P translate to split if its D translate to double down if its S it means stand */}
                            {advice
                                && (
                                    <div className="text-lg font-medium p-3 bg-green-100 text-green-800 rounded-lg">
                                        {advice === 'H' && 'Hit'}
                                        {advice === 'P' && 'Split'}
                                        {advice === 'D' && 'Double Down'}
                                        {advice === 'S' && 'Stand'}
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            </div>

        </>
    );

}