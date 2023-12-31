import { IonContent, IonPage } from "@ionic/react";
import { useParams } from "react-router";
import { Form, Input, Modal, message } from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { https } from "../api/config";
import axios from "axios";
import { API_URL, API_URL_IMG, DEFAULT_IMG } from "../constants/variables";
import { setLogin } from "../redux/userSlice";
import { userLocalStorage } from "../api/localService";

const onImageError = (e: any) => {
  e.target.src = DEFAULT_IMG;
};

export default function Profile() {
  const { user } = useSelector((state: any) => {
    return state.userSlice;
  });
  const [form] = Form.useForm();
  const onFinishFailed = (errorInfo: any) => {
    console.error("Failed:", errorInfo);
  };
  const history = useHistory();
  const dispatch = useDispatch();
  const [file, setFile] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [original, setOriginal] = useState("");
  const onFinish = (values: any) => {
    // try {
    //   const processValues = {
    //     ...values,
    //     tuoi: new Date().getFullYear() - new Date(values.birthday).getFullYear(),
    //   };
    //   delete processValues.birthday;

    //   await userServ.signup(processValues);

    //   message.success("Register successfully, please login!");
    //   history.push("/login");
    // } catch (err: any) {
    //   console.error("Error:", err);
    //   message.error(err.response.data.message);
    // }
    const formData = new FormData();
    if (!values.matKhau) {
      delete values.matKhau;
    } else {
      formData.append("matKhau", values.matKhau);
    }
    formData.append("hoTen", values.hoTen);
    formData.append("email", values.email);
    axios
      .put(`${API_URL}/users/${user.nguoiDungId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: user.token,
        },
      })
      .then(() => {
        message.success("Update info successfully!");
        history.goBack();
        const data = { ...user, hoTen: values.hoTen, email: values.email };
        dispatch(setLogin(data));
        userLocalStorage.set(data);
      })
      .catch(err => {
        console.error(err);
        console.log(values);
      });
  };
  const fetchUser = (userId: any) => {
    https
      .get(`/users/${userId}`)
      .then(res => {
        form.setFieldsValue(res.data.content);
      })
      .catch(err => {
        console.error(err);
      });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setFile("");
    setOriginal("");
  };
  useEffect(() => {
    fetchUser(user.nguoiDungId);
  }, [user.nguoiDungId]);
  const handleOk = () => {
    setIsModalOpen(false);
    const formData = new FormData();
    formData.append("file", original);
    https
      .post(`/users/avatar/${user.nguoiDungId}`, formData, {
        headers: { token: user.token },
      })
      .then(res => {
        message.success("Update avatar successfully!");
        handleCancel();
        fetchUser(user.nguoiDungId);
        dispatch(setLogin({ ...user, anhDaiDien: res.data.content.anhDaiDien }));
        userLocalStorage.set({ ...user, anhDaiDien: res.data.content.anhDaiDien });
      })
      .catch((err: any) => {
        message.error("Error");
        console.log(err);
        handleCancel();
      });
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  return (
    <IonPage>
      <IonContent fullscreen>
        {isModalOpen && (
          <Modal title='Update avatar' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <div className='space-y-6'>
              <input
                type='file'
                onChange={(e: any) => {
                  setOriginal(e.target.files[0]);
                  setFile(URL.createObjectURL(e.target.files[0]));
                }}
              />
              <img
                className='mx-auto w-24 h-24 object-cover rounded-full'
                src={file === "" ? `${API_URL_IMG}/${user.anhDaiDien}` : file}
                onError={onImageError}
              />
            </div>
          </Modal>
        )}
        <div className='w-[95%] mx-auto py-6 space-y-6'>
          <button className='mx-auto w-auto underline font-bold text-sm' onClick={showModal}>
            Update avatar
          </button>
          <Form form={form} layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
              <Form.Item
                name='hoTen'
                label='Name'
                tooltip='Your full name'
                rules={[
                  {
                    required: true,
                    message: "Please type your full name",
                    whitespace: true,
                  },
                  {
                    pattern: new RegExp(/^[\p{L}\s'-]+$/u),
                    message: "Your name does not have right format",
                  },
                ]}
              >
                <Input placeholder='Input name here' />
              </Form.Item>
              <Form.Item
                label='Email'
                name='email'
                rules={[
                  {
                    required: true,
                    message: "Please type your email!",
                  },
                  {
                    type: "email",
                    message: "Invalid email format",
                  },
                ]}
              >
                <Input placeholder='example@gmail.com' />
              </Form.Item>
              <Form.Item
                label='New password'
                name='matKhau'
                rules={[
                  {
                    min: 6,
                    message: "Password must have at least 6 characters",
                  },
                ]}
              >
                <Input.Password placeholder='********' />
              </Form.Item>
            </div>
            <div className='mt-9'>
              <button
                type='button'
                onClick={() => form.submit()}
                className='cursor-pointer text-white w-full bg-pink-500 hover:bg-pink-700 duration-300 px-6 py-2 rounded-lg'
              >
                Update
              </button>
            </div>
          </Form>
        </div>
      </IonContent>
    </IonPage>
  );
}
