"use client";

import Image from "next/image";
import checkIconSrc from "@/assets/memo/Icon.png";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import axios from "axios";

export default function MemoArea({
  id,
  data,
}: {
  id: number;
  data: string | null;
}) {
  const [onEdit, setOnEdit] = useState(false);
  const [memoVal, setMemoVal] = useState<string | null>(data);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const handleSave = () => {
    setOnEdit(false);
    axios
      .post(`http://localhost:5001/update/${id}`, {
        memo: memoVal,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMemoVal(e.target.value);
  };

  useEffect(() => {
    if (onEdit) {
      textRef.current?.focus();
    }
  }, [onEdit]);
  return (
    <div className="w-full bg-white border border-gray-300 rounded-3xl p-7 flex flex-col gap-4">
      <textarea
        className="focus: outline-none w-full h-full resize-none bg-[#F3F5F9] rounded-3xl p-5"
        placeholder="메모를 입력하세요."
        value={memoVal || ""}
        onChange={handleChange}
        disabled={!onEdit}
        ref={textRef}
      ></textarea>
      <div className="flex flex-row justify-end items-center gap-4">
        <button
          onClick={() => setOnEdit(true)}
          className="border-black border rounded-md font-[300] text-sm w-[80px] h-[33px]"
        >
          수정
        </button>

        {!onEdit ? (
          <span className="bg-[#090b4b] w-[80px] h-[33px] rounded-md flex items-center justify-center">
            <Image
              src={checkIconSrc}
              alt="check"
              width={20}
              height={20}
            />
          </span>
        ) : (
          <button
            onClick={handleSave}
            className="bg-[#DCE2FC] text-[#090B4B] font-[300] text-sm w-[80px] h-[33px] rounded-md"
          >
            저장
          </button>
        )}
      </div>
    </div>
  );
}
