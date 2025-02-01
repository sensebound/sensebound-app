import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { Dispatch, SetStateAction, useState, useEffect } from "react";

interface DeletePopUpInput {
  handler: ({ id }: { id: string }) => void;
  postId?: string;
  userId?: string;
  loading: Dispatch<SetStateAction<boolean>>;
  deletePost?: boolean;
}

export default function DeletePopUp({
  handler,
  postId,
  loading,
  deletePost,
  userId
}: DeletePopUpInput) {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setMessage(
      deletePost
        ? "Are you sure you want to delete this post?"
        : "Are you sure you want to delete your account? All your data will be lost."
    );
  }, [deletePost]);

  const handlePostDelete = async () => {
    try {
      loading(true);
      await axios.delete(`${BACKEND_URL}/api/v1/writings/deletePost/${postId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      navigate("/profile");
      loading(false)
    } catch (error) {
      console.error("Error deleting post:", error);
    } 
  };

  const handleAccountDelete = async () => {
    try {
      loading(true);
      
      await axios.delete(`${BACKEND_URL}/api/v1/user/deleteAccount/${userId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Error deleting account:", error);
    } finally {
      setTimeout(()=>{
        loading(false),2000
      })
    }
  };
  
  return (
    <div className="fixed inset-0 w-full flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-slate-50 p-6 rounded-lg shadow-xl">
        <div className="flex flex-col justify-end w-80">
          <div className="h-40 flex flex-col justify-center items-center">
            <p className="text-md font-roboto font-light mt-3 text-center">
              {message}
            </p>
          </div>
          <div className="flex flex-row justify-evenly w-80">
            <button
              onClick={() => (deletePost ? handlePostDelete() : handleAccountDelete())}
              className="bg-black text-sm text-white px-5 py-2 rounded-2xl shadow-md hover:bg-gray-900"
            >
              Confirm
            </button>
            <button
              onClick={() => handler({ id: "" })}
              className="bg-black text-sm text-white px-5 py-2 rounded-2xl shadow-md hover:bg-gray-900"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
