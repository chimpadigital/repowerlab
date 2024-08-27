"use client"
import BlogForm from '@/components/forms/BlogForm'
import { LoginIcon } from '@/components/icons';
import { subtitle, title } from '@/components/primitives'
import { useGetBlogEntries, usePostEntry } from '@/services/blog/blog';
import { Button } from '@nextui-org/button';
import React, { useEffect, useState } from 'react'


export default function EditBlog({ params }: { params: { id: number } }) {
  const { data: data2, error: error2, isLoading, postEntry } = usePostEntry("/entries");

  const { data, error, isLoading: isLoadingData } = useGetBlogEntries(`/entries/${params.id}`)

  const [content, setContent] = useState('<p>Contenido html</p>');
  const [author, setAuthor] = useState('');
  const [title2, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [lang, setLang] = useState<"esp" | "eng">('esp');
  const [isPublished, setIsPublished] = useState(0);

  useEffect(() => {
    console.log(data)
    if (data.data) {
      const blog = data.data as any
      setContent(blog.content)
      setAuthor(blog.author)
      setTitle(blog.title)
      setIsPublished(blog.is_published)
    }
  }, [data])

  const handleSubmit = () => {
    postEntry({
      content,
      author,
      title: title2,
      category,
      lang,
      is_published: isPublished,
    });
  };
  return (
    <>
      <div className="w-full flex pb-6">
        <h1 className={title({ size: "sm" })}>Edit </h1>
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

            <Button color="primary" onClick={handleSubmit} type='submit' className='p-4' isLoading={isLoading} disabled={isLoading} endContent={<LoginIcon />}>
              Publish
            </Button>
            <Button color="warning" onClick={handleSubmit} type='submit' className='p-4 ' isLoading={isLoading} disabled={isLoading} endContent={<LoginIcon />}>
              Draft
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
