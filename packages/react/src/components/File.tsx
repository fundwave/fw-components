import * as React from "react";
import { AlertCircle, Upload, X } from "lucide-react";

import Button from "./Button";
import Spinner from "./Spinner";

import { downloadBlob, formatFileSize, getFileIcon } from "../utils/file";
import { cn } from "../utils/tailwind";

export interface FileItemData {
  name: string;
  type?: string;
  size?: number;
}

export interface FileItemProps {
  file: FileItemData;
  /** Returns the file contents to download on click. Omit to make the row non-clickable. */
  onDownload?: (file: FileItemData) => Promise<Blob | void> | Blob | void;
  /** Shows a remove button when provided; throwing surfaces the error message in the row. */
  onRemove?: (file: FileItemData) => Promise<void> | void;
  disabled?: boolean;
  className?: string;
}

const FileItem = ({ file, onDownload, onRemove, disabled = false, className }: FileItemProps) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const isMounted = React.useRef(true);
  const Icon = getFileIcon(file.type);
  const isInteractive = !loading && !disabled;
  const isDownloadable = !!onDownload && isInteractive;
  const size = formatFileSize(file.size);

  React.useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const run = async (action: () => Promise<void> | void, fallbackError: string) => {
    setLoading(true);
    setError(null);
    try {
      await action();
    } catch (err) {
      console.error(fallbackError, err);
      if (isMounted.current) setError(err instanceof Error && err.message ? err.message : fallbackError);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!isDownloadable) return;
    return run(async () => {
      const blob = await onDownload(file);
      if (!blob) throw new Error("Couldn't find the file");
      downloadBlob(blob, file.name);
    }, "Failed to download file");
  };

  const handleRemove = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!isInteractive || !onRemove) return;
    return run(() => onRemove(file), "Failed to remove file");
  };

  return (
    <div
      className={cn(
        "fwr:flex fwr:items-center fwr:gap-2 fwr:rounded-md fwr:border fwr:p-2 fwr:text-sm",
        error ? "fwr:border-destructive" : "fwr:border-input",
        disabled ? "fwr:bg-muted fwr:text-muted-foreground fwr:cursor-not-allowed" : "fwr:text-foreground",
        className
      )}
    >
      {loading ? <Spinner className="fwr:w-4 fwr:h-4 fwr:shrink-0 fwr:text-primary" /> : <Icon className="fwr:w-4 fwr:h-4 fwr:shrink-0 fwr:text-muted-foreground" />}
      <div
        className={cn("fwr:flex-1 fwr:min-w-0", isDownloadable ? "fwr:cursor-pointer fwr:hover:text-primary" : "")}
        onClick={handleDownload}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleDownload();
          }
        }}
        role={isDownloadable ? "button" : undefined}
        tabIndex={isDownloadable ? 0 : undefined}
        aria-label={isDownloadable ? `Download ${file.name}` : undefined}
      >
        <p className="fwr:truncate" title={file.name}>
          {file.name}
        </p>
        {error ? <p className="fwr:text-xs fwr:text-destructive">{error}</p> : size && <p className="fwr:text-xs fwr:text-muted-foreground">{size}</p>}
      </div>
      {onRemove && <Button mode="icon" size="sm" theme="danger" title="Remove file" icon={X} onClick={handleRemove} disabled={disabled || loading} />}
    </div>
  );
};

type FileType = "any" | "image" | "document" | "pdf";

const ACCEPT_BY_TYPE: Record<FileType, string | undefined> = {
  any: undefined,
  image: "image/*",
  document: ".pdf,.doc,.docx,.xls,.xlsx",
  pdf: ".pdf"
};

const FILE_TYPE_TEXT: Record<FileType, string> = {
  any: "",
  image: "PNG, JPG or GIF",
  document: "PDF, DOC, DOCX, XLS, XLSX",
  pdf: "PDF only"
};

// Custom ref type with validate method
export interface FileUploadRef extends HTMLInputElement {
  validate: () => boolean;
}

