import { Archive, Code, Database, File as FileIcon, FileText, Film, Image, Music } from "lucide-react";

import type { IconComponent } from "../types";

export const formatFileSize = (bytes: number | undefined): string => {
  if (!bytes) return "";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1);
  return `${Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const getFileIcon = (type: string | undefined): { icon: IconComponent; colorClass: string } => {
  if (!type) return { icon: FileIcon, colorClass: "fwr:text-gray-500" };
  if (type.startsWith("image/")) return { icon: Image, colorClass: "fwr:text-blue-500" };
  if (type.startsWith("video/")) return { icon: Film, colorClass: "fwr:text-purple-500" };
  if (type.startsWith("audio/")) return { icon: Music, colorClass: "fwr:text-green-500" };
  if (type.includes("pdf")) return { icon: FileText, colorClass: "fwr:text-yellow-500" };
  if (type.includes("zip") || type.includes("rar") || type.includes("tar") || type.includes("gz")) return { icon: Archive, colorClass: "fwr:text-gray-500" };
  if (type.includes("html") || type.includes("css") || type.includes("javascript") || type.includes("json")) return { icon: Code, colorClass: "fwr:text-gray-500" };
  if (type.includes("csv") || type.includes("excel") || type.includes("spreadsheet")) return { icon: Database, colorClass: "fwr:text-green-500" };
  return { icon: FileIcon, colorClass: "fwr:text-gray-500" };
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
