import Arweave from 'arweave/node'
import ArCrypto from 'arweave/node/lib/crypto/node-driver'
import crypto from 'crypto'
import PemJwk from 'pem-jwk'
import constants from 'constants'

const keyLength = 4096
const publicExponent = 0x10001
const hashAlgorithm = 'sha256'
const encryptionAlgorithm = 'aes-256-cbc'

const ArweaveCrypto = new ArCrypto()

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
	var pem = PemJwk.jwk2pem(key)
	const signaturePayload = 'hihi'
	const signed_message = await sign(key, signaturePayload)
	console.log(signed_message)
	verify(pub_key, signaturePayload, signed_message)
})

async function sign(jwk, dataToSign) {
	let rawSignature = crypto
		.createSign(hashAlgorithm)
		.update(dataToSign)
		.sign({
			key: PemJwk.jwk2pem(jwk),
			padding: constants.RSA_PKCS1_PSS_PADDING,
			saltLength: 0
		})
	return rawSignature
}

async function verify(publicModulus, data, signature) {
	const publicKey = {
		kty: 'RSA',
		e: 'AQAB',
		n: publicModulus
	}
	const pem = PemJwk.jwk2pem(publicKey)
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
