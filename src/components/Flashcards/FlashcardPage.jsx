import React, {useCallback, useContext} from "react";
import styles from "./FlashcardPage.module.css";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {UserContext} from "../../../UserContext.jsx";
import {InputLabel, MenuItem, Select} from "@mui/material";

const FlashCardGroup = ({data, setCurrentPage, setCurrentCardSet}) => {
    const deleteCardSet = () => {
        alert("Delete card set functionality");
    }

    const viewCardSet = (data) => {
        setCurrentPage("viewSet")
        setCurrentCardSet(data)
    }

    return (<div className={styles.flashcardPack}>
        <p className={styles.flashcardSecondaryText}>Created: {data.date} | Edited: {data.lastEdit}</p>
        <h2>{data.name}</h2>
        <p>{data.description}</p>
        <div className={styles.flashcardPackButtons}>
            <Button variant="outlined" color={"success"} onClick={() => {
                viewCardSet(data)
            }}
            >View</Button>
            <Button variant="outlined" color={"error"} onClick={deleteCardSet}>Delete</Button>
        </div>
    </div>)
}

const CreateFlashcardGroup = ({user, setCurrentPage, setCurrentCardSet, addFlashcardSet}) => {
    const [cardSetName, setCardSetName] = React.useState("");
    const [cardSetDescription, setCardSetDescription] = React.useState("");
    const [error, setError] = React.useState(null);

    const changeName = useCallback((e) => {
        setCardSetName(e.target.value);
    }, []);

    const changeDescription = useCallback((e) => {
        setCardSetDescription(e.target.value);
    }, []);

    const createCardSet = () => {
        if (cardSetName === "") {
            setError("Error: Name field is required.");
            return;
        }
        setError(null);
        const newId = user.flashcardSets.length > 0 ? Math.max(...user.flashcardSets.map(card => card.id)) + 1 : 1;
        console.log("new card set created: " + newId);

        addFlashcardSet(
            newId, cardSetName, cardSetDescription
        );
        setCurrentPage("main");
    }

    return (
        <div className={styles.createFlashcardGroup}>
            <h2>Create</h2>
            <TextField id="outlined-basic" label="Name" variant="outlined" fullWidth={true} onChange={changeName}
                       required={true}/>
            {error && <p style={{"color": "red"}}>{error}</p>}
            <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                fullWidth={true}
                onChange={changeDescription}
            />
            <Button variant="outlined"
                    color={"success"}
                    style={{"marginTop": "16px"}}
                    fullWidth={true}
                    onClick={createCardSet}
            >Create
            </Button>
        </div>)
}

const CreateIndividualFlashcard = ({setName, addCardToSet, setCurrentPage}) => {
    const [cardType, setCardType] = React.useState("Question");
    const [question, setQuestion] = React.useState("");
    const [answer, setAnswer] = React.useState("");
    const [optionCount, setOptionCount] = React.useState(0);
    const [options, setOptions] = React.useState([]);
    const [error, setError] = React.useState(null);

    const handleType = useCallback((e) => {
        setCardType(e.target.value);
    }, []);

    const handleQuestion = useCallback((e) => {
        setQuestion(e.target.value);
    }, []);

    const handleAnswer = useCallback((e) => {
        setAnswer(e.target.value);
    }, []);

    const addOptionBar = () => {
        if (optionCount === 5) return;
        setOptionCount(optionCount + 1);
        setOptions([...options, "Option " + (optionCount + 1)]);
    }

    const removeOptionBar = () => {
        if (optionCount === 0) return;
        setOptionCount(optionCount - 1);
        setOptions(options.slice(options.length - 1, optionCount));
    }

    const handleSubmit = () => {
        if (cardType === "Question" || cardType === "MultipleChoice") {
            if (question === "" || answer === "") {
                setError("Error: Question and Answer fields are required.");
                return;
            }
        }

        if (cardType === "MultipleChoice") {
            if (options.length === 0) {
                setError("Error: At least one option is required.");
                return;
            }
        }
        let newCard = {};
        if (cardType === "Question") {
            newCard = {
                type: cardType,
                question: question,
                answer: answer,
            };
        }

        if (cardType === "MultipleChoice") {
            newCard = {
                type: cardType,
                question: question,
                options: options,
                answer: answer,
            };
        }

        addCardToSet(setName, newCard)
        setCurrentPage("viewSet");

    }

    return (
        <div className={styles.createFlashcardGroup}>
            <h2>Create Flashcard</h2>
            <InputLabel id="demo-simple-select-label">Type of Flashcard</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Type of Flashcard"
                onChange={handleType}
                variant="standard"
                defaultValue={"Question"}
            >
                <MenuItem value={"Question"}>Question and Answer</MenuItem>
                <MenuItem value={"MultipleChoice"}>Multiple Choice</MenuItem>
            </Select>

            {
                (cardType === "Question" || cardType === "Definition") &&
                <>
                    <TextField
                        id="outlined-multiline-static"
                        label="Question"
                        multiline
                        fullWidth={true}
                        onChange={handleQuestion}
                        required={true}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Answer"
                        multiline
                        fullWidth={true}
                        onChange={handleAnswer}
                        required={true}
                    />
                </>
            }

            {
                cardType === "MultipleChoice" &&
                <>
                    <TextField
                        id="outlined-multiline-static"
                        label="Question"
                        multiline
                        fullWidth={true}
                        onChange={handleQuestion}
                        required={true}
                    />

                    <Button variant="outlined" color={"info"} onClick={addOptionBar}>Add Option</Button>
                    <Button variant="outlined" color={"error"} onClick={removeOptionBar}>Remove Option</Button>

                    {
                        Array.from({length: optionCount}).map((_, i) => (
                            <TextField
                                id="outlined-multiline-static"
                                label={"Option " + (i + 1)}
                                multiline
                                fullWidth={true}
                                onChange={(e) => {
                                    const newOptions = [...options];
                                    newOptions[i] = e.target.value;
                                    setOptions(newOptions);
                                }}
                                required={true}
                            />
                        ))
                    }
                    <InputLabel id="demo-simple-select-label">Answer</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Answer"
                        onChange={handleAnswer}
                        variant="standard">
                        {
                            options.map((option, i) => (
                                <MenuItem value={option}>{option}</MenuItem>
                            ))
                        }
                    </Select>
                </>
            }

            {
                error && <p style={{"color": "red"}}>{error}</p>
            }

            <Button variant="outlined"
                    color={"success"}
                    style={{"marginTop": "16px"}}
                    fullWidth={true}
                    onClick={handleSubmit}
            >Create Card
            </Button>
        </div>
    )
}

