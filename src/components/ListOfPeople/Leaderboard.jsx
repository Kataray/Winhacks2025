import React, {useEffect, useState} from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import {get, getDatabase, ref} from "firebase/database";
import {getApps, initializeApp} from "firebase/app";

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const UserTable = () => {
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
                    // Convert object to array
                    const usersArray = Object.keys(data).map((userId) => ({
                        id: userId,
                        ...data[userId],
                    })).sort((a, b) => b.points - a.points);
                    setUsers(usersArray);
                    console.log(usersArray);
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

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Rank</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Points</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>
                                {
                                    <>
                                        { user.points < 25 && <img src="/assets/chopped.png" alt="Chopped Chin" style={{"width": "64px"}}/> }
                                        { user.points > 24 && user.points < 60 && <img src="/assets/NLEchoppa.png" alt="NLE Choppa" style={{"width": "64px"}}/> }
                                        { user.points > 59 && <img src="/assets/choptimusPrime.png" alt="Choptimus Prime" style={{"width": "64px"}}/> }
                                    </>
                                }
                            </TableCell>
                            <TableCell>
                                {user.username}
                            </TableCell>
                            <TableCell>{user.points}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserTable;