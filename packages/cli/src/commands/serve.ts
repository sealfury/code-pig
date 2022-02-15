import { Command } from 'commander'
import path from 'path'
import { serve } from '@codepig/local-api'

const isProduction = process.env.NODE_ENV === 'production'

export const serveCommand = new Command()
  // [] = optional value; <> = required value
  .command('serve [filename]')
  .description('Open a file to edit')
  .option('-p, --port <number>', 'Port to run server', '4005')
  .action(async (filename = 'notes.js', options: { port: string }) => {
    try {
      // access file whether user provides exact path or not
      const dir = path.join(process.cwd(), path.dirname(filename))
      // use proxy if execution environment is not production
      await serve(
        parseInt(options.port),
        path.basename(filename),
        dir,
        !isProduction
      )
      console.log(
        `Opened '${filename}'. Navigate to http://localhost:${options.port} to edit the file.`
      )
    } catch (err: any) {
      if (err.code === 'EADDRINUSE') {
        console.error(
          `Port is in use.  Try running on a different port.
          Hint: use -p flag to choose port, or run 'serve --help' for options`
        )
      } else {
        console.log('A problem occurred:', err.message)
      }
      process.exit(1) // force exit with unsuccessful run of program
    }
  })
