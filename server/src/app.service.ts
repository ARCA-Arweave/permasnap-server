import { Injectable } from '@nestjs/common'
import { ClientDelegatedTxnDto } from './types/dto'
import log from './utils/logger'
import { ArweaveProvider } from './providers/arweave.provider'
import { AxiosResponse } from 'axios'

@Injectable()
export class AppService {
	constructor(private readonly arweaveProvider: ArweaveProvider) {}
	async delegatedPost(delegated_post_data: ClientDelegatedTxnDto): Promise<string | AxiosResponse | any> {
		try {
			// log.log(delegated_post_data)
			const { dpost_hash, dpost_owner, dpost_signature } = delegated_post_data

			/** Step - 1 Check if the hash already exists on arweave */

			const hash_exists = await this.arweaveProvider.checkPostExists(dpost_hash, dpost_owner)
			if (hash_exists.length) return new Error('this delegated post hash already exists')

			/** Step - 2 verify the signature */

			if (!this.arweaveProvider.verify(dpost_owner, dpost_hash, Buffer.from(dpost_signature, 'base64'))) return new Error('dpost_signature could not be verified.')
			/** Step 3 - Post to Arweave */
			return await this.arweaveProvider.postDelegatedTxn(delegated_post_data)
		} catch (err) {
			throw 'err'
		}
	}
}
