import { DeleteTodoAction, FetchTodosAction } from './todos';
import { GetWalletAction } from './wallet';

export enum ActionTypes {
  /* todo actions */
  fetchTodos = 'fetchTodos',
  deleteTodo = 'deleteTodo',
  /* wallet actions */
  CHANGE_WALLET = 'CHANGE_WALLET',
  /* other actions... */
}

export type Action = FetchTodosAction | DeleteTodoAction | GetWalletAction
// this along with the enum
//sets up an implicit type guard in the reducer
