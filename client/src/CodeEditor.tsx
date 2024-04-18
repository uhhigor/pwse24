import React, { useEffect, useRef } from 'react';
import * as CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css'; // Default CodeMirror styles
import 'codemirror/theme/material.css'; // Example: Material theme
import 'codemirror/mode/javascript/javascript'; // Example: JavaScript mode

type EditorFromTextArea = ReturnType<typeof CodeMirror.fromTextArea>;

interface CodeEditorProps {
    initialValue?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue }) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const editorRef = useRef<EditorFromTextArea | null>(null);

    useEffect(() => {
        if (textareaRef.current) {
            editorRef.current = CodeMirror.fromTextArea(textareaRef.current, {
                lineNumbers: true,
                mode: 'javascript',
                theme: 'material',
            });

            if (initialValue) {
                editorRef.current.setValue(initialValue);
            }
        }

        return () => {
            // Clean up CodeMirror instance
            if (editorRef.current) {
                editorRef.current.toTextArea();
            }
        };
    }, [initialValue]);

    return (
        <div className="code-editor">
            <textarea ref={textareaRef} />
        </div>
    );
};

export default CodeEditor;
