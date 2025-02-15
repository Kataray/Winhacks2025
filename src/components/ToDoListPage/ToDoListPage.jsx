import React from "react";
import styles from "./ToDoListPage.module.css";

const ToDoListPage = ({ onClose }) => {
    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    &times;
                </button>

                {/* ✅ Section Bars Wrapper (Flexbox for spacing) */}
                <div className={styles.sectionContainer}>
                    <div className={styles.todosectionBar}>To-Do List</div>
                    <div className={styles.compsectionBar}>Completed Tasks</div>
                    <div className={styles.upsectionBar}>Upcoming Tasks</div>
                </div>
            </div>
        </div>
    );
};

export default ToDoListPage;
