import { todosReducer } from './todos';
import { walletReducer } from './wallet';
import { IStoreState } from './reducerTypes';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' //defaults to local storage for web
import * as keyStorageProvider from '../../providers/KeystorageProvider'
import { isPlatform } from '@ionic/react';


let keyStorage = storage // stores wallet unsafely for non-production web environment
if(isPlatform('hybrid')){
	keyStorage = keyStorageProvider
	keyStorageProvider.runTesting() // make this run only in test environment?
}

const rootPersistConfig = {
	key: 'root',
	storage: storage,
	blacklist: ['wallet']
}

const walletPersistConfig = {
	key: 'wallet',
	storage: keyStorage, 
}

const rootReducer = combineReducers({
	wallet: persistReducer(walletPersistConfig, walletReducer),
	todos: todosReducer
})

export const reducers = persistReducer(rootPersistConfig, rootReducer)



export * from './reducerTypes'
export * from './todos'
export * from './wallet'