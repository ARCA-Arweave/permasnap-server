import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLabel, IonCard, IonCardTitle, IonCol, IonGrid, IonItem, IonCardContent, IonCardHeader, IonRow, IonButtons } from '@ionic/react';
import './Tab2.css';
import Header from '../components/Header'

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <IonContent class='ion-justify-content-center ion-align-items-center'>
        <IonGrid class='ion-text-center' style={{height: '100%'}}>
          <IonRow>
            <IonCol>
              <div>
                <img src={require('../assets/img/branding.svg')} alt="Permasnap logo" width='80%'/>
              </div>

              <IonCard color='tertiary'>
                <IonCardHeader className='ion-text-left'>IonCardHeader</IonCardHeader>
                <IonCardTitle className='ion-text-right'>IonCardTitle</IonCardTitle>
                <IonCardContent>IonCardContent</IonCardContent>
              </IonCard>


            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;


