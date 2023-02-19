# ignite-nodejs-challenge01

This project is an API for managing tasks, it does not uses any backend framework, and it has the following endpoints:

- `POST /tasks` -- creation of a task with title and description
- `GET /tasks` -- gets the list of all tasks
- `PUT /tasks/:id` -- updates the title and description of a task by the id
- `DELETE /tasks/:id` -- deletes a task by the id
- `PATCH /tasks/:id/complete` -- updates the completion date of a task
- `GET /tasks/:id` -- gets a task by the id

To run the project you may run:

```
npm run dev
```

Since this project does not have any dependency you don't need to do `npm install`