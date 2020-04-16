// import Arweave from 'arweave/web'
let Arweave
if(process.env.NODE_ENV === 'test'){
	Arweave = require('arweave/node')
}else{
	Arweave = require('arweave/web')
}
import { JWKInterface } from 'arweave/web/lib/wallet'
import { isPlatform } from '@ionic/react'

const arweave = Arweave.init({}) //lets use ARCA node when it's up

export const generateWallet = async () => {
	return await arweave.wallets.generate()
}

export const getAddress = async (gWallet: JWKInterface) => {
	return await arweave.wallets.jwkToAddress(gWallet)
}

export type IJwkInterface = JWKInterface 

export const isInstanceofJwkInterface = (obj: object):boolean => {
	let result = true;
	['kty', 'n', 'e', 'd', 'p', 'q', 'dp', 'dq', 'qi'].forEach(keyname => {
		if( obj.hasOwnProperty(keyname) === false){
			result = false
		}
	})
	return result
}

