import { Injectable } from '@nestjs/common'
import crypto from 'crypto'
import constants from 'constants'
import Arweave from 'arweave/node'
import { jwk2pem } from 'pem-jwk'
import { JWKInterface } from 'arweave/node/lib/wallet'
import { ClientDelegatedTxnDto } from '../types/dto'
import { WalletProvider } from './wallet.provider'
import log from '../utils/logger'
import { ReadPreference } from 'typeorm'
import Transaction from 'arweave/node/lib/transaction'

@Injectable()
export class ArweaveProvider {
	hash_algorithm = 'sha256'
	wallet = this.walletProvider.wallet
	ar_instance: Arweave

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

	generateWallet = async () => {
		return await this.ar_instance.wallets.generate().then(jwt => jwt)
	}

	generateAndTest = async () => {
		this.ar_instance.wallets.generate().then(async key => {
			const wallet_from_key = await this.ar_instance.wallets.jwkToAddress(key)
			const pub_key = key.n
			var pem = jwk2pem(key)
			const signature_payload = 'hihi'
			const signed_message = this.sign(key, signature_payload)
			const hash = crypto
				.createHash(this.hash_algorithm)
				.update('abvc123')
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
			const res = await this.ar_instance.arql({
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
			// console.log(res)
			return res
		} catch (err) {
			throw err
		}
	}

	async getAllDelegatedPosts(params: { psnap_app_version: string; psnap_context: string }) {
		const { psnap_app_version, psnap_context } = params
		try {
			const res = await this.ar_instance.arql({
				op: 'and',
				expr1: {
					op: 'equals',
					expr1: 'psnap_app_version',
					expr2: psnap_app_version
				},
				expr2: {
					op: 'equals',
					expr1: 'psnap_context',
					expr2: psnap_context
				}
			})
			return res
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
		log.debug(hash)
		log.debug(post_data.dpost_hash)
		return false // hashes don't match
	}

	hashPayload(post_data: ClientDelegatedTxnDto) {
		const to_hash = {}
		const keys = Object.keys(post_data).sort()
		keys.forEach(key => {
			if (key.indexOf('psnap') > -1) {
				to_hash[key] = post_data[key]
				log.log(key)
			}
		})
		// console.log(keys)
		// for (let item in keys) {
		// 	console.log(item)
		// 	if (item.indexOf('psnap') > -1) {
		// 		to_hash[item] = post_data[item]
		// 		log.log(item)
		// 	}
		// }
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
				if (item === 'psnap_content_tag') {
					;(post_data[item] as string[]).forEach(content_tag => {
						tx.addTag(item, content_tag)
					})
					// } else if (item.indexOf('dpost') > -1) {
					// 	tx.addTag(item, post_data[item])
				} else if (item !== 'psnap_image') {
					tx.addTag(item, post_data[item])
				}
			}

			await this.ar_instance.transactions.sign(tx, this.wallet)
			const post = await this.ar_instance.transactions.post(tx)
			if (post.status >= 400) {
				throw post
			}
			return { status: post.status, id: tx.id }
		} catch (err) {
			return { err }
		}
	}

	async getPostData(postIds: string[]): Promise<Array<ClientDelegatedTxnDto>> {
		const resolved: ClientDelegatedTxnDto[] = []
		const toResolve: Promise<Transaction>[] = []

		postIds.forEach(id => {
			toResolve.push(this.ar_instance.transactions.get(id))
		})
		return Promise.all(toResolve).then(transactions => {
			transactions.forEach((tx: Transaction) => {
				const permasnap_object = {} as ClientDelegatedTxnDto
				permasnap_object.psnap_content_tag = []
				const psnap_image = decodeURI(tx.get('data', { decode: true, string: true }))
				const tags = tx.get('tags') as unknown
				;(tags as string[]).forEach((tag: any) => {
					let key = tag.get('name', { decode: true, string: true }) as string
					let value = tag.get('value', { decode: true, string: true }) as string

					if (key == 'psnap_content_tag') {
						permasnap_object.psnap_content_tag.push(value)
					} else {
						permasnap_object[key] = value
					}
				})
				permasnap_object.psnap_image = psnap_image
				resolved.push(permasnap_object)
			})
			return resolved
		})
	}
}