export interface FileUploadProps {
  value?: File | null;
  onChange?: (file: File | null) => void;
  /** Async hook run before `onChange`; throwing surfaces the error message in the component. */
  onUpload?: (file: File) => Promise<void> | void;
  /** Async hook run when the selected file is removed; throwing keeps the file and surfaces the error. */
  onRemove?: (file: File) => Promise<void> | void;
  label?: React.ReactNode;
  description?: React.ReactNode;
  placeholder?: string;
  fileType?: FileType;
  /** Overrides the `accept` derived from `fileType`. */
  accept?: string;
  /** Maximum allowed file size in bytes. */
  maxSize?: number;
  variant?: "default" | "button";
  errorMessage?: string;
  invalid?: boolean;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

interface FileDropZoneProps {
  onFilesDrop: (files: File[]) => void;
  disabled?: boolean;
  loading?: boolean;
  accept?: string;
  multiple?: boolean;
  className?: string;
  children: React.ReactNode;
}

const FileDropZone = React.forwardRef<HTMLInputElement, FileDropZoneProps>(({ onFilesDrop, disabled, loading, accept, multiple, className, children }, ref) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const dragCounter = React.useRef(0);
  const isBlocked = disabled || loading;

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (!isBlocked && e.dataTransfer?.items?.length > 0) setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isBlocked) {
      e.dataTransfer.dropEffect = "copy";
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current <= 0) {
      dragCounter.current = 0;
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;
    if (isBlocked) return;
    onFilesDrop(Array.from(e.dataTransfer.files));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) onFilesDrop(Array.from(e.target.files));
    e.target.value = "";
  };

  return (
    <div
      className={cn("fwr:relative", isDragging ? "fwr:rounded-md fwr:ring-2 fwr:ring-primary fwr:bg-primary/10" : "", className)}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isDragging && (
        <div className="fwr:absolute fwr:inset-0 fwr:z-10 fwr:flex fwr:items-center fwr:justify-center fwr:rounded-md fwr:border-2 fwr:border-dashed fwr:border-primary fwr:bg-primary/10 fwr:pointer-events-none">
          <div className="fwr:flex fwr:items-center fwr:gap-2 fwr:rounded-lg fwr:bg-background fwr:p-3 fwr:shadow-md">
            <Upload className="fwr:w-4 fwr:h-4 fwr:text-primary" />
            <p className="fwr:text-sm fwr:font-medium fwr:text-primary">Drop your file to upload</p>
          </div>
        </div>
      )}
      <input ref={ref} type="file" className="fwr:hidden" onChange={handleInputChange} disabled={isBlocked} accept={accept} multiple={multiple} />
      {children}
    </div>
  );
});
FileDropZone.displayName = "FileDropZone";

