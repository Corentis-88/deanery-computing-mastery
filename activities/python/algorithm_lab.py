"""Instrument searches and sorts. Complete TODOs, then compare comparison counts."""


def linear_search(values, target):
    comparisons = 0
    for index, value in enumerate(values):
        comparisons += 1
        if value == target:
            return index, comparisons
    return -1, comparisons


def binary_search(values, target):
    """Precondition: values is sorted."""
    low, high, comparisons = 0, len(values) - 1, 0
    while low <= high:
        middle = (low + high) // 2
        comparisons += 1
        # TODO: return on match; otherwise discard the impossible half.
        break
    return -1, comparisons


def bubble_sort(values):
    values = values.copy()
    comparisons = 0
    # TODO: implement adjacent comparisons, swaps and an early-exit flag.
    return values, comparisons


for size in (8, 32, 128, 512):
    data = list(range(size))
    print(size, linear_search(data, size - 1), binary_search(data, size - 1))
