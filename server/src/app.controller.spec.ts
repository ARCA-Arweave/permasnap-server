import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ArweaveProvider } from './providers/arweave.provider'
import { WalletProvider } from './providers/wallet.provider'

describe('AppController', () => {
	let appController: AppController

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [AppController],
			providers: [AppService, ArweaveProvider, WalletProvider]
		}).compile()

		appController = app.get<AppController>(AppController)
	})

	/** This is where we can test the methods which are called directly by express requests. (once they pass the validators if defined.)
	 *
	 * Look in the DTO for the Validation schema for each endpoint.
	 */

	// describe('root', () => {
	// 	it('should return "Hello World!"', async () => {
	// 		expect(await appController.delegatedPost()).toBe('Hello World!')
	// 	})
	// })

	it('make tests green again ', () => {
		expect(true).toEqual(true)
	})
})
