"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import bookMarkIcon from "@/assets/card/bookmark.png";

interface ICardProps {
  data: {
    id: number;
    country: string;
    school: string;
    category: string;
    info_type: string;
    url: string;
    title: string;
    saved: number;
    memo: string | null;
  };
}

const Card = ({ data }: ICardProps) => {
  const [isScrap, setIsScrap] = useState<boolean>(data.saved === 1);
  const handleClickScrap = () => {
    if (isScrap) {
      return;
    } else {
      if (confirm("스크랩 하시겠습니까?")) {
        axios
          .get(`http://localhost:5001/scrap/${data.id}`)
          .then((res) => {
            console.log(res.data);
            alert("스크랩 되었습니다.");
            setIsScrap(true);
          })
          .catch((err) => console.log(err));
      }
    }
  };
  const SchoolSpan = () => {
    return (
      <span
        className={`${
          data.school === "Martin Luther University of Halle-Wittenberg"
            ? "text-base"
            : "text-lg"
        } bg-[#FFEECE] text-[#FFA800] font-[300] w-fit px-4 py-1.5 rounded-xl`}
      >
        {data.school}
      </span>
    );
  };

  return (
    <div className="w-[455px] h-[285px] rounded-2xl bg-[#F5F7FE] p-7 flex flex-col relative shrink-0">
      <SchoolSpan />
      <div className="whitespace-pre-wrap break-words w-full text-[24px] font-[700] font-[#090B4B] my-4 max-h-[115px] text-ellipsis overflow-hidden">
        {data.title}
      </div>
      <div className="flex flex-row absolute bottom-7 justify-between items-end w-[calc(100%-56px)]">
        <div className="flex flex-row gap-3 h-fit">
          <span className="bg-[#DCE2FC] px-6 py-2 rounded-3xl">
            {data.info_type}
          </span>
          <span className="bg-[#B6C4FF] px-6 py-2 rounded-3xl">
            {data.category}
          </span>
        </div>
        <div
          onClick={handleClickScrap}
          className={`${
            isScrap ? "bg-slate-500" : "bg-[#090B4B]"
          } w-[72px] h-[72px] rounded-full flex justify-center items-center cursor-pointer`}
        >
          <Image
            src={bookMarkIcon}
            alt="bookmark"
            width={40}
            height={40}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
