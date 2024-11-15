interface ConfirmationProps {
    setShowConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
    handleConfirmationCheck: () => void;
    handleDeleteNote: () => void;
    confirmationCheck: boolean;
}

function Confirmation({
    confirmationCheck,
    setShowConfirmation,
    handleConfirmationCheck,
    handleDeleteNote,
}: ConfirmationProps) {
    return (
        <div className="confirmation">
            <p>Czy na pewno chesz usunąć notatkę?</p>
            <div className="confirmation__buttons">
                <button
                    onClick={() => {
                        handleDeleteNote();
                        setShowConfirmation(false);
                    }}>
                    Tak
                </button>
                <button
                    onClick={() => {
                        setShowConfirmation(false);
                    }}>
                    Nie
                </button>
                <div className="confirmation__checkbox">
                    <input
                        type="checkbox"
                        checked={confirmationCheck}
                        onChange={handleConfirmationCheck}
                        id="confirmationCheckbox"
                    />
                    <label htmlFor="confirmationCheckbox">
                        Nie pokazuj ponownie
                    </label>
                </div>
            </div>
        </div>
    );
}

export default Confirmation;
