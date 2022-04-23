import { IonContent, IonPage, IonButton } from '@ionic/react';
import { format } from 'date-fns';
import Html5QrcodePlugin from '../components/Html5QrcodePlugin';
import {useState} from "react";
import { useHistory } from "react-router-dom";
import './Home.css';

const Home: React.FC = () => {
  let history = useHistory();
  const [cameraStatus, setCameraStatus] = useState(true);
  
  function onNewScanResult(decodedText: string, decodedResult: string) {
    history.push({
      pathname: '/message', 
      state: {
        time: 'Today ' + format(new Date(), "h:mm aa'"),
        text: decodedText.replace('\n', '<br />').replace('SMSTO:1922:', '')
      }
    });
    setTimeout(() => setCameraStatus(false), 300);
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        {
          cameraStatus && 
          <Html5QrcodePlugin
          fps={10}
          qrbox={250}
          disableFlip={false}
          qrCodeSuccessCallback={onNewScanResult}/> || 
          <div className="restart">
            <IonButton onClick={ () => setCameraStatus(true) }>Restart</IonButton>
          </div>
        }
      </IonContent>
    </IonPage>
  );
};

export default Home;
