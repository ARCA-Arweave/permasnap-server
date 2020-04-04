import { ActionTypes } from './actionTypes';
import { JWKInterface } from 'arweave/web/lib/wallet';

export interface GetWalletAction {
	type: ActionTypes.CHANGE_WALLET
	payload: JWKInterface
}

export const changeWallet = (jwk: JWKInterface): GetWalletAction => {
	return {
		type: ActionTypes.CHANGE_WALLET,
		payload: jwk
	}
}


