import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useParams } from "react-router";
import Header from "../components/Header";
import axios from "axios";
import { API_URL, API_URL_IMG, DEFAULT_IMG } from "../constants/variables";
import { useEffect, useState } from "react";
import { Image } from "antd";
import { Link } from "react-router-dom";
import { hinhAnh } from "../api/generated/picturest";
import StandardImage from "../components/StandardImage";

interface RouteParams {
  pictureId: string;
}

const onImageError = (e: any) => {
  e.target.src = DEFAULT_IMG;
};

export default function ImageDetail() {
  const { pictureId } = useParams<RouteParams>();
  const [pictures, setPictures] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [comments, setComments] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [antdImgErr, setAntdImgErr] = useState(false);

  const onImageAntdError = (e: any) => {
    e.target.src = DEFAULT_IMG;
    setAntdImgErr(true);
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/pictures/${pictureId}`)
      .then(res => setData(res.data.content))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
    axios.get(`${import.meta.env.VITE_BASE_BACKEND_URL}/pictures`).then(res => {
      setPictures(res.data.content.data);
    });
    axios.get(`${import.meta.env.VITE_BASE_BACKEND_URL}/comments/${pictureId}`).then(res => {
      setComments(res.data.content);
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
        {loading ? (
          <div className='py-6 mx-auto w-[95%]'>Loading...</div>
        ) : (
          <div className='py-6 mx-auto w-[95%]'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                <Image
                  className='object-cover'
                  src={antdImgErr ? DEFAULT_IMG : `${API_URL_IMG}/${data.duongDan}`}
                  onError={onImageAntdError}
                  height={300}
                />
                <div className='space-y-3'>
                  <div className='flex items-center justify-start gap-3'>
                    <Link to={`/users/${data.nguoiDung?.nguoiDungId}`}>
                      <img alt='' className='w-9 h-9 rounded-3xl' src={`${API_URL_IMG}/${data.nguoiDung?.anhDaiDien}`} onError={onImageError} />
                    </Link>
                    <Link to={`/users/${data.nguoiDung?.nguoiDungId}`}>
                      <span className='truncate'>{data.nguoiDung?.hoTen ?? "User"}</span>
                    </Link>
                  </div>
                  <h1 className='text-3xl font-bold text-black'>{data.tenHinh}</h1>
                  <p className='text-justify'>{data.moTa}</p>
                </div>
              </div>
              <div>
                <p className='font-3xl text-black font-bold'>Comments</p>
                {comments.length === 0 || !comments ? (
                  <p>No comments yet!</p>
                ) : (
                  <div className='space-y-3 h-64 overflow-auto overscroll-auto'>
                    {comments.map((item: any, index: number) => (
                      <div key={index}>
                        <div className='flex items-center justify-start gap-3'>
                          <Link to={`/users/${data.nguoiDung?.nguoiDungId}`}>
                            <img alt='' className='w-9 h-9 rounded-3xl' src={`${API_URL_IMG}/${data.nguoiDung?.anhDaiDien}`} onError={onImageError} />
                          </Link>
                          <Link to={`/users/${data.nguoiDung?.nguoiDungId}`}>
                            <span className='truncate'>{data.nguoiDung?.hoTen ?? "User"}</span>
                          </Link>
                        </div>
                        <p className='text-justify'>{item.noiDung}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div>
              <p className='text-xl font-bold text-black text-center'>More to explore</p>
              <div className='mx-auto py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {pictures.map((item: hinhAnh, index: number) => item.hinhId !== data.hinhId && <StandardImage key={index} item={item} />)}
              </div>
            </div>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
}
