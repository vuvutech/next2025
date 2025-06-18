import { getTodoListActions } from "@/actions/todo.actions";

import AddTodoForm from "@/components/AddTodoForm";
import TodosTable from "@/components/TodoTable";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();
  if (userId) {
    const todos = await getTodoListActions({ userId });
    return (
      <main className="container py-4 px-4 mx-auto">
        <AddTodoForm userId={userId} />
        <TodosTable todos={todos} />
      </main>
    );
  }
  return (
    <div className="flex items-center justify-center">
      <p>you need to be logged in to see your todos</p>
    </div>
  );
}
