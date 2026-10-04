import { Archive, Code, Database, File as FileIcon, FileText, Film, Image, Music } from "lucide-react";

import type { IconComponent } from "../types";

export const formatFileSize = (bytes: number | undefined): string => {
  if (!bytes) return "";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1);
  return `${Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const getFileIcon = (type: string | undefined): IconComponent => {
  if (!type) return FileIcon;
  if (type.startsWith("image/")) return Image;
  if (type.startsWith("video/")) return Film;
  if (type.startsWith("audio/")) return Music;
  if (type.includes("pdf")) return FileText;
  if (type.includes("zip") || type.includes("rar") || type.includes("tar") || type.includes("gz")) return Archive;
  if (type.includes("html") || type.includes("css") || type.includes("javascript") || type.includes("json")) return Code;
  if (type.includes("csv") || type.includes("excel") || type.includes("spreadsheet")) return Database;
  return FileIcon;
};

export function downloadBlob(blob: Blob | string, filename: string) {
  const url = blob instanceof Blob ? URL.createObjectURL(blob) : blob;
  const anchorTag = document.createElement("a");

  anchorTag.href = url;
  anchorTag.download = filename;
  document.body.appendChild(anchorTag);
  anchorTag.click();

  setTimeout(() => {
    document.body.removeChild(anchorTag);
    if (blob instanceof Blob) URL.revokeObjectURL(url);
  }, 100);
}
