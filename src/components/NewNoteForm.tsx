import { useEffect, useState } from "react";
import { Note } from "./App";

interface NoteFormProps {
    notes: Note[];
    setNotes: React.Dispatch<React.SetStateAction<Note[] | []>>;
    handleShowForm: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedNote: React.Dispatch<React.SetStateAction<Note | undefined>>;
    selectedNote: Note | undefined;
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
    edit: boolean;
}

function NewNoteForm({
    notes,
    setNotes,
    handleShowForm,
    setSelectedNote,
    selectedNote,
    setEdit,
    edit,
}: NoteFormProps) {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [cancel, setCancel] = useState(false);

    useEffect(() => {
        if (edit && selectedNote) {
            setTitle(selectedNote.title);
            setContent(selectedNote.content);
        }
    }, [edit, selectedNote]);

    function handleCancel() {
        setCancel(true);
    }

    function handleAddNewNote(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const newNote = { title: title, content: content, id: Date.now() };
        setNotes([...notes, newNote]);
        handleShowForm(false);
        setSelectedNote(newNote);
    }

    function handleEditNote(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (cancel) {
            console.log("success");
            setCancel(false);
            setEdit(false);
            return;
        }

        let editedNote: Note;
        if (selectedNote) {
            editedNote = {
                title: title,
                content: content,
                id: Date.now(),
            };

            setSelectedNote(editedNote);
        }
        if (selectedNote) {
            const index = notes.findIndex(
                (note) => note.id === selectedNote.id
            );

            const editedNotesArray = notes.map((note, i) => {
                if (i === index) {
                    return editedNote;
                }
                return note;
            });

            setNotes(editedNotesArray);
        }

        setEdit(false);
    }

    return (
        <form
            className="note_form"
            onSubmit={edit ? handleEditNote : handleAddNewNote}>
            <div className="note_form_input">
                <input
                    type="text"
                    className="note_form-title"
                    maxLength={30}
                    placeholder="Tytuł notatki"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    className="note_form-content"
                    placeholder="Twoja notatka"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </div>
            {edit ? (
                <div className="note_form_buttons">
                    <button>Edytuj</button>
                    <button onClick={handleCancel}>Anuluj</button>
                </div>
            ) : (
                <div className="note_form_buttons">
                    <button>Dodaj notatę</button>
                    <button onClick={() => handleShowForm(false)}>
                        Anuluj
                    </button>
                </div>
            )}
        </form>
    );
}

export default NewNoteForm;
