import React from 'react';
import { IonContent, IonPage, IonCard, IonCardTitle, IonCol, IonGrid, IonCardContent, IonCardHeader } from '@ionic/react';
import './Tab2.css';
import Header from '../components/Header'

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <IonContent>
        <IonGrid class='ion-text-center' style={{height: '100%'}}>
          <IonCol className='ion-justify-content-end'> {/* class='ion-justify-content-space-around ion-align-items-stretch'> */}

            <div>
              <img src={require('../assets/img/branding.svg')} alt="Permasnap logo" width='80%'/>
            </div>

            <IonCard color='tertiary'>
              <IonCardHeader className='ion-text-left'>IonCardHeader</IonCardHeader>
              <IonCardTitle className='ion-text-right'>IonCardTitle</IonCardTitle>
              <IonCardContent>IonCardContent</IonCardContent>
            </IonCard>

          </IonCol>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;


