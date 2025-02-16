import React, { createContext, useState, useEffect } from "react";
import { getDatabase, ref, get, set, update } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const auth = getAuth();
    const db = getDatabase();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                const userRef = ref(db, `anonymousUsers/${firebaseUser.uid}`);

                get(userRef).then((snapshot) => {
                    if (snapshot.exists()) {
                        setUser(snapshot.val());
                    } else {
                        console.log("No user data found.");
                    }
                }).catch((error) => console.error("Error fetching user data:", error));
            }
        });

        return () => unsubscribe();
    }, []);


    const updateUsername = (newUsername) => {
        if (!user) return;
        const userRef = ref(db, `anonymousUsers/${auth.currentUser.uid}`);

        update(userRef, { username: newUsername })
            .then(() => {
                setUser((prev) => ({ ...prev, username: newUsername }));
                console.log("Username updated successfully!");
            })
            .catch((error) => console.error("Error updating username:", error));
    };

    const updateBio = (newBio) => {
        if (!user) return;
        const userRef = ref(db, `anonymousUsers/${auth.currentUser.uid}`);
        update(userRef, { bio: newBio })
            .then(() => {
                setUser((prev) => ({ ...prev, bio: newBio }));
                console.log("Bio updated successfully!");
            })
            .catch((error) => console.error("Error updating bio:", error));
    }

    const updatePoints = (newPoints) => {
        if (!user) return;
        const userRef = ref(db, `anonymousUsers/${auth.currentUser.uid}`);
        update(userRef, { points: newPoints })
            .then(() => {
                setUser((prev) => ({ ...prev, points: newPoints }));
                console.log("Points updated successfully!");
            })
            .catch((error) => console.error("Error updating points:", error));
    }

    const addFlashcardSet = (setId, setName, setDescription) => {
        if (!user) return;
        const userRef = ref(db, `anonymousUsers/${auth.currentUser.uid}/flashcardSets`);

        const newFlashcardSet = {
            id: setId,
            name: setName,
            description: setDescription,
            date: new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear(),
            lastEdit: new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear(),
            cards: []
        };

        const updatedFlashcardSets = [...user.flashcardSets, newFlashcardSet];

        set(userRef, updatedFlashcardSets)
            .then(() => {
                setUser((prev) => ({ ...prev, flashcardSets: updatedFlashcardSets }));
                console.log("Flashcard set added successfully!");
            })
            .catch((error) => console.error("Error adding flashcard set:", error));
    };

    const addCardToSet = (setName, cardData) => {
        if (!user) return;

        const flashcardSetIndex = user.flashcardSets.findIndex(set => set.name === setName);
        if (flashcardSetIndex === -1) {
            console.error("Flashcard set not found.");
            return;
        }

        const flashcardSet = user.flashcardSets[flashcardSetIndex];
        flashcardSet.cards.push(cardData);

        const userRef = ref(db, `anonymousUsers/${auth.currentUser.uid}/flashcardSets`);

        const updatedFlashcardSets = [...user.flashcardSets];
        updatedFlashcardSets[flashcardSetIndex] = flashcardSet;

        set(userRef, updatedFlashcardSets)
            .then(() => {
                setUser((prev) => ({ ...prev, flashcardSets: updatedFlashcardSets }));
                console.log("Card added successfully!");
            })
            .catch((error) => console.error("Error adding card to flashcard set:", error));
    };

    return (
        <UserContext.Provider value={{ user, updateUsername, updateBio, updatePoints, addFlashcardSet, addCardToSet }}>
            {children}
        </UserContext.Provider>
    );
}