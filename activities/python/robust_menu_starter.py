"""Build explicit interfaces, validation, simple AQA authentication and tests.

Real systems must not store plaintext passwords. This deliberately simplified
routine exists only to practise the AQA-specified algorithm.
"""


def authenticate(username, password):
    """Return True only for the fictional training credential."""
    # TODO: compare both supplied values. Do not print inside this function.
    return False


def get_menu_choice(minimum, maximum):
    """Return an integer within inclusive bounds, recovering from bad input."""
    # TODO: loop, catch ValueError and give a useful message.
    return minimum


def run_tests():
    cases = [
        ("teacher", "training-only", True),
        ("teacher", "wrong", False),
        ("", "training-only", False),
    ]
    for username, password, expected in cases:
        actual = authenticate(username, password)
        print(username, "expected", expected, "actual", actual, "PASS" if actual == expected else "FAIL")


run_tests()
