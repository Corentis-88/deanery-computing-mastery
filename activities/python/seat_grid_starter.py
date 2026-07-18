"""Practise 2D lists, records, search and random bounds."""
from random import randint

seats = [
    [True, False, True, True],
    [False, False, True, False],
    [True, True, True, False],
]

pupils = [
    {"id": 101, "name": "A. Khan", "year": 10},
    {"id": 102, "name": "B. Jones", "year": 10},
    {"id": 103, "name": "C. Silva", "year": 11},
]


def occupied_by_row(grid):
    """Return one occupied-seat count for each row."""
    # TODO: use nested iteration rather than hard-coding row sizes.
    return []


def find_pupil(records, pupil_id):
    """Return the matching record or None."""
    # TODO: linear search the records.
    return None


print("Occupied:", occupied_by_row(seats))
print("Search 102:", find_pupil(pupils, 102))
print("Random valid list index:", randint(0, len(pupils) - 1))
