import React, { useState } from "react";
import styles from "./ChallengePage.module.css";

const ChallengePage = ({ onClose }) => {
    const friendsList = ["Lara", "Katie", "Aditya", "Yasmeen", "Emma"];
    const [selectedFriend, setSelectedFriend] = useState(null);

    const handleChallenge = (friend) => {
        setSelectedFriend(friend);
        alert(`Challenge sent to ${friend}!`);
        onClose(); // Close the popup after selection
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <button className={styles.closeButton} onClick={onClose}>
                    &times;
                </button>
                <h2>Nudge a Friend to Challenge Them!</h2>
                <div className={styles.friendList}>
                    {friendsList.map((friend, index) => (
                        <button
                            key={index}
                            onClick={() => handleChallenge(friend)}
                            className={styles.friendItem}
                        >
                            {friend}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChallengePage;
