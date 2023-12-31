import Search from "antd/es/input/Search";
import { SearchProps } from "antd/lib/input";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

export default function Header() {
  // const onSearch: SearchProps["onSearch"] = (value, _e, info) => console.log(info?.source, value);
  const history = useHistory();
  const [search, setSearch] = useState("");
  const onSearch = () => {
    if (search) {
      history.push(`/search/${search}`);
    }
  };
  return (
    <div className='w-[95%] mx-auto flex items-center gap-3'>
      <Link to='/'>
        <img className='w-9 h-9' alt='' src='https://media.discordapp.net/attachments/1026660684739653674/1189943300061397082/picturest_logo.png' />
      </Link>
      <Search
        onChange={e => setSearch(e.target.value)}
        placeholder='input search text'
        allowClear
        enterButton='Search'
        size='large'
        onSearch={onSearch}
      />
    </div>
  );
}
