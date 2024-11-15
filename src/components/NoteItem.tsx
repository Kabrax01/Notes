import { Note } from "./App";

interface NoteItemProps {
    handleDeleteNote: () => void;
    confirmationCheck: boolean;
    setShowConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
    selectedNote: Note | undefined;
}
export function NoteItem({
    handleDeleteNote,
    confirmationCheck,
    setShowConfirmation,
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

    function handleDelete() {
        if (confirmationCheck) {
            handleDeleteNote();
        } else {
            setShowConfirmation(true);
        }
    }

    return (
        <div className="note">
            <div className="note-title">
                <p>{title}</p>
            </div>
            <div className="note-content">
                <p>{content}</p>
            </div>

            <div className="note_actions">
                <button onClick={() => setEdit((prev) => !prev)}>Edytuj</button>
                <button onClick={handleDelete}>Usuń</button>
            </div>
        </div>
    );
}
