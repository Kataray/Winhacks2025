
import React, {useContext, useEffect, useState} from "react";
import styles from "./FriendsListPopup.module.css";
import Button from "@mui/material/Button";
import {UserContext} from "../../../UserContext.jsx";
import GetUsers from "../ListOfPeople/GetUsers.jsx";
import SearchUser from "../ListOfPeople/SearchUser.jsx";

const AddFriend = ({user}) => {
    return (
        <div>
            <GetUsers friendsOnly={false} userData={user}/>
        </div>
    )
}

const FriendsListPopup = ({onClose}) => {
    const {user} = useContext(UserContext);
    const [loading, setLoading] = React.useState(true);
    const [currentPage, setCurrentPage] = useState("friendsList");

    useEffect(() => {
        if (user !== undefined) {
            setLoading(false);
        }
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.friendsListOverlay}>
            <div className={styles.friendsListPopup}>
                <button className={styles.friendsListCloseButton} onClick={onClose}>
                    &times;
                </button>
                {
                    currentPage === "friendsList" &&
                    <>
                        <h2>Friends</h2>

                        <Button variant="outlined" color={"success"} style={{"marginBottom": "8px"}}
                                onClick={() => setCurrentPage("addFriend")}>
                            + Add Friend
                        </Button>

                        <h3>Friend List</h3>
                        {
                            user?.friends.length === 1 ?
                                <div style={{"color": "red", "marginTop": "16px"}}>No friends yet</div>
                                :
                                <GetUsers friendsOnly={true} userData={user}/>
                        }
                    </>
                }

                {
                    currentPage === "addFriend" &&
                    <>
                        <h2>Add Friends</h2>
                        <SearchUser userData={user} />
                        <AddFriend user={user} />
                    </>
                }

            </div>
        </div>
    );
};

export default FriendsListPopup;
