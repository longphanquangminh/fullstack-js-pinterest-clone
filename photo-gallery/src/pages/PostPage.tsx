import { IonContent, IonPage } from "@ionic/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Form, Input, message } from "antd";
import { userServ } from "../api/api";
import { setLogin, setUploaded } from "../redux/userSlice";
import { userLocalStorage } from "../api/localService";
import { https } from "../api/config";
import { API_URL } from "../constants/variables";

export default function PostPage() {
  const { user, uploaded } = useSelector((state: any) => {
    return state.userSlice;
  });
  const [file, setFile] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const [original, setOriginal] = useState("");
  const [form] = Form.useForm();
  const onFinishFailed = (errorInfo: any) => {
    console.error("Failed:", errorInfo);
  };
  const onFinish = async (values: any) => {
    const formData = new FormData();
    formData.append("file", original);
    formData.append("moTa", values.moTa);
    formData.append("tenHinh", values.tenHinh);
    https
      .post(`${API_URL}/pictures`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res: any) => {
        message.success("Post image successfully!");
        dispatch(setUploaded(!uploaded));
        history.push("/");
      })
      .catch((err: any) => {
        console.error("Error:", err);
        message.error(err.response.data.message);
      });
  };
  return (
    <IonPage>
      <IonContent fullscreen>
        {user && user.token ? (
          <div className='py-6'>
            <div className='flex justify-center items-center'>
              <input
                type='file'
                onChange={(e: any) => {
                  setOriginal(e.target.files[0]);
                  setFile(URL.createObjectURL(e.target.files[0]));
                }}
              />
            </div>
            <div className='w-[95%] mx-auto'>
              <Form form={form} layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
                <Form.Item
                  label='Image name'
                  name='tenHinh'
                  rules={[
                    {
                      required: true,
                      message: "Please enter image name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label='Description'
                  name='moTa'
                  rules={[
                    {
                      required: true,
                      message: "Please type description!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <div className='grid lg:flex justify-center items-center gap-3 mt-9'>
                  <button className='cursor-pointer text-white w-full bg-pink-500 hover:bg-pink-700 duration-300 px-6 py-2 rounded-lg'>Login</button>
                </div>
              </Form>
            </div>
          </div>
        ) : (
          <div className='w-[95%] mx-auto w-full h-[calc(100vh-56px)] flex justify-center items-center'>
            <div className='space-y-12'>
              <Link to='/'>
                <img
                  alt='logo'
                  src='https://media.discordapp.net/attachments/1026660684739653674/1189943300061397082/picturest_logo.png'
                  className='w-56 mx-auto'
                />
              </Link>
              <p className='text-3xl font-bold'>Please login to use this feature!</p>
              <div className='flex justify-center items-center'>
                <Link className='text-center text-[#ec4899]' to='/login'>
                  Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
}
