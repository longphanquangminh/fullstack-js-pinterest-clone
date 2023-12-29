import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import Search from "antd/es/input/Search";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className='w-[95%] mx-auto flex items-center gap-3'>
      <Link to='/'>
        <img className='w-9 h-9' alt='' src='https://media.discordapp.net/attachments/1026660684739653674/1189943300061397082/picturest_logo.png' />
      </Link>
      <Input addonBefore={<SearchOutlined />} placeholder='Search' />
    </div>
  );
}
