import React, { useState } from "react";
import styles from "./ToDoListPage.module.css";
import Tasks from "../tasks/Tasks.jsx";

const MAX_TASKS = 5; // ✅ Set task limit

const ToDoListPage = ({ onClose, onFinalApply, tasks }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false); // ✅ Controls popup
    const [currentCategory, setCurrentCategory] = useState(null); // ✅ Track category
    const [localTasks, setLocalTasks] = useState(tasks); // ✅ Local state for tasks

    // ✅ Function to store applied tasks in the correct category
    const handleApplyTasks = (newTasks) => {
        if (currentCategory && newTasks.length > 0) {
            setLocalTasks((prevTasks) => ({
                ...prevTasks,
                [currentCategory]: [...prevTasks[currentCategory], ...newTasks], // ✅ Append tasks
            }));
        }
        setIsPopupOpen(false); // ✅ Close popup
    };

    // ✅ Final Apply Button - Saves All Tasks and Goes Back to Main Page
    const handleFinalApply = () => {
        onFinalApply(localTasks); // ✅ Send updated tasks to `MainPage.jsx`
    };

    return (
        <div className={styles.layout} onClick={onClose}>
            <div className={styles.ToDoList} onClick={(e) => e.stopPropagation()}>
                <button className={styles.comeUp} onClick={onClose}>
                    &times;
                </button>

                {/* ✅ Section Bars Wrapper */}
                <div className={styles.sections}>
                    {/* 🔹 School Tasks */}
                    <div className={styles.schoolSectionBar}>
                        <h3>School</h3>
                        <button
                            className={styles.addButton}
                            onClick={() => {
                                setCurrentCategory("school");
                                setIsPopupOpen(true);
                            }}
                            disabled={localTasks.school.length >= MAX_TASKS} // ✅ Disable if full
                        >
                            Add Task
                        </button>
                        <ul className={styles.taskList}>
                            {localTasks.school.map((task, index) => (
                                <li key={index} className={styles.taskItem}>{task}</li>
                            ))}
                        </ul>
                    </div>

                    {/* 🔹 Home Tasks */}
                    <div className={styles.homeSectionBar}>
                        <h3>Home</h3>
                        <button
                            className={styles.addButton}
                            onClick={() => {
                                setCurrentCategory("home");
                                setIsPopupOpen(true);
                            }}
                            disabled={localTasks.home.length >= MAX_TASKS} // ✅ Disable if full
                        >
                            Add Task
                        </button>
                        <ul className={styles.taskList}>
                            {localTasks.home.map((task, index) => (
                                <li key={index} className={styles.taskItem}>{task}</li>
                            ))}
                        </ul>
                    </div>

                    {/* 🔹 Misc Tasks */}
                    <div className={styles.miscSectionBar}>
                        <h3>Misc</h3>
                        <button
                            className={styles.addButton}
                            onClick={() => {
                                setCurrentCategory("misc");
                                setIsPopupOpen(true);
                            }}
                            disabled={localTasks.misc.length >= MAX_TASKS} // ✅ Disable if full
                        >
                            Add Task
                        </button>
                        <ul className={styles.taskList}>
                            {localTasks.misc.map((task, index) => (
                                <li key={index} className={styles.taskItem}>{task}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* ✅ Open Popup When a Section is Selected */}
                {isPopupOpen && (
                    <Tasks
                        onApply={handleApplyTasks}
                        onClose={() => setIsPopupOpen(false)}
                        existingTasks={localTasks[currentCategory]} // ✅ Pass existing tasks
                    />
                )}

                {/* ✅ Final Apply Button - Saves Tasks & Returns to Main Page */}
                <button className={styles.applyButton} onClick={handleFinalApply}>
                    Apply
                </button>
            </div>
        </div>
    );
};

export default ToDoListPage;
