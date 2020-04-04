import { Dispatch } from 'redux';
import axios from 'axios';
import { ActionTypes } from './actionTypes';
import { ITodo } from '../reducers/reducerTypes';

export interface FetchTodosAction {
  type: ActionTypes.fetchTodos;
  payload: ITodo[];
}

export interface DeleteTodoAction {
  type: ActionTypes.deleteTodo;
  payload: number;
}

const url = 'https://jsonplaceholder.typicode.com/users';

export const fetchTodos = () => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<ITodo[]>(url); // shows that we're expecting an array of Todos implementing the Todo interface

    dispatch<FetchTodosAction>({
      type: ActionTypes.fetchTodos,
      payload: response.data
    });
  };
};

export const deleteTodo = (id: number): DeleteTodoAction => {
  return {
    type: ActionTypes.deleteTodo,
    payload: id
  };
};
