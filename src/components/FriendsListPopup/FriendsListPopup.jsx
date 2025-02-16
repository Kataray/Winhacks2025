import React from "react";
import styles from "./FriendsListPopup.module.css";

const FriendsListPopup = ({ onClose }) => {
    return (
        <div className={styles.friendsListOverlay}>
            <div className={styles.friendsListPopup}>
                <button className={styles.friendsListCloseButton} onClick={onClose}>
                    &times;
                </button>
            </div>
        </div>
    );
};

export default FriendsListPopup;
