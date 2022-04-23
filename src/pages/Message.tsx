import { IonContent, IonHeader, IonFooter, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonBackButton, IonGrid, IonRow, IonCol, IonInput, IonItem, IonIcon } from '@ionic/react';
import { arrowUpCircleOutline } from "ionicons/icons";
import { useState, useEffect, useRef } from 'react';
import { useLocation } from "react-router-dom";
import './Message.css';

let messageList = [
  {time: 'Yesterday 2:45 PM', text: "場所代碼：5435 5829 5533 035<br />本簡訊是簡訊實聯制發送，限防疫目的使用。"},
  {time: 'Yesterday 7:48 PM', text: "場所代碼：4332 9705 3572 583<br />本簡訊是簡訊實聯制發送，限防疫目的使用。"},
  {time: 'Yesterday 10:21 PM', text: "場所代碼：9593 1836 3857 958<br />本簡訊是簡訊實聯制發送，限防疫目的使用。"}
]

const Message: React.FC = () => {
  type Message = {
    time: string;
    text: string;
  };

  const location = useLocation();
  const contentRef = useRef<HTMLIonContentElement | null>(null);
  const [messages, setMessages] = useState(messageList);

  useEffect(() => {
    function isMessage(obj: any): obj is Message {
      return (
        typeof obj === 'object' &&
        obj !== null &&
        'time' in obj &&
        'text' in obj
      );
    }

    if (isMessage(location.state)) {
      setMessages([...messageList, location.state]);

      setTimeout(function() {
        scrollToBottom()
      }, 300)
    }
  }, [location.state])

  function scrollToBottom() {
    contentRef.current && contentRef.current.scrollToBottom();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
              <IonBackButton defaultHref="/" />
            </IonButtons>
          <IonTitle>
            1922
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent ref={contentRef} fullscreen 
      scrollEvents={true}
      onIonScrollStart={() => {}}
      onIonScroll={() => {}}
      onIonScrollEnd={() => {}}>
        <IonGrid>
        {
          messages.map((item, index) => <IonRow key={index}>
            <div className="time">{item.time}</div>
            <IonCol col-9 offset="3">
              <div className="message message-from"  dangerouslySetInnerHTML={{  __html: item.text }} />
            </IonCol>
          </IonRow>)
        }
        </IonGrid>
      </IonContent>
      <IonFooter>
        <IonToolbar>
        <IonItem>
            <IonInput placeholder="Text Message"></IonInput>
            <IonIcon color="success" size="large" icon={arrowUpCircleOutline} />
          </IonItem>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Message;
