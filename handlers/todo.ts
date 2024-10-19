import { ConnectRouter } from "@connectrpc/connect";
import { CreateTodoRequest, GetTodoListRequest } from "../gen/todo_pb";
import { TodoService } from "../gen/todo_connect";

export function todoServiceHandler(router: ConnectRouter) {
  return router.service(TodoService, {
    createTodo: async (request: CreateTodoRequest) => {
      return {
        todo: {
          id: "1",
          todo: request.todo
        }
      }
    },
    getTodoList: async(request: GetTodoListRequest) => {
      return {
        count: 10,
        todos: [
          { id: "1", todo: "Walk the dog", createdAt: new Date().toString() },
          { id: "2", todo: "Take out trash", createdAt: new Date().toString() },
        ]
      } 
    }
  })
}

