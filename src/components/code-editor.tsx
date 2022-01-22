import Editor from '@monaco-editor/react'

const CodeEditor = () => {
  return (
    <Editor
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
