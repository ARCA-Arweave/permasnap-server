import { ApiProperty } from '@nestjs/swagger'

export class ClientDelegatedTxnDto {
	@ApiProperty()
	permasnap_payload: IPermasnapPayload
	@ApiProperty()
	permasnap_location_country?: string
	@ApiProperty()
	permasnap_location_city?: string
	@ApiProperty()
	permasnap_location_free_text?: string
}

export interface IPermasnapPayload {
	comment: string // limit to 1000 characters
	// location?: IPermasnapLocation
}
