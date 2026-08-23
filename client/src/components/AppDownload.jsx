import React from "react";
import { assets } from "../assets/assets";

const AppDownload = () => {
  return (
    <div className="container px-4 2xl:px-20 mx-auto my-20">
      <div className="relative flex flex-col md:flex-row bg-linear-to-r from-violet-50 to-purple-100 p-12 md:p-20 rounded-xl overflow-hidden">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 max-w-md mb-8">
            Download Mobile App For Better Experience
          </h1>
          <div className="flex gap-4">
            <a href="" className="inline-block">
              <img className="h-12" src={assets.play_store} alt="" />
            </a>
            <a href="" className="inline-block">
              <img className="h-12" src={assets.app_store} alt="" />
            </a>
          </div>
        </div>

        <img
          className="absolute h-full w-auto right-0 bottom-0 mr-32 max-lg:hidden"
          src={assets.app_main_img}
          alt=""
        />
      </div>
    </div>
  );
};

export default AppDownload;
