import React, { useState } from "react";
import styles from "./Tasks.module.css";

const MAX_TASKS = 5;


const Tasks = ({ onApply, onClose }) => {
    const [text, setText] = useState("");
    const [tasks, setTasks] = useState([]);

    const handleAddTask = () => {
        if (tasks.length < MAX_TASKS && text.trim() !== "") {
            setTasks([...tasks, text]);
            setText("");
        }
    };

    const handleApply = () => {
        onApply(tasks);
        setTasks([]);
        onClose();
    };

    return (
        <div className={styles.toDoOverlay} onClick={onClose}>
            <div className={styles.toDoPopup} onClick={(e) => e.stopPropagation()}>
                <button className={styles.toDoCloseButton1} onClick={onClose}>
                    &times;
                </button>

                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type a task..."
                    className={styles.inputField}
                    disabled={tasks.length >= MAX_TASKS}
                />

                <button className={styles.toDoAddButton1}
                        onClick={handleAddTask}
                        disabled={tasks.length >= MAX_TASKS}
                >
                    Add Task
                </button>

                {tasks.length >= MAX_TASKS && (
                    <p className={styles.errorText}>Task limit reached! Apply or remove tasks.</p>
                )}


                <ul className={styles.toDoTaskList1}>
                    {tasks.map((task, index) => (
                        <li key={index} className={styles.toDoTaskItem1}>{task}</li>
                    ))}
                </ul>
                <button className={styles.toDoApplyButton1}
                        onClick={handleApply}
                        disabled={tasks.length === 0}
                >
                    Apply
                </button>
            </div>
        </div>
    );
};

export default Tasks;