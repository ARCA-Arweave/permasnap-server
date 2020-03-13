import { Injectable } from '@nestjs/common'
import { ClientDelegatedTxnDto, DelegatedPostDataDto } from './types/types'
import log from './utils/logger'
import { ArweaveProvider } from './arweave.provider'

@Injectable()
export class AppService {
	constructor(private readonly arweaveProvider: ArweaveProvider) {}
	async delegatedPost(delegated_post_data: ClientDelegatedTxnDto): Promise<void> {
		log.log(delegated_post_data)
		/** Step 1 Validate the payload */

		/** Step 2 Check if the hash already exists on arweave */

		/** Step 3 Validate the payload */

		/** Step 4 Post to Arweave */
	}
}
