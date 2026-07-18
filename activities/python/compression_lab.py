"""Implement row-based run-length encoding and count supplied Huffman bits."""


def rle_encode(values):
    """Return [(frequency, value), ...] for consecutive runs."""
    if not values:
        return []
    # TODO: track the current value/count and append when the value changes.
    return []


HUFFMAN = {"A": "0", "B": "10", "C": "110", "D": "111"}


def huffman_encode(text):
    """Return concatenated codes from the supplied prefix-free table."""
    # TODO: join one code per character.
    return ""


pattern = "0000011100000011"
message = "ABACADABRA"
print("RLE:", rle_encode(pattern))
encoded = huffman_encode(message)
print("Huffman:", encoded, len(encoded), "bits")
print("7-bit ASCII equivalent:", len(message) * 7, "bits")
