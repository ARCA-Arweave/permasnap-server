import { Injectable } from '@nestjs/common'
import { ClientDelegatedTxnDto } from './types/dto'
import log from './utils/logger'
import { ArweaveProvider } from './providers/arweave.provider'

@Injectable()
export class AppService {
	constructor(private readonly arweaveProvider: ArweaveProvider) {}
	async delegatedPost(delegated_post_data: ClientDelegatedTxnDto): Promise<string> {
		try {
			const { dpost_hash, dpost_owner, dpost_signature } = delegated_post_data

			/** Step - 1 Check if the hash already exists on arweave */

			const hash_exists = await this.arweaveProvider.checkPostExists(dpost_hash, dpost_owner)
			if (hash_exists.length) throw 'this delegated post hash already exists'

			/** Step - 2 verify the signature */

			if (!this.arweaveProvider.verify(dpost_owner, dpost_hash, Buffer.from(dpost_signature, 'utf8'))) throw 'dpost_signature could not be verified.'

			/** Step 3 - Post to Arweave */

			await this.arweaveProvider.postDelegatedTxn(delegated_post_data)

			return 'Success'
		} catch (err) {
			throw 'err'
		}
	}
}
