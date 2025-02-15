import React, { useState } from "react";
import styles from "./MainPage.module.css";
import Popup from "../Popup/Popup";

const MainPage = () => {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <div className={styles.container}>
            <h2>Insert Stuff Here</h2>
            <button className={styles.openButton} onClick={() => setShowPopup(true)}>
                Open Popup
            </button>
            {showPopup && <Popup onClose={() => setShowPopup(false)} />}
        </div>
    );
};

export default MainPage;
