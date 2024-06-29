import { Note } from "./App";

interface NotesProps {
    notes: Note[] | null;
    setSelectedNote: React.Dispatch<React.SetStateAction<Note | undefined>>;
    handleShowForm: React.MouseEventHandler<HTMLButtonElement>;
}

export function NoteList({
    notes,
    setSelectedNote,
    handleShowForm,
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
                        <li onClick={() => setSelectedNote(note)} key={note.id}>
                            {note.title}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
