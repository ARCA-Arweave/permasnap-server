import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { generateWallet, getAddress, isInstanceofJwkInterface } from '../providers/ArweaveProvider';
import { changeWallet } from '../redux/actions';
import { IStoreState } from '../redux/reducers';
import { JWKInterface } from 'arweave/web/lib/wallet';

export const useWallet = () => {
	const arWallet = useSelector((state: IStoreState) => state.wallet) // redux hook to the store (like mapStateToProps)
	const dispatch = useDispatch() // redux hook to get dispatch function. this is the alternative to using connect() 
	const [arAddress, setArAddress] = useState<string>()
	
	useEffect( () => {
		const init = async () => {
			//check if we have a valid wallet
			if( isInstanceofJwkInterface(arWallet)  ){ 
				let addr = await getAddress(arWallet as JWKInterface)
				setArAddress( addr )
			}else{ 
				//create wallet and let user know 
				let jwk = await generateWallet()
				dispatch( changeWallet(jwk) ) // store wallet in redux
				let addr = await getAddress(jwk)
				setArAddress(addr)
				alert("PLACEHOLDER. a new wallet has been created for you "+ addr )
			}
		}
		init()
	}, []) // <-Like C'tor


	const updateWallet = (jwk: JWKInterface) => {
		dispatch(changeWallet(jwk))
	}

	return {
		arWallet,
		arAddress,
		updateWallet,
	}
}

















