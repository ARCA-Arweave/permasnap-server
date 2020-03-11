import { Injectable } from '@nestjs/common'
import { ClientDelegatedTxnDto } from './types/types'
import log from './utils/logger'

@Injectable()
export class AppService {
	async delegatedPost(delegated_post_data: ClientDelegatedTxnDto): Promise<string> {
		log.log(delegated_post_data)
		return 'Hello World!'
	}
}
