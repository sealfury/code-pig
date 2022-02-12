import { Command } from 'commander'
import { serve } from 'local-api'

export const serveCommand = new Command()
  // [] = optional value; <> = required value
  .command('serve [filename]')
  .description('Open a file to edit')
  .option('-p, --port <number>', 'Port to run server', '4005')
  .action((filename = 'notes.js', options: { port: string }) => {
    serve(parseInt(options.port), filename, '/dir/')
  })
