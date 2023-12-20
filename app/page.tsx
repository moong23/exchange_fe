"use client";

import { useEffect, useState } from "react";
import Card from "@/components/card";
import axios from "axios";

interface IApiData {
  id: number;
  country: string;
  school: string;
  category: string;
  info_type: string;
  url: string;
  title: string;
  saved: number;
  memo: string | null;
}
const INITIAL_COUNTRY_LIST = ["프랑스", "스위스", "독일", "이탈리아"];
export default function Home() {
  const [countryList, setCountryList] =
    useState<String[]>(INITIAL_COUNTRY_LIST);
  const [dataList, setDataList] = useState<IApiData[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5001/articles").then((res) => {
      setDataList(res.data);
    });
  }, []);

  useEffect(() => {
    if (countryList.length === 0) {
      setDataList([]);
      return;
    }
    axios
      .post("http://localhost:5001/filter", {
        filterList: countryList,
      })
      .then((res) => setDataList(res.data.rows));
  }, [countryList]);

  const CountryBtn = ({ name }: { name: string }) => {
    const selected = name === "국가" ? true : countryList.includes(name);

    const handleFilterClick = () => {
      if (name === "국가") setCountryList(INITIAL_COUNTRY_LIST);
      if (selected) {
        setCountryList((prev) => prev.filter((country) => country !== name));
      } else {
        setCountryList((prev) => [...prev, name]);
      }
    };
    return (
      <span
        className={`${
          selected ? "bg-blue-200" : "bg-slate-200"
        }  px-8 py-3 rounded-3xl cursor-pointer`}
        onClick={handleFilterClick}
      >
        {name}
      </span>
    );
  };

  return (
    <main className="w-full h-[calc(100vh-250px)] px-[200px]">
      <div className="flex flex-row gap-8 my-12">
        <CountryBtn name="국가" />
        <CountryBtn name="프랑스" />
        <CountryBtn name="스위스" />
        <CountryBtn name="독일" />
        <CountryBtn name="이탈리아" />
      </div>
      <div className="flex flex-wrap flex-row gap-10 pb-10">
        {dataList.length === 0 && (
          <div className="w-full h-[calc(100vh-250px)] flex justify-center items-center">
            <span className="text-2xl font-bold">데이터가 없습니다.</span>
          </div>
        )}
        {dataList.map((data) => {
          return (
            <Card
              key={data.id}
              data={data}
            />
          );
        })}
      </div>
    </main>
  );
}
