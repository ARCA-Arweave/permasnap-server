import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { reducers } from './reducers'
import { persistStore } from 'redux-persist';


const middleware = [thunk]


const store = createStore(
	reducers, 
	compose(
		applyMiddleware(...middleware),
		(window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
	)
)
export const persistor = persistStore(store)
export default store
