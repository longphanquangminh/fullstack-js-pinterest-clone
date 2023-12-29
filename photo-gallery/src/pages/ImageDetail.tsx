import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useParams } from "react-router";
import Header from "../components/Header";

interface RouteParams {
  pictureId: string;
}

export default function ImageDetail() {
  const { pictureId } = useParams<RouteParams>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <Header />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className='py-6 mx-auto w-[95%]'>{pictureId}</div>
      </IonContent>
    </IonPage>
  );
}
