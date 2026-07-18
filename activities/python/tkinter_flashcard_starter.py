"""Complete a small GUI while keeping checking logic separate from Tkinter."""
import tkinter as tk


def check_answer(expected, actual):
    """Return True when cleaned answers match; do not access any widgets here."""
    # TODO: ignore surrounding spaces and letter case.
    return False


def handle_check():
    """Validate Entry content, call check_answer, then update the feedback Label."""
    # TODO: handle blank input and show precise feedback.
    pass


root = tk.Tk()
root.title("Computing flashcard")

question = tk.Label(root, text="Which device routes packets between networks?")
question.grid(row=0, column=0, columnspan=2, padx=12, pady=12)

answer_label = tk.Label(root, text="Your answer:")
answer_label.grid(row=1, column=0, padx=12, pady=8)
answer_entry = tk.Entry(root)
answer_entry.grid(row=1, column=1, padx=12, pady=8)

check_button = tk.Button(root, text="Check", command=handle_check)
check_button.grid(row=2, column=0, columnspan=2, pady=8)
feedback = tk.Label(root, text="")
feedback.grid(row=3, column=0, columnspan=2, padx=12, pady=12)

answer_entry.focus()
root.mainloop()
