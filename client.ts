// import { createClient } from "@connectrpc/connect";
// import { createConnectTransport } from "@connectrpc/connect-node";
// import { TodoService } from "./todo-service/gen/todo_connect";

// const transport = createConnectTransport({
//   baseUrl: "http://localhost:8080",
//   httpVersion: "1.1"
// });

// async function main() {
//   const client = createClient(TodoService, transport);
//   const res = await client.getTodoList({ q: "walk" })
//   console.log(res);
// }
// void main();