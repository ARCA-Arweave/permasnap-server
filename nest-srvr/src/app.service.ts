import { Injectable } from '@nestjs/common'
import { ClientDelegatedTxnDto } from './types/types'
import log from './utils/logger'
import { WalletProvider } from './wallet.provider'

@Injectable()
export class AppService {
	constructor(private readonly walletProvider: WalletProvider) {}
	async delegatedPost(delegated_post_data: ClientDelegatedTxnDto): Promise<string> {
		log.log(delegated_post_data)
		return 'Hello World!'
	}
}
