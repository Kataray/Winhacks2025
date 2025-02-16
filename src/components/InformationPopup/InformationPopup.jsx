import React from "react";
import styles from "./InformationPopup.module.css";

const InformationPopup = ({ onClose }) => {
    return (
        <div className={styles.InformationPopupoverlay}>
            <div className={styles.Informationpopup}>
                <button className={styles.InformationPopupcloseButton} onClick={onClose}>
                    &times;
                </button>
                <div className={styles.Informationpopup}>
                    {/* Add any content you want to show in the popup here */}
                    <p>This is some important information!</p>
                </div>
            </div>
        </div>
    );
};

export default InformationPopup;
