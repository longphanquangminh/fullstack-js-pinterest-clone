import { IonContent, IonPage } from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { https } from "../api/config";
import { API_URL_IMG, DEFAULT_IMG } from "../constants/variables";
import StandardImage from "../components/StandardImage";
import { useSelector } from "react-redux";

export default function UserPage() {
  const { userId } = useParams<any>();
  const [userData, setUserData] = useState<any>(null);
  const [picturesCreatedByUser, setPicturesCreatedByUser] = useState<any>([]);
  const [picturesSavedByUser, setPicturesSavedByUser] = useState<any>([]);
  const { uploaded, saved } = useSelector((state: any) => {
    return state.userSlice;
  });
  useEffect(() => {
    https
      .get(`/saved-by-user/${userId}`)
      .then((res: any) => {
        setPicturesSavedByUser(res.data.content);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }, [saved]);
  useEffect(() => {
    https
      .get(`/created-by-user/${userId}`)
      .then((res: any) => {
        setPicturesCreatedByUser(res.data.content);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }, [uploaded]);
  useEffect(() => {
    https
      .get(`/users/${userId}`)
      .then((res: any) => {
        setUserData(res.data.content);
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
              <img
                className='h-52 mx-auto object-cover rounded-3xl w-full'
                alt=''
                src={`${API_URL_IMG}/${userData?.anhDaiDien}`}
                loading='lazy'
                onError={(e: any) => (e.target.src = DEFAULT_IMG)}
              />
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
          <div className='space-y-6'>
            <p className='font-bold'>Created by user: </p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {picturesCreatedByUser.length === 0
                ? "No data"
                : picturesCreatedByUser.map((item: any, index: number) => <StandardImage item={item} />)}
            </div>
          </div>
          <div className='space-y-6'>
            <p className='font-bold'>Saved by user: </p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {picturesSavedByUser.length === 0
                ? "No data"
                : picturesSavedByUser.map((item: any, index: number) => <StandardImage item={item.hinh} />)}
            </div>
            <div></div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
