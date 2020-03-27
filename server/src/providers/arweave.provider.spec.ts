import { Test, TestingModule } from '@nestjs/testing'
import { ArweaveProvider } from './arweave.provider'
import { WalletProvider } from './wallet.provider'
import log from '../utils/logger'

describe('Arweave Provider', () => {
	let provider: ArweaveProvider

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ArweaveProvider, WalletProvider]
		}).compile()

		provider = module.get<ArweaveProvider>(ArweaveProvider)
	})

	/** verify */

	it('verify - should pass', async () => {
		// generate private key
		const jwk = await provider.ar_instance.wallets.generate()
		// public key
		const pub_key = jwk.n
		// arbitrary data
		const verification_message = JSON.stringify({ message: 'im arbitrary' })
		// hash it
		const hash = provider.hash(verification_message)
		// sign the hash
		const signature = provider.sign(jwk, hash)
		// verify that private key connected to the public key signed the hash, and that the hash is correct.
		expect(provider.verifyOwnership(pub_key, hash, signature)).toEqual(true)
	})

	it('verifyOwnership (wrong public key) - should fail', async () => {
		const jwk = await provider.ar_instance.wallets.generate()
		const other_pub_key = await provider.ar_instance.wallets.generate().then(jwk => jwk.n)
		const verification_message = JSON.stringify({ message: 'im arbitrary' })
		const hash = provider.hash(verification_message)
		const signature = provider.sign(jwk, hash)
		expect(provider.verifyOwnership(other_pub_key, hash, signature)).toEqual(false)
	})

	it('verifyOwnership (wrong hash) - should fail', async () => {
		const jwk = await provider.ar_instance.wallets.generate()
		const pub_key = jwk.n
		const verification_message = JSON.stringify({ message: 'im arbitrary' })
		const hash = provider.hash(verification_message)
		console.log(hash)
		const other_hash = provider.hash('im a wrong hash !!! D:')
		const signature = provider.sign(jwk, hash)
		expect(provider.verifyOwnership(pub_key, other_hash, signature)).toEqual(false)
	})

	/** checkPostExists */

	it('checkPostExists - should find existing post', async () => {
		const dpost_hash = '75be7fadf19f2787672925c256492de034d80e8b1ae9057cc7adfbc4274cc083'
		const results = await provider.checkPostExists(dpost_hash)
		const exists = results.length === 0 ? false : true
		expect(exists).toEqual(true)
	})

	/** verifyHash */

	it('verifyHash - should pass', async () => {
		const id = 'gEgy2wQ-uKixoiZgvc_cU0R-E5vmRgCqLzZd_W-TryU'
		const post_data = await provider.getPostData([id])
		log.log(post_data)
		const verified = provider.verifyHash(post_data[0])
		expect(verified).toEqual(true)
	})
})
