import axios from 'axios'
import { ClientDelegatedTxnDto } from '../types/dto'
import crypto from 'crypto'
import { jwk2pem } from 'pem-jwk'
import constants from 'constants'
import { ArweaveProvider } from '../providers/arweave.provider'
import log from '../utils/logger'

import { WalletProvider } from '../providers/wallet.provider'
import { async } from 'rxjs/internal/scheduler/async'
const arweaveProvider = new ArweaveProvider(new WalletProvider())

const run = async () => {
	const d_posts = await arweaveProvider.getAllDelegatedPosts()
	log.log(d_posts)
	if (!d_posts.length) return
	const txns = await arweaveProvider.getPostData(d_posts)
	log.log(txns)
}

run()
