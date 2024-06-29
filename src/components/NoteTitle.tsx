import { Note } from "./App";

interface NoteTitleProps {
    children: React.ReactNode;
    setSelectedNote: React.Dispatch<React.SetStateAction<Note | undefined>>;
    selectedNote: Note | undefined;
    note: Note;
}

function NoteTitle({
    children,
    setSelectedNote,
    note,
    selectedNote,
}: NoteTitleProps) {
    const active = note.id === selectedNote?.id;

    return (
        <li
            style={{ backgroundColor: active ? "white" : "" }}
            onClick={() => setSelectedNote(note)}>
            {children}
        </li>
    );
}

export default NoteTitle;
