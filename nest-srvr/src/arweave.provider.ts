import { Injectable } from '@nestjs/common'
import crypto from 'crypto'
import constants from 'constants'
import Arweave from 'arweave/node'
import { jwk2pem } from 'pem-jwk'
import { JWKInterface } from 'arweave/node/lib/wallet'

@Injectable()
export class ArweaveProvider {
	hash_algorithm = 'sha256'

	ar_instance = Arweave.init({
		host: 'arweave.net', // Hostname or IP address for a Arweave host
		port: 443, // Port
		protocol: 'https', // Network protocol http or https
		timeout: 20000, // Network request timeouts in milliseconds
		logging: false // Enable network request logging})
	})

	generateAndTest = async () => {
		this.ar_instance.wallets.generate().then(async key => {
			const wallet_from_key = await this.ar_instance.wallets.jwkToAddress(key)
			const pub_key = key.n
			var pem = jwk2pem(key)
			const signature_payload = 'hihi'
			const signed_message = this.sign(key, signature_payload)
			console.log(signed_message)
			console.log(this.verify(pub_key, signature_payload, signed_message))
			// const start_time = Date.now()
			const hash = crypto
				.createHash(this.hash_algorithm)
				.update(
					'984fksjh3289efkhr98feslniw34h8fenlgsrho8984fksjh3289efkhr98feslniw34h8fenlgsrho8984fksjh3289efkhr98feslniw34h8fenlgsrho8984fksjh3289efkhr98feslniw34h8fenlgsrho8984fksjh3289efkhr98feslniw34h8fenlgsrho8984fksjh3289efkhr98feslniw34h8fenlgsrho8984fksjh3289efkhr98feslniw34h8fenlgsrho8984fksjh3289efkhr98feslniw34h8fenlgsrho8984fksjh3289efkhr98feslniw34h8fenlgsrho8984fksjh3289efkhr98feslniw34h8fenlgsrho8984fksjh3289efkhr98feslniw34h8fenlgsrho8984fksjh3289efkhr98feslniw34h8fenlgsrho8984fksjh3289efkhr98feslniw34h8fenlgsrho8984fksjh3289efkhr98feslniw34h8fenlgsrho8984fksjh3289efkhr98feslniw34h8fenlgsrho8984fksjh3289efkhr98feslniw34h8fenlgsrho8984fksjh3289efkhr98feslniw34h8fenlgsrho8984fksjh3289efkhr98feslniw34h8fenlgsrho8984fksjh3289efkhr98feslniw34h8fenlgsrho8984fksjh3289efkhr98feslniw34h8fenlgsrho8984fksjh3289efkhr98feslniw34h8fenlgsrho8984fksjh3289efkhr98feslniw34h8fenlgsrho8984fksjh3289efkhr98feslniw34h8fenlgsrho8984fksjh3289efkhr98feslniw34h8fenlgsrho8'
				)
				.digest('hex')
		})
	}

	sign(jwk: JWKInterface, data_to_sign: string) {
		let rawSignature = crypto
			.createSign(this.hash_algorithm)
			.update(data_to_sign)
			.sign({
				key: jwk2pem(jwk),
				padding: constants.RSA_PKCS1_PSS_PADDING,
				saltLength: 0
			})
		return rawSignature
	}

	verify(public_modulus: string, data: string, signature: Buffer): boolean {
		const public_key = {
			kty: 'RSA',
			e: 'AQAB',
			n: public_modulus
		}
		const pem = jwk2pem(public_key)
		return crypto
			.createVerify(this.hash_algorithm)
			.update(data)
			.verify(
				{
					key: pem,
					padding: constants.RSA_PKCS1_PSS_PADDING,
					saltLength: 0
				},
				signature
			)
	}

	findDelegatedPostInstance(delegated_post: { dpost_hash: string; dpost_owner: string }) {
		const { dpost_hash, dpost_owner } = delegated_post
	}
}
