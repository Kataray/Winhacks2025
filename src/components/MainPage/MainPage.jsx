import React, { useState } from "react";
import styles from "./MainPage.module.css";
import ToDoListPage from "../ToDoListPage/ToDoListPage.jsx";
import Ranks from "../Ranks/Ranks.jsx";

const MainPage = () => {
    const [showToDo, setShowToDo] = useState(false); // ✅ Controls ToDoListPage visibility
    const [tasks, setTasks] = useState({ school: [], home: [], misc: [] }); // ✅ Stores all tasks\
    const [ranks, setRanks] = useState(false);

    // ✅ Function to update tasks globally
    const handleApplyAllTasks = (newTasks) => {
        setTasks(newTasks); // ✅ Save tasks permanently
        setShowToDo(false); // ✅ Close ToDoListPage and return to MainPage
    };

    return (
        <div className={styles.container}>
            <div className={styles.ProfileSection}></div>
            <div className={styles.ChallengeFriendSection}></div>
            <div className={styles.ToDoSection} onClick={() => setShowToDo(true)}></div>
            <div className={styles.FlashcardSection}></div>
            <div className={styles.testImage}>
                <img src="/assets/ChopChopLogo.png" alt="Logo" className={styles.testImage}/>
            </div>
            <div className={styles.whiteCircleBg}>
                <img src="/assets/ProfileBgEmpty.png" alt="CircleBg" className={styles.whiteCircleBg}/>
            </div>

            {/* ✅ Open ToDoListPage and pass tasks */}
            {showToDo && (
                <ToDoListPage
                    onClose={() => setShowToDo(false)}
                    tasks={tasks}
                    onFinalApply={handleApplyAllTasks} // ✅ Pass function to save tasks
                />
            )}
            {ranks && (
                <Ranks
                    onClose={() => setRanks(false)}
                />
            )}


            <div className={styles.acheivmentsBox}></div>
            <div className={styles.pointsBox}></div>
            <div className={styles.rankBox} onClick={() => setRanks(true)}>
            </div>
        </div>
    );
};

export default MainPage;
