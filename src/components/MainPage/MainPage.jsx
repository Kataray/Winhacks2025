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
            <button className={styles.openButton} onClick={() => setShowPopup(true)}>
                Open Popup
            </button>
            {showPopup && <Popup onClose={() => setShowPopup(false)}/>}
        </div>
    );
};

export default MainPage;
