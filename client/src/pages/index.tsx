import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import Layout from "../components/Layout";
import { useTodosQueryQuery } from "../graphql/generated/graphql";
const Index: NextPage = ({}) => {
  const { data, loading } = useTodosQueryQuery({
    fetchPolicy: "cache-and-network",
  });
  return (
    <>
      <Layout title="Home | Next.js + TypeScript Example" loading={loading}>
        <h1>List of todos 👋</h1>
        <ol>
          {data?.getTodos.map(({ id, status, texts }, idx) => (
            <li key={idx}>{texts}</li>
          ))}
        </ol>
      </Layout>
    </>
  );
};
export default Index;
