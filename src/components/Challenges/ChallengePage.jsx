import React, { useState, useEffect } from "react";
import styles from "./ChallengePage.module.css";

const flashcardSets = {
    Java: [
        { question: "What is the difference between `==` and `.equals()` in Java?", answer: "`==` checks reference equality, while `.equals()` checks value equality." },
        { question: "What is a constructor in Java?", answer: "A special method used to initialize objects." },
        { question: "What does `static` mean in Java?", answer: "It means a method or variable belongs to the class rather than an instance." }
    ],
    General: [
        { question: "What is the capital of Canada?", answer: "Ottawa" },
        { question: "Who painted the Mona Lisa?", answer: "Leonardo da Vinci" },
        { question: "How many continents are there?", answer: "Seven" }
    ],
    FunTrivia: [
        { question: "What color is a polar bear's skin under its fur?", answer: "Black" },
        { question: "What fruit has its seeds on the outside?", answer: "Strawberry" },
        { question: "What is the fear of spiders called?", answer: "Arachnophobia" }
    ],
    Comp: [
        { question: "What color is a polar bear's skin under its fur?", answer: "Black" },
        { question: "What fruit has its seeds on the outside?", answer: "Strawberry" },
        { question: "What is the fear of spiders called?", answer: "Arachnophobia" }
    ],
    Science: [
        { question: "What color is a polar bear's skin under its fur?", answer: "Black" },
        { question: "What fruit has its seeds on the outside?", answer: "Strawberry" },
        { question: "What is the fear of spiders called?", answer: "Arachnophobia" }
    ],
    Math: [
        { question: "What color is a polar bear's skin under its fur?", answer: "Black" },
        { question: "What fruit has its seeds on the outside?", answer: "Strawberry" },
        { question: "What is the fear of spiders called?", answer: "Arachnophobia" }
    ],
    Art: [
        { question: "What color is a polar bear's skin under its fur?", answer: "Black" },
        { question: "What fruit has its seeds on the outside?", answer: "Strawberry" },
        { question: "What is the fear of spiders called?", answer: "Arachnophobia" }
    ],
    Drawing: [
        { question: "What color is a polar bear's skin under its fur?", answer: "Black" },
        { question: "What fruit has its seeds on the outside?", answer: "Strawberry" },
        { question: "What is the fear of spiders called?", answer: "Arachnophobia" }
    ],
    KKK: [
        { question: "What color is a polar bear's skin under its fur?", answer: "Black" },
        { question: "What fruit has its seeds on the outside?", answer: "Strawberry" },
        { question: "What is the fear of spiders called?", answer: "Arachnophobia" }
    ],
};

const ChallengePage = ({ onClose }) => {
    const friendsList = ["Lara", "Katie", "Aditya", "Yasmeen", "Emma"];
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [requestSent, setRequestSent] = useState(false);
    const [showFlashcardSets, setShowFlashcardSets] = useState(false);
    const [selectedSet, setSelectedSet] = useState(null);
    const [selectedFlashcard, setSelectedFlashcard] = useState(null);

    const handleChallenge = (friend) => {
        setSelectedFriend(friend);
        setRequestSent(true);

        // After 2 seconds, hide "Request Sent" and show flashcard sets
        setTimeout(() => {
            setRequestSent(false);
            setShowFlashcardSets(true);
        }, 2000);
    };

    const handleSetSelection = (setName) => {
        setSelectedSet(setName);

        // Pick a random question from the selected set
        const randomIndex = Math.floor(Math.random() * flashcardSets[setName].length);
        setSelectedFlashcard(flashcardSets[setName][randomIndex]);
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <button className={styles.closeButton} onClick={onClose}>&times;</button>

                {/* Step 1: Select a friend */}
                {!requestSent && !showFlashcardSets && !selectedSet && (
                    <>
                        <h2>Nudge a Friend to Challenge Them!</h2>
                        <div className={styles.friendList}>
                            {friendsList.map((friend, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleChallenge(friend)}
                                    className={styles.friendItem}
                                >
                                    {friend}
                                </button>
                            ))}
                        </div>
                    </>
                )}

                {/* Step 2: Show "Request Sent" message */}
                {requestSent && (
                    <p className={styles.requestMessage}>Request Sent!</p>
                )}

                {/* Step 3: Show flashcard set selection after "Request Sent" disappears */}
                {showFlashcardSets && !selectedSet && !requestSent && (
                    <>
                        <h2>Select a Flashcard Set</h2>
                        <div className={styles.flashcardList}>
                            {Object.keys(flashcardSets).map((setName, index) => (
                                <button
                                    key={index}
                                    className={styles.flashcardItem}
                                    onClick={() => handleSetSelection(setName)}
                                >
                                    {setName}
                                </button>
                            ))}
                        </div>
                    </>
                )}

                {/* Step 4: Show the selected flashcard question */}
                {selectedFlashcard && (
                    <div className={styles.flashcard}>
                        <h2>{selectedSet} Quiz</h2>
                        <p>{selectedFlashcard.question}</p>
                        <p className={styles.answer}>Answer: {selectedFlashcard.answer}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChallengePage;
