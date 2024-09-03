"use client"
import BlogForm from '@/components/forms/BlogForm'
import { DeleteIcon, LoginIcon } from '@/components/icons';
import { subtitle, title } from '@/components/primitives'
import { useGetBlogEntries, usePutEntry } from '@/services/blog/blog';
import { Button } from '@nextui-org/button';
import { useDisclosure } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import ModalDelete from '@/components/modals/ModalDelete';
import { toast } from 'react-toastify';

export default function EditBlog({ params }: { params: { id: number } }) {
  const { data: data2, error: error2, isLoading, putEntry } = usePutEntry(`/entries/${params.id}`);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter()
  const { data, error, isLoading: isLoadingData } = useGetBlogEntries(`/entries/${params.id}`)
  const [content, setContent] = useState('<p>Contenido html</p>');
  const [author, setAuthor] = useState('');
  const [title2, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [lang, setLang] = useState<"esp" | "eng">('esp');
  const [isPublished, setIsPublished] = useState(1);

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
    const promise = putEntry({
      content,
      author,
      title: title2,
      category,
      lang,
      is_published: 1,
    });
    toast.promise(
      promise,
      {
        pending: 'Edditing Post',
        success: 'Post eddited succesfully',
        error: 'Something went wrong'
      }
    )
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
          <div className="flex flex-col items-center justify-center gap-4 mt-6">

            <Button color="success" onClick={handleSubmit} type='submit' className='p-4 w-[200px]' isLoading={isLoading} endContent={<LoginIcon />}>
              Publish
            </Button>
            <Button color="danger" onClick={onOpen} type='submit' className='p-4 w-[200px]' endContent={<DeleteIcon />}>
              Delete
            </Button>
          </div>
        </div>
      </div>
      <ModalDelete afterDelete={() => { router.push("/blog") }} title={(data.data as any)?.title} isOpen={isOpen} url={`/entries/${params.id}`} onOpen={onOpen} onOpenChange={onOpenChange} />
    </>
  )
}
