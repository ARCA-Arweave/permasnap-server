import { combineReducers } from 'redux';
import { JWKInterface } from 'arweave/web/lib/wallet';
import { todosReducer } from './todos';
import { walletReducer } from './wallet';

export interface ITodo {
  id: number;
  title: string;
  name: string;
  completed: boolean;
}

//export interface IWallet <- single object already defined by JWKInterface

export interface IStoreState {
  todos: ITodo[];
  wallet: JWKInterface | {}; // remove these nulls later
}

