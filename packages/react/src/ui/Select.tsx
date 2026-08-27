import React, {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown, Icon, Plus, X } from "react-feather";

import Spinner from "~/ui/Spinner";
import { cn } from "~/utils/tailwind";

export interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectRef extends HTMLDivElement {
  validate: () => boolean;
}

interface SelectPropsBase<T> {
  id?: string;
  name?: string;
  label?: React.ReactNode;
  placeholder?: string;
  errorMessage?: string;
  noResultsMessage?: string;
  allSelectedMessage?: string;
  required?: boolean;
  loading?: boolean;
  invalid?: boolean;
  /** Class applied to the outer border/combobox wrapper */
  className?: string;
  /** Class applied to the relative container div */
  containerClassName?: string;
  /** Class applied to the search input element */
  inputClassName?: string;
  /** Class applied to the dropdown list */
  listClassName?: string;
  disabled?: boolean;
  disabledOptions?: string[];
  searchable?: boolean;
  showClearButton?: boolean;
  isMulti?: boolean;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  options?: T[];
  renderOption?: (option: T) => React.ReactNode;
  onAddNew?: (value: string) => Promise<void> | void;
  /**
   * When true, the user may commit any typed string as the value even if it
   * doesn't match an option. On blur the current search term is written via
   * onChange.
   */
  allowCustomValue?: boolean;
  filterFunction?: (option: T, searchTerm: string) => boolean;
  labelKey?: T extends Option ? "label" : keyof T;
  valueKey?: T extends Option ? "value" : keyof T;
  /** Called on every keystroke; useful for async / server-side filtering. */
  onSearchChange?: (searchTerm: string) => Promise<any[] | void> | any[] | void;
  /**
   * The document (or ShadowRoot) to attach click-outside listeners to and
   * to portal the dropdown into.  Defaults to the global `document`.
   */
  mountDocument?: ShadowRoot | Document;
  /** Maximum number of selected-option chips to show before collapsing into "+N". */
  maxVisibleOptions?: number;
  /**
   * When true the dropdown list is rendered via a React portal so it can
   * escape overflow/z-index clipping.  Requires `mountDocument`.
   */
  usePortal?: boolean;
  /** Icon component rendered as a prefix inside the input area (Doc 1 feature). */
  prefixIcon?: Icon;
}

type SelectProps<T = Option> = SelectPropsBase<T>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getScrollParents(element: HTMLElement | null): (Element | Window)[] {
  const parents: (Element | Window)[] = [];
  let parent = element?.parentElement ?? null;

  while (parent) {
    const style = getComputedStyle(parent);
    const overflow = `${style.overflow} ${style.overflowX} ${style.overflowY}`;
    if (/(auto|scroll|overlay)/.test(overflow)) parents.push(parent);
    parent = parent.parentElement;
  }

  parents.push(window);
  return parents;
}

