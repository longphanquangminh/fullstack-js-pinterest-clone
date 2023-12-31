import { IonContent, IonPage } from "@ionic/react";
import { useHistory, useParams } from "react-router";
import { hinhAnh } from "../api/generated/picturest";
import StandardImage from "../components/StandardImage";
import { useEffect, useState } from "react";
import { https } from "../api/config";
import { ArrowLeftCircle } from "lucide-react";

export default function SearchPage() {
  const { search } = useParams<any>();
  const [pictures, setPictures] = useState<any>([]);
  const [countResult, setCountResult] = useState<any>(0);
  useEffect(() => {
    https
      .get(`/pictures/search-by-name/${search}`)
      .then(res => {
        setPictures(res.data.content.data);
        setCountResult(res.data.content.count);
      })
      .catch(err => {
        console.error(err);
      });
  }, [search]);
  const history = useHistory();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className='w-[95%] mx-auto py-6 space-y-6'>
          <ArrowLeftCircle className='cursor-pointer' onClick={() => history.goBack()} size={32} />
          <div>
            Search result for: {search}; Total: {countResult}
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {pictures.length > 0 ? (
              pictures.map((item: hinhAnh, index: number) => <StandardImage key={index} item={item} />)
            ) : (
              <p>No result found!</p>
            )}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
