import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useAppDispatch } from "../store/hooks";
import { createPostAsync } from "../store/thunks/createBlogPost";
import { BlogPost, ButtonType } from "../types";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "./button";

// Define the validation schema using yup
const schema = yup.object({
  title: yup.string().required("Title is required"),
  body: yup.string().required("Body is required"),
  author: yup.string().required("Author is required"),
  avatar: yup
    .string()
    .url("Avatar must be a valid URL")
    .required("Avatar is required"),
});

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const CreatePostModal = ({ isOpen, setIsOpen }: Props) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleCloseModal = () => {
    setOpen(false);
    setIsOpen(false);
    reset();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle form submission
  const onSubmit = async (data: any) => {
    const newPost: BlogPost = {
      title: data.title,
      body: data.body,
      author: {
        name: data.author,
        avatar: data.avatar,
      },
    };

    try {
      await dispatch(createPostAsync(newPost)).unwrap();
      toast.success("New post added!");
      handleCloseModal();
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post.");
    }
  };

  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title className="m-0 text-[17px] font-medium text-mauve12">
            Create post
          </Dialog.Title>
          <Dialog.Description className="mb-5 mt-2.5 text-[15px] leading-normal text-mauve11">
            Make sure to enter all of the required information
          </Dialog.Description>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Title */}
            <div className="flex flex-col items-center gap-y-1 mb-3">
              <fieldset className="flex items-center gap-x-5 w-full">
                <label
                  className="w-[30%] text-left text-[15px] text-violet11"
                  htmlFor="title"
                >
                  Title *
                </label>
                <input
                  {...register("title")}
                  className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
                  defaultValue=""
                />
              </fieldset>
              {errors.title && (
                <p className="text-red-600 flex w-full justify-end items-end">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Body */}
            <div className="flex flex-col items-center gap-y-1 mb-3">
              <fieldset className="flex items-center gap-x-5 w-full">
                <label
                  className="w-[30%] text-left text-[15px] text-violet11"
                  htmlFor="body"
                >
                  Body *
                </label>
                <textarea
                  {...register("body")}
                  className="inline-flex h-[70px] w-full flex-1 items-center justify-center rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
                  defaultValue=""
                />
              </fieldset>
              {errors.body && (
                <p className="text-red-600 flex w-full justify-end items-end">
                  {errors.body.message}
                </p>
              )}
            </div>

            {/* Author */}
            <div className="flex flex-col items-center gap-y-1 mb-3">
              <fieldset className="flex items-center gap-x-5 w-full">
                <label
                  className="w-[30%] text-left text-[15px] text-violet11"
                  htmlFor="author"
                >
                  Author *
                </label>
                <input
                  {...register("author")}
                  className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
                  defaultValue=""
                />
              </fieldset>
              {errors.author && (
                <p className="text-red-600 flex w-full justify-end items-end">
                  {errors.author.message}
                </p>
              )}
            </div>

            {/* Avatar */}
            <div className="flex flex-col items-center gap-y-1 mb-3">
              <fieldset className="flex items-center gap-x-5 w-full">
                <label
                  className="w-[30%] text-left text-[15px] text-violet11"
                  htmlFor="avatar"
                >
                  Avatar image *
                </label>
                <input
                  {...register("avatar")}
                  className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
                  defaultValue=""
                />
              </fieldset>
              {errors.avatar && (
                <p className="text-red-600 flex w-full justify-end items-end">
                  {errors.avatar.message}
                </p>
              )}
            </div>

            <div className="mt-[25px] flex justify-end">
              <Dialog.Close asChild>
                <Button buttonType={ButtonType.Primary}>Save</Button>
              </Dialog.Close>
            </div>
          </form>

          <Dialog.Close asChild>
            <button
              className="absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full text-violet11 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
              aria-label="Close"
              onClick={handleCloseModal}
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CreatePostModal;
