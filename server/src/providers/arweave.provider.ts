import { Injectable } from '@nestjs/common'
import crypto from 'crypto'
import constants from 'constants'
import Arweave from 'arweave/node'
import { jwk2pem } from 'pem-jwk'
import { JWKInterface } from 'arweave/node/lib/wallet'
import { ClientDelegatedTxnDto } from '../types/dto'
import { WalletProvider } from './wallet.provider'
import log from '../utils/logger'

@Injectable()
export class ArweaveProvider {
	hash_algorithm = 'sha256'
	wallet = this.walletProvider.wallet
	ar_instance
	constructor(private readonly walletProvider: WalletProvider) {
		this.ar_instance = Arweave.init({
			host: 'arweave.net', // Hostname or IP address for a Arweave host
			port: 443, // Port
			protocol: 'https', // Network protocol http or https
			timeout: 20000, // Network request timeouts in milliseconds
			logging: false // Enable network request logging})
		})

		this.ar_instance.wallets.getBalance('ASd5vJJaEbwHQHQVTGQ9sh3kDb-EIjBL39r-YTOt9vM').then(balance => {
			let winston = balance
			let ar = this.ar_instance.ar.winstonToAr(balance)
		})
	}

	generateAndTest = async () => {
		this.ar_instance.wallets.generate().then(async key => {
			const wallet_from_key = await this.ar_instance.wallets.jwkToAddress(key)
			const pub_key = key.n
			var pem = jwk2pem(key)
			const signature_payload = 'hihi'
			const signed_message = this.sign(key, signature_payload)
			console.log(signed_message)
			console.log(this.verify(pub_key, signature_payload, signed_message))
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

	async checkPostExists(dpost_hash: string, dpost_owner: string) {
		try {
			return await this.ar_instance.arql({
				op: 'and',
				expr1: {
					op: 'equals',
					expr1: 'dpost_hash',
					expr2: dpost_hash
				},
				expr2: {
					op: 'equals',
					expr1: 'dpost_owner',
					expr2: dpost_owner
				}
			})
		} catch (err) {
			throw err
		}
	}

	hash(data: string): string {
		return crypto
			.createHash(this.hash_algorithm)
			.update(data)
			.digest('hex')
	}

	verifyHash(post_data: ClientDelegatedTxnDto) {
		const hash = this.hashPayload(post_data)
		if (hash === post_data.dpost_hash) return true // hashes match
		return false // hashes don't match
	}

	hashPayload(post_data: ClientDelegatedTxnDto) {
		const to_hash = {}
		for (let item in post_data) {
			if (item.indexOf('psnap')) {
				to_hash[item] = post_data[item]
			}
		}
		return this.hash(JSON.stringify(to_hash))
	}

	public async postDelegatedTxn(post_data: ClientDelegatedTxnDto) {
		try {
			let tx = await this.ar_instance.createTransaction(
				{
					data: encodeURI(post_data.psnap_image)
				},
				this.wallet
			)

			for (let item in post_data) {
				if (item !== 'psnap_image') {
					tx.addTag(item, post_data[item])
				}
			}

			await this.ar_instance.transactions.sign(tx, this.wallet)
			const post = await this.ar_instance.transactions.post(tx)
			if (post && post.status !== 200) {
				throw post.status
			}
			return 'Success'
		} catch (err) {
			return { err }
		}
	}
}
