import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import Header from "../components/Header";
import { Image } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { hinhAnh } from "../api/generated/picturest";
import { API_URL_IMG } from "../constants/variables";
import StandardImage from "../components/StandardImage";

const Tab1: React.FC = () => {
  const [pictures, setPictures] = useState([]);
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_BACKEND_URL}/pictures`).then(res => {
      setPictures(res.data.content.data);
    });
  }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <Header />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className='w-[95%] mx-auto py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {pictures.map((item: hinhAnh, index) => (
            <StandardImage key={index} item={item} />
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
