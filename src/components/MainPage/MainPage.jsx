import React, { useState, useEffect } from "react";
import styles from "./MainPage.module.css";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup.jsx";
import FriendsListPopup from "../FriendsListPopup/FriendsListPopup.jsx";

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

            <div className={styles.NameDisplay}>Kataray</div>

            <div className={styles.Biography}>
                <textarea
                    className={styles.BioInput}
                    placeholder="Write your bio here..."
                    value={bio}
                    onChange={handleBioChange}
                />
            </div>

            <div className={styles.ToDoImg}>
                <img src="/assets/Todo.png" alt="Logo" className={styles.ToDoImg}/>
            </div>
            <div className={styles.flashCardImg}>
                <img src="/assets/Flashcards.png" alt="Logo" className={styles.flashCardImg}/>
            </div>
        </div>
    );
};

export default MainPage;
