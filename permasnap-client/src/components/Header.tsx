import React from 'react'
import { IonHeader, IonToolbar, IonButtons, IonButton} from "@ionic/react";


const Header = () => (
	<IonHeader class='ion-no-border ion-padding-start'>
		<IonToolbar>
			<IonButtons>
				<IonButton  onClick={()=>alert('show menu')}>
					<img src={require('../assets/img/burger.svg')} alt='menu' />
				</IonButton>
			</IonButtons>
		</IonToolbar>
	</IonHeader>
)

export default Header;