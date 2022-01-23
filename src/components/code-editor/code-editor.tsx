import './code-editor.css'
import './syntax.css'
import { useRef } from 'react'
import Editor, { EditorDidMount } from '@monaco-editor/react'
import prettier from 'prettier'
import parser from 'prettier/parser-babel'
import codeShift from 'jscodeshift'
import MonacoJsxHighlighter from 'monaco-jsx-highlighter'

interface CodeEditorProps {
  initialValue: string
  onChange(value: string): void
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const editorRef = useRef<any>()

  // Handle editor change events -
  // See editorDidMount, et al, type defs for details
  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor

    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue())
    })

    monacoEditor.getModel()?.updateOptions({ tabSize: 2 })

    // set up syntax highlighting in code editor
    const highlighter = new MonacoJsxHighlighter(
      // @ts-ignore
      window.monaco,
      codeShift,
      monacoEditor
    )
    // prevent highlighter from console.logging constantly
    highlighter.highLightOnDidChangeModelContent(
      () => {},
      () => {},
      undefined,
      () => {}
    )
  }

  const onFormatClick = () => {
    // Get current value from editor
    const unformatted = editorRef.current.getModel().getValue()

    // Format the value
    const formatted = prettier
      .format(unformatted, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: false,
        singleQuote: true,
      })
      .replace(/\n$/, '')

    // Set the formatted value back in the editor
    editorRef.current.setValue(formatted)
  }

  return (
    <div className='editor-wrapper'>
      <button
        className='button button-format is-primary is-small'
        onClick={onFormatClick}
      >
        Format
      </button>
      <Editor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        language='javascript'
        theme='dark'
        height='500px'
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          fontWeight: 'bold',
          fontFamily: 'Consolas',
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          automaticLayout: true,
          ariaLabel: '30px',
          renderFinalNewline: true,
          cursorBlinking: 'smooth',
          colorDecorators: true,
          copyWithSyntaxHighlighting: true,
          selectionHighlight: true,
          occurrencesHighlight: true,
        }}
      />
    </div>
  )
}

export default CodeEditor
