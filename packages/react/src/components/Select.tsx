import { Check, ChevronDown, Plus, X } from "lucide-react";
import React, { forwardRef, useCallback, useEffect, useId, useImperativeHandle, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import Spinner from "./Spinner";

import { cn } from "../utils/tailwind";

import type { IconComponent } from "../types";

export interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

export type SelectOption = Option;

export interface SelectRef extends HTMLDivElement {
  validate: () => boolean;
}

interface SelectPropsBase<T> {
  id?: string;
  name?: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  placeholder?: string;
  errorMessage?: string;
  noResultsMessage?: string;
  addNewMessage?: string;
  allSelectedMessage?: string;
  required?: boolean;
  loading?: boolean;
  invalid?: boolean;
  className?: string;
  containerClassName?: string;
  inputClassName?: string;
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
  allowCustomValue?: boolean;
  filterFunction?: (option: T, searchTerm: string) => boolean;
  labelKey?: T extends Option ? "label" : keyof T;
  valueKey?: T extends Option ? "value" : keyof T;
  prefixIcon?: IconComponent;
  onSearchChange?: (searchTerm: string) => Promise<unknown[] | void> | unknown[] | void;
  mountDocument?: ShadowRoot | Document;
  maxVisibleOptions?: number;
  usePortal?: boolean;
}

type SelectProps<T = Option> = SelectPropsBase<T>;

function useClickOutside(
  mountDocument: ShadowRoot | Document,
  ref: React.RefObject<HTMLElement>,
  handler: () => void,
  isActive: boolean,
  ignoreRefs: Array<React.RefObject<HTMLElement>> = []
) {
  const handlerRef = useRef(handler);

  // Keep the handler ref up to date
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!isActive) return;

    const listener = (event: Event) => {
      // If click is inside the element, do nothing
      if (ref.current && ref.current.contains(event.target as Node)) {
        return;
      }
      if (ignoreRefs.some((ignoredRef) => ignoredRef.current && ignoredRef.current.contains(event.target as Node))) {
        return;
      }
      // Click is outside - call the handler
      handlerRef.current();
    };
    mountDocument.addEventListener("mousedown", listener);
    mountDocument.addEventListener("touchstart", listener);

    return () => {
      mountDocument.removeEventListener("mousedown", listener);
      mountDocument.removeEventListener("touchstart", listener);
    };
  }, [mountDocument, ref, isActive, ignoreRefs]);
}

function getScrollParents(element: HTMLElement | null): (Element | Window)[] {
  const parents: (Element | Window)[] = [];
  let parent = element?.parentElement ?? null;

  while (parent) {
    const style = getComputedStyle(parent);
    const overflow = `${style.overflow} ${style.overflowX} ${style.overflowY}`;

    if (/(auto|scroll|overlay)/.test(overflow)) {
      parents.push(parent);
    }

    parent = parent.parentElement;
  }

  parents.push(window);
  return parents;
}

