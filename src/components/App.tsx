import { useEffect, useState } from "react";
import "../main.scss";
import { NoteList } from "./NoteList";
import { NoteItem } from "./NoteItem";
import NewNoteForm from "./NewNoteForm";

export interface Note {
    id: number;
    title: string;
    content: string;
}

function App() {
    const [notes, setNotes] = useState<Note[] | []>(() => {
        const savedNotes = localStorage.getItem("notes");
        return savedNotes ? JSON.parse(savedNotes) : [];
    });
    const [selectedNote, setSelectedNote] = useState<Note | undefined>();
    const [showNewNoteForm, setShowNewNoteForm] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false);
    const [background, setBackground] = useState("url(background-4k.webp)");

    useEffect(() => {
        if (!notes.length) {
            setSelectedNote(undefined);
        }
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    function handleShowForm() {
        setShowNewNoteForm((prev) => !prev);
    }

    function handleDeleteNote() {
        const newNoteList = notes.filter(
            (note) => note.id !== selectedNote?.id
        );
        setNotes(newNoteList);
        setSelectedNote(notes[0]);
    }

    useEffect(() => {
        const size = window.innerWidth;
        size < 900
            ? setBackground("url(background-mobile.webp)")
            : setBackground("url(background-4k.webp)");
    }, []);

    return (
        <main
            style={{
                backgroundImage: `${background}`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
            }}>
            <div className="notepad">
                <div className="notepad_title-main">
                    <h1>Notatnik</h1>
                </div>
                <div className="notepad_container">
                    <NoteList
                        notes={notes}
                        setSelectedNote={setSelectedNote}
                        handleShowForm={handleShowForm}
                        selectedNote={selectedNote}
                    />

                    {showNewNoteForm || edit ? (
                        <NewNoteForm
                            notes={notes}
                            setNotes={setNotes}
                            handleShowForm={handleShowForm}
                            setSelectedNote={setSelectedNote}
                            selectedNote={selectedNote}
                            setEdit={setEdit}
                            edit={edit}
                        />
                    ) : (
                        <NoteItem
                            handleDeleteNote={handleDeleteNote}
                            setEdit={setEdit}
                            selectedNote={selectedNote}
                            key={selectedNote?.id}
                        />
                    )}
                </div>
            </div>
        </main>
    );
}

export default App;
