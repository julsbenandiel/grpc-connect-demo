import { ConnectRouter } from "@connectrpc/connect";
import { CreateTodoRequest, GetTodoListRequest } from "../gen/todo_pb";
import { TodoService } from "../gen/todo_connect";
import { PrismaClient } from "@prisma/client";
import { set } from 'lodash';

const prisma = new PrismaClient();

export function todoServiceHandler(router: ConnectRouter) {
  return router.service(TodoService, {
    createTodo: async (req: CreateTodoRequest) => {
      const newTodo = await prisma.todo.create({ 
        data: { 
          todo: req.todo 
        }
      })
      
      return {
        todo: {
          ...newTodo,
          createdAt: newTodo.createdAt.toString(),
        }
      }
    },
    
    getTodoList: async (req: GetTodoListRequest) => {
      const filters = {}

      if (req.id)
        set(filters, 'where.id', req.id)

      if (req.q)
        set(filters, 'where.todo.contains', req.q)
      
      const todoList = (await prisma.todo.findMany({
        ...filters,
        orderBy: {
          createdAt: 'desc'
        }
      }))

      return {
        count: todoList.length,
        todos: todoList.map((todo) => ({
          ...todo,
          createdAt: todo.createdAt.toString()
        }))
      }
    }
  })
}

