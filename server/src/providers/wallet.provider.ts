import { Injectable } from '@nestjs/common'
<<<<<<< HEAD
import wallet from 'src/secrets/arweave-keyfile.json'
=======
import wallet from '../secrets/arweave-keyfile.json'
>>>>>>> 76cc3342839d5e6a1813b1f4e227d5ea93b29c67
import log from '../utils/logger'

@Injectable()
export class WalletProvider {
	get wallet() {
		return wallet
	}
}
