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
        if (notes.length > 1) {
            setSelectedNote(notes.at(-1));
        }
    }

    useEffect(() => {
        const size = window.innerWidth;
        console.log(size);
    }, []);

    return (
        <main
            style={{
                backgroundImage: "url(background-4k.webp)",
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
