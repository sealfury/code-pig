import { program } from 'commander'
import { serve } from './commands'

program.addCommand(serve)

program.parse(process.argv)
