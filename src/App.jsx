import React, {useEffect, useState} from "react";
import MainPage from "./components/MainPage/MainPage.jsx";
import firebaseConfig from "../firebaseConfig.js";
import {getApps, initializeApp} from "firebase/app";
import {getAuth, signInAnonymously} from "firebase/auth";
import {getDatabase, ref, set, get} from "firebase/database"; // Correct import
import {generateUsername} from "unique-username-generator";
import {UserProvider} from "../UserContext.jsx";

function App() {
    // Initialize Firebase only once
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    const auth = getAuth(app);

    useEffect(() => {
        signInAnonymously(auth)
            .then(() => {
                console.log("Signed in anonymously");
            })
            .catch((error) => {
                console.error("Firebase Auth Error:", error.code, error.message);
            });

        auth.onAuthStateChanged(user => {
            if (user) {
                const userId = user.uid; // Generate a unique ID

                const db = getDatabase(app);
                const userRef = ref(db, `anonymousUsers/${userId}`);

                // Check if user already has a username
                get(userRef).then((snapshot) => {
                    if (snapshot.exists() && snapshot.val().username) {
                        const existingUsername = snapshot.val().username;
                        console.log("User already exists:", existingUsername);
                    } else {
                        // Generate a new username if none exists
                        const newUsername = generateUsername("-", 3);

                        set(userRef, {
                            username: newUsername,
                            bio: "",
                            points: 0,
                            flashcardSets: [{
                                id: 1,
                                name: "Example Cards",
                                description: "",
                                date:  new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear(),
                                lastEdit:  new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear(),
                                cards: [
                                    {
                                        id: 1,
                                        type: "Question",
                                        question: "Question",
                                        answer: "Answer"
                                    },
                                    {
                                        id: 2,
                                        type: "MultipleChoice",
                                        question: "True or False?",
                                        options: ["True", "False"],
                                        answer: "True"
                                    },
                                    {
                                        id: 3,
                                        type: "MultipleChoice",
                                        question: "Question",
                                        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
                                        answer: "Option 1"
                                    }
                                ]
                            }],
                            todoLists: { school: ["Example Task"], home: ["Example Task"], misc: ["Example Task"] },
                            challenges: [{placeholder: true}],
                            achievements: [{placeholder: true}],
                            friends: [{placeholder: true}],
                        })
                            .then(() => {
                                console.log("New username saved:", newUsername)
                            })
                            .catch((error) => console.error("Error saving username:", error));
                    }
                });
            } else {
                console.log("No user is signed in");
            }
        });
    }, []);

    return (
        <UserProvider>
            <MainPage />
        </UserProvider>
    );
}

export default App;