import React from "react";
import styles from "./Popup.module.css";

const Popup = ({ onClose }) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <button className={styles.closeButton} onClick={onClose}>
                    &times;
                </button>
            </div>
        </div>
    );
};

export default Popup;
