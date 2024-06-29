import { Note } from "./App";
import NoteTitle from "./NoteTitle";

interface NotesProps {
    notes: Note[] | null;
    setSelectedNote: React.Dispatch<React.SetStateAction<Note | undefined>>;
    handleShowForm: React.MouseEventHandler<HTMLButtonElement>;
    selectedNote: Note | undefined;
}

export function NoteList({
    notes,
    setSelectedNote,
    handleShowForm,
    selectedNote,
}: NotesProps) {
    const emptyNoteList = Boolean(notes?.length);

    return (
        <div className="note_list">
            <button className="note_list-button" onClick={handleShowForm}>
                Nowa notatka
            </button>
            <ul>
                {emptyNoteList || <li>Brak notatek</li>}

                {notes?.map((note) => {
                    return (
                        <NoteTitle
                            setSelectedNote={setSelectedNote}
                            key={note.id}
                            note={note}
                            selectedNote={selectedNote}>
                            {note.title}
                        </NoteTitle>
                    );
                })}
            </ul>
        </div>
    );
}
