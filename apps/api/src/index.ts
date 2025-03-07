import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import * as movies_metadata from "./../movies_metadata.json" assert { type: "json" }
import { cors } from 'hono/cors'

const app = new Hono().basePath("/api/movies")

app.use("*", cors())

app.get("/", async (c) => {
  return c.json({
    movies: movies_metadata
  })
})

app.get("/:id", async (c) => {
  const id = Number.parseInt(c.req.param("id"))

  const movie = movies_metadata.default.find((movie) => movie.id === id)

  if (!movie) {
    return c.json({
      message: "Movie not found"
    }, 404)
  }

  return c.json({
    movie
  })
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
