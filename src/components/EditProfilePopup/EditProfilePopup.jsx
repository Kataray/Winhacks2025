import React from "react";
// import styles from "./FriendsListPopup.module.css";
import styles from "./EditProfilePopup.module.css";

const EditProfilePopup = ({ onClose }) => {
    return (
        <div className={styles.editProfileOverlay}>
            <div className={styles.editProfilePopup}>
                <button className={styles.editProfileCloseButton} onClick={onClose}>
                    &times;
                </button>


            </div>
        </div>
    );
};

export default EditProfilePopup;
