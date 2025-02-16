import React, { useState } from "react";
import styles from "./EditProfilePopup.module.css";

const EditProfilePopup = ({ onClose }) => {
    // State for avatar selections
    const [selectedHair, setSelectedHair] = useState("/assets/profilePicAssets/hair/Hair1A.png");
    const [selectedSkin, setSelectedSkin] = useState("/assets/profilePicAssets/heads/Skin1.png");
    const [selectedMouth, setSelectedMouth] = useState("/assets/profilePicAssets/mouths/Mouth1.png");
    const [selectedEyes, setSelectedEyes] = useState("/assets/profilePicAssets/eyes/Eyes1.png");
    const [selectedShirt, setSelectedShirt] = useState("/assets/profilePicAssets/shirts/OrangeShirt.png");
    const [circle, setcircle] = useState("/assets/whiteCircle.png");

    const [name, setName] = useState("");

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
                    <img src={selectedSkin} alt="Selected Skin" className={styles.avatarLayer}/>
                    <img src={selectedShirt} alt="Selected Shirt" className={styles.avatarLayerShirt}/>
                    <img src={selectedHair} alt="Selected Hair" className={styles.avatarLayerHair}/>
                    <img src={selectedMouth} alt="Selected Mouth" className={styles.avatarLayerMouth}/>
                    <img src={selectedEyes} alt="Selected Eyes" className={styles.avatarLayerEyes}/>
                    <img src={circle} alt="circle" className={styles.circleCover}/>
                </div>
            </div>

            <div className={styles.nameInputContainer}>
            <label htmlFor="nameInput"></label>
                <input
                    type="text"
                    id="nameInput"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={styles.nameInput}
                    placeholder="Your name"
                />
            </div>
        </div>
    );
};

export default EditProfilePopup;
