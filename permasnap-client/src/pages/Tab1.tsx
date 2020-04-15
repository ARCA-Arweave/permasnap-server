import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
/* redux imports */
import { useSelector, useDispatch } from 'react-redux';
import { IStoreState } from '../redux/reducers';
import { generateWallet } from '../providers/ArweaveProvider';
import { changeWallet } from '../redux/actions';

const Tab1: React.FC = () => {
  const wallet = useSelector((state: IStoreState) => state.wallet) // redux hook that grabs a piece of the store (like mapStateToProps)
  const dispatch = useDispatch() // redux hook to get dispatch function. this is the alternative to using connect() 
  
  
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
        <IonButton onClick={() => {
          generateWallet().then((jwk) => dispatch( changeWallet(jwk) ) ) //generate wallet and store in redux
        }}>
          Gimme new Wallet
        </IonButton>
        { JSON.stringify(wallet)}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
