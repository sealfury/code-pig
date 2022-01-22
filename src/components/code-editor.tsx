import React from 'react'
import Editor from '@monaco-editor/react'

interface CodeEditorProps {
  initialValue: string
  onChange(value: string): void
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  // Handle editor change events - see type defs for details
  const onEditorDidMount = (getValue: () => string, monaco: any) => {
    monaco.onDidChangeModelContent(() => {
      onChange(getValue())
    })
  }

  return (
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
        fontSize: 15,
        fontFamily: 'Monaco',
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  )
}

export default CodeEditor
