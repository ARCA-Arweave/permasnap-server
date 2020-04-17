import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { generateWallet, getAddress, isInstanceofJwkInterface } from './ArweaveProvider';
import { changeWallet } from '../redux/actions';
import { IStoreState } from '../redux/reducers';
import { JWKInterface } from 'arweave/web/lib/wallet';

export const useWallet = () => {
	const arWallet = useSelector((state: IStoreState) => state.wallet) // redux hook to the store (like mapStateToProps)
	const dispatch = useDispatch() // redux hook to get dispatch function. this is the alternative to using connect() 
	const [arAddress, setArAddress] = useState<string>()
	
	useEffect( () => {
		if( isInstanceofJwkInterface(arWallet)  ){ //check if we have a valid wallet
			getAddress(arWallet as JWKInterface).then(addr =>	setArAddress(addr) ) 
		}else{ 
			//create wallet and let user know 
			generateWallet().then((jwk) => {
				dispatch( changeWallet(jwk) ) // store wallet in redux
				getAddress(jwk).then(addr => {
					setArAddress(addr) 
					alert("PLACEHOLDER. a new wallet has been created for you "+ addr )
				}) 
			})
		}
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

















