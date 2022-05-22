import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Crypto protocol for IDS */
  EncryptedID: any;
};

export type InputIdString = {
  id: Scalars["EncryptedID"];
};

export type Mutation = {
  __typename?: "Mutation";
  addTodo: Todo;
};

export type MutationAddTodoArgs = {
  input: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  getTodo: Todo;
  getTodos: Array<Todo>;
  ping: Scalars["String"];
};

export type QueryGetTodoArgs = {
  input: InputIdString;
};

export type Todo = {
  __typename?: "Todo";
  id: Scalars["EncryptedID"];
  status: Scalars["Boolean"];
  texts: Scalars["String"];
};

export type AddTodoMutationVariables = Exact<{
  input: Scalars["String"];
}>;

export type AddTodoMutation = {
  __typename?: "Mutation";
  addTodo: { __typename?: "Todo"; texts: string; id: any; status: boolean };
};

export type TodosQueryQueryVariables = Exact<{ [key: string]: never }>;

export type TodosQueryQuery = {
  __typename?: "Query";
  getTodos: Array<{
    __typename?: "Todo";
    status: boolean;
    texts: string;
    id: any;
  }>;
};

export const AddTodoDocument = gql`
  mutation addTodo($input: String!) {
    addTodo(input: $input) {
      texts
      id
      status
    }
  }
`;
export type AddTodoMutationFn = Apollo.MutationFunction<
  AddTodoMutation,
  AddTodoMutationVariables
>;

/**
 * __useAddTodoMutation__
 *
 * To run a mutation, you first call `useAddTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTodoMutation, { data, loading, error }] = useAddTodoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddTodoMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddTodoMutation,
    AddTodoMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddTodoMutation, AddTodoMutationVariables>(
    AddTodoDocument,
    options
  );
}
export type AddTodoMutationHookResult = ReturnType<typeof useAddTodoMutation>;
export type AddTodoMutationResult = Apollo.MutationResult<AddTodoMutation>;
export type AddTodoMutationOptions = Apollo.BaseMutationOptions<
  AddTodoMutation,
  AddTodoMutationVariables
>;
export const TodosQueryDocument = gql`
  query todosQuery {
    getTodos {
      status
      texts
      id
    }
  }
`;

/**
 * __useTodosQueryQuery__
 *
 * To run a query within a React component, call `useTodosQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useTodosQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTodosQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useTodosQueryQuery(
  baseOptions?: Apollo.QueryHookOptions<
    TodosQueryQuery,
    TodosQueryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TodosQueryQuery, TodosQueryQueryVariables>(
    TodosQueryDocument,
    options
  );
}
export function useTodosQueryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TodosQueryQuery,
    TodosQueryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TodosQueryQuery, TodosQueryQueryVariables>(
    TodosQueryDocument,
    options
  );
}
export type TodosQueryQueryHookResult = ReturnType<typeof useTodosQueryQuery>;
export type TodosQueryLazyQueryHookResult = ReturnType<
  typeof useTodosQueryLazyQuery
>;
export type TodosQueryQueryResult = Apollo.QueryResult<
  TodosQueryQuery,
  TodosQueryQueryVariables
>;
