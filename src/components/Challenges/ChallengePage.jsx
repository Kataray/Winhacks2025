import React, {useState, useEffect, useContext} from "react";
import styles from "./ChallengePage.module.css";
import {UserContext} from "../../../UserContext.jsx";
import Button from "@mui/material/Button";
import Leaderboard from "../ListOfPeople/Leaderboard.jsx";

const flashcardSets = {
    Java: [
        { question: "Java supports multiple inheritance.", answer: "False" },
        { question: "The `final` keyword prevents method overriding.", answer: "True" },
        { question: "Java is a compiled language only.", answer: "False" },
        { question: "Garbage collection in Java is done automatically.", answer: "True" },
        { question: "The `static` keyword can be used with classes, methods, and variables.", answer: "True" },
        { question: "An abstract class can be instantiated.", answer: "False" },
        { question: "Java uses pointers like C/C++.", answer: "False" },
        { question: "Interfaces can have default methods in Java.", answer: "True" },
        { question: "The JVM translates Java bytecode into machine code.", answer: "True" }
    ],
    Science: [
        { question: "Water boils at 100°C at sea level.", answer: "True" },
        { question: "Humans have two lungs.", answer: "True" },
        { question: "The Sun orbits around the Earth.", answer: "False" },
        { question: "The chemical symbol for gold is Au.", answer: "True" },
        { question: "Sound travels faster in air than in water.", answer: "False" },
        { question: "Photosynthesis produces oxygen.", answer: "True" },
        { question: "DNA stands for Deoxyribonucleic Acid.", answer: "True" },
        { question: "Electricity is measured in amperes.", answer: "True" },
        { question: "All metals are magnetic.", answer: "False" },
        { question: "The human heart has five chambers.", answer: "False" }
    ],
    Math: [
        { question: "The sum of the angles in a triangle is 180°.", answer: "True" },
        { question: "A prime number has exactly two factors.", answer: "True" },
        { question: "5 × 5 = 20.", answer: "False" },
        { question: "The square root of 16 is 4.", answer: "True" },
        { question: "The area of a circle is given by the formula A = πr².", answer: "True" },
        { question: "A right angle measures 60°.", answer: "False" },
        { question: "The Fibonacci sequence starts with 0, 1, 1, 2, 3, 5, ...", answer: "True" },
        { question: "Zero is considered a natural number.", answer: "False" },
        { question: "The equation x² - 4 = 0 has two solutions.", answer: "True" },
        { question: "A hexagon has eight sides.", answer: "False" }
    ],
    History: [
        { question: "The Great Wall of China was built to keep out invaders.", answer: "True" },
        { question: "World War II ended in 1945.", answer: "True" },
        { question: "Julius Caesar was the first Emperor of Rome.", answer: "False" },
        { question: "The Declaration of Independence was signed in 1776.", answer: "True" },
        { question: "The Titanic sank in 1920.", answer: "False" },
        { question: "The Cold War was primarily between the USA and China.", answer: "False" },
        { question: "Napoleon Bonaparte was exiled twice.", answer: "True" },
        { question: "The Renaissance began in the 19th century.", answer: "False" },
        { question: "The Berlin Wall fell in 1989.", answer: "True" },
        { question: "The Industrial Revolution started in France.", answer: "False" }
    ],
    Geography: [
        { question: "Mount Everest is the tallest mountain on Earth.", answer: "True" },
        { question: "The Amazon River is the longest river in the world.", answer: "False" },
        { question: "Africa is the second-largest continent by land area.", answer: "True" },
        { question: "Greenland is the smallest country in the world.", answer: "False" },
        { question: "Antarctica is the driest continent.", answer: "True" },
        { question: "Japan is part of the continent of Asia.", answer: "True" },
        { question: "Australia is both a country and a continent.", answer: "True" },
        { question: "There are seven continents on Earth.", answer: "True" },
        { question: "The Sahara Desert is located in South America.", answer: "False" },
        { question: "The Pacific Ocean is the largest ocean on Earth.", answer: "True" }
    ],
    Technology: [
        { question: "HTML stands for HyperText Markup Language.", answer: "True" },
        { question: "The first computer virus was created in 2001.", answer: "False" },
        { question: "The iPhone was first released in 2007.", answer: "True" },
        { question: "Python is a type of computer hardware.", answer: "False" },
        { question: "The internet was invented before the telephone.", answer: "False" },
        { question: "Linux is an open-source operating system.", answer: "True" },
        { question: "A GPU is used for processing graphics.", answer: "True" },
        { question: "USB stands for Universal Serial Bus.", answer: "True" },
        { question: "RAM stands for Read-Only Memory.", answer: "False" },
        { question: "Bitcoin is a form of digital currency.", answer: "True" }
    ]
};


const ChallengePage = ({onClose}) => {
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
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    // const [showCustomQuizScreen, setShowCustomQuizScreen] = useState(false);

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
                            <circle className={styles.backgroundCircle} cx="50" cy="50" r="40"/>
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

                {
                    showLeaderboard &&
                    <>
                        <Leaderboard/>

                        <Button variant={"outlined"} color={"info"} style={{"marginBottom": "16px", "marginTop": "16px" }}

                                onClick={() => {
                            setShowFlashcardSets(true);
                            setShowLeaderboard(false);
                        }}>
                            Return
                        </Button>
                    </>
                }

                {showFlashcardSets && !selectedSet && !showLeaderboard && (
                    <>
                        <h1><em>Select a Quiz Set</em></h1>
                        <Button variant={"outlined"} color={"info"} style={{"marginBottom": "16px"}}
                                onClick={() => setShowLeaderboard(true)}>
                            View Leaderboard
                        </Button>
                        <div className={styles.challengeFlashcardList}>
                            {Object.keys(flashcardSets).map((setName, index) => (
                                <button key={index} className={styles.challengeFlashcardItem}
                                        onClick={() => handleSetSelection(setName)}>
                                    {setName}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
        ;
};

export default ChallengePage;