import { FaArrowLeft } from "react-icons/fa";
import { WHALE_URL } from "../util/config";
import { useEffect, useState } from "react";

export default function BackButton() {
  const [urlWhale, setUrlWhale] = useState({});
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const loginParam = queryParams.get("login");
    const passParam = queryParams.get("pass");
    const langParam = queryParams.get("lang");

    setUrlWhale({
      login: loginParam,
      password: passParam,
      language: langParam,
    });
  }, []);
  return (
    <div
      className="w-full text-center font-semibold text-xl bg-[#9c27b0] rounded-md py-2 text-white flex items-center justify-center gap-[14px]"
      onClick={() => {
        window.location.href =
          WHALE_URL +
          `/?data=${urlWhale.login}&pmain=${urlWhale.password}&lang=${urlWhale.language}`;
      }}
    >
      <FaArrowLeft className="text-[16px] mt-[3px]" /> BACK TO GAME
    </div>
  );
}