function useClickOutside(
  mountDoc: ShadowRoot | Document,
  ref: React.RefObject<HTMLElement>,
  handler: () => void,
  isActive: boolean,
  ignoreRefs: Array<React.RefObject<HTMLElement>> = []
) {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!isActive) return;

    const listener = (event: MouseEvent | TouchEvent) => {
      if (ref.current?.contains(event.target as Node)) return;
      if (ignoreRefs.some((r) => r.current?.contains(event.target as Node))) return;
      handlerRef.current();
    };

    mountDoc.addEventListener("mousedown", listener);
    mountDoc.addEventListener("touchstart", listener);

    return () => {
      mountDoc.removeEventListener("mousedown", listener);
      mountDoc.removeEventListener("touchstart", listener);
    };
  }, [mountDoc, ref, isActive, ignoreRefs]);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const Select = forwardRef(function Select<T = Option>(
  props: SelectProps<T>,
  ref: React.ForwardedRef<SelectRef>
) {
  const {
    options = [],
    placeholder = "Search...",
    label,
    required = false,
    name,
    errorMessage,
    loading = false,
    noResultsMessage = "No results found",
    allSelectedMessage = "All options selected",
    disabled = false,
    disabledOptions = [],
    showClearButton = false,
    renderOption,
    onAddNew,
    allowCustomValue = false,
    searchable = true,
    className,
    containerClassName,
    inputClassName,
    listClassName,
    filterFunction,
    labelKey = "label" as keyof T,
    valueKey = "value" as keyof T,
    mountDocument: mountDocProp,
    maxVisibleOptions = 3,
    usePortal = false,
    prefixIcon: PrefixIcon,
  } = props;

  // Resolve mountDocument — fall back to the global document when not provided.
  const mountDocument: ShadowRoot | Document =
    mountDocProp ?? (typeof document !== "undefined" ? document : ({} as Document));

  const allowAddNew = !!onAddNew;
  const isMulti = props.isMulti === true;
  const value = isMulti
    ? ((props.value as string[] | undefined) ?? [])
    : (props.value as string | null);
  const onChange = props.onChange;

  const id = props.id || useId();

  // -------------------------------------------------------------------------
  // State
  // -------------------------------------------------------------------------
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [addNewError, setAddNewError] = useState<string | null>(null);
  const [invalid, setInvalid] = useState(props.invalid || false);
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
    width: number;
    openUpward: boolean;
    height: number;
  } | null>(null);

  // -------------------------------------------------------------------------
  // Refs
  // -------------------------------------------------------------------------
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const justSelected = useRef(false);

  // -------------------------------------------------------------------------
  // Imperative handle
  // -------------------------------------------------------------------------
  useImperativeHandle(
    ref,
    () =>
      ({
        ...containerRef.current!,
        validate: () => {
          if (required) {
            const hasValue = isMulti ? (value as string[]).length > 0 : !!value;
            setInvalid(!hasValue);
            return hasValue;
          }
          setInvalid(false);
          return true;
        },
      }) as SelectRef
  );

  // -------------------------------------------------------------------------
  // Derived helpers
  // -------------------------------------------------------------------------
  const getOptionValue = (option: T): string => String(option[valueKey as keyof T]);
  const getOptionLabel = (option: T): string => String(option[labelKey as keyof T]);

  const valueArray = useMemo(
    () => (isMulti ? (value as string[]) : value ? [value as string] : []),
    [value, isMulti]
  );

  const selectedOptions = useMemo(
    () => options.filter((o) => valueArray.includes(getOptionValue(o))),
    [options, valueArray]
  );

  const selectedOption = useMemo(() => selectedOptions[0] || null, [selectedOptions]);

  const displayValue = useMemo(() => {
    if (!isMulti && selectedOption) {
      return isOpen ? searchTerm || getOptionLabel(selectedOption) : getOptionLabel(selectedOption);
    }
    return searchTerm;
  }, [isMulti, selectedOption, isOpen, searchTerm]);

  const displayPlaceholder = useMemo(() => {
    if (isMulti) return selectedOptions.length ? "" : placeholder;
    return selectedOption ? "" : placeholder;
  }, [isMulti, selectedOptions.length, selectedOption, placeholder]);

  const filterOptions = useCallback(() => {
    if (!searchTerm || !searchable) return options;
    return options.filter((option) => {
      if (filterFunction) return filterFunction(option, searchTerm);
      return getOptionLabel(option).toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [options, searchTerm, searchable, filterFunction]);

  const filteredOptions = useMemo(() => filterOptions(), [filterOptions]);

  const visibleOptions = useMemo(() => {
    if (!isMulti || selectedOptions.length <= maxVisibleOptions) return selectedOptions;
    return selectedOptions.slice(0, maxVisibleOptions);
  }, [isMulti, selectedOptions, maxVisibleOptions]);

  const hiddenOptionsCount = useMemo(() => {
    if (!isMulti || selectedOptions.length <= maxVisibleOptions) return 0;
    return selectedOptions.length - maxVisibleOptions;
  }, [isMulti, selectedOptions.length, maxVisibleOptions]);

  const isOptionDisabled = useCallback(
    (option: T): boolean =>
      ("disabled" in (option as Option) && !!(option as Option).disabled) ||
      disabledOptions.includes(getOptionValue(option)),
    [disabledOptions]
  );

  // -------------------------------------------------------------------------
  // Reset / close
  // -------------------------------------------------------------------------
  const resetState = useCallback(() => {
    if (allowCustomValue && searchTerm && !justSelected.current && !isMulti) {
      (onChange as (value: string) => void)(searchTerm);
    }
    if (justSelected.current || !allowCustomValue || !searchTerm) {
      setSearchTerm("");
    }
    setIsOpen(false);
    setHighlightedIndex(-1);
    justSelected.current = false;
  }, [allowCustomValue, isMulti, searchTerm, onChange]);

  useClickOutside(
    mountDocument,
    containerRef,
    resetState,
    isOpen,
    usePortal ? [listRef] : []
  );

  // -------------------------------------------------------------------------
  // Portal dropdown positioning
  // -------------------------------------------------------------------------
  const updateDropdownPosition = useCallback(() => {
    if (!usePortal || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const dropdownHeight = listRef.current?.offsetHeight ?? 240;
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;
    const openUpward = spaceBelow < dropdownHeight && spaceAbove > spaceBelow;

    setDropdownPosition({
      top: openUpward ? rect.top : rect.bottom,
      left: rect.left,
      width: rect.width,
      height: dropdownHeight,
      openUpward,
    });
  }, [usePortal]);

  useEffect(() => {
    if (usePortal && isOpen) requestAnimationFrame(updateDropdownPosition);
  }, [filteredOptions.length, isOpen, usePortal, updateDropdownPosition]);

  useEffect(() => {
    if (!usePortal || !isOpen) {
      setDropdownPosition(null);
      return;
    }

    updateDropdownPosition();

    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateDropdownPosition);
    };

    const scrollParents = getScrollParents(containerRef.current);
    scrollParents.forEach((p) => p.addEventListener("scroll", handleScroll, { passive: true }));
    window.addEventListener("resize", handleScroll);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      scrollParents.forEach((p) => p.removeEventListener("scroll", handleScroll));
      window.removeEventListener("resize", handleScroll);
    };
  }, [isOpen, usePortal, updateDropdownPosition]);

  // Portal scroll-blocking overlay
  useEffect(() => {
    if (!usePortal || !isOpen) return;

    const overlayElement = overlayRef.current;
    const blockScroll = (e: Event) => { e.preventDefault(); e.stopPropagation(); };

    if (overlayElement) {
      overlayElement.addEventListener("wheel", blockScroll, { passive: false });
      overlayElement.addEventListener("touchmove", blockScroll, { passive: false });
    }

    const ownerDoc =
      mountDocument instanceof ShadowRoot
        ? mountDocument.ownerDocument
        : (mountDocument as Document);

    const blockBodyScroll = (e: Event) => {
      if (listRef.current?.contains(e.target as Node)) return;
      e.preventDefault();
    };
    ownerDoc.addEventListener("wheel", blockBodyScroll, { passive: false, capture: true });
    ownerDoc.addEventListener("touchmove", blockBodyScroll, { passive: false, capture: true });

    return () => {
      if (overlayElement) {
        overlayElement.removeEventListener("wheel", blockScroll);
        overlayElement.removeEventListener("touchmove", blockScroll);
      }
      ownerDoc.removeEventListener("wheel", blockBodyScroll, { capture: true } as EventListenerOptions);
      ownerDoc.removeEventListener("touchmove", blockBodyScroll, { capture: true } as EventListenerOptions);
    };
  }, [isOpen, usePortal, mountDocument]);

  // -------------------------------------------------------------------------
  // Sync external invalid prop
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (props.invalid !== undefined) setInvalid(props.invalid);
  }, [props.invalid]);

  // -------------------------------------------------------------------------
  // Keyboard scroll-to-highlighted
  // -------------------------------------------------------------------------
  useEffect(() => {
    justSelected.current = false;
  }, [options.length]);

  useEffect(() => {
    let initialIndex = -1;
    const selectedValue = valueArray.length > 0 ? valueArray[valueArray.length - 1] : null;

    if (selectedValue) {
      const idx = filteredOptions.findIndex((o) => getOptionValue(o) === selectedValue);
      initialIndex = idx >= 0 ? idx : 0;
    } else if (filteredOptions.length > 0) {
      initialIndex = 0;
    } else if (allowAddNew && searchTerm) {
      initialIndex = 0;
    }

    if (isOpen && filteredOptions.length > 0 && highlightedIndex >= filteredOptions.length) {
      initialIndex = 0;
    }

    setHighlightedIndex(initialIndex);
  }, [isOpen, filteredOptions, valueArray, allowAddNew]);

  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && listRef.current) {
      const safeId = `id-${CSS.escape(id)}-option-${highlightedIndex}`;
      const el = listRef.current.querySelector(`[data-option-id="${safeId}"]`);
      if (el) requestAnimationFrame(() => el.scrollIntoView({ block: "nearest" }));
    }
  }, [highlightedIndex, isOpen, id]);

  // -------------------------------------------------------------------------
  // Interaction handlers
  // -------------------------------------------------------------------------
  const selectOption = (option: T) => {
    if (disabled || isOptionDisabled(option)) return;

    justSelected.current = true;
    const optionValue = getOptionValue(option);

    if (isMulti) {
      const cur = value as string[];
      const newValues = cur.includes(optionValue)
        ? cur.filter((v) => v !== optionValue)
        : [...cur, optionValue];
      (onChange as (v: string[]) => void)(newValues);
    } else {
      (onChange as (v: string | null) => void)(optionValue);
    }

    setSearchTerm("");

    if (!isMulti) {
      setIsOpen(false);
      setTimeout(() => inputRef.current?.focus(), 10);
    } else {
      inputRef.current?.focus();
    }
  };

  const removeOption = (optionValue: string, event?: React.MouseEvent) => {
    if (disabled) return;
    event?.stopPropagation();

    if (isMulti) {
      const newValues = (value as string[]).filter((v) => v !== optionValue);
      (onChange as (v: string[]) => void)(newValues);
      if (newValues.length === 0 && !isOpen) setIsOpen(true);
    } else {
      (onChange as (v: string | null) => void)(null);
      if (!isOpen) setIsOpen(true);
    }

    justSelected.current = false;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || !searchable) return;
    const newValue = e.target.value;
    setSearchTerm(newValue);
    props.onSearchChange?.(newValue);
    if (!isOpen) {
      setIsOpen(true);
      if (newValue) setHighlightedIndex(0);
    }
  };

  const handleInputFocus = () => {
    if (disabled) return;
    if (!justSelected.current) {
      setIsOpen(true);
      if (!isMulti && selectedOption && searchable) setSearchTerm("");
    }
  };

  const clearAllOptions = (event?: React.MouseEvent) => {
    if (disabled) return;
    event?.stopPropagation();
    if (isMulti) {
      (onChange as (v: string[]) => void)([]);
    } else {
      (onChange as (v: string | null) => void)(null);
    }
    setSearchTerm("");
    setIsOpen(true);
    inputRef.current?.focus();
  };

  const toggleSelectDropdown = (event?: React.MouseEvent) => {
    if (disabled) return;
    const isInputClick = event?.target === inputRef.current;
    if (isInputClick && isOpen) return;
    const next = !isOpen;
    setIsOpen(next);
    if (next) inputRef.current?.focus();
  };

  const getEmptyMessage = () => {
    if (loading) return "Loading options...";
    if (filteredOptions.length === 0 && searchTerm && !allowAddNew && !allowCustomValue)
      return noResultsMessage;
    if (filteredOptions.length === 0 && !searchTerm) return allSelectedMessage;
    return null;
  };

  const addNewOption = async (val: string) => {
    if (!onAddNew || !val.trim()) return;
    setAddNewError(null);
    setIsAddingNew(true);
    try {
      await onAddNew(val);
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Failed to add new item";
      setAddNewError(`${searchTerm}: ${msg}`);
    } finally {
      setIsAddingNew(false);
      setSearchTerm("");
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (!isOpen && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      e.preventDefault();
      setIsOpen(true);
      if (filteredOptions.length > 0) {
        setHighlightedIndex(e.key === "ArrowDown" ? 0 : filteredOptions.length - 1);
      }
      return;
    }

    if (e.key === "Backspace" && searchTerm === "" && valueArray.length > 0) {
      e.preventDefault();
      removeOption(valueArray[valueArray.length - 1]);
      return;
    }

    if (!isOpen) return;

    const hasAddNewOption = allowAddNew && searchTerm;
    const total = hasAddNewOption ? filteredOptions.length + 1 : filteredOptions.length;

    switch (e.key) {
      case "ArrowDown":
        if (total) {
          e.preventDefault();
          setHighlightedIndex((prev) => (prev < total - 1 ? prev + 1 : 0));
        }
        break;

      case "ArrowUp":
        if (total) {
          e.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : total - 1));
        }
        break;

      case "Enter":
        if (total) {
          e.preventDefault();
          if (hasAddNewOption && highlightedIndex === filteredOptions.length) {
            addNewOption(searchTerm);
          } else if (highlightedIndex !== -1 && highlightedIndex < filteredOptions.length) {
            selectOption(filteredOptions[highlightedIndex]);
          }
        }
        break;

      case "Escape":
        e.preventDefault();
        e.stopPropagation();
        inputRef.current?.blur();
        break;
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (
        containerRef.current &&
        !containerRef.current.contains(mountDocument.activeElement)
      ) {
        resetState();
      }
    }, 10);
  };

  const dismissError = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAddNewError(null);
  };

  const showClearIcon = !disabled && showClearButton && (valueArray.length > 0 || searchTerm);

  // -------------------------------------------------------------------------
  // Portal overlay
  // -------------------------------------------------------------------------
  const overlayContent = useMemo(() => {
    if (!usePortal || !isOpen) return null;

    return (
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9998] bg-transparent"
        style={{ touchAction: "none" }}
        aria-hidden="true"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => { e.preventDefault(); e.stopPropagation(); }}
        onTouchMove={(e) => { e.preventDefault(); e.stopPropagation(); }}
      />
    );
  }, [isOpen, usePortal]);

  // -------------------------------------------------------------------------
  // Dropdown list
  // -------------------------------------------------------------------------
  const dropdownContent = useMemo(() => {
    if (!isOpen || disabled) return null;
    if (allowCustomValue && filteredOptions.length === 0 && searchTerm) return null;

    return (
      <ul
        ref={listRef}
        id={`${id}-options`}
        onMouseDown={(e) => e.preventDefault()}
        className={cn(
          "max-h-60 overflow-auto rounded-md bg-white py-1 text-sm shadow-lg space-y-0.5 border border-neutral-200",
          usePortal ? "fixed z-[9999]" : "absolute z-20 w-full",
          listClassName
        )}
        style={
          usePortal && dropdownPosition
            ? {
                left: `${dropdownPosition.left}px`,
                width: `${dropdownPosition.width}px`,
                ...(dropdownPosition.openUpward
                  ? { bottom: `${window.innerHeight - dropdownPosition.top}px` }
                  : { top: `${dropdownPosition.top}px` }),
              }
            : undefined
        }
        role="listbox"
        aria-multiselectable={isMulti}
        tabIndex={-1}
      >
        {loading ? (
          <li className="relative cursor-default select-none py-2 px-3 text-neutral-500 flex items-center gap-2">
            <Spinner />
            Loading options...
          </li>
        ) : (
          <>
            {getEmptyMessage() && filteredOptions.length === 0 && !allowAddNew ? (
              <li className="relative cursor-default select-none py-2 px-3 text-neutral-500">
                {getEmptyMessage()}
              </li>
            ) : (
              filteredOptions.map((option, index) => {
                const isSelected = valueArray.includes(getOptionValue(option));
                const isHighlighted = index === highlightedIndex;
                const isDisabled = isOptionDisabled(option);
                const optionId = `id-${CSS.escape(id)}-option-${index}`;

                return (
                  <li
                    key={`option-${getOptionValue(option)}`}
                    id={optionId}
                    data-option-id={optionId}
                    onClick={() => !isDisabled && selectOption(option)}
                    onMouseEnter={() => !isDisabled && setHighlightedIndex(index)}
                    className={cn(
                      "relative select-none py-2 px-3",
                      isDisabled ? "cursor-not-allowed text-neutral-400" : "cursor-pointer",
                      isSelected
                        ? isHighlighted
                          ? "bg-blue-100 text-blue-900"
                          : "bg-blue-50 text-blue-900"
                        : isHighlighted
                        ? "bg-neutral-200 text-neutral-800"
                        : "text-neutral-900 hover:bg-neutral-50"
                    )}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={isDisabled}
                  >
                    <div className="flex items-center justify-between">
                      <span>{renderOption ? renderOption(option) : getOptionLabel(option)}</span>
                      {isSelected && <Check className="w-4" />}
                    </div>
                  </li>
                );
              })
            )}

            {allowAddNew && searchTerm && (
              <li
                id={`id-${id}-option-${filteredOptions.length}`}
                data-option-id={`id-${CSS.escape(id)}-option-${filteredOptions.length}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isAddingNew) addNewOption(searchTerm);
                }}
                onMouseEnter={() => setHighlightedIndex(filteredOptions.length)}
                className={cn(
                  "relative select-none py-2 px-3",
                  isAddingNew ? "cursor-wait" : "cursor-pointer",
                  highlightedIndex === filteredOptions.length
                    ? "bg-neutral-200 text-neutral-800"
                    : "text-neutral-900 hover:bg-neutral-50"
                )}
                role="option"
                aria-selected={highlightedIndex === filteredOptions.length}
              >
                <div className="flex items-center gap-2">
                  {isAddingNew ? <Spinner /> : <Plus size={16} className="mr-2" />}
                  <span>{isAddingNew ? "Adding..." : `Add "${searchTerm}"`}</span>
                </div>
              </li>
            )}
          </>
        )}
      </ul>
    );
  }, [
    allowAddNew,
    allowCustomValue,
    disabled,
    dropdownPosition,
    filteredOptions,
    highlightedIndex,
    id,
    isAddingNew,
    isMulti,
    isOpen,
    isOptionDisabled,
    listClassName,
    loading,
    usePortal,
    renderOption,
    searchTerm,
    valueArray,
  ]);

  // -------------------------------------------------------------------------
  // Portal mount target
  // -------------------------------------------------------------------------
  const portalTarget = useMemo(() => {
    if (!usePortal || !mountDocument) return null;
    return mountDocument instanceof ShadowRoot ? mountDocument : mountDocument.body;
  }, [usePortal, mountDocument]);

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-medium text-gray-700 mb-1"
          id={`${id}-label`}
        >
          {label}{" "}
          {required && typeof label === "string" && <span className="text-red-500">*</span>}
        </label>
      )}

      <div ref={containerRef} className={cn("relative", containerClassName)}>
        <div
          className={cn(
            "border rounded-md",
            invalid ? "border-red-500" : "border-neutral-300",
            disabled || isAddingNew
              ? "bg-neutral-100 cursor-not-allowed"
              : "bg-white focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500",
            className
          )}
          onClick={(e) => toggleSelectDropdown(e)}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={`${id}-options`}
          aria-labelledby={`${id}-label`}
          aria-busy={loading}
          aria-disabled={disabled}
        >
          <div className="flex flex-wrap items-center gap-1 p-2 pr-8">
            {/* Prefix icon (Doc 1) */}
            {PrefixIcon && (
              <PrefixIcon className="mr-2 flex items-center text-gray-700 w-4 h-4" />
            )}

            {/* Multi-select chips */}
            {isMulti && (
              <>
                {visibleOptions.map((option) => (
                  <div
                    key={`selected-${getOptionValue(option)}`}
                    className={cn(
                      "inline-flex items-center rounded-full px-2 py-1 text-xs",
                      disabled ? "bg-neutral-200 text-neutral-500" : "bg-blue-100 text-blue-800"
                    )}
                  >
                    {getOptionLabel(option)}
                    {!disabled && (
                      <button
                        type="button"
                        onClick={(e) => removeOption(getOptionValue(option), e)}
                        className="ml-1 text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        tabIndex={-1}
                        aria-label={`Remove ${getOptionLabel(option)}`}
                      >
                        <X size={12} />
                      </button>
                    )}
                  </div>
                ))}

                {hiddenOptionsCount > 0 && (
                  <div
                    className={cn(
                      "inline-flex items-center rounded-full px-2 py-1 text-xs",
                      disabled ? "bg-neutral-200 text-neutral-500" : "bg-blue-100 text-blue-800"
                    )}
                  >
                    +{hiddenOptionsCount}
                  </div>
                )}
              </>
            )}

            {/* Add-new error chip */}
            {addNewError && (
              <div className="inline-flex items-center rounded-full px-2 py-1 text-xs bg-red-100 text-red-800">
                <span className="truncate max-w-[200px]">{addNewError}</span>
                <button
                  type="button"
                  onClick={dismissError}
                  className="ml-1 text-red-600 hover:text-red-800 focus:outline-none focus:ring-1 focus:ring-red-500"
                  tabIndex={-1}
                  aria-label="Dismiss error"
                >
                  <X size={12} />
                </button>
              </div>
            )}

            {/* Input or static display */}
            {searchable ? (
              <input
                ref={inputRef}
                type="text"
                id={id}
                name={name}
                value={displayValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={handleInputFocus}
                onBlur={handleBlur}
                placeholder={displayPlaceholder}
                className={cn(
                  "flex-1 min-w-[60px] border-0 focus:ring-0 p-0 text-sm focus:bg-transparent bg-transparent focus:outline-none focus:shadow-none",
                  (disabled || isAddingNew) && "bg-neutral-100 text-neutral-500 cursor-not-allowed",
                  inputClassName
                )}
                autoComplete="off"
                aria-autocomplete="list"
                aria-activedescendant={
                  highlightedIndex >= 0 ? `id-${id}-option-${highlightedIndex}` : undefined
                }
                aria-invalid={invalid}
                required={required}
                disabled={disabled || isAddingNew}
              />
            ) : (
              <div
                className={cn(
                  "flex-1 min-w-[60px] p-0 text-sm",
                  disabled ? "text-neutral-500" : "text-neutral-900"
                )}
              >
                {!isMulti && selectedOption ? (
                  <span>{getOptionLabel(selectedOption)}</span>
                ) : isMulti && selectedOptions.length === 0 ? (
                  <span className="text-neutral-400">{placeholder}</span>
                ) : null}
              </div>
            )}
          </div>

          {/* Trailing icon: spinner / clear / chevron */}
          <div className="absolute right-2 inset-y-0 flex items-center">
            {isAddingNew || loading ? (
              <Spinner />
            ) : (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showClearIcon ? clearAllOptions(e) : toggleSelectDropdown(e);
                }}
                className={cn(
                  "text-neutral-400 p-1 focus:outline-none focus:ring-1 focus:ring-blue-500",
                  disabled ? "opacity-50 cursor-not-allowed" : "hover:text-neutral-600"
                )}
                aria-label={
                  showClearIcon ? "Clear" : isOpen ? "Close dropdown" : "Open dropdown"
                }
                disabled={disabled}
                tabIndex={-1}
              >
                {showClearIcon ? (
                  <X size={16} />
                ) : (
                  <ChevronDown size={16} className={isOpen ? "transform rotate-180" : ""} />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Portal overlay + dropdown OR inline dropdown */}
        {portalTarget ? (
          <>
            {overlayContent && createPortal(overlayContent, portalTarget)}
            {dropdownContent && createPortal(dropdownContent, portalTarget)}
          </>
        ) : (
          dropdownContent
        )}
      </div>

      {invalid && errorMessage && (
        <p className="mt-1 text-xs text-red-600" id={`${id}-error`}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}) as <T = Option>(
  props: SelectProps<T> & { ref?: React.ForwardedRef<SelectRef> }
) => React.JSX.Element;

export default Select;