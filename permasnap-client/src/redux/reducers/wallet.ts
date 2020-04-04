import { JWKInterface } from "arweave/web/lib/wallet"
import { Action, ActionTypes } from "../actions"


export const walletReducer = ( state: JWKInterface | {} = {}, action: Action ) => {
	switch(action.type){
		case ActionTypes.CHANGE_WALLET:
			return action.payload
		default:
			return state
	}
}
