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
    method: "GET",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      const task = database.selectById("tasks", id);

      if (!task) {
        return res.writeHead(404, "Id doesn't exist").end()
      }

      return res.end(JSON.stringify(task));
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
      const { id } = req.params;

      const task = database.selectById("tasks", id);

      if (!task) {
        return res.writeHead(404, "Id doesn't exist").end()
      }

      if (!req.body) {
        return res.writeHead(400, "Body required").end();
      }

      const { title, description } = req.body;

      if (!title || !description) {
        return res.writeHead(400, "Title and Description should be on Body Request")
      }

      database.update("tasks", id, {
        title,
        description,
        updatedAt: new Date(),
      });

      return res.writeHead(204).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      const task = database.selectById("tasks", id);

      if (!task) {
        return res.writeHead(404, "Id doesn't exist").end()
      }

      database.delete("tasks", id);

      return res.writeHead(204).end();
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params;

      const task = database.selectById("tasks", id);

      if (!task) {
        return res.writeHead(404, "Id doesn't exist").end()
      }

      database.update("tasks", id, {
        completedAt: new Date(),
        updatedAt: new Date(),
      });

      return res.writeHead(204).end();
    },
  },
];
