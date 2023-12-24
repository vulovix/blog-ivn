import "./style.scss";

import ExampleTheme from "./themes/ExampleTheme";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
// import TreeViewPlugin from "./plugins/TreeViewPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";

import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
import OnChangePlugin from "./plugins/OnChangePlugin";
import { useMemo, useRef } from "react";
import ImagesPlugin from "./plugins/ImagePlugin";
import { ImageNode } from "./nodes/ImageNode";
import withClientOnly from "~/hocs/withClientOnly";

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

interface EditorProps {
  id: string;
  readonly: boolean;
  name: string;
  initialState: null | string;
  onChange(e: { target: { value: string; name: string } }): void;
}
function Editor({ initialState, onChange, name, id, readonly }: EditorProps) {
  const editorConfig = useMemo(() => {
    const decoded = initialState ? decodeURIComponent(initialState) : null;
    return {
      namespace: id,
      theme: ExampleTheme,
      editable: readonly ? false : true,
      onError(error: unknown) {
        throw error;
      },
      nodes: [
        HeadingNode,
        ListNode,
        ListItemNode,
        QuoteNode,
        CodeNode,
        CodeHighlightNode,
        TableNode,
        TableCellNode,
        TableRowNode,
        AutoLinkNode,
        LinkNode,
        ImageNode,
      ],
      editorState: decoded,
    };
  }, [initialState, id, readonly]);

  function onChangeInternal({ editorState }: any) {
    const editorStateJSON = editorState.toJSON();
    onChange({
      target: {
        name: name,
        value: encodeURIComponent(JSON.stringify(editorStateJSON)),
      },
    });
  }

  return (
    <div className={`editor ${readonly ? "readonly" : ""}`}>
      {readonly ? <></> : "Editor"}
      <LexicalComposer initialConfig={editorConfig}>
        <div className="editor-container">
          {readonly ? <></> : <ToolbarPlugin />}
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={<Placeholder />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            {!readonly ? (
              <>
                <HistoryPlugin />
                {/* <TreeViewPlugin /> */}
                <OnChangePlugin
                  id={id}
                  editorState={editorConfig.editorState}
                  onChange={onChangeInternal}
                />
                <AutoFocusPlugin />
                <ImagesPlugin />
                <CodeHighlightPlugin />
                <ListPlugin />
                <LinkPlugin />
                <AutoLinkPlugin />
                <ListMaxIndentLevelPlugin maxDepth={7} />
                <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </LexicalComposer>
    </div>
  );
}

export default withClientOnly(Editor);
