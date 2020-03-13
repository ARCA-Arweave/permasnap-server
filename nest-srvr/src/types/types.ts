import { ApiProperty } from '@nestjs/swagger'

export class ClientDelegatedTxnDto {
	@ApiProperty()
	psnap_payload: PermasnapPayloadDto
	@ApiProperty()
	dpost_data: DelegatedPostDataDto
}

export class PermasnapPayloadDto {
	@ApiProperty()
	psnap_image: string // b64 string.
	@ApiProperty()
	psnap_description?: string // Max 400 characters
	@ApiProperty()
	psnap_location_country?: string
	@ApiProperty()
	psnap_location_city?: string
	@ApiProperty()
	psnap_location_free_text?: string
	@ApiProperty()
	psnap_content_tag?: string[]
	@ApiProperty()
	psnap_app_version: string = '0.1'
	@ApiProperty()
	psnap_context: 'development' | 'production'
}

export class DelegatedPostDataDto {
	dpost_version: '0.1'
	dpost_owner: string
	dpost_hash: string
}
