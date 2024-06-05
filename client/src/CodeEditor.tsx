import React, { useEffect, useRef } from 'react';
import * as CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';

type EditorFromTextArea = ReturnType<typeof CodeMirror.fromTextArea>;

interface CodeEditorProps {
    language?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ language}) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const editorRef = useRef<EditorFromTextArea | null>(null);

    useEffect(() => {
        if (textareaRef.current) {
            editorRef.current = CodeMirror.fromTextArea(textareaRef.current, {
                lineNumbers: true,
                mode: language || 'javascript',
                theme: 'material',
            });

            if (language === 'javascript'){
                editorRef.current.setValue("console.log('Hello, World!')");
            } else if (language === 'python'){
                editorRef.current.setValue("print('Hello, World!')");
            }
        }

        return () => {
            // Clean up CodeMirror instance
            if (editorRef.current) {
                editorRef.current.toTextArea();
            }
        };
    }, [language]);

    return (
        <div className="code-editor">
            <textarea ref={textareaRef} />
        </div>
    );
};

export default CodeEditor;
