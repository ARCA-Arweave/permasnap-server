import Arweave from 'arweave/web'
import { JWKInterface } from 'arweave/web/lib/wallet'

const arweave = Arweave.init({}) //lets use ARCA node when it's up

export const generateWallet = async () => {
	return await arweave.wallets.generate()
}

export const getAddress = async (gWallet: JWKInterface) => {
	return await arweave.wallets.jwkToAddress(gWallet)
}


