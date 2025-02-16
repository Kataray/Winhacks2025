import React from "react";
import styles from "./Ranks.module.css";

const Ranks = ({ onClose }) => {
    return (
        <div className={styles.layout2}>
            <div className={styles.rankPop}>
                <button className={styles.closeButton2} onClick={onClose}>
                    &times;
                </button>
                <h1 className={styles.achievements}>Achievements</h1>

                <div className={styles.threeLevels}>
                    <div className={styles.chopped}>
                        <img src="/assets/chopped.png" alt="ChoppedLevel" className={styles.choppedImage}/>
                        <h1 className={styles.TitleRank}>Chopped</h1>
                        <p className={styles.lockLevel}>Unlocked</p>
                        <p className={styles.pointRank}>Done</p>
                    </div>
                    <div className={styles.NLEchoppa}>
                        <img src="/assets/NLEchoppa.png" alt="NLEchoppaLevel" className={styles.NLEchoppaImage}/>
                        <h1 className={styles.TitleRank}>NLE Choppa</h1>
                        <p className={styles.lockLevel}>Locked</p>
                        <p className={styles.pointRank}>0/25</p>
                    </div>
                    <div className={styles.choptimus}>
                        <img src="/assets/choptimusPrime.png" alt="choptimusLevel" className={styles.choptimusImage}/>
                        <h1 className={styles.TitleRank}>Choptimus Prime</h1>
                        <p className={styles.lockLevel}>Locked</p>
                        <p className={styles.pointRank}>0/50</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ranks;