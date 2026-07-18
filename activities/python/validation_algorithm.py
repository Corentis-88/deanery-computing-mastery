"""Represent this algorithm as flowchart and pseudocode, then complete Python."""


def get_integer_in_range(minimum, maximum):
    """Return a valid integer in the inclusive range."""
    while True:
        raw = input(f"Enter {minimum} to {maximum}: ")
        # TODO: recover from non-integer text and reject values outside the range.
        return int(raw)


choice = get_integer_in_range(1, 10)
print("Accepted:", choice)
