import express from 'express'
import next from 'next'

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})

app.prepare().then(() => {
  const server = express()

  server.use(express.static('public')) // Serve favicon.ico

  server.get('/project/:projectId', (req, res) => {
    app.render(req, res, '/project', {
      ...req.query,
      projectId: req.params.projectId
    })
  })

  server.get('*', (req, res) => {
    app.render(req, res, req.params[0], req.query)
  })

  server.listen(port, err => {
    if (err) {
      throw err
    }

    console.log(`> Ready on http://localhost:${port}`)
  })
})