const FileUpload = React.forwardRef<FileUploadRef, FileUploadProps>(
  (
    {
      value,
      onChange,
      onUpload,
      onRemove,
      label,
      description,
      placeholder = "Drop or click to upload a file",
      fileType = "any",
      accept,
      maxSize,
      variant = "default",
      errorMessage,
      invalid: invalidProp,
      required,
      disabled = false,
      className
    },
    ref
  ) => {
    const [file, setFile] = React.useState<File | null>(value ?? null);
    const [error, setError] = React.useState<string | null>(null);
    const [invalid, setInvalid] = React.useState(invalidProp || false);
    const [loading, setLoading] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const resolvedAccept = accept ?? ACCEPT_BY_TYPE[fileType];

    React.useEffect(() => {
      setFile(value ?? null);
    }, [value]);

    React.useEffect(() => {
      setInvalid(invalidProp || false);
    }, [invalidProp]);

    React.useImperativeHandle(ref, () => {
      if (inputRef.current) {
        Object.defineProperty(inputRef.current, "validate", {
          value: () => {
            if (required && !file) {
              setInvalid(true);
              return false;
            }
            setInvalid(false);
            return true;
          },
          configurable: true
        });
        return inputRef.current as FileUploadRef;
      }
      return {
        validate: () => true
      } as FileUploadRef;
    }, [required, file]);

    const handleClick = () => {
      if (!loading && !disabled) inputRef.current?.click();
    };

    const processFiles = async (files: File[]) => {
      const selectedFile = files[0];
      if (!selectedFile) return;

      if (files.length > 1) {
        setError("Please select only one file");
        return;
      }
      if (maxSize && selectedFile.size > maxSize) {
        setError(`File size must be under ${formatFileSize(maxSize)}`);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        await onUpload?.(selectedFile);
        setFile(selectedFile);
        setInvalid(false);
        onChange?.(selectedFile);
      } catch (err) {
        console.error("File upload failed:", err);
        setError(err instanceof Error && err.message ? err.message : "Upload failed. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const removeFile = async () => {
      if (!file) return;
      try {
        await onRemove?.(file);
        setFile(null);
        setError(null);
        onChange?.(null);
      } catch (err) {
        console.error("Error removing file:", err);
        setError(err instanceof Error && err.message ? err.message : "Failed to remove file");
      }
    };

    const showError = invalid || !!error;
    const displayedError = error ?? (invalid ? errorMessage || "Please upload a file" : null);

    return (
      <div>
        {label && (
          <label className="fwr:block fwr:text-xs fwr:font-medium fwr:text-foreground fwr:mb-1">
            {label} {required && typeof label === "string" && <span className="fwr:text-destructive">*</span>}
            {description && <p className="fwr:text-xs fwr:text-muted-foreground fwr:mb-2">{description}</p>}
          </label>
        )}
        <FileDropZone onFilesDrop={processFiles} disabled={disabled || !!file} loading={loading} accept={resolvedAccept} ref={inputRef}>
          {file ? (
            <FileItem file={file} onDownload={() => file} onRemove={removeFile} disabled={disabled} className={className} />
          ) : variant === "button" ? (
            <Button onClick={handleClick} disabled={disabled || loading} title={loading ? "Uploading..." : placeholder} icon={Upload} variant="filled" className={className} />
          ) : (
            <div
              role="button"
              tabIndex={disabled || loading ? -1 : 0}
              onClick={handleClick}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleClick();
                }
              }}
              className={cn(
                "fwr:flex fwr:flex-col fwr:items-center fwr:justify-center fwr:w-full fwr:min-h-24 fwr:p-4 fwr:rounded-md fwr:border-2 fwr:border-dashed fwr:transition-colors fwr:duration-150 fwr:focus:outline-none fwr:focus-visible:ring-2 fwr:focus-visible:ring-primary",
                showError ? "fwr:border-destructive" : "fwr:border-input",
                disabled || loading ? "fwr:opacity-60 fwr:cursor-not-allowed" : "fwr:cursor-pointer fwr:hover:bg-muted",
                className
              )}
            >
              {loading ? (
                <div className="fwr:flex fwr:items-center fwr:gap-2 fwr:text-sm fwr:text-muted-foreground">
                  <Spinner className="fwr:w-4 fwr:h-4 fwr:text-primary" />
                  Uploading...
                </div>
              ) : (
                <div className="fwr:flex fwr:flex-col fwr:items-center fwr:text-muted-foreground">
                  {showError ? <AlertCircle className="fwr:w-6 fwr:h-6 fwr:mb-2 fwr:text-destructive" /> : <Upload className="fwr:w-6 fwr:h-6 fwr:mb-2" />}
                  <p className="fwr:mb-1 fwr:text-sm">{placeholder}</p>
                  {FILE_TYPE_TEXT[fileType] && <p className="fwr:text-xs">{FILE_TYPE_TEXT[fileType]}</p>}
                </div>
              )}
            </div>
          )}
        </FileDropZone>
        {showError && displayedError && <span className="fwr:text-xs fwr:text-destructive fwr:mt-1 fwr:block">{displayedError}</span>}
      </div>
    );
  }
);
FileUpload.displayName = "FileUpload";

export { FileItem, FileUpload, FileDropZone };
export default FileUpload;
