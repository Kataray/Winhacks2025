import React, { useState } from "react";
import styles from "./MainPage.module.css";
import Popup from "../Popup/Popup";

const MainPage = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [bio, setBio] = useState("");

    return (

        <div className={styles.container}>
            <div className={styles.ProfileSection}></div>
            <div className={styles.ChallengeFriendSection}></div>
            <div className={styles.ToDoSection}></div>
            <div className={styles.FlashcardSection}></div>
            <div className={styles.testImage}>
                <img src="/assets/ChopChopLogo.png" alt="Logo" className={styles.testImage}/>
            </div>
            <div className={styles.whiteCircleBg}>
                <img src="/assets/ProfileBgEmpty.png" alt="CircleBg" className={styles.whiteCircleBg}/>
            </div>
            {/*<button className={styles.openButton} onClick={() => setShowPopup(true)}>*/}
            {/*    Open Popup*/}
            {/*</button>*/}
            {showPopup && <Popup onClose={() => setShowPopup(false)}/>}

            <div className={styles.acheivmentsBox}></div>
            <div className={styles.pointsBox}></div>
            <div className={styles.rankBox}></div>

            <div className={styles.BioArea}></div>
            <div className={styles.Biography}>
                <textarea
                    className={styles.BioInput}
                    placeholder="Write your bio here..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />
            </div>

            <div className={styles.profilePic}>
                <img src="/assets/ProfilePic.png" alt="Logo" className={styles.profilePic}/>
            </div>

            <div className={styles.EditProfileButton}>
                Edit Profile
            </div>

            <div className={styles.FriendsButton}>
                Friends
            </div>

            <div className={styles.NameDisplay}>Kataray</div>

        </div>
    );
};

export default MainPage;
