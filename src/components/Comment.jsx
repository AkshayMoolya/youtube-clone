import React from "react";

const Comment = ({ video }) => {
  
  return (
    <div className="flex my-2 items-center">
      <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
        <img
          className="h-10 w-10 object-cover"
          src={video?.author?.avatar[0]?.url}
          alt=""
        />
      </div>
      <div className="flex flex-col w-full sm:w-full md:w-full xl:w-[800px]">
        <div className="flex text-white text-sm font-semibold">
          {video?.author?.title}
          <span className="ml-2 text-white/[0.5] text-sm">
            {video?.publishedTimeText}
          </span>
        </div>
        <span className="text-white/[0.8] text-sm mt-1">{video?.content}</span>
      </div>
    </div>
  );
};

export default Comment;
