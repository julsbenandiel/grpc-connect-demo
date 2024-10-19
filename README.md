## Services

## Foldering
#### todo-service
note: uses [buf](https://buf.build/docs/) to generate proto definitions instead of protoc
- **handlers**: service implementation
- **gen**: generated files after `yarn buf-gen` (if cli, `buf generate`) 
- **proto**: where proto files are stored

## Notes
#### todo-service
**Call client using curl:** \
curl \
  --header 'Content-Type: application/json' \
  --data '{}' \
  http://localhost:8080/todo.TodoService/GetTodoList
  
**Call client using postman:** \
method: POST \
body: {} \
url: http://localhost:8080/todo.TodoService/GetTodoList
