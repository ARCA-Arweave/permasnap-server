import { Test, TestingModule } from '@nestjs/testing'
import { ArweaveProvider } from './arweave.provider'

describe('Arweave Provider', () => {
	let provider: ArweaveProvider

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ArweaveProvider]
		}).compile()

		provider = module.get<ArweaveProvider>(ArweaveProvider)
	})

	/** verifyHash */

	it('verifyHash - verification should pass', () => {
		// expect(provider).toBeDefined()
	})

	it('verifyHash - verification should fail', () => {
		expect(provider).toBeDefined()
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
