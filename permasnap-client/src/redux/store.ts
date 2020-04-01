import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { reducers } from './reducers'


const middleware = [thunk]


export default createStore(
	reducers, 
	compose(
		applyMiddleware(...middleware),
		(window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
	)
);