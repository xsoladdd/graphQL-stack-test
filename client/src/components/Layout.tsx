import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";

type Props = {
  children?: ReactNode;
  title?: string;
  loading?: boolean;
};

const Layout = ({
  children,
  title = "Next Graphql",
  loading = false,
}: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav style={{ display: "flex", gap: "10px" }}>
        <Link href="/">
          <a>Todo list</a>
        </Link>
        <Link href="/addTodo">
          <a>Add Todo</a>
        </Link>
      </nav>
    </header>
    {loading ? <h1>Loading</h1> : children}
    <footer>
      <hr />
      <span>I'm here to stay (Footer)</span>
    </footer>
  </div>
);

export default Layout;
