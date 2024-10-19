import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { TodoService } from '@buf/julsbenandiel_grpc-connect-demo.connectrpc_es/todo_connect';

type Todo = {
  id: string
  todo: string
  createdAt: string
}

function App() {
  const [todo, setTodo] = useState<string>('')
  const [count, setCount] = useState(0)
  const [todos, setTodos] = useState<Todo[]>([])
  
  const transport = createConnectTransport({
    baseUrl: "http://localhost:8080",
  });
  
  const client = createClient(TodoService, transport);

  async function getTodos() {
    client
      .getTodoList({})
      .then((res) => setTodos(res.todos))
  }

  function handleCreateTodo(e: React.FormEvent) {
    e.preventDefault()

    if (!todo) alert('Todo is required')

    client
      .createTodo({ todo })
      .then(() => getTodos())
  }

  useEffect(() => {
    getTodos()
    //eslint-disable-next-line
  }, [])

  return (
    <>
      <form onSubmit={handleCreateTodo}>
        <label htmlFor="todo">Todo</label>
        <input 
          id="todo"
          onChange={(e) => setTodo(e.target.value)}
          type="text" 
          name="todo" />
        <hr />
        <button type="submit">Create Todo</button>
      </form>

      {todos.map((todo) => {
        return (
          <div 
            style={{ padding: '1rem' }}
            key={todo.id}>
            <p>{todo.id}</p>
            <p>{todo.todo}</p>
            <p>{new Date(todo.createdAt).toDateString()}</p>
          </div>
        )
      })}


      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
