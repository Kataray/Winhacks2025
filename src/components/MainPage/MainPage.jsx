import React, { useState } from "react";
import styles from "./MainPage.module.css";
import Popup from "../Popup/Popup";

const MainPage = () => {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <div className={styles.container}>
            <div className={styles.ProfileSection}></div>
            <div className={styles.ChallengeFriendSection}></div>
            <div className={styles.ToDoSection}></div>
            <div className={styles.FlashcardSection}></div>
            <div className={styles.testImage}>
                <img src="/assets/ChopChopLogo.png" alt="Logo" className={styles.testImage}/>
            </div>
            {/*<button className={styles.openButton} onClick={() => setShowPopup(true)}>*/}
            {/*    Open Popup*/}
            {/*</button>*/}
            {showPopup && <Popup onClose={() => setShowPopup(false)}/>}

            <div className={styles.acheivmentsBox}></div>
            <div className={styles.pointsBox}></div>
            <div className={styles.rankBox}></div>
        </div>
    );
};

export default MainPage;
