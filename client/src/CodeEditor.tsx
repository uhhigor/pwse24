import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import * as CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';

type EditorFromTextArea = ReturnType<typeof CodeMirror.fromTextArea>;

interface CodeEditorProps {
    language?: string;
}

const CodeEditor = forwardRef((props: CodeEditorProps, ref) => {
    const { language } = props;
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const editorRef = useRef<EditorFromTextArea | null>(null);

    useImperativeHandle(ref, () => ({
        getValue: () => {
            return editorRef.current?.getValue() || '';
        },
        setValue: (value: string) => {
            editorRef.current?.setValue(value);
        },
    }));

    useEffect(() => {
        if (textareaRef.current) {
            editorRef.current = CodeMirror.fromTextArea(textareaRef.current, {
                lineNumbers: true,
                mode: language || 'javascript',
                theme: 'material',
            });

            if (language === 'javascript') {
                let txt = `
function solution(a){
    console.log("Hello, World")                
}
               
module.exports = { solution }`
                editorRef.current.setValue(txt);
            } else if (language === 'python') {
                let txt = `
def solution(a):
    print("Hello, World")
                `
                editorRef.current.setValue(txt);
            }
        }

        return () => {
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
});

export default CodeEditor;
