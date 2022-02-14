import express, { json, Request, Response } from 'express'
import fs from 'fs/promises'
import path from 'path'

interface Cell {
  id: string
  content: string
  type: 'text' | 'code'
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router()
  router.use(json())

  const fullPath = path.join(dir, filename)

  router.get('/cells', async (req: Request, res: Response) => {
    try {
      // Ensure the cell storage file exits
      const result = await fs.readFile(fullPath, { encoding: 'utf-8' })

      // Parse list of cells & send to browser
      res.status(200).send(JSON.parse(result))
    } catch (err: any) {
      // Inspect error if read throws one, check if file exists
      if (err.code === 'ENOENT') {
        // Create file and add default cells
        await fs.writeFile(fullPath, '[]', 'utf-8')
        res.send([])
      } else {
        throw err
      }
    }
  })

  router.post('/cells', async (req: Request, res: Response) => {
    // Serialize of cells from request object
    const { cells }: { cells: Cell[] } = req.body

    // Write cells into file
    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8')

    res.status(201).send()
  })

  return router
}
