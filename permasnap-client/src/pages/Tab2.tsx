import React from 'react';
import { IonContent, IonPage, IonCard, IonCardTitle, IonGrid, IonCardContent, IonCardHeader, IonRow, IonCardSubtitle } from '@ionic/react';
import './Tab2.css';
import Header from '../components/Header'

const Tab2: React.FC = () => {
  return (
    <IonPage>
			<Header />
			<IonContent>
				<IonGrid style={s.grid} >
					<IonRow style={s.row}>
            <img src={require('../assets/img/branding.svg')} alt="Permasnap logo" width='100%'/>
          </IonRow>
					<IonRow style={{ height: '40%', ...s.row}}>
            <IonCard color='tertiary' style={s.card}>
              <IonCardHeader>
                <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
              <IonCardTitle>Card Title</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                Keep close to Nature's heart... and break clear away, once in awhile,
                and climb a mountain or spend a week in the woods. Wash your spirit clean.
              </IonCardContent>
            </IonCard>
          </IonRow>
					<IonRow style={s.row}></IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
  );
};

export default Tab2;

const s = {
  grid: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  row: {
    width: '80%',
    // border: '1px solid red'
  },
  card: {
    width: '100%',
    borderRadius: '10%',
    margin: 0,
    textAlign: 'center'
  }
}


