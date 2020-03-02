import crypto from 'crypto'
import constants from 'constants'
import Arweave from 'arweave/node'
import { jwk2pem } from 'pem-jwk'
import { JWKInterface } from 'arweave/node/lib/wallet'

const keyLength = 4096
const publicExponent = 0x10001
const hashAlgorithm = 'sha256' 
const encryptionAlgorithm = 'aes-256-cbc'

const instance = Arweave.init({
	host: 'arweave.net', // Hostname or IP address for a Arweave host
	port: 443, // Port
	protocol: 'https', // Network protocol http or https
	timeout: 20000, // Network request timeouts in milliseconds
	logging: false // Enable network request logging})
})

instance.wallets.generate().then(async key => {
	const wallet_from_key = await instance.wallets.jwkToAddress(key)
	const pub_key = key.n
	var pem = jwk2pem(key)
	const signaturePayload = 'hihi'
	const signed_message = sign(key, signaturePayload)
	console.log(signed_message)
	console.log(verify(pub_key, signaturePayload, signed_message))
})

function sign(jwk: JWKInterface, dataToSign: string) {
	let rawSignature = crypto
		.createSign(hashAlgorithm)
		.update(dataToSign)
		.sign({
			key: jwk2pem(jwk),
			padding: constants.RSA_PKCS1_PSS_PADDING,
			saltLength: 0
		})
	return rawSignature
}

function verify(publicModulus: string, data: string, signature: Buffer): boolean {
	const publicKey = {
		kty: 'RSA',
		e: 'AQAB',
		n: publicModulus
	}
	const pem = jwk2pem(publicKey)
	return crypto
		.createVerify(hashAlgorithm)
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
