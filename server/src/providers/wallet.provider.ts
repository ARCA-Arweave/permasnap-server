import { Injectable } from '@nestjs/common'
import wallet from '../secrets/arweave-keyfile.json'
import log from '../utils/logger'

@Injectable()
export class WalletProvider {
	get wallet() {
		return wallet
	}
}
