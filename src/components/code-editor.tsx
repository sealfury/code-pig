import React from 'react'
import Editor from '@monaco-editor/react'

interface CodeEditorProps {
  initialValue: string
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue }) => {
  return (
    <Editor
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
        fontFamily: 'Arial',
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  )
}

export default CodeEditor
