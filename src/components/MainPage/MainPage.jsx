import React, { useState } from "react";
import styles from "./MainPage.module.css";
import Popup from "../Popup/Popup";
import FlashcardPage from "../Flashcards/FlashcardPage.jsx";


const MainPage = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [showFlashcardScreen, setShowFlashcardScreen] = useState(false);

    return (
        <div className={styles.container}>
            <div className={styles.ProfileSection}></div>
            <div className={styles.ChallengeFriendSection}></div>
            <div className={styles.ToDoSection}></div>
            <div className={styles.FlashcardSection} onClick={() => setShowFlashcardScreen(true)}>
            </div>
            <button className={styles.openButton} onClick={() => setShowPopup(true)}>
                Open Popup
            </button>
            {showPopup && <Popup onClose={() => setShowPopup(false)}/>}
            {showFlashcardScreen && <FlashcardPage id="flashcardPopup" onClose={() => setShowFlashcardScreen(false)}/>}
        </div>
    );
};

export default MainPage;
