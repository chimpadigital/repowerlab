"use client"
import BlogForm from '@/components/forms/BlogForm'
import { LoginIcon } from '@/components/icons';
import { subtitle, title } from '@/components/primitives'
import { useGetBlogEntries, usePostEntry, usePutEntry } from '@/services/blog/blog';
import { useDelete } from '@/services/delete';
import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'


export default function EditBlog({ params }: { params: { id: number } }) {
  const { data: data2, error: error2, isLoading, putEntry } = usePutEntry(`/entries/${params.id}`);
  const router = useRouter()
  const { data, error, isLoading: isLoadingData } = useGetBlogEntries(`/entries/${params.id}`)
  const { data: dataD, error: errorD, isLoading: isLoadingD, isDeleted, deleteEntry } = useDelete(`/entries/${params.id}`)
  const [content, setContent] = useState('<p>Contenido html</p>');
  const [author, setAuthor] = useState('');
  const [title2, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [lang, setLang] = useState<"esp" | "eng">('esp');
  const [isPublished, setIsPublished] = useState(0);

  useEffect(() => {
    if (data.data) {
      const blog = data.data as any
      setContent(blog.content)
      setAuthor(blog.author)
      setTitle(blog.title)
      setIsPublished(blog.is_published)
    }
  }, [data])

 

  const handleSubmit = () => {
    putEntry({
      content,
      author,
      title: title2,
      category,
      lang,
      is_published: isPublished,
    });
  };
  const handleDelete = () => {
    deleteEntry()
  }
  useEffect(() => {
    if(isDeleted){
      router.push('/blog')
    }
  }, [isDeleted])
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

            <Button color="primary" onClick={handleSubmit} type='submit' className='p-4' isLoading={isLoading} endContent={<LoginIcon />}>
              Publish
            </Button>
            <Button color="warning" onClick={() => { handleDelete() }} type='submit' className='p-4 ' isLoading={isLoadingD} endContent={<LoginIcon />}>
              Delete
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
