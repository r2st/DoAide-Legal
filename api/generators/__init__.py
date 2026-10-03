def format_inr(amount: float) -> str:
    is_negative = amount < 0
    amount = abs(amount)
    s = f"{amount:.2f}"
    integer_part, decimal_part = s.split(".")
    if len(integer_part) <= 3:
        formatted = integer_part
    else:
        last3 = integer_part[-3:]
        remaining = integer_part[:-3]
        groups = []
        while remaining:
            groups.insert(0, remaining[-2:])
            remaining = remaining[:-2]
        formatted = ",".join(groups) + "," + last3
    result = f"₹{formatted}.{decimal_part}"
    return f"-{result}" if is_negative else result
