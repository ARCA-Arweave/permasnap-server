import { Injectable } from '@nestjs/common'
import wallet from '../secrets/arweave-keyfile-ASd5vJJaEbwHQHQVTGQ9sh3kDb-EIjBL39r-YTOt9vM.json'
import log from '../utils/logger'

@Injectable()
export class WalletProvider {
	get wallet() {
		return wallet
	}
}
