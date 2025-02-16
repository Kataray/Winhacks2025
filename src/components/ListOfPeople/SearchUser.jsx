import React, {useContext, useEffect, useState} from "react";
import {getDatabase, ref, query, orderByChild, equalTo, get} from "firebase/database";
import {getApps, initializeApp} from "firebase/app";
import firebaseConfig from "../../../firebaseConfig.js";
import {UserContext} from "../../../UserContext.jsx";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button"; // Adjust path if needed

// Ensure Firebase is initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const SearchUser = ({userData}) => {
    const [searchUsername, setSearchUsername] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const {addFriend} = useContext(UserContext);

    useEffect(() => {
        if (result) {
            addFriend(result.id);
        }
    }, [result])

    const searchUser = async () => {
        setLoading(true);
        setResult(null);
        setError(null);
        try {
            const db = getDatabase(app);
            const usersRef = ref(db, "anonymousUsers");

            // Query for the username
            const usernameQuery = query(usersRef, orderByChild("username"), equalTo(searchUsername));
            const snapshot = await get(usernameQuery);

            if (snapshot.exists()) {
                const data = snapshot.val();
                // Convert object to array
                const usersArray = Object.keys(data).map((userId) => ({
                    id: userId,
                    ...data[userId],
                }));
                console.log(usersArray[0]);
                console.log(userData.id);
                if (usersArray[0].username === userData.username) {
                    setError("You cannot add yourself as a friend.");
                } else if (userData.friends.includes(usersArray[0].id)) {
                    setError("You are already friends with this user.");
                } else {
                    setResult(usersArray[0]); // Assuming usernames are unique
                }
            } else {
                setError("User not found.");
            }


        } catch (err) {
            console.error("Error searching user:", err);
            setError("An error occurred while searching.");
        }
        setLoading(false);
    };

    return (
        <div>
            <h2>Search for a User</h2>
            <div style={{"display": "flex", "flexDirection": "column"}}>
                <TextField id="outlined-basic" label="Name" variant="outlined" fullWidth={true}
                           onChange={(e) => setSearchUsername(e.target.value)}
                           required={true}/>
                <Button variant={"outlined"} color={"success"} style={{"margin": "8px"}} onClick={searchUser}>Add
                    Friend</Button>
            </div>

            {loading && <p>Searching...</p>}
            {error && <p style={{color: "red"}}>{error}</p>}

            {result && (
                <div>
                    <h3>User Found</h3>
                </div>
            )}
        </div>
    );
};

export default SearchUser;
