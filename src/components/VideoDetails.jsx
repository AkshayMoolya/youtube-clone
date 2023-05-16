import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { abbreviateNumber } from "js-abbreviation-number";

import { fetchdata } from "../utilis/api";
import { Context } from "../context/contextApi";
import SuggestionVideoCard from "./SuggestionVideoCard";
import Comment from "./Comment";

const VideoDetails = () => {
  const [video, setvideo] = useState();
  const [relatedVideos, setrelatedVideos] = useState();
  const [comments, setcomments] = useState();
  const { id } = useParams();
  const { setloading } = useContext(Context);
  const [togglerComment, settogglerComment] = useState(true);

  useEffect(() => {
    document.getElementById("root").classList.add("custom-h");
    fetchVideoDetails();
    fetchRelatedVideos();
    fetchVideoComment();
  }, [id]);

  const fetchVideoDetails = () => {
    setloading(true);
    fetchdata(`video/details/?id=${id}`).then((res) => {
      console.log("video", res);
      setvideo(res);
      setloading(false);
    });
  };

  const fetchVideoComment = () => {
    setloading(true);
    fetchdata(`video/comments/?id=${id}`).then((res) => {
      console.log("comments", res);
      setcomments(res);
      setloading(false);
    });
  };

  const fetchRelatedVideos = () => {
    setloading(true);
    fetchdata(`video/related-contents/?id=${id}`).then((res) => {
      console.log(res);
      setrelatedVideos(res);
      setloading(false);
    });
  };

  return (
    <div className="flex justify-center flex-row h-100%  bg-black ">
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row overflow-y-auto">
        <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-auto">
          <div className="h-[200px] md:h-[400px] lg:h-[400px] xl:h[550px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
              width="100%"
              height="100%"
              style={{ backgroundColor: "#000000" }}
              playing={true}
            />
          </div>
          <div className="text-white font-bold text-sm md:text-xl mt-4 line-clamp-2 ">
            {video?.title}
          </div>
          <div className="flex justify-between flex-col md:flex-row mt-4">
            <div className="flex">
              <div className="flex items-start">
                <div className="flex h-11 w-11 rounded-full overflow-hidden">
                  <img
                    className="h-full w-full object-cover"
                    src={video?.author?.avatar[0]?.url}
                    alt="image"
                  />
                </div>
              </div>
              <div className="flex flex-col ml-3">
                <div className="text-white text-md font-semibold flex items-center">
                  {video?.author?.title}
                  {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                    <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1 " />
                  )}
                </div>
                <div className="text-white/[0.7] text-sm">
                  {video?.author?.stats?.subscribersText}
                </div>
              </div>
            </div>
            <div className="flex text-white mt-4 md:mt-0">
              <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15]">
                <AiOutlineLike className="text-xl text-white mr-2" />
                <span>{`${abbreviateNumber(
                  video?.stats?.likes,
                  2
                )} Likes`}</span>
              </div>
              <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15] ml-4">
                <span>{`${abbreviateNumber(
                  video?.stats?.views,
                  2
                )} Views`}</span>
              </div>
            </div>
          </div>
          <div
            onClick={() => settogglerComment(!togglerComment)}
            className="bg-[#303030] text-white w-[150px] px-3 py-1 inline-block rounded-sm active:scale-95 cursor-pointer font-medium mt-5"
          >
            {togglerComment ? "Hide comment" : "Show comment"}
          </div>
          {togglerComment && (
            <div className="flex flex-col p-2  mt-8  bg-black rounded-xl">
              <span className="text-sm text-white font-semibold">
                {comments?.totalCommentsCount} comments
              </span>
              <div>
                {comments?.comments?.map((items, index) => {
                  return <Comment video={items} key={index} />;
                })}
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col py-6 px-4  lg:w[350px] xl:w-[400px]">
          {relatedVideos?.contents?.map((item, index) => {
            if (item.type !== "video") return false;
            return <SuggestionVideoCard key={index} video={item?.video} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
