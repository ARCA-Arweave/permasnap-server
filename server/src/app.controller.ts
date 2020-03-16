import { Controller, Get, Post, Body } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiOperation, ApiBody } from '@nestjs/swagger'
import { ClientDelegatedTxnDto } from './types/dto'

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Post('d_post')
	@ApiOperation({ summary: 'Send Delegated Post', description: 'Instructs the server to send a delegated post on your behalf.' })
	@ApiBody({ type: ClientDelegatedTxnDto })
	async delegatedPost(@Body() delegated_post_data: ClientDelegatedTxnDto) {
		const res = await this.appService.delegatedPost(delegated_post_data)
		return res
	}
}
