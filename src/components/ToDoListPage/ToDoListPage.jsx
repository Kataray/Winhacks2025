import React, { useState } from "react";
import styles from "./ToDoListPage.module.css";
import Tasks from "../tasks/Tasks.jsx";

const MAX_TASKS = 3;

const ToDoListPage = ({ onClose, onFinalApply, tasks }) => {

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [taskCounter, setTaskCounter] = useState(0);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [localTasks, setLocalTasks] = useState(tasks || { school: [], home: [], misc: [] });


    const handleApplyTasks = (newTasks) => {

        if (currentCategory && newTasks.length > 0) {

            setLocalTasks((prevTasks) => ({

                ...prevTasks,
                [currentCategory]: [...prevTasks[currentCategory], ...newTasks],
            }));

            setTaskCounter((prevCount) => prevCount + newTasks.length);
        }
        setIsPopupOpen(false);
    };

    const handleDeleteTask = (category, index) => {

        setLocalTasks((prevTasks) => {

            const updatedTasks = [...prevTasks[category]];
            updatedTasks.splice(index, 1);
            return { ...prevTasks, [category]: updatedTasks };
        });
    };


    const handleMoveUp = (category, index) => {

        setLocalTasks((prevTasks) => {

            if (index === 0) return prevTasks;
            const updatedTasks = [...prevTasks[category]];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            return { ...prevTasks, [category]: updatedTasks };
        });
    };


    const handleMoveDown = (category, index) => {

        setLocalTasks((prevTasks) => {

            if (index === prevTasks[category].length - 1) return prevTasks;
            const updatedTasks = [...prevTasks[category]];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            return { ...prevTasks, [category]: updatedTasks };
        });
    };


    const handleFinalApply = () => {

        onFinalApply(localTasks);
    };

    return (
        <div className={styles.toDoLayout} onClick={onClose}>
            <div className={styles.ToDoList} onClick={(e) => e.stopPropagation()}>
                <button className={styles.toDoComeUp} onClick={onClose}>
                    &times;
                </button>


                <div className={styles.toDoSections}>

                    <div className={styles.toDoSchoolSectionBar}>
                        <h3>School</h3>
                        <button
                            className={styles.toDoAddButton}
                            onClick={() => {
                                setCurrentCategory("school");
                                setIsPopupOpen(true);
                            }}
                            disabled={localTasks.school.length >= MAX_TASKS}
                        >
                            Add Task
                        </button>
                        <ul className={styles.toDoTaskList}>
                            {localTasks.school.map((task, index) => (
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

                    <div className={styles.toDoHomeSectionBar}>
                        <h3>Home</h3>
                        <button
                            className={styles.toDoAddButton}
                            onClick={() => {
                                setCurrentCategory("home");
                                setIsPopupOpen(true);
                            }}
                            disabled={localTasks.home.length >= MAX_TASKS}
                        >
                            Add Task
                        </button>
                        <ul className={styles.toDoTaskList}>
                            {localTasks.home.map((task, index) => (
                                <li key={index} className={styles.toDoTaskItem}>
                                    {task}

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

                    <div className={styles.toDoMiscSectionBar}>
                        <h3>Misc</h3>
                        <button
                            className={styles.toDoAddButton}
                            onClick={() => {
                                setCurrentCategory("misc");
                                setIsPopupOpen(true);
                            }}
                            disabled={localTasks.misc.length >= MAX_TASKS}
                        >
                            Add Task
                        </button>
                        <ul className={styles.toDoTaskList}>
                            {localTasks.misc.map((task, index) => (
                                <li key={index} className={styles.toDoTaskItem}>
                                    {task}

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

                {isPopupOpen && (
                    <Tasks
                        onApply={handleApplyTasks}
                        onClose={() => setIsPopupOpen(false)}
                        existingTasks={localTasks[currentCategory]}
                    />
                )}

                <button className={styles.toDoApplyButton} onClick={handleFinalApply}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default ToDoListPage;