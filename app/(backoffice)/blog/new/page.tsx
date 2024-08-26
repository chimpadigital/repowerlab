"use client"
import BlogForm from '@/components/forms/BlogForm'
import { LoginIcon } from '@/components/icons';
import { subtitle, title } from '@/components/primitives'
import { usePostEntry } from '@/services/blog/blog';
import { Button } from '@nextui-org/button';
import React, { useState } from 'react'

export default function NewBlog() {
  const { data, error, isLoading, postEntry } = usePostEntry("/entries");

  const [content, setContent] = useState('<p>Contenido html</p>');
  const [author, setAuthor] = useState('');
  const [title2, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [lang, setLang] = useState<"esp" | "eng">('esp');
  const [isPublished, setIsPublished] = useState(false);

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

          <Button color="primary" onClick={handleSubmit} type='submit' className='p-4' isLoading={isLoading} disabled={isLoading} endContent={<LoginIcon />}>
            Publish
          </Button>
        </div>
      </div>
    </>
  )
}
