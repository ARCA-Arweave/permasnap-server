// import Arweave from 'arweave/web'
import { JWKInterface } from 'arweave/web/lib/wallet'

import Arweave from 'arweave/web'
// let Arweave 
// if(process.env.NODE_ENV === 'test'){ Arweave = require('arweave/node') } else{ Arweave = require('arweave/web') } //hack for testing to work

const arweave = Arweave.init({}) //lets use ARCA node when it's up

export const generateWallet = async ():Promise<JWKInterface> => {
	return await arweave.wallets.generate()
}

export const getAddress = async (gWallet: JWKInterface):Promise<string> => {
	return await arweave.wallets.jwkToAddress(gWallet)
}


export const isInstanceofJwkInterface = (obj: object):boolean => {
	let result = true;
	['kty', 'n', 'e', 'd', 'p', 'q', 'dp', 'dq', 'qi'].forEach(keyname => {
		if( obj.hasOwnProperty(keyname) === false){
			result = false
		}
	})
	return result
}

