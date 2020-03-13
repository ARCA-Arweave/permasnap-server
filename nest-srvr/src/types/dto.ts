import { ApiProperty } from '@nestjs/swagger'
import { IsBase64, IsString, MaxLength, IsOptional, IsArray } from 'class-validator'

export class ClientDelegatedTxnDto {
	/** Permasnap Parameters */
	@ApiProperty()
	@IsBase64()
	psnap_image: string

	@ApiProperty()
	@IsOptional()
	@IsString()
	@MaxLength(600)
	psnap_description?: string

	@ApiProperty()
	@IsOptional()
	@IsString()
	psnap_location_country?: string

	@ApiProperty()
	@IsOptional()
	@IsString()
	psnap_location_city?: string

	@ApiProperty()
	@IsOptional()
	@IsString()
	psnap_location_free_text?: string

	@ApiProperty()
	@IsOptional()
	@IsArray()
	psnap_content_tag?: string[]

	@ApiProperty()
	@IsString()
	psnap_app_version: string = '0.1'

	@ApiProperty()
	@IsString()
	psnap_context: 'development' | 'production'

	/** Delegated Posting Parameters */
	@ApiProperty()
	@IsString()
	dpost_version: string

	@ApiProperty()
	@IsString()
	dpost_owner: string

	@ApiProperty()
	@IsString()
	dpost_hash: string
}