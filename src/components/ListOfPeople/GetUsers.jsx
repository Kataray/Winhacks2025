import React, {useContext, useEffect, useState} from "react";
import {getDatabase, ref, get} from "firebase/database";
import {getApps, initializeApp} from "firebase/app";
import firebaseConfig from "../../../firebaseConfig.js";
import {UserContext} from "../../../UserContext.jsx";

// Ensure Firebase is initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const GetUsers = ({userData, friendsOnly}) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const db = getDatabase(app);
                const usersRef = ref(db, "anonymousUsers");
                const snapshot = await get(usersRef);

                if (snapshot.exists()) {
                    const data = snapshot.val();
                    if (friendsOnly) {
                        // Convert object to array
                        const usersArray = Object.keys(data).map((userId) => ({
                            id: userId,
                            ...data[userId],
                        })).filter((user) =>
                            user.username !== userData.username
                        ).filter((user) =>
                            userData.friends.includes(user.id)
                        )
                        setUsers(usersArray);

                    }
                    else {
                        const usersArray = Object.keys(data).map((userId) => ({
                            id: userId,
                            ...data[userId],
                        })).filter((user) =>
                            (user.username !== userData.username && !userData.friends.includes(user.id))
                        )
                        setUsers(usersArray);
                    }
                } else {
                    console.log("No anonymous users found.");
                    setUsers([]);
                }
            } catch (error) {
                console.error("Error fetching anonymous users:", error);
            }
            setLoading(false);
        };

        fetchUsers();
    }, [])

    if (loading) return <p>Loading users...</p>;

    return (
        <div>

            {
                !friendsOnly &&
                <h3 style={{"marginTop": "16px"}}>All Users</h3>
            }
            {users.map((user) => (
                <div key={user.id}>
                    <strong>{user.username}</strong>
                </div>
            ))}

        </div>
    );
};

export default GetUsers;
