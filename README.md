## Services

## todo-service
### ✔ Foldering
- **handlers**: service implementation
- **gen**: generated files after `yarn buf-gen` (if cli, `buf generate`) 
- **proto**: where proto files are stored

### ✔ Testing
**Call client using curl:**
```
curl \
  --header 'Content-Type: application/json' \
  --data '{}' \
  http://localhost:8080/todo.TodoService/GetTodoList
```
  
**Call client using postman:**
```
method: POST
body: {} - empty object (need, else it throws error)
url: http://localhost:8080/todo.TodoService/GetTodoList
```

### ✔ Notes
- uses [buf](https://buf.build/docs/) to generate proto definitions instead of protoc
- to start server run `yarn dev`
- to generate file files from .proto run `yarn buf-gen`
