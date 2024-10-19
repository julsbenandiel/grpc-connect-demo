### foldering
note: uses [buf](https://buf.build/docs/) to generate definitions instead of protoc



### call client using curl:
curl \
  --header 'Content-Type: application/json' \
  --data '{}' \
  http://localhost:8080/todo.TodoService/GetTodoList