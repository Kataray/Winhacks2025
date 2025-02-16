import EditProfilePopup from "../EditProfilePopup/EditProfilePopup.jsx";
import React, {useContext, useEffect, useState} from "react";
import styles from "./MainPage.module.css";
import FriendsListPopup from "../FriendsListPopup/FriendsListPopup.jsx";
import FlashcardPage from "../Flashcards/FlashcardPage.jsx";
import ChallengePage from "../Challenges/ChallengePage.jsx";
import {UserContext} from "../../../UserContext.jsx";
import ToDoListPage from "../ToDoListPage/ToDoListPage.jsx";
import Leaderboard from "../ListOfPeople/Leaderboard.jsx";

const MainPage = () => {
    const [showEditProfilePopup, setShowEditProfilePopup] = useState(false);
    const [showFriendsPopup, setShowFriendsPopup] = useState(false);

    const [bio, setBio] = useState("");

    // State for avatar selections
    const [selectedHair, setSelectedHair] = useState("");
    const [selectedSkin, setSelectedSkin] = useState("");
    const [selectedMouth, setSelectedMouth] = useState("");
    const [selectedEyes, setSelectedEyes] = useState("");
    const [selectedShirt, setSelectedShirt] = useState("");
    const [circle, setCircle] = useState("/assets/whiteCircle.png");

    useEffect(() => {
        // Load stored selections from localStorage
        setSelectedHair(localStorage.getItem("selectedHair") || "");
        setSelectedSkin(localStorage.getItem("selectedSkin") || "");
        setSelectedMouth(localStorage.getItem("selectedMouth") || "");
        setSelectedEyes(localStorage.getItem("selectedEyes") || "");
        setSelectedShirt(localStorage.getItem("selectedShirt") || "");

        // Load bio from localStorage
        setBio(localStorage.getItem("bio") || "");
    }, []);

    // Save bio whenever it changes
    const handleBioChange = (e) => {
        const newBio = e.target.value;
        setBio(newBio);
        localStorage.setItem("bio", newBio);
    };

    const [showChallengeScreen, setShowChallengeScreen] = useState(false);
    const [showFlashcardScreen, setShowFlashcardScreen] = useState(false);
    const [showToDoScreen, setShowToDoScreen] = useState(false);
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

            <div className={styles.testImage}>
                <img src="/assets/ChopChopLogo.png" alt="Logo" className={styles.testImage}/>
            </div>
            <div className={styles.whiteCircleBg}>
                <img src="/assets/ProfileBgEmpty.png" alt="CircleBg" className={styles.whiteCircleBg}/>
            </div>

            <div className={styles.acheivmentsBox}></div>
            <div className={styles.pointsBox}></div>
            <div className={styles.rankBox}></div>

            <div className={styles.BioArea}></div>

            {selectedHair && selectedSkin && selectedMouth && selectedEyes && selectedShirt ? (
                <div className={styles.mainCharacter}>
                    <img src={selectedSkin} alt="Selected Skin" className={styles.avatarLayer}/>
                    <img src={selectedShirt} alt="Selected Shirt" className={styles.avatarLayerShirt}/>
                    <img src={selectedHair} alt="Selected Hair" className={styles.avatarLayerHair}/>
                    <img src={selectedMouth} alt="Selected Mouth" className={styles.avatarLayerMouth}/>
                    <img src={selectedEyes} alt="Selected Eyes" className={styles.avatarLayerEyes}/>
                    <img src={circle} alt="circle" className={styles.circleCover}/>
                </div>
            ) : (
                <div className={styles.profilePic}>
                    <img src="/assets/ProfilePic.png" alt="Logo" className={styles.profilePic}/>
                </div>
            )}

            <div className={styles.ThickCircle}>
                <img src="/assets/ThickWhiteCircle.png" alt="CircleBg" className={styles.ThickCircle}/>
            </div>
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

            <div
                className={styles.EditProfileButton}
                onClick={() => setShowEditProfilePopup(true)}
            >
                Edit Profile
            </div>
            {showEditProfilePopup && <EditProfilePopup onClose={() => setShowEditProfilePopup(false)}/>}


            <div
                className={styles.FriendsButton}
                onClick={() => setShowFriendsPopup(true)}
            >
                Friends
            </div>
            {showFriendsPopup && <FriendsListPopup onClose={() => setShowFriendsPopup(false)}/>}

            <div className={styles.Biography}>
                <textarea
                    className={styles.BioInput}
                    placeholder="Write your bio here..."
                    value={bio}
                    onChange={handleBioChange}
                />
            </div>

            <div className={styles.ChallengeFriendSection} onClick={() => setShowChallengeScreen(true)}></div>
            <div className={styles.ToDoSection} onClick={() => setShowToDoScreen(true)}>
                <img src="/assets/Todo.png" alt="Logo" className={styles.ToDoImg}/>
            </div>
            <div className={styles.FlashcardSection} onClick={() => setShowFlashcardScreen(true)}>
                <img src="/assets/Flashcards.png" alt="Logo" className={styles.flashCardImg}/>

            </div>

            {showFriendsPopup && <FriendsListPopup onClose={() => setShowFriendsPopup(false)} />}
            {showToDoScreen && <ToDoListPage onClose={() => setShowToDoScreen(false)} /> }
            {showFlashcardScreen && <FlashcardPage id="flashcardPopup" onClose={() => setShowFlashcardScreen(false)}/>}
            {showChallengeScreen && <ChallengePage onClose={() => setShowChallengeScreen(false)}/>}


            <div className={styles.NameDisplay}>{user?.username}</div>
        </div>
    );
};

export default MainPage;