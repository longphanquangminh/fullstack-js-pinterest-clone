import { IonContent, IonPage } from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { https } from "../api/config";
import { API_URL_IMG } from "../constants/variables";

export default function UserPage() {
  const { userId } = useParams<any>();
  const [userData, setUserData] = useState<any>(null);
  const [picturesCreatedByUser, setPicturesCreatedByUser] = useState<any>([]);
  const [picturesSavedByUser, setPicturesSavedByUser] = useState<any>([]);
  useEffect(() => {
    https
      .get(`/users/${userId}`)
      .then((res: any) => {
        setUserData(res.data.content);
      })
      .catch((err: any) => {
        console.error(err);
      });
    https
      .get(`/created-by-user/${userId}`)
      .then((res: any) => {
        setPicturesCreatedByUser(res.data.content);
      })
      .catch((err: any) => {
        console.error(err);
      });
    https
      .get(`/saved-by-user/${userId}`)
      .then((res: any) => {
        setPicturesSavedByUser(res.data.content);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }, [userId]);
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className='w-[95%] mx-auto py-6 space-y-6'>
          <div className='flex justify-start items-center gap-6'>
            <div>
              <img className='h-52 mx-auto object-cover rounded-3xl w-full' alt='' src={`${API_URL_IMG}/${userData?.anhDaiDien}`} />
            </div>
            <div className='space-y-3'>
              <p>
                <span className='font-bold'>Full name: </span>
                {userData?.hoTen}
              </p>
              <p>
                <span className='font-bold'>Age: </span>
                {userData?.tuoi}
              </p>
              <p>
                <span className='font-bold'>Email: </span>
                {userData?.email}
              </p>
            </div>
          </div>
          <div>
            <p>Created by user: </p>
            <div>{picturesCreatedByUser.length === 0}</div>
          </div>
          <div>
            <p>Saved by user: </p>
            <div></div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
