import { Command } from 'commander'
import path from 'path'
import { serve } from 'local-api'

export const serveCommand = new Command()
  // [] = optional value; <> = required value
  .command('serve [filename]')
  .description('Open a file to edit')
  .option('-p, --port <number>', 'Port to run server', '4005')
  .action((filename = 'notes.js', options: { port: string }) => {
    // access file whether user provides exact path or not
    const dir = path.join(process.cwd(), path.dirname(filename))
    serve(parseInt(options.port), path.basename(filename), dir)
  })
