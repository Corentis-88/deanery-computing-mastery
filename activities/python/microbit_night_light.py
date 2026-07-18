"""micro:bit Python: add calibrated on/off thresholds to avoid flicker.

Open in https://python.microbit.org/ if micro:bit modules are unavailable locally.
"""
from microbit import display, Image, sleep

ON_BELOW = 55
OFF_ABOVE = 65
light_is_on = False

while True:
    reading = display.read_light_level()

    # TODO: turn on below ON_BELOW and off above OFF_ABOVE.
    # Inside the band, preserve the existing state.

    display.show(Image.HAPPY if light_is_on else Image.SAD)
    sleep(250)
