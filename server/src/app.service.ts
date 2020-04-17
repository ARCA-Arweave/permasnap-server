import { Injectable, HttpException } from '@nestjs/common'
import { ClientDelegatedTxnDto } from './types/dto'
import log from './utils/logger'
import { ArweaveProvider } from './providers/arweave.provider'
import { AxiosResponse } from 'axios'

@Injectable()
export class AppService {
	constructor(private readonly arweaveProvider: ArweaveProvider) {}
	async delegatedPost(delegated_post_data: ClientDelegatedTxnDto): Promise<string | AxiosResponse | any> {
		try {
			const { dpost_hash, dpost_owner, dpost_signature } = delegated_post_data

			/** Step 0 - Check if item has been posted in DB, if it has, return that TXID */

			/** Step - 1 Check if the hash already exists on arweave */
			const hash_exists = await this.arweaveProvider.checkPostExists(dpost_hash)
			if (hash_exists.length) return new HttpException('this delegated post hash already exists', 500)

			/** Step - 2 verify the signature */
			if (!this.arweaveProvider.verifyOwnership(dpost_owner, dpost_hash, Buffer.from(dpost_signature, 'base64'))) throw 'dpost_signature could not be verified.'

			/** Verify Hash */
			if (!this.arweaveProvider.verifyHash(delegated_post_data)) throw 'hash verification failed.'
			
			/** Step 4 - Post to Arweave */
			return await this.arweaveProvider.postDelegatedTxn(delegated_post_data)
		} catch (err) {
			throw 'err'
		}
	}
}
