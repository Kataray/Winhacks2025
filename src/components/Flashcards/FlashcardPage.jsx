import React from "react";
import styles from "./FlashcardPage.module.css";
import Button from '@mui/material/Button';

const FlashcardPage = ({ onClose }) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <button className={styles.closeButton} onClick={onClose}>
                    &times;
                </button>

                <h2>Flashcards</h2>
                <div>
                    <Button variant="contained">+ Create Flashcards</Button>
                </div>
            </div>
        </div>
    );
};

export default FlashcardPage;