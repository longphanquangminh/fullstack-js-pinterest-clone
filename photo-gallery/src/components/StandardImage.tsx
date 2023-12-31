import { useState } from "react";
import { DEFAULT_IMG, API_URL_IMG } from "../constants/variables";
import { hinhAnh } from "../api/generated/picturest";
import { Link } from "react-router-dom";

interface ContainerProps {
  item: hinhAnh;
}

const onImageError = (e: any) => {
  e.target.src = DEFAULT_IMG;
};

const StandardImage: React.FC<ContainerProps> = ({ item }) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <Link
      to={`/pictures/${item.hinhId}`}
      className='relative cursor-pointer'
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className={`absolute inset-0 w-full h-full bg-black rounded-3xl duration-300 ${isHover ? "opacity-50" : "opacity-0"}`}></div>
      <div
        className={`absolute bottom-0 bg-black h-28 w-full rounded-b-3xl ${
          isHover ? "opacity-50" : "opacity-0"
        } flex items-center justify-center duration-300 text-white`}
      ></div>
      <div
        className={`absolute h-28 w-full rounded-b-3xl ${
          isHover ? "opacity-100 bottom-2" : "opacity-0 bottom-0"
        } flex items-center duration-300 text-white`}
      >
        <div className={`w-[85%] space-y-3 mx-auto ${isHover ? "-translate-y-6" : "translate-y-0"} duration-300`}>
          <div className='flex items-center justify-start gap-3'>
            <img alt='' className='w-9 h-9 rounded-3xl' src={`${API_URL_IMG}/${item.nguoiDung?.anhDaiDien}`} onError={onImageError} />
            <span className='truncate'>{item.nguoiDung?.hoTen ?? "User"}</span>
          </div>
          <div className='truncate w-[100%] mx-auto'>{item.tenHinh}</div>
        </div>
      </div>
      <img alt='' className='rounded-3xl h-96 w-full object-cover' src={`${API_URL_IMG}/${item.duongDan}`} onError={onImageError} />
    </Link>
  );
};

export default StandardImage;
