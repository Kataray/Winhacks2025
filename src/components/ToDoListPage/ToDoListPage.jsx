import React, {useContext, useEffect, useState} from "react";
import styles from "./ToDoListPage.module.css";
import Tasks from "./Tasks.jsx";
import {UserContext} from "../../../UserContext.jsx";

const MAX_TASKS = 5; // ✅ Set task limit

const ToDoListPage = ({ onClose, onFinalApply, tasks }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false); // ✅ Controls popup
    const [currentCategory, setCurrentCategory] = useState(null); // ✅ Track category
    const [localTasks, setLocalTasks] = useState(tasks || { school: [], home: [], misc: [] });
    const [loading, setLoading] = React.useState(true);

    const { user, addTask } = useContext(UserContext);

    useEffect(() => {
        if (user !== undefined) {
            setLoading(false);
        }
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    // ✅ Function to store applied tasks in the correct category
    const handleApplyTasks = (newTasks) => {
        if (currentCategory && newTasks.length > 0) {
            setLocalTasks((prevTasks) => ({
                ...prevTasks,
                [currentCategory]: [...prevTasks[currentCategory], ...newTasks], // ✅ Append tasks
            }));
            addTask(newTasks, currentCategory);
        }
        setIsPopupOpen(false); // ✅ Close popup
    };

    const handleDeleteTask = (category, index) => {
        setLocalTasks((prevTasks) => {
            const updatedTasks = [...prevTasks[category]];
            updatedTasks.splice(index, 1); // ✅ Remove task
            return { ...prevTasks, [category]: updatedTasks };
        });
    };

    // ✅ Function to move a task up
    const handleMoveUp = (category, index) => {
        setLocalTasks((prevTasks) => {
            if (index === 0) return prevTasks; // ✅ Prevent moving the first task up
            const updatedTasks = [...prevTasks[category]];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]]; // ✅ Swap
            return { ...prevTasks, [category]: updatedTasks };
        });
    };

    // ✅ Function to move a task down
    const handleMoveDown = (category, index) => {
        setLocalTasks((prevTasks) => {
            if (index === prevTasks[category].length - 1) return prevTasks; // ✅ Prevent moving the last task down
            const updatedTasks = [...prevTasks[category]];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]]; // ✅ Swap
            return { ...prevTasks, [category]: updatedTasks };
        });
    };

    // ✅ Final Apply Button - Saves All Tasks and Goes Back to Main Page
    const handleFinalApply = () => {
        onFinalApply(user.todoLists); // ✅ Send updated tasks to `MainPage.jsx`
    };

    return (
        <div className={styles.toDoLayout} onClick={onClose}>
            <div className={styles.ToDoList} onClick={(e) => e.stopPropagation()}>
                <button className={styles.toDoComeUp} onClick={onClose}>
                    &times;
                </button>

                {/* ✅ Section Bars Wrapper */}
                <div className={styles.toDoSections}>
                    {/* 🔹 School Tasks */}
                    <div className={styles.toDoSchoolSectionBar}>
                        <h3>School</h3>
                        <button
                            className={styles.toDoAddButton}
                            onClick={() => {
                                setCurrentCategory("school");
                                setIsPopupOpen(true);
                            }}
                        >
                            Add Task
                        </button>
                        <ul className={styles.toDoTaskList}>
                            {user.todoLists.school.map((task, index) => (
                                <li key={index} className={styles.toDoTaskItem}>
                                    {task}
                                    <button className={styles.toDoMoveUpButton}
                                            onClick={() => handleMoveUp("school", index)}>▲
                                    </button>

                                    <button className={styles.toDoMoveDownButton}
                                            onClick={() => handleMoveDown("school", index)}>▼
                                    </button>

                                    <button className={styles.toDoDeleteButton}
                                            onClick={() => handleDeleteTask("school", index)}>❌
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 🔹 Home Tasks */}
                    <div className={styles.toDoHomeSectionBar}>
                        <h3>Home</h3>
                        <button
                            className={styles.toDoAddButton}
                            onClick={() => {
                                setCurrentCategory("home");
                                setIsPopupOpen(true);
                            }}
                        >
                            Add Task
                        </button>
                        <ul className={styles.toDoTaskList}>
                            {user.todoLists.home.map((task, index) => (
                                <li key={index} className={styles.toDoTaskItem}>
                                    {task}

                                    {/* ✅ Corrected buttons */}
                                    <button className={styles.toDoMoveUpButton}
                                            onClick={() => handleMoveUp("home", index)}>▲
                                    </button>

                                    <button className={styles.toDoMoveDownButton}
                                            onClick={() => handleMoveDown("home", index)}>▼
                                    </button>

                                    <button className={styles.toDoDeleteButton}
                                            onClick={() => handleDeleteTask("home", index)}>❌
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 🔹 Misc Tasks */}
                    <div className={styles.toDoMiscSectionBar}>
                        <h3>Misc</h3>
                        <button
                            className={styles.toDoAddButton}
                            onClick={() => {
                                setCurrentCategory("misc");
                                setIsPopupOpen(true);
                            }}
                        >
                            Add Task
                        </button>
                        <ul className={styles.toDoTaskList}>
                            {user.todoLists.misc.map((task, index) => (
                                <li key={index} className={styles.toDoTaskItem}>
                                    {task}

                                    {/* ✅ Corrected buttons */}
                                    <button className={styles.toDoMoveUpButton}
                                            onClick={() => handleMoveUp("misc", index)}>▲
                                    </button>

                                    <button className={styles.toDoMoveDownButton}
                                            onClick={() => handleMoveDown("misc", index)}>▼
                                    </button>

                                    <button className={styles.toDoDeleteButton}
                                            onClick={() => handleDeleteTask("misc", index)}>❌
                                    </button>
                                </li>
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
                <button className={styles.toDoApplyButton} onClick={handleFinalApply}>
                    Apply
                </button>
            </div>
        </div>
    );
};

export default ToDoListPage;
