import { ClientDelegatedTxnDto } from "../../../server/src/types/dto";

// const key = arweaveProvider.generateWallet().then(async jwk => {
// 	const pub_key = jwk.n

// 	const image_parts = image.split(',')

// 	const txn_payload: ClientDelegatedTxnDto = {
// 		psnap_image: image_parts[1],
// 		psnap_image_encoding: image_parts[0],
// 		psnap_app_version: '0.1.3',
// 		psnap_description: 'This is the description for a test permasnap transaction omfg.',
// 		psnap_content_tag: ['#groovy', '#test-transaction'],
// 		psnap_context: 'development',
// 		psnap_location_city: 'Kilkenny',
// 		psnap_location_country: 'Eire',
// 		psnap_location_free_text: 'Quarantine',
// 		dpost_hash: '',
// 		dpost_owner: pub_key,
// 		dpost_signature: '',
// 		dpost_version: '0.1'
// 	}

// 	txn_payload.dpost_hash = arweaveProvider.hashPayload(txn_payload)
// 	txn_payload.dpost_signature = arweaveProvider.sign(jwk, txn_payload.dpost_hash).toString('base64')

// 	try {
// 		const res = await axios.post('http://localhost:3000/d_post/', txn_payload)
// 		console.log(res.data)
// 	} catch (err) {
// 		console.log(err.response.data)
// 		// console.log(Object.keys(err))
// 	}
// })

