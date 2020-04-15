import 'capacitor-secure-storage-plugin'
import { Plugins } from '@capacitor/core';
const { SecureStoragePlugin } = Plugins

interface IStorageSuccess {
	value: string | boolean
}
interface IStorageError {
	message: string
}


export const setItem =  (_key:string, _value:string):Promise<any> => {
	return new Promise((resolve, reject) => {
		SecureStoragePlugin.set( {key: _key, value: _value} )
			.then( (result:IStorageSuccess) => {
				resolve(result.value as boolean)
			})	
	})
}

export const getItem = (_key:string):Promise<string> => {
	return new Promise((resolve,reject) => {
		SecureStoragePlugin.get( {key: _key} )
			.then( (result:IStorageSuccess) => {
				resolve(result.value as string)
			})
			.catch((error:IStorageError) => {
				reject(error.message)
			})
	})
}

export const removeItem = (_key:string):Promise<any> => {
	return new Promise((resolve,reject) => {
		SecureStoragePlugin.remove( {key: _key} )
			.then((result:IStorageSuccess) => resolve(result.value as boolean))
			.catch((error:IStorageError) => reject(error.message))
	})
}

/* Tests */
export const runTest = () =>{

	// test setItem
	const _key = 'testkeyname';
	const _value = 'test-key-value';
	SecureStoragePlugin.set({ key: _key, value: _value })
	.then( (success: IStorageSuccess) => console.log(JSON.stringify(success)) )
	
	const _wkey = "wrapkeyname"
	const _wvalue = "wrapped value name"
	setItem(_wkey,_wvalue).then( res => {
		console.log(JSON.stringify(res))
	})
	
	// test getItem: key found
	SecureStoragePlugin.get({ key: _key })
  .then((value: IStorageSuccess) => {
		console.log('found this value: '+ JSON.stringify(value));
	})
	getItem(_wkey).then(result => { 
		console.log(result)
	})

	// test getItem: key not found
	const _failkey = 'testFailureKeyname';
	SecureStoragePlugin.get({ key: _failkey })
  .catch((error: IStorageError) => {
		console.log('Error! '+JSON.stringify(error));
	});
	const _wrapfailkey = 'wrapFailKeyname'
	getItem(_wrapfailkey).catch(error => {
		console.log(error)
	})
	
	// test removeItem
	const _removeKey = 'testremovekey'
	const _removeValue = 'some value'
	SecureStoragePlugin.set({key:_removeKey, value:_removeValue}).then((success:any) => {
		removeItem(_removeKey).then(() => {
			getItem(_removeKey).then(() => console.log("oops! key was not removed")).catch(() => console.log('success! key was removed'))
		})
	})
}