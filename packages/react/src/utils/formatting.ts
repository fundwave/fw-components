import numbro from "numbro";

numbro.registerLanguage({
  languageTag: "fw",
  delimiters: {
    thousands: ",",
    decimal: "."
  },
  abbreviations: {
    thousand: "K",
    million: "M",
    billion: "B",
    trillion: "T"
  },
  ordinal: (number: number) => {
    const b = number % 10;
    return ~~((number % 100) / 10) === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th";
  },
  currency: {
    symbol: "$",
    position: "postfix",
    code: "USD"
  }
} as numbro.NumbroLanguage);

numbro.setLanguage("fw");

numbro.setDefaults({
  mantissa: 2,
  thousandSeparated: true,
  negative: "parenthesis"
});

const getOptions = (n?: number, trim = true, negative: numbro.Format["negative"] = "parenthesis"): numbro.Format => {
  const options: numbro.Format = {
    optionalMantissa: trim,
    trimMantissa: trim,
    negative
  };
  if (n !== null && n !== undefined) options.mantissa = n;
  return options;
};

/*
Format value to include commas.
Precision upto n decimals( default : 2).
Optional mantissa + trim mantissa => trim/remove zeroes from mantissa.
*/
export const formatComma = (value?: string | number, n?: number, trim?: boolean, negative: numbro.Format["negative"] = "parenthesis"): string | number | undefined => {
  if (value !== undefined && value !== null && value !== "") {
    const unformatted = undoFormatting(value);
    const options = getOptions(n, trim, negative);
    return numbro(unformatted).format(options);
  }
  return value;
};

export const undoFormatting = (value?: string | number): number | string | undefined => {
  if (value !== undefined && value !== null && value !== "") return numbro.unformat(value.toString());
  return value;
};
