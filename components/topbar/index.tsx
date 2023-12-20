"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Topbar = () => {
  const pathName = usePathname();
  const selectedCls = "font-semibold border-b-4 border-blue-800";
  return (
    <nav className="w-full h-[250px] border-b-2 border-b-gray-200 px-[200px] pt-14 flex flex-col justify-between">
      <h1 className="font-extrabold text-[4rem]">나의 교환일지</h1>
      <div className="w-full flex flex-row gap-[100px]">
        <Link
          className={`${pathName === "/" ? selectedCls : ""} px-3 py-1`}
          href="/"
        >
          탐색
        </Link>
        <Link
          className={`${pathName === "/mypage" ? selectedCls : ""} px-3 py-1`}
          href="/mypage"
        >
          마이페이지
        </Link>
      </div>
    </nav>
  );
};

export default Topbar;
