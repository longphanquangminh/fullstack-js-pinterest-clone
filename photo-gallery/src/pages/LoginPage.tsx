import { IonContent, IonPage } from "@ionic/react";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { userServ } from "../api/api";
import { setLogin } from "../redux/userSlice";
import { userLocalStorage } from "../api/localService";

export default function LoginPage() {
  const [form] = Form.useForm();
  const history = useHistory();
  const onFinishFailed = (errorInfo: any) => {
    console.error("Failed:", errorInfo);
  };
  const dispatch = useDispatch();
  const onFinish = async (values: any) => {
    userServ
      .login(values)
      .then((res: any) => {
        const data = {
          ...res.data.content.userInfo,
          token: res.data.content.token,
        };
        dispatch(setLogin({ ...data }));
        userLocalStorage.set({ ...data });
        message.success("Login successfully!");
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
        <div className='flex flex-col min-h-[calc(100vh-56px)] bg-image bg-center bg-cover bg-no-repeat bg-fixed relative'>
          <div className='flex flex-1 justify-center items-center'>
            <div className='p-6 m-2 bg-white rounded-lg w-2/3 md:w-1/3 space-y-3'>
              <div className='grid grid-cols-1 items-center gap-3'>
                <div>
                  <Link to='/'>
                    <img
                      alt='logo'
                      src='https://media.discordapp.net/attachments/1026660684739653674/1189943300061397082/picturest_logo.png'
                      className='w-20 mx-auto'
                    />
                  </Link>
                </div>
                <h1 className='font-bold text-2xl text-center text-pink-500 basis-1/2'>Login</h1>
                <div className='basis-1/4'></div>
              </div>
              <Form form={form} layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
                <Form.Item
                  label='Email'
                  name='email'
                  rules={[
                    {
                      required: true,
                      message: "Please enter email!",
                    },
                    {
                      type: "email",
                      message: "Email has incorrect format!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label='Password'
                  name='matKhau'
                  rules={[
                    {
                      required: true,
                      message: "Please type password!",
                    },
                    {
                      min: 6,
                      message: "Password must have at least 6 characters!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <div className='grid lg:flex justify-center items-center gap-3 mt-9'>
                  <button className='cursor-pointer text-white w-full bg-pink-500 hover:bg-pink-700 duration-300 px-6 py-2 rounded-lg'>Login</button>
                </div>
              </Form>
              <p className='text-center'>
                Not have account yet?{" "}
                <Link to='/register' className='font-bold text-pink-500 hover:text-pink-700 duration-300'>
                  Register!
                </Link>
              </p>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
