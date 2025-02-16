import React, { useState } from "react";
import styles from "./MainPage.module.css";

import ChallengePage from "../Challenges/ChallengePage.jsx";
import Popup from "../Popup/Popup";
import FlashcardPage from "../Flashcards/FlashcardPage.jsx";

const MainPage = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [showFlashcardScreen, setShowFlashcardScreen] = useState(false);

    return (
        <div className={styles.container}>
            <div className={styles.ProfileSection}></div>
            <div className={styles.ChallengeFriendSection}
                 onClick={() => setShowPopup(true)}
            >
                <h2>CHALLENGES</h2>
            </div>
            <div className={styles.testImage}>
                <img src="/assets/ChopChopLogo.png" alt="Logo" className={styles.testImage}/>
            </div>
            <div className={styles.whiteCircleBg}>
                <img src="/assets/ProfileBgEmpty.png" alt="CircleBg" className={styles.whiteCircleBg}/>
            </div>
            <div className={styles.acheivmentsBox}></div>
            <div className={styles.pointsBox}></div>
            <div className={styles.rankBox}></div>
            <div className={styles.ToDoSection}></div>
            <div className={styles.FlashcardSection} onClick={() => setShowFlashcardScreen(true)}>
            </div>
            {showFlashcardScreen && <FlashcardPage id="flashcardPopup" onClose={() => setShowFlashcardScreen(false)}/>}
            {showPopup && <ChallengePage onClose={() => setShowPopup(false)}/>}
        </div>
    );
};

export default MainPage;