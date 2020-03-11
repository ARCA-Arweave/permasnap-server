export interface IClientDelegatedTxnDTO {
	permasnap_payload : IPermasnapPayload
	permasnap_location_country?: string
	permasnap_location_city?: string
	permasnap_location_free_text?: string
}

export interface IPermasnapPayload {
	comment: string // limit to 1000 characters
	// location?: IPermasnapLocation
}