const IndividualFlashcard = ({card}) => {
    const [showAnswer, setShowAnswer] = React.useState(false);

    const deleteCard = () => {
        alert("Delete card functionality");
    }
    const editCard = () => {
        alert("Edit card functionality");
    }
    return (
        <div className={styles.flashcardPack}>
            <h2>{card.type}</h2>
            <p>{card.question}</p>
            {
                card.type === "MultipleChoice" &&
                <div className={styles.flashcardMultipleChoice}>
                    {
                        card.options != null &&
                        card.options.map(option =>
                            <p>{option}</p>
                        )
                    }
                </div>
            }
            {
                showAnswer ?
                    <p>{card.answer}</p> :
                    <Button variant="outlined" color={"info"} onClick={() => setShowAnswer(true)}>Show Answer</Button>
            }
            <div className={styles.flashcardPackButtons}>
                <Button variant="outlined" color={"info"} onClick={editCard}>Edit</Button>
                <Button variant="outlined" color={"error"} onClick={deleteCard}>Delete</Button>
            </div>
        </div>
    )
}

const ViewFlashcards = ({data, setCurrentPage}) => {

    return (
        <>
            <h2>{data.name}</h2>
            <p>{data.description}</p>
            <Button variant="outlined" color={"success"} style={{"marginBottom": "8px"}} onClick={() => {
                setCurrentPage("createFlashcard")
            }}>+ Create Flashcard</Button>
            <Button variant="outlined" color={"error"} style={{"marginBottom": "16px"}} onClick={() => {
                setCurrentPage("main")
            }}>Go Back</Button>

            <div className={styles.flashcardList}>
                {data.cards.map(card => <IndividualFlashcard card={card}/>)}
            </div>
        </>
    )
}

const FlashcardPage = ({onClose}) => {
    const [currentPage, setCurrentPage] = React.useState("main");
    const [currentCardSet, setCurrentCardSet] = React.useState(null);

    const {user, addFlashcardSet, addCardToSet} = useContext(UserContext);
    console.log(user);
    if (user == null) {
        // refresh
        window.location.reload();
        return console.log("user is null");
    }

    return (<div className={styles.overlay}>
        <div className={styles.popup}>
            <button className={styles.closeButton} onClick={onClose}>
                &times;
            </button>

            {
                currentPage === "main" &&
                <>
                    <h2>Flashcards</h2>
                    <Button
                        variant="outlined"
                        color={"success"}
                        style={{"marginBottom": "16px"}}
                        onClick={() => {
                            setCurrentPage("createFlashcardGroup");
                        }}
                    >
                        + Create Flashcard Group
                    </Button>
                </>
            }
            {
                currentPage === "main" &&
                <div className={styles.flashcardGroupList}>
                    {user.flashcardSets.map(card => <FlashCardGroup data={card} setCurrentPage={setCurrentPage}
                                                                    setCurrentCardSet={setCurrentCardSet}/>)}
                </div>
            }
            {
                currentPage === "createFlashcardGroup" &&
                <>
                    <CreateFlashcardGroup user={user} setCurrentPage={setCurrentPage}
                                          setCurrentCardSet={setCurrentCardSet} addFlashcardSet={addFlashcardSet}/>
                    <Button variant="outlined"
                            color={"error"}
                            fullWidth={true}
                            style={{"marginTop": "16px", "width": "60%"}}
                            onClick={() => {
                                setCurrentPage("main")
                            }}
                    >Return to Flashcard List
                    </Button>
                </>

            }
            {
                currentPage === "viewSet" &&
                <ViewFlashcards data={currentCardSet} setCurrentPage={setCurrentPage}/>
            }
            {
                currentPage === "createFlashcard" &&
                <CreateIndividualFlashcard setName={currentCardSet.name} addCardToSet={addCardToSet}
                                           setCurrentPage={setCurrentPage}/>
            }
        </div>
    </div>);
};

export default FlashcardPage;