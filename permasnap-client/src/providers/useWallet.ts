import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { generateWallet, getAddress, isInstanceofJwk } from './ArweaveProvider';
import { changeWallet } from '../redux/actions';
import { IStoreState } from '../redux/reducers';

export const useWallet = () => {
	const arWallet = useSelector((state: IStoreState) => state.wallet) // redux hook that grabs a piece of the store (like mapStateToProps)
	const dispatch = useDispatch() // redux hook to get dispatch function. this is the alternative to using connect() 
	
	useEffect(() => {
		//check if we have a valid wallet
		if(typeof arWallet === 'object'){}
		if( isInstanceofJwk(arWallet)  ){
			console.log( 'our function says we have a wallet - unit testing!!')
		}


		return () => {
			//cleanup
		}
	}, []) // <-Like C'tor


	return {
		arWallet,
		arAddress
	}
}

















