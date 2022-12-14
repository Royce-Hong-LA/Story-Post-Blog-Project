import React, { useState, useContext } from "react";
import PostTitle from "../postTitle/PostTitle";
import PostDesc from "../postDesc/PostDesc";
import PostImg from "../postImg/PostImg";
import { PostBlog } from "../../../../utils/httpRequests/HttpRequest";
import PostContext from "../../../../authContext/postContext";

export default function WritePost() {
  const context = useContext(PostContext);
  const username = window.localStorage.getItem("user");
  const initialFormState = {
    username: username,
    postTitle: "",
    postDesc: "",
  };
  const [form, setForm] = useState(initialFormState);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.id]: event.target.value });
  };

  const postSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const blog = await PostBlog(form, context.imageId);
      window.localStorage.removeItem("imageId");
      window.location.replace("/posts/" + blog._id);
      console.log("blog ID: " + blog._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center mt-40 mb-28">
        <div className="bg-white bg-opacity-50 text-black shadow-lg rounded-md xs:w-11/12 sm:w-10/12 msm:w-9/12 laptop:w-7/12 lg:w-5/12 mobile:text-xs tablet:text-sm">
          <form className="postDataFormBox" onSubmit={postSubmitHandler}>
            <div className="grid grid-rows gap-6">
              <div className="text-slate-800 border-b-[.5px] border-blue-200 ">
                <PostTitle
                  handleChange={handleChange}
                  postTitle={form.postTitle}
                  value={form.postTitle}
                />
              </div>
              <div className="text-slate-800 border-b-[.5px] border-blue-200 ">
                <PostDesc
                  handleChange={handleChange}
                  postDesc={form.postDesc}
                  value={form.postDesc}
                />
              </div>
              <div className="text-slate-800 border-b-[.5px] border-blue-200">
              <PostImg />
              </div>
              <button
                type="submit"
                className="w-1/2 px-10 p-2 text-white transition duration-300 rounded-md hover:from-indigo-500 hover:to-blue-500 ease bg-gradient-to-br from-blue-400 to-indigo-400 justify-self-center mt-10 mb-8 shadow-lg"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
