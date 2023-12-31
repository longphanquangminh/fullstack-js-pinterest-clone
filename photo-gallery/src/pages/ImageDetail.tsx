import { Comment } from "@ant-design/compatible";
import { IonContent, IonPage } from "@ionic/react";
import { useHistory, useParams } from "react-router";
import Header from "../components/Header";
import axios from "axios";
import { API_URL_IMG, DEFAULT_IMG } from "../constants/variables";
import { useEffect, useState } from "react";
import { Avatar, Button, Form, Image, Rate, message } from "antd";
import { Link } from "react-router-dom";
import { hinhAnh } from "../api/generated/picturest";
import StandardImage from "../components/StandardImage";
import TextArea from "antd/es/input/TextArea";
import { https } from "../api/config";
import { useSelector } from "react-redux";
import { ArrowLeftCircle } from "lucide-react";
import ButtonGroup from "antd/es/button/button-group";

interface RouteParams {
  pictureId: string;
}

const onImageError = (e: any) => {
  e.target.src = DEFAULT_IMG;
};

const Editor = ({ onChange, onSubmit, submitting, value }: any) => (
  <>
    <Form.Item>
      <TextArea
        rows={4}
        onChange={onChange}
        value={value}
        style={{
          resize: "none",
        }}
        placeholder='Write comment...'
      />
    </Form.Item>
    <Form.Item>
      <Button disabled={!value} htmlType='submit' loading={submitting} onClick={onSubmit} type='primary'>
        Comment
      </Button>
    </Form.Item>
  </>
);

export default function ImageDetail() {
  const { pictureId } = useParams<RouteParams>();
  const [pictures, setPictures] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [comments, setComments] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [antdImgErr, setAntdImgErr] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useSelector((state: any) => {
    return state.userSlice;
  });

  const handleSavePicture = () => {
    if (!user) {
      message.error("Please login first!");
    } else {
      https
        .post(`/saved/${pictureId}`)
        .then(() => {
          if (!saved) {
            message.success("You've successfully saved this picture!");
          } else {
            message.success("You've successfully remove this picture from save collection!");
          }
          setSaved(!saved);
        })
        .catch(err => {
          console.log(err);
          message.error(err.response.data.content.replace(/^\w/, (c: any) => c.toUpperCase()));
        });
    }
  };

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  const fetchCommentData = () => {
    axios
      .get(`${import.meta.env.VITE_BASE_BACKEND_URL}/comments/${pictureId}`)
      .then(res => {
        setError(null);
        setComments(res.data.content);
      })
      .catch(err => {
        setError("Error fetching data! Please try again!");
        console.error(err);
      });
  };

  const handleSubmit = () => {
    if (!value) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setValue("");
      https
        .post(
          `/comments/${pictureId}`,
          { noiDung: value },
          {
            headers: { token: user.token },
          },
        )
        .then(() => {
          message.success("You've successfully posted your comment");
          fetchCommentData();
        })
        .catch(err => {
          message.error(err.response.data.content.replace(/^\w/, (c: any) => c.toUpperCase()));
        });
    }, 1000);
  };

  const onImageAntdError = (e: any) => {
    e.target.src = DEFAULT_IMG;
    setAntdImgErr(true);
  };
  useEffect(() => {
    setLoading(true);
    https
      .get(`/pictures/${pictureId}`)
      .then(res => setData(res.data.content))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
    https
      .get(`/pictures`)
      .then(res => {
        setPictures(res.data.content.data);
      })
      .catch(err => console.log(err));
    fetchCommentData();
  }, []);
  useEffect(() => {
    if (user) {
      https.get(`/saved/${pictureId}`).then(res => {
        setSaved(res.data.content.saved);
      });
    } else {
      setSaved(false);
    }
  }, [user]);

  const history = useHistory();

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className='py-6 mx-auto w-[95%]'>
          <ArrowLeftCircle className='cursor-pointer' onClick={() => history.goBack()} size={32} />
        </div>
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
                  height={500}
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
                  <button
                    type='button'
                    className='cursor-pointer text-white w-52 bg-pink-500 hover:bg-pink-700 duration-300 px-6 py-2 rounded-lg'
                    onClick={handleSavePicture}
                  >
                    {saved ? "Remove save" : "Save"}
                  </button>
                </div>
              </div>
              <div>
                <p className='font-3xl text-black font-bold'>Comments</p>
                {!comments || comments === "" || comments.length === 0 ? (
                  <p>No comments yet!</p>
                ) : (
                  <div className='space-y-6 max-h-72 overflow-auto overscroll-auto'>
                    {comments.map((item: any, index: number) => (
                      <div key={index} className='space-y-3'>
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
                <div className='relative'>
                  <Comment
                    avatar={<Avatar src={user && user?.anhDaiDien !== "" ? `${API_URL_IMG}/${user?.anhDaiDien}` : DEFAULT_IMG} alt='' />}
                    content={<Editor onChange={handleChange} onSubmit={handleSubmit} submitting={submitting} value={value} />}
                  />

                  {user === null && <div className='absolute left-0 top-0 bg-white opacity-50 w-full h-full flex justify-center items-center'></div>}
                  {user === null && (
                    <div className='absolute left-0 top-0 w-full h-full flex justify-center items-center'>Please login to comment!</div>
                  )}
                </div>
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
