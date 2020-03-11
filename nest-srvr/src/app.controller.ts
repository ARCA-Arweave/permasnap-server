import { Controller, Get, Post, Body } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiOperation, ApiBody } from '@nestjs/swagger'
import { ClientDelegatedTxnDto } from './types/types'

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Post('delegated_post')
	@ApiOperation({ summary: 'Send Delegated Post', description: 'Instructs the server to send a delegated post on your behalf.' })
	@ApiBody({ type: ClientDelegatedTxnDto })
	async delegatedPost(@Body() delegated_post_data: ClientDelegatedTxnDto) {
		this.appService.delegatedPost(delegated_post_data)
	}
}
