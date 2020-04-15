import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { logger } from 'redux-logger';
import { reducers } from './reducers'
import { persistStore } from 'redux-persist';


const middleware = [thunk, logger]


const store = createStore(
	reducers, 
	applyMiddleware(...middleware)
)
export const persistor = persistStore(store)
export default store
