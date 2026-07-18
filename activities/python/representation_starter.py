"""Complete 0–255 base conversions and explicit file-size calculations."""

HEX_DIGITS = "0123456789ABCDEF"


def validate_byte_value(value):
    if not 0 <= value <= 255:
        raise ValueError("value must be from 0 to 255")


def to_binary_8(value):
    validate_byte_value(value)
    # TODO: build exactly eight bits without bin().
    return ""


def to_hex_2(value):
    validate_byte_value(value)
    # TODO: use integer division/remainder and HEX_DIGITS.
    return ""


def bitmap_bits(width, height, colour_depth):
    # TODO: implement W × H × D.
    return 0


def sound_bits(rate_hz, resolution_bits, seconds):
    # TODO: implement rate × resolution × seconds.
    return 0


for value in (0, 1, 15, 16, 254, 255):
    print(value, to_binary_8(value), to_hex_2(value))
