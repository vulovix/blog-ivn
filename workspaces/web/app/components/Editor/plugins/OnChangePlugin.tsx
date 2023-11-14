import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useRef } from "react";

export default function OnChangePlugin({ onChange, editorState, id }) {

    const prevId = useRef(id);
    // Access the editor through the LexicalComposerContext
    const [editor] = useLexicalComposerContext();
    // Wrap our listener in useEffect to handle the teardown and avoid stale references.
    useEffect(() => {
      // most listeners return a teardown function that can be called to clean them up.
      return editor.registerUpdateListener((editorState) => {
        // call onChange here to pass the latest state up to the parent.
        onChange(editorState);
      });
    }, [editor, onChange]);

    useEffect(() => {
        console.log("remount");
    }, [])

    useEffect(() => {
        if(id !== prevId.current){
            console.log("id changed", id, prevId.current, editorState);
            if(editorState){
                editor.setEditorState(editor.parseEditorState(editorState));
                editor.focus();
            }
            prevId.current = id;
        }
    }, [editorState])
  
    return <></>
  }