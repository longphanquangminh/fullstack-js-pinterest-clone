import { IonContent, IonPage } from "@ionic/react";
import { useParams } from "react-router";

export default function UserPage() {
  const { userId } = useParams<any>();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className='w-[95%] mx-auto py-6'>UserPage</div>
      </IonContent>
    </IonPage>
  );
}
