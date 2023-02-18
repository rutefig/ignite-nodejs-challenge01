import { randomUUID } from "node:crypto";
import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const tasks = database.select("tasks");

      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body;

      const task = {
        id: randomUUID(),
        title,
        description,
        completedAt: null,
        createdAt: new Date(),
        updatedAt: null,
      };

      database.insert("tasks", task);

      return res.writeHead(201).end();
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      console.log("PUT /tasks");
      const { id } = req.params;

      if (!req.body) {
        return res.writeHead(400, 'Body required').end()
      }

      const { title, description } = req.body;

      database.update("tasks", id, {
        title,
        description,
        updatedAt: new Date()
      });

      return res.writeHead(204).end();
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
        const { id } = req.params

        database.delete("tasks", id)

        return res.writeHead(204).end()
    }
  }
];
