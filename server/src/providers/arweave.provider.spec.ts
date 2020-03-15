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
		expect(provider.verify(pub_key, hash, signature)).toEqual(true)
	})

	it('verify (wrong public key) - should fail', async () => {
		const jwk = await provider.ar_instance.wallets.generate()
		const other_jwk = await provider.ar_instance.wallets.generate()
		const other_pub_key = other_jwk.n
		const verification_message = JSON.stringify({ message: 'im arbitrary' })
		const hash = provider.hash(verification_message)
		const signature = provider.sign(jwk, hash)
		expect(provider.verify(other_pub_key, hash, signature)).toEqual(false)
	})

	it('verify (verify wrong hash) - should fail', async () => {
		const jwk = await provider.ar_instance.wallets.generate()
		const pub_key = jwk.n
		const verification_message = JSON.stringify({ message: 'im arbitrary' })
		const hash = provider.hash(verification_message)
		const other_hash = provider.hash('im a wrong hash !!! D:')
		const signature = provider.sign(jwk, hash)
		expect(provider.verify(pub_key, other_hash, signature)).toEqual(false)
	})

	/** checkPostExists */

	it('checkPostExists - should find existing post', () => {})

	it('checkPostExists - should fail to find existing post', () => {})
})

// describe('root', () => {
// 	it('should return "Hello World!"', async () => {
// 		expect(await appController.delegatedPost()).toBe('Hello World!')
// 	})
// })
