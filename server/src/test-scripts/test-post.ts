import axios from 'axios'
import { ClientDelegatedTxnDto } from '../types/dto'
import crypto from 'crypto'
import { jwk2pem } from 'pem-jwk'
import constants from 'constants'
import { ArweaveProvider } from '../providers/arweave.provider'

import { JWKInterface } from 'arweave/node/lib/wallet'
import { WalletProvider } from '../providers/wallet.provider'

import image from './test-image'
;async () => {
	const arweaveProvider = new ArweaveProvider(new WalletProvider())
	const hash_algorithm = 'sha256'

	const wallet = await arweaveProvider.generateWallet()

	const txn_payload: ClientDelegatedTxnDto = {
		psnap_image: image,
		psnap_app_version: '0.1',
		psnap_description: 'This is the description for a test permasnap transaction.',
		psnap_content_tag: ['#groovy', '#test-transaction'],
		psnap_context: 'development',
		psnap_location_city: 'Kilkenny',
		psnap_location_country: 'Eire',
		psnap_location_free_text: 'Quarantine',
		dpost_hash: '',
		dpost_owner: '',
		dpost_signature: '',
		dpost_version: '0.1'
	}
}
