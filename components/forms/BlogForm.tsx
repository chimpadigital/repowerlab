"use client"
import { Input } from '@nextui-org/input'
import { DatePicker, Select, SelectItem } from '@nextui-org/react'
import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import { usePostEntry } from '@/services/blog/blog';

const MyEditor = dynamic(() => import('./MyEditor'), { ssr: false });

export default function BlogForm({
  content,
  author,
  title,
  category,
  lang,
  isPublished,
  setContent,
  setAuthor,
  setTitle,
  setCategory,
  setLang,
  setIsPublished,
}: {
  content: string;
  author: string;
  title: string;
  category: string;
  lang: string;
  isPublished: boolean;
  setContent: (content: string) => void;
  setAuthor: (author: string) => void;
  setTitle: (title: string) => void;
  setCategory: (category: string) => void;
  setLang: (lang: any) => void;
  setIsPublished: (isPublished: boolean) => void;
}) {




  return (
    <div className='w-full'>
      <form>
        <Input
          type="string"
          label="Title"
          variant="bordered"
          placeholder="Here your title"
          labelPlacement="outside"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="grid grid-cols-5 gap-4 pt-4">
          <div className="lg:col-span-2 col-span-5">
            <Input
              type="string"
              label="Author"
              variant="bordered"
              placeholder="Author"
              labelPlacement="outside"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="lg:col-span-1 col-span-5">
            <Select
              label="Language"
              variant="bordered"
              labelPlacement="outside"
              value={lang}
              onChange={(value) => setLang(value.target.value)}
            >
              <SelectItem key="esp" value="esp">Spanish</SelectItem>
              <SelectItem key="eng" value="eng">English</SelectItem>
            </Select>
          </div>
          <div className="lg:col-span-2 col-span-5">
            <Select
              label="Category"
              variant="bordered"
              labelPlacement="outside"
              value={category}
              onChange={(value) => setCategory(value.target.value)}
            >
              <SelectItem key="hola" value="hola">Hola</SelectItem>
              {/* Añade más opciones según sea necesario */}
            </Select>
          </div>
        </div>
        <div className="pt-4">
          <MyEditor content={content} setContent={setContent} />
        </div>
     
      </form>
    </div>
  )
}
