import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
/* redux imports */
import { useWallet } from '../providers/useWallet';

const Tab1: React.FC = () => {
  const { arWallet, arAddress } = useWallet()
  
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 1 page" />
        <hr />
        {/* <IonButton onClick={() => {
          generateWallet().then((jwk) => dispatch( changeWallet(jwk) ) ) //generate wallet and store in redux
        }}>
          Gimme new Wallet
        </IonButton> */}
        Wallet Address: {arAddress} 
        <hr />
        Actual Wallet: { JSON.stringify(arWallet)}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
