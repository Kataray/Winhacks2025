import React, {useContext, useEffect} from "react";
import styles from "./Ranks.module.css";
import {UserContext} from "../../../UserContext.jsx";

const Ranks = ({onClose}) => {
    const {user} = useContext(UserContext);
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
                        {
                            user?.points < 25 ?
                                <>
                                    <p className={styles.lockLevel}>Locked</p>
                                    <p className={styles.pointRank}>{user?.points}/25</p>
                                </> :
                                <>
                                    <p className={styles.lockLevel}>Unlocked</p>
                                    <p className={styles.pointRank}>Done</p>
                                </>
                        }
                    </div>
                    <div className={styles.choptimus}>
                        <img src="/assets/choptimusPrime.png" alt="choptimusLevel" className={styles.choptimusImage}/>
                        <h1 className={styles.TitleRank}>Choptimus Prime</h1>
                        {
                            user?.points < 60 ?
                                <>
                                    <p className={styles.lockLevel}>Locked</p>
                                    <p className={styles.pointRank}>{user?.points}/60</p>
                                </> :
                                <>
                                    <p className={styles.lockLevel}>Unlocked</p>
                                    <p className={styles.pointRank}>Done</p>
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ranks;