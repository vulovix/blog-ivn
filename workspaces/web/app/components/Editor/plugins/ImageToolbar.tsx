import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import type { InsertImagePayload } from "./ImagePlugin";
import { INSERT_IMAGE_COMMAND } from "./ImagePlugin";

export function FillURL() {
  const srcfile = prompt("Enter the URL of the image:", "");

  return srcfile;
}

export default function ImageToolbar(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const onClick = (payload: InsertImagePayload) => {
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
  };

  return (
    <button
    onClick={() =>
        onClick({
        altText: "URL image",
        // @ts-ignore
        src: FillURL()
        })
    }
    className={"toolbar-item"}
    >
    <span className="text">Image</span>
    </button>
  );
}
