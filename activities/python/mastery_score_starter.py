"""Unit task: validate ten 0/1 answers and report whether 8/10 is mastered."""


def get_mark(number):
    """Return a validated integer 0 or 1 from the user."""
    # TODO: repeat until conversion succeeds and the value is 0 or 1.
    return int(input(f"Question {number} mark (0 or 1): "))


def mastery_message(total):
    """Return a useful result message. Check the boundary at exactly 8."""
    # TODO: return a mastered/review message.
    return "Not implemented"


score = 0
for question_number in range(1, 11):
    score += get_mark(question_number)

print(f"Score: {score}/10")
print(mastery_message(score))
