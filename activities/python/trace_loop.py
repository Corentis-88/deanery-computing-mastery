"""Predict each value of number and total before running with Thonny's debugger."""

total = 1
for number in range(2, 8, 2):
    total = total * number - 1
    print(number, total)

print("Final:", total)
