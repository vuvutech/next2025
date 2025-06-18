"use client";

import React, { useState } from "react";
import Spinner from "./Spinner";
import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import { deleteTodoActions } from "@/actions/todo.actions";
import EditTodoForm from "./EditTodoForm";
import { ITodo } from "@/interface";

export default function TodoTableActions({ todo }: { todo: ITodo }) {
  // handel Delete
  const onDelete = async (id: string) => {
    setLoading(true);
    await deleteTodoActions({ id });
    setLoading(false);
  };

  const [loading, setLoading] = useState(false);
  return (
    <>
      <EditTodoForm todo={todo} />
      <Button
        size={"icon"}
        variant={"destructive"}
        onClick={() => onDelete(todo.id!)}
      >
        {loading ? <Spinner /> : <Trash />}
      </Button>
    </>
  );
}
