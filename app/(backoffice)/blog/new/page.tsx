"use client"
import BlogForm from '@/components/forms/BlogForm'
import { LoginIcon } from '@/components/icons';
import { subtitle, title } from '@/components/primitives'
import { usePostEntry } from '@/services/blog/blog';
import { Button } from '@nextui-org/button';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
export default function NewBlog() {
  const { data: data2, error: error2, isLoading, postEntry } = usePostEntry("/entries");

  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [title2, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [lang, setLang] = useState<"esp" | "eng">('esp');
  const [isPublished, setIsPublished] = useState(0);

  const handleSubmit = (publish?: boolean) => {
    const promise = postEntry({
      content,
      author,
      title: title2,
      category,
      lang,
      is_published: publish ? 1 : isPublished,
    });
    toast.promise(
      promise,
      {
        pending: 'Building Post',
        success: 'Post created succesfully',
        error: 'Something went wrong'
      }
    )
  };
  useEffect(() => {
    console.log(data2)
  }, [data2])

  return (
    <>
      <div className="w-full flex pb-6">
        <h1 className={title({ size: "sm" })}>New Success Case</h1>
      </div>
      <div className="flex gap-6">
        <BlogForm
          content={content}
          author={author}
          title={title2}
          category={category}
          lang={lang}
          isPublished={isPublished}
          setContent={setContent}
          setAuthor={setAuthor}
          setTitle={setTitle}
          setCategory={setCategory}
          setLang={setLang}
          setIsPublished={setIsPublished} />
        <div className="card shadow w-[350px] rounded h-fit p-6">
          <h5 className={subtitle()}>Actions</h5>
          <div className="flex flex-col gap-4 mt-6">

            <Button color="success" onClick={() => { handleSubmit(true) }} type='submit' className='p-4' isLoading={isLoading} disabled={isLoading} endContent={<LoginIcon />}>
              Publish
            </Button>
            <Button color="warning" onClick={() => { handleSubmit() }} type='submit' className='p-4 ' isLoading={isLoading} disabled={isLoading} endContent={<LoginIcon />}>
              Draft
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
