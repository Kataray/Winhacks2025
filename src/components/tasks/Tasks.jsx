import React, { useState } from "react";
import styles from "./Tasks.module.css";

const MAX_TASKS = 5;


const Tasks = ({ onApply, onClose }) => {
    const [text, setText] = useState(""); // ✅ Stores input text
    const [tasks, setTasks] = useState([]); // ✅ Stores tasks locally

    const handleAddTask = () => {
        if (tasks.length < MAX_TASKS && text.trim() !== "") {
            setTasks([...tasks, text]); // ✅ Add task to the local list
            setText(""); // ✅ Clear input after adding
        }
    };

    const handleApply = () => {
        onApply(tasks); // ✅ Send tasks to `ToDoListPage.jsx`
        setTasks([]); // ✅ Clear local tasks after applying
        onClose(); // ✅ Close popup
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    &times;
                </button>

                {/* ✅ Typing Input */}
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type a task..."
                    className={styles.inputField}
                    disabled={tasks.length >= MAX_TASKS}
                />

                {/* ✅ Add Task Button */}
                <button className={styles.addButton}
                        onClick={handleAddTask}
                        disabled={tasks.length >= MAX_TASKS}
                >
                    Add Task
                </button>

                {tasks.length >= MAX_TASKS && (
                    <p className={styles.warningText}>Task limit reached! Apply or remove tasks.</p>
                )}

                {/* ✅ Apply Button (Sends Tasks to Main Page) */}

                {/* ✅ Display Tasks in Popup */}
                <ul className={styles.taskList}>
                    {tasks.map((task, index) => (
                        <li key={index} className={styles.taskItem}>{task}</li>
                    ))}
                </ul>
                <button className={styles.applyButton}
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
