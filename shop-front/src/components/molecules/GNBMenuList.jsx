import { BsList } from "react-icons/bs";

/**
 * GNBMenuList 특정 카테고리로 이동할 수 있는 링크를 제공
 * 현재는 링크로의 이동 기능은 구현하지 않은 상태
 */
const GNBMenuList = () => {
  const staticServerUri = process.env.REACT_APP_PATH || "";
  const onClickEventPage = (e) => {
    e.preventDefault();
    window.location.href = `${staticServerUri}/event`;
  };
  const onClickHomePage = (e) => {
    e.preventDefault();
    window.location.href = `${staticServerUri}/`;
  };
  return (
    <ul className="flex min-w-fit">
      <li
        onClick={onClickHomePage}
        className="font-semibold px-3 pt-8 pb-5 hover:border-b-4 hover:border-neutral-700 hover:font-semibold cursor-pointer">
        홈
      </li>

      <span className=" w-px h-4 bg-neutral-300 mx-3 mt-9 mb-auto" />
      <li className="flex items-center px-3 pt-7 pb-5 font-semibold text-blue-500 hover:font-semibold cursor-pointer">
        <BsList className="text-lg mx-1" />
        {" 카테고리"}
      </li>
      <li
        onClick={onClickEventPage}
        className="flex items-center px-3 pt-7 pb-5 font-semibold text-blue-500 hover:font-semibold cursor-pointer">
        <BsList className="text-lg mx-1" />
        {" 이벤트"}
      </li>
    </ul>
  );
};
export default GNBMenuList;
