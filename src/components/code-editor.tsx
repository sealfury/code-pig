import Editor, { EditorDidMount } from '@monaco-editor/react'

interface CodeEditorProps {
  initialValue: string
  onChange(value: string): void
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  // Handle editor change events -
  // See editorDidMount et al type defs for details
  const onEditorDidMount: EditorDidMount = (getValue, monaco) => {
    monaco.onDidChangeModelContent(() => {
      onChange(getValue())
    })

    monaco.getModel()?.updateOptions({ tabSize: 2 })
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
