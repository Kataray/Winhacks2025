import React, { useState, useEffect } from "react";
import styles from "./ChallengePage.module.css";

const flashcardSets = {
    Java: [
        { question: "Java supports multiple inheritance.", answer: "False" },
        { question: "The `final` keyword prevents method overriding.", answer: "True" },
        { question: "Java is a compiled language only.", answer: "False" }
    ],
    Science: [
        { question: "Water boils at 100°C at sea level.", answer: "True" },
        { question: "Humans have 5 lungs.", answer: "False" },
        { question: "The Earth is flat.", answer: "False" }
    ],
    Math: [
        { question: "Water boils at 100°C at sea level.", answer: "True" },
        { question: "Humans have 5 lungs.", answer: "False" },
        { question: "The Earth is flat.", answer: "False" }
    ],
    Arabic: [
        { question: "Water boils at 100°C at sea level.", answer: "True" },
        { question: "Humans have 5 lungs.", answer: "False" },
        { question: "The Earth is flat.", answer: "False" }
    ],
    Spanish: [
        { question: "Water boils at 100°C at sea level.", answer: "True" },
        { question: "Humans have 5 lungs.", answer: "False" },
        { question: "The Earth is flat.", answer: "False" }
    ],
    French: [
        { question: "Water boils at 100°C at sea level.", answer: "True" },
        { question: "Humans have 5 lungs.", answer: "False" },
        { question: "The Earth is flat.", answer: "False" }
    ],
    Art: [
        { question: "Water boils at 100°C at sea level.", answer: "True" },
        { question: "Humans have 5 lungs.", answer: "False" },
        { question: "The Earth is flat.", answer: "False" }
    ],
};

const ChallengePage = ({ onClose }) => {
    const friendsList = ["Lara", "Katie", "Aditya", "Yasmeen", "Emma"];
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [requestSent, setRequestSent] = useState(false);
    const [showFlashcardSets, setShowFlashcardSets] = useState(false);
    const [selectedSet, setSelectedSet] = useState(null);
    const [quizStarted, setQuizStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [showCorrectNotification, setShowCorrectNotification] = useState(false);
    const [showWrongNotification, setShowWrongNotification] = useState(false); // New state for wrong answer


    useEffect(() => {
        let interval;
        if (quizStarted) {
            interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [quizStarted]);

    const handleChallenge = (friend) => {
        setSelectedFriend(friend);
        setRequestSent(true);

        setTimeout(() => {
            setRequestSent(false);
            setShowFlashcardSets(true);
        }, 2000);
    };

    const handleSetSelection = (setName) => {
        setSelectedSet(setName);
        setQuizStarted(true);
        setCurrentQuestionIndex(0);
        setScore(0);
        setTimer(0);
    };

    const handleAnswer = (userAnswer) => {
        const currentQuestion = flashcardSets[selectedSet][currentQuestionIndex];
        const correctAnswer = currentQuestion.answer;

        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            setScore((prevScore) => prevScore + 1);
            setShowCorrectNotification(true);
        } else {
            setShowWrongNotification(true);
        }

        // Delay moving to the next question so notifications are visible
        setTimeout(() => {
            if (currentQuestionIndex + 1 < flashcardSets[selectedSet].length) {
                setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            } else {
                setQuizCompleted(true);
                setQuizStarted(false);
            }

            setShowCorrectNotification(false);
            setShowWrongNotification(false);
        }, 1000); // 1-second delay
    };
    const getResultMessage = () => {
        const totalQuestions = flashcardSets[selectedSet].length;
        const percentage = (score / totalQuestions) * 100;
        if (percentage === 100) return "Perfect score! You're a master!";
        if (percentage >= 80) return "Great job! You really know your stuff.";
        if (percentage >= 50) return "Not bad! Keep practicing.";
        return "Better luck next time! Try again to improve.";
    };


    useEffect(() => {
        if (showCorrectNotification) {
            const timer = setTimeout(() => setShowCorrectNotification(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [showCorrectNotification]);

    useEffect(() => {
        if (showWrongNotification) {
            const timer = setTimeout(() => setShowWrongNotification(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [showWrongNotification]);

    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <button className={styles.closeButton} onClick={onClose}>&times;</button>

                {showCorrectNotification && (
                    <div className={styles.correctNotification}>
                        Correct! +1 point
                    </div>
                )}
                {showWrongNotification && (
                    <div className={styles.wrongNotification}>
                        Wrong :(
                    </div>
                )}

                {quizCompleted && (
                    <div className={styles.resultsContainer}>
                        <h1 className={styles.resultsTitle}>Quiz Completed!</h1>
                        <p>Time Taken: {timer} seconds</p>
                        <p>Final Score: {score} / {flashcardSets[selectedSet].length}</p>
                        <p>{getResultMessage()}</p>
                        <button onClick={onClose} className={styles.closeButton}></button>
                    </div>
                )}

                {quizStarted && !quizCompleted && selectedSet && (
                    <div className={styles.quizContainer}>
                        <h2 className={styles.setName}>{selectedSet} Card Set</h2>
                        {/* Display the current question */}
                        <div className={styles.questionContainer}>
                            <p className={styles.questionText}>

                                {flashcardSets[selectedSet][currentQuestionIndex].question}
                            </p>
                        </div>
                        <div className={styles.scoreContainer}>
                            <p>Score: {score}</p>
                        </div>


                        {/* Display True/False answer buttons */}
                        <div className={styles.answerButtons}>
                            <button
                                className={styles.answerButton}
                                onClick={() => handleAnswer("true")}
                            >
                                True
                            </button>
                            <button
                                className={styles.answerButton}
                                onClick={() => handleAnswer("false")}
                            >
                                False
                            </button>
                        </div>
                    </div>
                )}

                {quizStarted && !quizCompleted && (
                    <div className={styles.timerContainer}>
                        <svg className={styles.progressCircle} viewBox="0 0 100 100">
                            <circle className={styles.backgroundCircle} cx="50" cy="50" r="40" />
                            <circle
                                className={styles.foregroundCircle}
                                cx="50" cy="50" r="40"
                                style={{
                                    strokeDasharray: "251.2",
                                    strokeDashoffset: `${251.2 - (timer % 60) * (251.2 / 60)}`}}
                            />
                            <text x="50%" y="50%" textAnchor="middle" dy=".3em" className={styles.timerText}>
                                {timer}s
                            </text>
                        </svg>
                    </div>
                )}



                {!requestSent && !showFlashcardSets && !selectedSet && (
                    <>
                        <h1><em>Nudge a Friend to Challenge Them!</em></h1>
                        <div className={styles.friendList}>
                            {friendsList.map((friend, index) => (
                                <button key={index} onClick={() => handleChallenge(friend)} className={styles.friendItem}>
                                    {friend}
                                </button>
                            ))}
                        </div>
                    </>
                )}

                {requestSent && <h1 className={styles.requestMessage}>Request Sent!</h1>}

                {showFlashcardSets && !selectedSet && !requestSent && (
                    <>
                        <h1><em>Select a Flashcard Set</em></h1>
                        <div className={styles.flashcardList}>
                            {Object.keys(flashcardSets).map((setName, index) => (
                                <button key={index} className={styles.flashcardItem} onClick={() => handleSetSelection(setName)}>
                                    {setName}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ChallengePage;
