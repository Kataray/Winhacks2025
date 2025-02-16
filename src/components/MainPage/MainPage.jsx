import React, { useState } from "react";
import styles from "./MainPage.module.css";
import ChallengePage from "../Challenges/ChallengePage.jsx";

const MainPage = () => {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <div className={styles.container}>
            <div className={styles.ProfileSection}></div>
            <div className={styles.ChallengeFriendSection}
                 onClick={() => setShowPopup(true)}
            >
                <h2>CHALLENGES</h2>
            </div>
            <div className={styles.ToDoSection}></div>
            <div className={styles.FlashcardSection}></div>
            <div className={styles.testImage}>
                <img src="/assets/ChopChopLogo.png" alt="Logo" className={styles.testImage}/>
            </div>


            {showPopup && <ChallengePage onClose={() => setShowPopup(false)}/>}
            <div className={styles.whiteCircleBg}>
                <img src="/assets/ProfileBgEmpty.png" alt="CircleBg" className={styles.whiteCircleBg}/>
            </div>
            <div className={styles.acheivmentsBox}></div>
            <div className={styles.pointsBox}></div>
            <div className={styles.rankBox}></div>

        </div>
    );
};

export default MainPage;