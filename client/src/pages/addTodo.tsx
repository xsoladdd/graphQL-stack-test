import React, { useState } from "react";
import { NextPage } from "next";
import Layout from "../components/Layout";
import {
  useAddTodoMutation,
  TodosQueryDocument,
} from "../graphql/generated/graphql";

interface aboutProps {
  children: React.ReactChild;
}

const about: NextPage<aboutProps> = ({}) => {
  const [todo, setTodo] = useState("");

  const [addTodo, { loading }] = useAddTodoMutation({
    refetchQueries: ["getTodos"],
    onCompleted: (params) => console.log("request completed", params),
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo({
      variables: {
        input: todo,
      },
    });
  };

  return (
    <Layout title="Home | Next.js + TypeScript Example" loading={loading}>
      <h1>Add Todo 👋</h1>
      <form action="#" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="txtInput">Todo: </label>
        <input
          id="txtInput"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </Layout>
  );
};
export default about;
