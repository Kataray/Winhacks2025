import React, {useContext, useEffect, useState} from "react";
import styles from "./ToDoListPage.module.css";
import Tasks from "./Tasks.jsx";
import {UserContext} from "../../../UserContext.jsx";

const MAX_TASKS = 3;

const ToDoListPage = ({ onClose, onFinalApply, tasks }) => {

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [loading, setLoading] = React.useState(true);

    const { user, addTask, removeTask, addPoints } = useContext(UserContext);

    useEffect(() => {
        if (user !== undefined) {
            setLoading(false);
        }
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleApplyTasks = (newTasks) => {
        if (currentCategory && newTasks.length > 0) {
            addTask(newTasks, currentCategory);
            addPoints(newTasks.length);
        }
        setIsPopupOpen(false);
    };

    const handleDeleteTask = (task, category) => {
        removeTask(task, category);
    };


    const handleFinalApply = () => {
        onFinalApply(user.todoLists); // ✅ Send updated tasks to `MainPage.jsx`
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

                            disabled={user?.todoLists.school.length >= MAX_TASKS}

                        >
                            Add Task
                        </button>
                        <ul className={styles.toDoTaskList}>

                            {user.todoLists.school.map((task, index) => (

                                <li key={index} className={styles.toDoTaskItem}>
                                    {task}

                                    <button className={styles.toDoDeleteButton}
                                            onClick={() => handleDeleteTask(task, "school")}>❌
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
                            disabled={user?.todoLists.home.length >= MAX_TASKS}
                        >
                            Add Task
                        </button>
                        <ul className={styles.toDoTaskList}>

                            {user.todoLists.home.map((task, index) => (
                                <li key={index} className={styles.toDoTaskItem}>
                                    {task}

                                    <button className={styles.toDoDeleteButton}
                                            onClick={() => handleDeleteTask(task, "home")}>❌
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
                            disabled={user?.todoLists.misc.length >= MAX_TASKS}

                        >
                            Add Task
                        </button>
                        <ul className={styles.toDoTaskList}>
                            {user.todoLists.misc.map((task, index) => (
                                <li key={index} className={styles.toDoTaskItem}>
                                    {task}

                                    <button className={styles.toDoDeleteButton}
                                            onClick={() => handleDeleteTask(task, "misc")}>❌
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {isPopupOpen && (
                    <>
                    <Tasks
                        onApply={handleApplyTasks}
                        onClose={() => setIsPopupOpen(false)}
                        existingTasks={user.todoLists[currentCategory]}
                    />
                    </>
                )}


                <button className={styles.toDoApplyButton} onClick={handleFinalApply}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default ToDoListPage;