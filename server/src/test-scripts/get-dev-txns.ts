import { ArweaveProvider } from '../providers/arweave.provider'
import log from '../utils/logger'

import { WalletProvider } from '../providers/wallet.provider'
import { ClientDelegatedTxnDto } from '../types/dto'
const arweaveProvider = new ArweaveProvider(new WalletProvider())

const run = async () => {
	const d_posts = await arweaveProvider.getAllDelegatedPosts({ psnap_app_version: '0.1.3', psnap_context: 'development' })
	// log.log(d_posts)
	if (!d_posts.length) return
	const txns = await arweaveProvider.getPostData(d_posts)

	const results: boolean[] = []
	// txns.forEach((txn: ClientDelegatedTxnDto) => {
	// 	results.push(arweaveProvider.verifyHash(txn))
	// })
	const delegated_post_data = txns[0]
	// console.log(delegated_post_data)

	const { dpost_hash, dpost_owner, dpost_signature } = delegated_post_data
	const verifyHash = arweaveProvider.verifyHash(delegated_post_data)
	const verifyOwnership = arweaveProvider.verifyOwnership(dpost_owner, dpost_hash, new Buffer(dpost_signature, 'base64'))

	log.log(`verifyHash: ${verifyHash}`)
	log.log(`verifyOwnership: ${verifyOwnership}`)
}

run()
