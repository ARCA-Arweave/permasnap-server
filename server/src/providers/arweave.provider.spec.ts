import { Test, TestingModule } from '@nestjs/testing'
import { ArweaveProvider } from './arweave.provider'
import { WalletProvider } from './wallet.provider'

describe('Arweave Provider', () => {
	let provider: ArweaveProvider

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ArweaveProvider, WalletProvider]
		}).compile()

		provider = module.get<ArweaveProvider>(ArweaveProvider)
	})

	/** verifyHash */

	it('verifyHash - verification should pass', async () => {
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
		// verify that private key connected to the public key signed the hash
		expect(provider.verifyOwnership(pub_key, hash, signature)).toEqual(true)
	})

	it('verifyHash - verification should fail', async () => {
		// generate private key
		const jwk = await provider.ar_instance.wallets.generate()
		// public key
		const pub_key = jwk.n
		// generate another key
		const other_jwk = await provider.ar_instance.wallets.generate()
		const other_pub_key = other_jwk.n
		// arbitrary data
		const verification_message = JSON.stringify({ message: 'im arbitrary' })
		// hash it
		const hash = provider.hash(verification_message)
		// sign the hash
		const signature = provider.sign(jwk, hash)
		// verify that private key connected to the public key signed the hash
		expect(provider.verifyOwnership(other_pub_key, hash, signature)).toEqual(false)
	})

	/** checkPostExists */

	it('checkPostExists - should find existing post', () => {})

	it('checkPostExists - should fail to find existing post', () => {})

	/** verifyOwnership */

	it('verifyOwnership - verification should pass', () => {})

	it('verifyOwnership - verification should fail', () => {})
})

// describe('root', () => {
// 	it('should return "Hello World!"', async () => {
// 		expect(await appController.delegatedPost()).toBe('Hello World!')
// 	})
// })
