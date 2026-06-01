import type { FormatOptions, ValueFormatType } from "../types";

// ============================================================================
// FORMATTING UTILITIES
// ============================================================================

/**
 * Get currency symbol for a given currency code using Intl API
 */
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

/**
 * Format a number with commas (thousands separator)
 */
function formatComma(value: number, decimals: number = 2, trim: boolean = true): string {
  const formatted = new Intl.NumberFormat("en", {
    minimumFractionDigits: trim ? 0 : decimals,
    maximumFractionDigits: decimals,
  }).format(value);
  return formatted;
}

/**
 * Format a number without commas
 */
function formatNumber(value: number, decimals: number = 2, trim: boolean = true): string {
  const fixed = value.toFixed(decimals);
  if (trim) {
    return parseFloat(fixed).toString();
  }
  return fixed;
}

/**
 * Format a number as millions (e.g., 1,500,000 → "1.5M")
 */
function formatToMillions(value: number, decimals: number = 2, trim: boolean = true): string {
  const millions = value / 1_000_000;
  return formatNumber(millions, decimals, trim);
}

/**
 * Format a number as percentage (e.g., 0.15 → "15%")
 */
function formatPercentage(value: number, decimals: number = 2, trim: boolean = true): string {
  const pct = value * 100;
  return `${formatNumber(pct, decimals, trim)}%`;
}

/**
 * Format a Date to string using Intl.DateTimeFormat
 */
function formatDate(
  date: Date,
  dateFormat?: string | null,
  formatAsUTC?: boolean | null
): string {
  if (!date || isNaN(date.getTime())) return "";

  const options: Intl.DateTimeFormatOptions = {
    timeZone: formatAsUTC ? "UTC" : undefined,
  };

  // Simple format mapping
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

// ============================================================================
// MAIN FORMAT FUNCTION
// ============================================================================

const NUMBER_VALUE_TYPES: ValueFormatType[] = ["currency", "percentage", "decimal", "number", "ratio"];

/**
 * Format a value according to its type and options.
 * Returns a formatted string representation.
 */
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

  // Convert string numbers if numeric format
  let val = value;
  if (typeof val === "string" && NUMBER_VALUE_TYPES.includes(formatType)) {
    const numValue = parseFloat(val);
    if (!isNaN(numValue)) val = numValue;
  }

  // Zero handling — show placeholder (but not for percentage/ratio where 0 is meaningful)
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
        return !isNaN(d.getTime()) ? formatDate(d, dateFormat, formatAsUTC) : placeholder;
      }
      return String(val);

    case "boolean":
      return val ? "Yes" : "No";

    case "text":
    default:
      return String(val);
  }
};

/**
 * Smart format that adjusts decimals and number format based on value magnitude.
 * Useful for financial grids where values range from small to millions.
 */
export const formatAndTrimValue = (
  value: unknown,
  valueType: ValueFormatType,
  formatOptions?: FormatOptions
): string => {
  // For percentage and ratio, don't apply "smart" magnitude-based adjustments
  // since the raw values are typically small decimals (e.g., 0.15 = 15%)
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
    const numberFormat = isSmallNumber ? "000s" : (formatOptions?.numberFormat || "000s");
    const decimals = numberFormat === "000s" && !isSmallNumber ? 0 : 2;
    const hasDecimals = numValue % 1 !== 0;

    return formatValue(value, valueType, {
      ...formatOptions,
      numberFormat,
      decimals,
      trim: !decimals || !hasDecimals,
    });
  }

  return formatValue(value, valueType, formatOptions);
};
