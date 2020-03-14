export interface IPSnapPayload {
	psnap_image: string
	psnap_description?: string
	psnap_location_country?: string
	psnap_location_city?: string
	psnap_location_free_text?: string
	psnap_content_tag?: string[]
	psnap_app_version: string
	psnap_context: 'development' | 'production'
}
