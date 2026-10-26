import type { FormatOptions, ValueFormatType } from "../types";

const currencySymbolCache: Record<string, string> = {};

export const getCurrencySymbol = (currencyCode: string): string => {
  const cacheKey = currencyCode?.toUpperCase();
  if (!cacheKey) return "";
  try {
    if (currencySymbolCache[cacheKey]) return currencySymbolCache[cacheKey];
    const symbol =
      new Intl.NumberFormat("en", {
        style: "currency",
        currency: currencyCode,
        minimumFractionDigits: 0,
      })
        .formatToParts(0)
        .find((part) => part.type === "currency")?.value || "";
    currencySymbolCache[cacheKey] = symbol;
    return symbol;
  } catch {
    currencySymbolCache[cacheKey] = "";
    return "";
  }
};

function formatComma(value: number, decimals: number = 2, trim: boolean = true): string {
  const formatted = new Intl.NumberFormat("en", {
    minimumFractionDigits: trim ? 0 : decimals,
    maximumFractionDigits: decimals,
  }).format(value);
  return formatted;
}

function formatNumber(value: number, decimals: number = 2, trim: boolean = true): string {
  const fixed = value.toFixed(decimals);
  if (trim) {
    return parseFloat(fixed).toString();
  }
  return fixed;
}

function formatToMillions(value: number, decimals: number = 2, trim: boolean = true): string {
  const millions = value / 1_000_000;
  return formatNumber(millions, decimals, trim);
}

function formatPercentage(value: number, decimals: number = 2, trim: boolean = true): string {
  const pct = value * 100;
  return `${formatNumber(pct, decimals, trim)}%`;
}

function formatDate(
  date: Date,
  dateFormat?: string | null,
  formatAsUTC?: boolean | null
): string {
  if (!date || isNaN(date.getTime())) return "";

  const options: Intl.DateTimeFormatOptions = {
    timeZone: formatAsUTC ? "UTC" : undefined,
  };

  switch (dateFormat) {
    case "MM/DD/YYYY":
      options.month = "2-digit";
      options.day = "2-digit";
      options.year = "numeric";
      break;
    case "DD/MM/YYYY":
      options.day = "2-digit";
      options.month = "2-digit";
      options.year = "numeric";
      return new Intl.DateTimeFormat("en-GB", options).format(date);
    case "YYYY-MM-DD":
      return date.toISOString().split("T")[0];
    case "MMM DD, YYYY":
      options.month = "short";
      options.day = "2-digit";
      options.year = "numeric";
      break;
    default:
      options.month = "short";
      options.day = "2-digit";
      options.year = "numeric";
      break;
  }

  return new Intl.DateTimeFormat("en-US", options).format(date);
}

const NUMBER_VALUE_TYPES: ValueFormatType[] = ["currency", "percentage", "decimal", "number", "ratio"];

export const formatValue = (
  value: unknown,
  formatType: ValueFormatType = "text",
  options: FormatOptions = {}
): string => {
  const {
    currencyCode = undefined,
    numberFormat = "000s",
    decimals = 2,
    dateFormat = "MMM DD, YYYY",
    formatAsUTC = false,
    trim = true,
    placeholder = "",
  } = options;

  if (
    value === undefined ||
    value === null ||
    (typeof value === "number" && isNaN(value)) ||
    value === ""
  ) {
    return placeholder;
  }

  let val = value;
  if (typeof val === "string" && NUMBER_VALUE_TYPES.includes(formatType)) {
    const numValue = parseFloat(val);
    if (!isNaN(numValue)) val = numValue;
  }

  if (typeof val === "number" && val === 0 && formatType !== "percentage" && formatType !== "ratio") {
    return placeholder || "-";
  }

  if (val instanceof Date) {
    return formatDate(val, dateFormat, formatAsUTC);
  }

  const dec = decimals ?? 2;
  const shouldTrim = trim ?? true;

  switch (formatType) {
    case "currency": {
      if (typeof val === "number") {
        const currSymbol = currencyCode ? getCurrencySymbol(currencyCode) : "";
        const formatted =
          numberFormat === "Millions"
            ? `${formatToMillions(val, dec, shouldTrim)}M`
            : formatComma(val, dec, shouldTrim);
        return currSymbol ? `${currSymbol} ${formatted}` : formatted;
      }
      return String(val);
    }

    case "percentage":
      if (typeof val === "number") return formatPercentage(val, dec, shouldTrim);
      return String(val);

    case "decimal":
      if (typeof val === "number") {
        return numberFormat === "Millions"
          ? `${formatToMillions(val, dec, shouldTrim)}M`
          : formatNumber(val, dec, shouldTrim);
      }
      return String(val);

    case "number":
      if (typeof val === "number") {
        return numberFormat === "Millions"
          ? `${formatToMillions(val, dec, shouldTrim)}M`
          : formatComma(val, dec, shouldTrim);
      }
      return String(val);

    case "ratio":
      if (typeof val === "number") return `${formatNumber(val, dec, shouldTrim)}x`;
      return String(val);

    case "date":
      if (typeof val === "string") {
        const d = new Date(val);
        if (isNaN(d.getTime())) return placeholder;
        const isDateOnly = /^\d{4}-\d{2}-\d{2}$/.test(val);
        return formatDate(d, dateFormat, isDateOnly ? true : formatAsUTC);
      }
      return String(val);

    case "boolean":
      return val ? "Yes" : "No";

    case "text":
    default:
      return String(val);
  }
};

export const formatAndTrimValue = (
  value: unknown,
  valueType: ValueFormatType,
  formatOptions?: FormatOptions
): string => {
  if (valueType === "percentage" || valueType === "ratio") {
    return formatValue(value, valueType, {
      decimals: 2,
      trim: true,
      ...formatOptions,
    });
  }

  if (typeof value === "number" || (typeof value === "string" && !isNaN(Number(value)))) {
    const numValue = typeof value === "number" ? value : Number(value);
    const isSmallNumber = Math.abs(numValue) < 10000;
    const autoNumberFormat = isSmallNumber ? "000s" : (formatOptions?.numberFormat || "000s");
    const autoDecimals = autoNumberFormat === "000s" && !isSmallNumber ? 0 : 2;
    const hasDecimals = numValue % 1 !== 0;

    return formatValue(value, valueType, {
      numberFormat: autoNumberFormat,
      decimals: autoDecimals,
      trim: !autoDecimals || !hasDecimals,
      ...formatOptions,
    });
  }

  return formatValue(value, valueType, formatOptions);
};
