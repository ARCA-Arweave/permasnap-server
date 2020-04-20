import { Injectable } from '@nestjs/common'
import wallet from 'src/secrets/arweave-keyfile.json'
import log from '../utils/logger'

@Injectable()
export class WalletProvider {
	get wallet() {
		return wallet
	}
}