const Select = forwardRef(function Select<T = Option>(props: SelectProps<T>, ref: React.ForwardedRef<SelectRef>) {
  const {
    options = [],
    placeholder = "Search...",
    label,
    description,
    required = false,
    name,
    errorMessage,
    loading = false,
    noResultsMessage = "No results found",
    addNewMessage = "Type to add new",
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
    prefixIcon: PrefixIcon,
    mountDocument,
    maxVisibleOptions = 3
  } = props;

  const allowAddNew = !!onAddNew;

  const isMulti = props.isMulti === true;
  const value = isMulti ? ((props.value as string[] | undefined) ?? []) : (props.value as string | null);
  const onChange = props.onChange;

  const generatedId = useId();
  const id = props.id || generatedId;

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [addNewError, setAddNewError] = useState<string | null>(null);
  const [invalid, setInvalid] = useState(props.invalid || false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const justSelected = useRef(false);
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
    width: number;
    openUpward: boolean;
    height: number;
  } | null>(null);

  useImperativeHandle(ref, () => {
    const validate = () => {
      if (required) {
        const hasValue = isMulti ? (value as string[]).length > 0 : !!value;
        setInvalid(!hasValue);
        return hasValue;
      }
      setInvalid(false);
      return true;
    };
    const node = containerRef.current;
    if (!node) return { validate } as SelectRef;
    Object.defineProperty(node, "validate", { value: validate, configurable: true });
    return node as SelectRef;
  });

  const getOptionValue = (option: T): string => {
    return String(option[valueKey as keyof T]);
  };

  const getOptionLabel = (option: T): string => {
    return String(option[labelKey as keyof T]);
  };

  const valueArray = useMemo(() => {
    return isMulti ? (value as string[]) : value ? [value as string] : [];
  }, [value, isMulti]);

  const selectedOptions = useMemo(() => {
    return options.filter((option) => valueArray.includes(getOptionValue(option)));
  }, [options, valueArray]);

  const selectedOption = useMemo(() => selectedOptions[0] || null, [selectedOptions]);

  const displayValue = useMemo(() => {
    if (!isMulti && selectedOption) {
      return isOpen ? searchTerm || getOptionLabel(selectedOption) : getOptionLabel(selectedOption);
    }
    return searchTerm;
  }, [isMulti, selectedOption, isOpen, searchTerm]);

  const displayPlaceholder = useMemo(() => {
    if (isMulti) {
      return selectedOptions.length ? "" : placeholder;
    }
    return selectedOption ? "" : placeholder;
  }, [isMulti, selectedOptions.length, selectedOption, placeholder]);

  const filterOptions = useCallback(() => {
    if (!searchTerm || !searchable) return options;

    return options.filter((option) => {
      if (filterFunction) {
        return filterFunction(option, searchTerm);
      }
      const label = getOptionLabel(option);
      return label.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [options, searchTerm, searchable]);

  const filteredOptions = useMemo(() => filterOptions(), [filterOptions]);

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

  useClickOutside(mountDocument ?? document, containerRef, resetState, isOpen, props.usePortal ? [listRef] : []);

  const updateDropdownPosition = useCallback(() => {
    if (!props.usePortal || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const dropdownHeight = listRef?.current?.offsetHeight ?? 240; // matches max-h-60
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    const openUpward = spaceBelow < dropdownHeight && spaceAbove > spaceBelow;

    setDropdownPosition({
      top: openUpward ? rect.top : rect.bottom,
      left: rect.left,
      width: rect.width,
      height: dropdownHeight,
      openUpward
    });
  }, [props.usePortal]);

  useEffect(() => {
    if (props.usePortal && isOpen) {
      requestAnimationFrame(updateDropdownPosition);
    }
  }, [filteredOptions.length, isOpen, props.usePortal, updateDropdownPosition]);

  useEffect(() => {
    if (!props.usePortal || !isOpen) {
      setDropdownPosition(null);
      return;
    }

    updateDropdownPosition();

    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(updateDropdownPosition);
    };
    const handleResize = () => handleScroll();

    const scrollParents = getScrollParents(containerRef.current);
    scrollParents.forEach((parent) => {
      parent.addEventListener("scroll", handleScroll, { passive: true });
    });
    window.addEventListener("resize", handleResize);

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      scrollParents.forEach((parent) => {
        parent.removeEventListener("scroll", handleScroll);
      });
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, props.usePortal, updateDropdownPosition]);

  useEffect(() => {
    if (!props.usePortal || !isOpen) return;

    // Overlay scroll blocking
    const overlayElement = overlayRef.current;
    const blockOverlayScroll = (event: Event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    if (overlayElement) {
      overlayElement.addEventListener("wheel", blockOverlayScroll, { passive: false });
      overlayElement.addEventListener("touchmove", blockOverlayScroll, { passive: false });
    }

    // Body scroll blocking
    const doc = mountDocument instanceof ShadowRoot ? mountDocument.ownerDocument : mountDocument;
    const ownerDocument = doc ?? document;
    const blockBodyScroll = (event: Event) => {
      const path = event.composedPath();
      if (listRef.current && path.includes(listRef.current)) {
        return;
      }
      event.preventDefault();
    };
    ownerDocument.addEventListener("wheel", blockBodyScroll, { passive: false, capture: true });
    ownerDocument.addEventListener("touchmove", blockBodyScroll, { passive: false, capture: true });

    return () => {
      if (overlayElement) {
        overlayElement.removeEventListener("wheel", blockOverlayScroll);
        overlayElement.removeEventListener("touchmove", blockOverlayScroll);
      }
      ownerDocument.removeEventListener("wheel", blockBodyScroll, { capture: true } as EventListenerOptions);
      ownerDocument.removeEventListener("touchmove", blockBodyScroll, { capture: true } as EventListenerOptions);
    };
  }, [isOpen, props.usePortal, mountDocument]);

  const overlayContent = useMemo(() => {
    if (!props.usePortal || !isOpen || !mountDocument) {
      return null;
    }

    return (
      <div
        ref={overlayRef}
        className="fwr:fixed fwr:inset-0 fwr:z-[9998] fwr:bg-transparent"
        style={{ touchAction: "none" }}
        aria-hidden="true"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onTouchMove={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      />
    );
  }, [isOpen, mountDocument, props.usePortal]);

  useEffect(() => {
    if (props.invalid !== undefined) {
      setInvalid(props.invalid);
    }
  }, [props.invalid]);

  useEffect(() => {
    justSelected.current = false;
  }, [options.length]);

  useEffect(() => {
    let initialIndex = -1;
    const selectedValue = valueArray.length > 0 ? valueArray[valueArray.length - 1] : null;

    if (selectedValue) {
      const firstSelectedIndex = filteredOptions.findIndex((option) => getOptionValue(option) === selectedValue);
      initialIndex = firstSelectedIndex >= 0 ? firstSelectedIndex : 0;
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
      const optionId = `id-${id}-option-${highlightedIndex}`;
      const highlightedElement = listRef.current.querySelector(`[data-option-id="${CSS.escape(optionId)}"]`);
      if (highlightedElement) {
        requestAnimationFrame(() => {
          highlightedElement.scrollIntoView({ block: "nearest" });
        });
      }
    }
  }, [highlightedIndex, isOpen, id]);

  const isOptionDisabled = useCallback(
    (option: T): boolean => {
      return ("disabled" in (option as Option) && !!(option as Option).disabled) || disabledOptions.includes(String(getOptionValue(option)));
    },
    [disabledOptions, getOptionValue]
  );

  const selectOption = (option: T) => {
    if (disabled || isOptionDisabled(option)) return;

    justSelected.current = true;
    const optionValue = String(getOptionValue(option));

    if (isMulti) {
      const newValues = value?.includes(optionValue) ? (value as string[]).filter((v) => v !== optionValue) : [...(value as string[]), optionValue];
      (onChange as (values: string[]) => void)(newValues);
    } else {
      (onChange as (value: string | null) => void)(optionValue);
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
    if (event) event.stopPropagation();

    if (isMulti) {
      const newValues = (value as string[]).filter((v) => v !== optionValue);
      (onChange as (values: string[]) => void)(newValues);
      if (newValues.length === 0 && !isOpen) {
        setIsOpen(true);
      }
    } else {
      onChange("");
      if (!isOpen) {
        setIsOpen(true);
      }
    }

    justSelected.current = false;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || !searchable) return;
    const newValue = e.target.value;
    setSearchTerm(newValue);

    if (props.onSearchChange) {
      props.onSearchChange(newValue);
    }

    if (!isOpen) {
      setIsOpen(true);
      if (newValue) {
        setHighlightedIndex(0);
      }
    }
  };

  const handleInputFocus = () => {
    if (disabled) return;

    if (!justSelected.current) {
      setIsOpen(true);
      if (!isMulti && selectedOption && searchable) {
        setSearchTerm("");
      }
    }
  };

  const clearAllOptions = (event?: React.MouseEvent) => {
    if (disabled) return;
    if (event) event.stopPropagation();

    if (isMulti) {
      (onChange as (values: string[]) => void)([]);
    } else {
      onChange("");
    }
    setSearchTerm("");
    setIsOpen(true);
    inputRef.current?.focus();
  };

  const toggleSelectDropdown = (event?: React.MouseEvent) => {
    if (disabled) return;

    const isInputClick = event?.target === inputRef.current;
    if (isInputClick && isOpen) {
      return;
    }

    const newOpenState = !isOpen;
    setIsOpen(newOpenState);

    if (newOpenState) {
      inputRef.current?.focus();
    }
  };

  const getEmptyMessage = () => {
    if (loading) return "Loading options...";
    if (filteredOptions.length === 0 && !searchTerm && (allowAddNew || allowCustomValue)) return addNewMessage;
    if (filteredOptions.length === 0 && searchTerm && !allowAddNew && !allowCustomValue) return noResultsMessage;
    if (filteredOptions.length === 0 && !searchTerm) return noResultsMessage;
    return null;
  };

  const addNewOption = async (value: string) => {
    if (!onAddNew || !value.trim()) return;

    setAddNewError(null);
    setIsAddingNew(true);

    try {
      await onAddNew(value);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Failed to add new item";
      setAddNewError(`${searchTerm}: ${errorMsg}`);
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
    const totalOptionsLength = hasAddNewOption ? filteredOptions.length + 1 : filteredOptions.length;

    switch (e.key) {
      case "ArrowDown":
        if (totalOptionsLength) {
          e.preventDefault();
          setHighlightedIndex((prev) => (prev < totalOptionsLength - 1 ? prev + 1 : 0));
        }
        break;

      case "ArrowUp":
        if (totalOptionsLength) {
          e.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : totalOptionsLength - 1));
        }
        break;

      case "Enter":
        if (totalOptionsLength) {
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

      default:
        break;
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (containerRef.current && !containerRef.current.contains((mountDocument ?? document).activeElement)) {
        resetState();
      }
    }, 10);
  };

  const dismissError = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAddNewError(null);
  };

  const showClearIcon = !disabled && showClearButton && (valueArray.length > 0 || searchTerm);

  // Calculate visible options and hidden count
  const visibleOptions = useMemo(() => {
    if (!isMulti || selectedOptions.length <= maxVisibleOptions) {
      return selectedOptions;
    }
    return selectedOptions.slice(0, maxVisibleOptions);
  }, [isMulti, selectedOptions, maxVisibleOptions]);

  const hiddenOptionsCount = useMemo(() => {
    if (!isMulti || selectedOptions.length <= maxVisibleOptions) {
      return 0;
    }
    return selectedOptions.length - maxVisibleOptions;
  }, [isMulti, selectedOptions.length, maxVisibleOptions]);

  const dropdownContent = useMemo(() => {
    if (!isOpen || disabled || (allowCustomValue && filteredOptions.length === 0 && searchTerm)) {
      return null;
    }

    return (
      <ul
        ref={listRef}
        id={`${id}-options`}
        onMouseDown={(event) => event.preventDefault()}
        className={cn(
          "fwr:max-h-60 fwr:overflow-auto fwr:rounded-md fwr:bg-popover fwr:py-1 fwr:text-sm fwr:shadow-lg fwr:space-y-0.5 fwr:border fwr:border-border",
          props.usePortal ? "fwr:fixed fwr:z-[9999]" : "fwr:absolute fwr:z-50 fwr:w-full",
          listClassName
        )}
        style={
          props.usePortal && dropdownPosition
            ? {
                left: `${dropdownPosition.left}px`,
                width: `${dropdownPosition.width}px`,
                ...(dropdownPosition.openUpward ? { bottom: `${window.innerHeight - dropdownPosition.top}px` } : { top: `${dropdownPosition.top}px` })
              }
            : undefined
        }
        role="listbox"
        aria-multiselectable={isMulti}
        tabIndex={-1}
      >
        {loading ? (
          <li className="fwr:relative fwr:cursor-default fwr:select-none fwr:py-2 fwr:px-3 fwr:text-neutral-500 fwr:flex fwr:items-center fwr:gap-2">
            <Spinner />
            Loading options...
          </li>
        ) : (
          <>
            {getEmptyMessage() && filteredOptions.length === 0 && !allowAddNew ? (
              <li className="fwr:relative fwr:cursor-default fwr:select-none fwr:py-2 fwr:px-3 fwr:text-neutral-500">{getEmptyMessage()}</li>
            ) : (
              filteredOptions.map((option, index) => {
                const isSelected = valueArray.includes(getOptionValue(option));
                const isHighlighted = index === highlightedIndex;
                const isDisabled = isOptionDisabled(option);
                const optionId = `id-${id}-option-${index}`;

                return (
                  <li
                    key={`option-${String(getOptionValue(option))}`}
                    id={optionId}
                    data-option-id={optionId}
                    onClick={() => !isDisabled && selectOption(option)}
                    onMouseEnter={() => !isDisabled && setHighlightedIndex(index)}
                    className={cn(
                      "fwr:relative fwr:select-none fwr:py-2 fwr:px-3",
                      isDisabled ? "fwr:cursor-not-allowed fwr:text-neutral-400" : "fwr:cursor-pointer",
                      isSelected
                        ? isHighlighted
                          ? "fwr:bg-primary/20 fwr:text-primary"
                          : "fwr:bg-primary/10 fwr:text-primary"
                        : isHighlighted
                          ? "fwr:bg-neutral-200 fwr:text-neutral-800"
                          : "fwr:text-neutral-900 fwr:hover:bg-neutral-50"
                    )}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={isDisabled}
                  >
                    <div className="fwr:flex fwr:items-center fwr:justify-between">
                      <span>{renderOption ? renderOption(option) : getOptionLabel(option)}</span>
                      {isSelected && <Check className="fwr:w-4" />}
                    </div>
                  </li>
                );
              })
            )}

            {allowAddNew && searchTerm && (
              <li
                id={`id-${id}-option-${filteredOptions.length}`}
                data-option-id={`id-${id}-option-${filteredOptions.length}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isAddingNew) {
                    addNewOption(searchTerm);
                  }
                }}
                onMouseEnter={() => setHighlightedIndex(filteredOptions.length)}
                className={cn(
                  "fwr:relative fwr:select-none fwr:py-2 fwr:px-3",
                  isAddingNew ? "fwr:cursor-wait" : "fwr:cursor-pointer",
                  highlightedIndex === filteredOptions.length ? "fwr:bg-neutral-200 fwr:text-neutral-800" : "fwr:text-neutral-900 fwr:hover:bg-neutral-50"
                )}
                role="option"
                aria-selected={highlightedIndex === filteredOptions.length}
              >
                <div className="fwr:flex fwr:items-center fwr:gap-2">
                  {isAddingNew ? <Spinner /> : <Plus size={16} className="fwr:mr-2" />}
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
    getEmptyMessage,
    getOptionLabel,
    getOptionValue,
    highlightedIndex,
    id,
    isAddingNew,
    isMulti,
    isOpen,
    isOptionDisabled,
    listClassName,
    loading,
    props.usePortal,
    renderOption,
    searchTerm,
    selectOption,
    setHighlightedIndex,
    valueArray
  ]);

  return (
    <div className="fwr:w-full">
      {label && (
        <label htmlFor={id} className="fwr:block fwr:text-xs fwr:font-medium fwr:text-foreground fwr:mb-1" id={`${id}-label`}>
          {label} {required && typeof label === "string" && <span className="fwr:text-destructive">*</span>}
          {description && <p className="fwr:text-xs fwr:text-muted-foreground fwr:mb-2">{description}</p>}
        </label>
      )}

      <div ref={containerRef} className="fwr:relative">
        <div
          className={cn(
            "fwr:border fwr:rounded-md",
            invalid ? "fwr:border-destructive" : "fwr:border-input",
            disabled || isAddingNew
              ? "fwr:bg-muted fwr:cursor-not-allowed"
              : "fwr:bg-background fwr:focus-within:border-primary fwr:focus-within:ring-1 fwr:focus-within:ring-primary",
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
          <div className="fwr:flex fwr:flex-wrap fwr:items-center fwr:gap-1 fwr:p-2 fwr:pr-8">
            {PrefixIcon && <PrefixIcon className="fwr:mr-2 fwr:flex fwr:items-center fwr:text-foreground fwr:w-4 fwr:h-4" />}
            {isMulti && (
              <>
                {visibleOptions.map((option) => (
                  <div
                    key={`selected-${String(getOptionValue(option))}`}
                    className={cn(
                      "fwr:inline-flex fwr:items-center fwr:rounded-full fwr:px-2 fwr:py-1 fwr:text-xs",
                      disabled ? "fwr:bg-neutral-200 fwr:text-neutral-500" : "fwr:bg-primary/10 fwr:text-primary"
                    )}
                  >
                    {getOptionLabel(option)}
                    {!disabled && (
                      <button
                        type="button"
                        onClick={(e) => removeOption(getOptionValue(option), e)}
                        className="fwr:ml-1 fwr:text-primary fwr:hover:text-primary/80 fwr:focus:outline-none fwr:focus:ring-1 fwr:focus:ring-primary"
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
                      "fwr:inline-flex fwr:items-center fwr:rounded-full fwr:px-2 fwr:py-1 fwr:text-xs",
                      disabled ? "fwr:bg-neutral-200 fwr:text-neutral-500" : "fwr:bg-primary/10 fwr:text-primary"
                    )}
                  >
                    +{hiddenOptionsCount}
                  </div>
                )}
              </>
            )}

            {addNewError && (
              <div className="fwr:inline-flex fwr:items-center fwr:rounded-full fwr:px-2 fwr:py-1 fwr:text-xs fwr:bg-destructive/10 fwr:text-destructive">
                <span className="fwr:truncate fwr:max-w-[200px]">{addNewError}</span>
                <button
                  type="button"
                  onClick={dismissError}
                  className="fwr:ml-1 fwr:text-destructive fwr:hover:text-destructive/80 fwr:focus:outline-none fwr:focus:ring-1 fwr:focus:ring-destructive"
                  tabIndex={-1}
                  aria-label="Dismiss error"
                >
                  <X size={12} />
                </button>
              </div>
            )}

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
                  "fwr:flex-1 fwr:min-w-[60px] fwr:border-0 fwr:focus:ring-0 fwr:p-0 fwr:text-sm fwr:focus:bg-transparent fwr:bg-transparent fwr:focus:outline-none fwr:focus:shadow-none",
                  (disabled || isAddingNew) && "fwr:bg-neutral-100 fwr:text-neutral-500 fwr:cursor-not-allowed",
                  inputClassName
                )}
                autoComplete="off"
                aria-autocomplete="list"
                aria-activedescendant={highlightedIndex >= 0 ? `id-${id}-option-${highlightedIndex}` : undefined}
                aria-invalid={invalid}
                required={required}
                disabled={disabled || isAddingNew}
              />
            ) : (
              <div className={cn("fwr:flex-1 fwr:min-w-[60px] fwr:p-0 fwr:text-sm", disabled ? "fwr:text-neutral-500" : "fwr:text-neutral-900")}>
                {!isMulti && selectedOption ? (
                  <span>{getOptionLabel(selectedOption)}</span>
                ) : isMulti && selectedOptions.length === 0 ? (
                  <span className="fwr:text-neutral-400">{placeholder}</span>
                ) : null}
              </div>
            )}
          </div>

          <div className="fwr:absolute fwr:right-2 fwr:inset-y-0 fwr:flex fwr:items-center">
            {isAddingNew || loading ? (
              <Spinner />
            ) : (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (showClearIcon) {
                    clearAllOptions(e);
                  } else {
                    toggleSelectDropdown(e);
                  }
                }}
                className={cn(
                  "fwr:text-neutral-400 fwr:p-1 fwr:focus:outline-none fwr:focus:ring-1 fwr:focus:ring-primary",
                  disabled ? "fwr:opacity-50 fwr:cursor-not-allowed" : "fwr:hover:text-neutral-600"
                )}
                aria-label={showClearIcon ? "Clear" : isOpen ? "Close dropdown" : "Open dropdown"}
                disabled={disabled}
                tabIndex={-1}
              >
                {showClearIcon ? <X size={16} /> : <ChevronDown size={16} className={isOpen ? "fwr:transform fwr:rotate-180" : ""} />}
              </button>
            )}
          </div>
        </div>

        {overlayContent && createPortal(overlayContent, mountDocument instanceof ShadowRoot ? mountDocument : (mountDocument ?? document).body)}
        {dropdownContent &&
          (props.usePortal && mountDocument ? createPortal(dropdownContent, mountDocument instanceof ShadowRoot ? mountDocument : mountDocument.body) : dropdownContent)}
      </div>
      {invalid && errorMessage && (
        <p className="fwr:mt-1 fwr:text-xs fwr:text-destructive" id={`${id}-error`}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}) as <T = Option>(_props: SelectProps<T> & { ref?: React.ForwardedRef<SelectRef> }) => React.JSX.Element;

export type { SelectProps };
export default Select;
