import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../context/contextApi";
import LeftNav from "./LeftNav";
import SearchResultVideoCard from "./SearchResultVideoCard";
import { fetchdata } from "../utilis/api";

const SearchResult = () => {
  const [result, setresult] = useState();
  const { searchQuery } = useParams();
  const { setloading } = useContext(Context);

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
    fetchSearchResults();
  }, [searchQuery]);

  const fetchSearchResults = async () => {
    setloading(true);
    fetchdata(`search/?q=${searchQuery}`).then((res) => {
      console.log(res);
      setresult(res?.contents);
      setloading(false);
    });
  };

  return (
    <div className="flex flex-row h-[calac(100%-56px)]">
      <LeftNav />
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black ">
        <div className="grid grid-cols-1 gap-2 p-5 ">
          {result?.map((item) => {
            if (item?.type !== "video") return false;
            let video = item?.video;

            return <SearchResultVideoCard key={video.videId} video={video } />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
