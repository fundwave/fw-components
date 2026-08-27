// sort-imports-ignore
// @ts-nocheck
import { Editor as TinyMceEditor } from "@tinymce/tinymce-react";

// TinyMCE so the global var exists
import "tinymce";
import "tinymce/models/dom/model";
import "tinymce/icons/default";
import "tinymce/plugins/advlist";
import "tinymce/plugins/anchor";
import "tinymce/plugins/autolink";
import "tinymce/plugins/autoresize";
import "tinymce/plugins/autosave";
import "tinymce/plugins/charmap";
import "tinymce/plugins/code";
import "tinymce/plugins/codesample";
import "tinymce/plugins/directionality";
import "tinymce/plugins/emoticons";
import "tinymce/plugins/emoticons/js/emojis";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/help";
import "tinymce/plugins/help/js/i18n/keynav/en";
import "tinymce/plugins/image";
import "tinymce/plugins/importcss";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/link";
import "tinymce/plugins/lists";
import "tinymce/plugins/media";
import "tinymce/plugins/nonbreaking";
import "tinymce/plugins/pagebreak";
import "tinymce/plugins/preview";
import "tinymce/plugins/quickbars";
import "tinymce/plugins/save";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/table";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/visualchars";
import "tinymce/plugins/wordcount";
import "tinymce/skins/content/default/content";
import "tinymce/skins/ui/oxide/content";
import "tinymce/skins/ui/oxide/skin";
import "tinymce/themes/silver";
import type { Editor as TinyMCE } from "tinymce/tinymce";
import type { IEvents } from "@tinymce/tinymce-react/lib/cjs/main/ts/Events";
import type { InitOptions } from "@tinymce/tinymce-react/lib/cjs/main/ts/components/Editor";
import "../styles/editor.css";
export interface EditorProps {
  init?: InitOptions;
  value?: string;
  onEditorChange?: (content: string, editor: TinyMCE) => void;
  onInit?: IEvents["onInit"];
  placeholder?: string;
  height?: string | number;
}
export default function Editor(props: EditorProps) {
  return (
    <TinyMceEditor
      {...props}
      licenseKey="gpl"
      init={{
        ...props.init,
        menubar: false,
        plugins: ["advlist", "autolink", "lists", "link", "anchor", "searchreplace", "code", "table"],
        toolbar: "bold italic underline strikethrough link | bullist numlist | attachments personalization | alignleft aligncenter alignright",
        content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; font-size: 14px; }',
        placeholder: props.placeholder,
        branding: false,
        promotion: false,
        elementpath: false,
        statusbar: false,
        height: props.height || "350px"
      }}
    />
  );
}
