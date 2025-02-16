import React, {useContext, useEffect, useState} from "react";
import styles from "./MainPage.module.css";
// import Popup from "../Popup/Popup";
// import EditProfilePopup from "../EditProfilePopup/EditProfilePopup.jsx";
// import FriendsListPopup from "../FriendsListPopup/FriendsListPopup.jsx";
import FlashcardPage from "../Flashcards/FlashcardPage.jsx";
import ChallengePage from "../Challenges/ChallengePage.jsx";
import {UserContext} from "../../../UserContext.jsx";

const MainPage = () => {
    const [showEditProfilePopup, setShowEditProfilePopup] = useState(false);
    const [showFriendsPopup, setShowFriendsPopup] = useState(false);
    const [showFlashcardScreen, setShowFlashcardScreen] = useState(false);
    const [showChallengeScreen, setShowChallengeScreen] = useState(false);
    const [bio, setBio] = useState("");
    const { user } = useContext(UserContext);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        if (user !== undefined) {
            setLoading(false);
        }
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (

        <div className={styles.container}>
            <div className={styles.ProfileSection}></div>
            <div className={styles.ChallengeFriendSection} onClick={() => setShowChallengeScreen(true)}></div>
            <div className={styles.ToDoSection}></div>
            <div className={styles.FlashcardSection} onClick={() => setShowFlashcardScreen(true)}></div>
            <div className={styles.testImage}>
                <img src="/assets/ChopChopLogo.png" alt="Logo" className={styles.testImage}/>
            </div>
            <div className={styles.whiteCircleBg}>
                <img src="/assets/ProfileBgEmpty.png" alt="CircleBg" className={styles.whiteCircleBg}/>
            </div>
            {/*<button className={styles.openButton} onClick={() => setShowPopup(true)}>*/}
            {/*    Open FriendsListPopup*/}
            {/*</button>*/}
            {/*{showPopup && <FriendsListPopup onClose={() => setShowPopup(false)} />}*/}


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

            {/*<div*/}
            {/*    className={styles.EditProfileButton}*/}
            {/*    onClick={() => setShowEditProfilePopup(true)}*/}
            {/*>*/}
            {/*    Edit Profile*/}
            {/*</div>*/}
            {/*{showEditProfilePopup && <EditProfilePopup onClose={() => setShowEditProfilePopup(false)} />}*/}

            {/*<div*/}
            {/*    className={styles.FriendsButton}*/}
            {/*    onClick={() => setShowFriendsPopup(true)}*/}
            {/*>*/}
            {/*    Friends*/}
            {/*</div>*/}
            {/*{showFriendsPopup && <FriendsListPopup onClose={() => setShowFriendsPopup(false)} />}*/}

            {showFlashcardScreen && <FlashcardPage id="flashcardPopup" onClose={() => setShowFlashcardScreen(false)}/>}
            {showChallengeScreen && <ChallengePage onClose={() => setShowChallengeScreen(false)}/>}


            <div className={styles.NameDisplay}>{user?.username}</div>

        </div>
    );
};

export default MainPage;