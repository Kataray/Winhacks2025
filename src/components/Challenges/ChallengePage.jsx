import React, {useState, useEffect, useContext} from "react";
import styles from "./ChallengePage.module.css";
import {UserContext} from "../../../UserContext.jsx";

const flashcardSets = {
    Java: [
        { question: "Java supports multiple inheritance.", answer: "False" },
        { question: "The `final` keyword prevents method overriding.", answer: "True" },
        { question: "Java is a compiled language only.", answer: "False" }
    ],
    Science: [
        { question: "Water boils at 100°C at sea level.", answer: "True" },
        { question: "Humans have two lungs.", answer: "True" },
        { question: "The Sun orbits around the Earth.", answer: "False" }
    ],
    Math: [
        { question: "The sum of the angles in a triangle is 180°.", answer: "True" },
        { question: "A prime number has exactly two factors.", answer: "True" },
        { question: "5 × 5 = 20.", answer: "False" }
    ]
};

const ChallengePage = ({ onClose }) => {
    const [requestSent, setRequestSent] = useState(false);
    const [showFlashcardSets, setShowFlashcardSets] = useState(true);
    const [selectedSet, setSelectedSet] = useState(null);
    const [quizStarted, setQuizStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [showCorrectNotification, setShowCorrectNotification] = useState(false);
    const [showWrongNotification, setShowWrongNotification] = useState(false); // New state for wrong answer

    const {addPoints} = useContext(UserContext);
    useEffect(() => {
        let interval;
        if (quizStarted) {
            interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [quizStarted]);

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
            setScore(score + 1);
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
                console.log("Points added: " + score);
                addPoints(score + 1);
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
        <div className={styles.challengeOverlay}>
            <div className={styles.challengePopup}>
                <button className={styles.challengeCloseButton} onClick={onClose}>&times;</button>

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
                    <div className={styles.challengeResultsContainer}>
                        <h1 className={styles.challengeResultsTitle}>Quiz Completed!</h1>
                        <p>Time Taken: {timer} seconds</p>
                        <p>Final Score: {score} / {flashcardSets[selectedSet].length}</p>
                        <p>{getResultMessage()}</p>
                        <button onClick={onClose} className={styles.challengeCloseButton}></button>
                    </div>
                )}

                {quizStarted && !quizCompleted && selectedSet && (
                    <div className={styles.quizContainer}>
                        <h2 className={styles.challengeSetName}>{selectedSet} Card Set</h2>
                        {/* Display the current question */}
                        <div className={styles.challengeQuestionContainer}>
                            <p className={styles.challengeQuestionText}>

                                {flashcardSets[selectedSet][currentQuestionIndex].question}
                            </p>
                        </div>
                        <div className={styles.challengeScoreContainer}>
                            <p>Score: {score}</p>
                        </div>


                        {/* Display True/False answer buttons */}
                        <div className={styles.challengeAnswerButtons}>
                            <button
                                className={styles.challengeAnswerButton}
                                onClick={() => handleAnswer("true")}
                            >
                                True
                            </button>
                            <button
                                className={styles.challengeAnswerButton}
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
                                    strokeDashoffset: 251.2 - (timer % 60) * (251.2 / 60)
                                }}
                            />
                            <text x="50%" y="50%" textAnchor="middle" dy=".3em" className={styles.timerText}>
                                {timer}s
                            </text>
                        </svg>
                    </div>
                )}

                {showFlashcardSets && !selectedSet && (
                    <>
                        <h1><em>Select a Quiz Set</em></h1>
                        <div className={styles.challengeFlashcardList}>
                            {Object.keys(flashcardSets).map((setName, index) => (
                                <button key={index} className={styles.challengeFlashcardItem} onClick={() => handleSetSelection(setName)}>
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