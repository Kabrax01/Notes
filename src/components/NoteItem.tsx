import { Note } from "./App";

interface NoteItemProps {
    handleDeleteNote: () => void;
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
    selectedNote: Note | undefined;
}
export function NoteItem({
    handleDeleteNote,
    setEdit,
    selectedNote,
}: NoteItemProps) {
    if (!selectedNote) {
        return (
            <div className="note note--empty">
                <p>Kliknij w notatkę aby ją wyświetlić</p>
            </div>
        );
    }

    const { title, content } = selectedNote;

    return (
        <div className="note">
            <div className="note-title">
                <p>{title}</p>
            </div>
            <div className="note-content">
                <p>{content}</p>
            </div>

            <div className="note_actions">
                <button onClick={() => setEdit((prev) => !prev)}>Edit</button>
                <button onClick={handleDeleteNote}>Delete</button>
            </div>
        </div>
    );
}
