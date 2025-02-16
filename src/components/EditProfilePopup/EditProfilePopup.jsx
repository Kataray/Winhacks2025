import React, { useState, useEffect } from "react";
import styles from "./EditProfilePopup.module.css";

const EditProfilePopup = ({ onClose }) => {
    // State for avatar selections
    const [selectedHair, setSelectedHair] = useState("");
    const [selectedSkin, setSelectedSkin] = useState("");
    const [selectedMouth, setSelectedMouth] = useState("");
    const [selectedEyes, setSelectedEyes] = useState("");
    const [selectedShirt, setSelectedShirt] = useState("");
    const [circle, setCircle] = useState("/assets/whiteCircle.png");

    const [name, setName] = useState("");

    // Load saved selections from localStorage on component mount
    useEffect(() => {
        setName(localStorage.getItem("profileName") || "");

        setSelectedHair(localStorage.getItem("selectedHair") || "/assets/profilePicAssets/hair/Hair1A.png");
        setSelectedSkin(localStorage.getItem("selectedSkin") || "/assets/profilePicAssets/heads/Skin1.png");
        setSelectedMouth(localStorage.getItem("selectedMouth") || "/assets/profilePicAssets/mouths/Mouth1.png");
        setSelectedEyes(localStorage.getItem("selectedEyes") || "/assets/profilePicAssets/eyes/Eyes1.png");
        setSelectedShirt(localStorage.getItem("selectedShirt") || "/assets/profilePicAssets/shirts/OrangeShirt.png");
    }, []);

    // Save selections when clicking "Save"
    const handleSave = () => {
        localStorage.setItem("profileName", name);
        localStorage.setItem("selectedHair", selectedHair);
        localStorage.setItem("selectedSkin", selectedSkin);
        localStorage.setItem("selectedMouth", selectedMouth);
        localStorage.setItem("selectedEyes", selectedEyes);
        localStorage.setItem("selectedShirt", selectedShirt);
        onClose(); // Close the popup
        window.location.reload();
    };

    return (
        <div className={styles.editProfileOverlay}>
            <div className={styles.editProfilePopup}>
                <button className={styles.editProfileCloseButton} onClick={onClose}>
                    &times;
                </button>

                {/* Side panel for hair, skin, mouth, and eyes */}
                <div className={styles.sidePanel}>
                    {/* Hair Selection */}
                    <div className={styles.selectionContainer}>
                        {["Hair1A", "Hair2A", "Hair3A", "Hair4A"].map((hair) => (
                            <img
                                key={hair}
                                src={`/assets/profilePicAssets/hair/${hair}.png`}
                                alt={hair}
                                className={styles.selectionItem}
                                onClick={() => setSelectedHair(`/assets/profilePicAssets/hair/${hair}.png`)}
                            />
                        ))}
                    </div>

                    {/* Skin Selection */}
                    <div className={styles.selectionContainer}>
                        {["Skin1", "Skin2", "Skin3", "Skin4"].map((skin) => (
                            <img
                                key={skin}
                                src={`/assets/profilePicAssets/heads/${skin}.png`}
                                alt={skin}
                                className={styles.selectionItem}
                                onClick={() => setSelectedSkin(`/assets/profilePicAssets/heads/${skin}.png`)}
                            />
                        ))}
                    </div>

                    {/* Mouth Selection */}
                    <div className={styles.selectionContainer}>
                        {["Mouth1", "Mouth2", "Mouth3", "Mouth4"].map((mouth) => (
                            <img
                                key={mouth}
                                src={`/assets/profilePicAssets/mouths/${mouth}.png`}
                                alt={mouth}
                                className={styles.selectionItem}
                                onClick={() => setSelectedMouth(`/assets/profilePicAssets/mouths/${mouth}.png`)}
                            />
                        ))}
                    </div>

                    {/* Eyes Selection */}
                    <div className={styles.selectionContainer}>
                        {["Eyes1", "Eyes2", "Eyes3", "Eyes4"].map((eyes) => (
                            <img
                                key={eyes}
                                src={`/assets/profilePicAssets/eyes/${eyes}.png`}
                                alt={eyes}
                                className={styles.selectionItem}
                                onClick={() => setSelectedEyes(`/assets/profilePicAssets/eyes/${eyes}.png`)}
                            />
                        ))}
                    </div>
                </div>

                {/* Main avatar display */}
                <div className={styles.mainCharacter}>
                    <img src={selectedSkin} alt="Selected Skin" className={styles.avatarLayer} />
                    <img src={selectedShirt} alt="Selected Shirt" className={styles.avatarLayerShirt} />
                    <img src={selectedHair} alt="Selected Hair" className={styles.avatarLayerHair} />
                    <img src={selectedMouth} alt="Selected Mouth" className={styles.avatarLayerMouth} />
                    <img src={selectedEyes} alt="Selected Eyes" className={styles.avatarLayerEyes} />
                    <img src={circle} alt="circle" className={styles.circleCover} />
                </div>
            </div>

            <div className={styles.nameInputContainer}>
                <input
                    type="text"
                    id="nameInput"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={styles.nameInput}
                    placeholder="Your name"
                />
                <button className={styles.saveButton} onClick={handleSave}>Save</button>
            </div>
        </div>
    );
};

export default EditProfilePopup;
