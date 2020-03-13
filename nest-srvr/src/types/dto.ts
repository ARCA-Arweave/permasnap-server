import { ApiProperty, ApiPropertyOptional, ApiPropertyOptions } from '@nestjs/swagger'
import { IsBase64, IsString, MaxLength, IsOptional, IsArray } from 'class-validator'

export class ClientDelegatedTxnDto {
	/** Permasnap Parameters */
	@ApiProperty()
	@IsBase64()
	psnap_image: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	@MaxLength(600)
	psnap_description?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	psnap_location_country?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	psnap_location_city?: string

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	psnap_location_free_text?: string

	@ApiPropertyOptional()
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
