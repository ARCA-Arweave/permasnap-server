import { todosReducer } from './todos';
import { walletReducer } from './wallet';
import { IStoreState } from './reducerTypes';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' //defaults to local storage for web


const rootPersistConfig = {
	key: 'root',
	storage,
	blacklist: ['wallet']
}

const walletPersistConfig = {
	key: 'wallet',
	storage, //change this to secure version
}

const rootReducer = combineReducers({
	wallet: persistReducer(walletPersistConfig, walletReducer),
	todos: todosReducer
})

export const reducers = persistReducer(rootPersistConfig, rootReducer)



export * from './reducerTypes'
export * from './todos'
export * from './wallet'