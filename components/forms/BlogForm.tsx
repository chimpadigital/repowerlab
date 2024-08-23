"use client"
import { Input } from '@nextui-org/input'
import { DatePicker, Select, SelectItem } from '@nextui-org/react'
import React from 'react'
import dynamic from 'next/dynamic';

const MyEditor = dynamic(() => import('./MyEditor'), { ssr: false });

export default function BlogForm() {
  return (
    <div className='w-full'>
      <Input
        type="string"
        label="Title"
        variant='bordered'
        placeholder="Here you title"
        labelPlacement="outside"

      />
      <div className="grid grid-cols-5 gap-4 pt-4">
        <div className="lg:col-span-2 col-span-5 ">
          <Input
            type="string"
            label="Author"
            variant='bordered'
            placeholder="Author"
            labelPlacement="outside"

          />
        </div>
        <div className="lg:col-span-1 col-span-5 ">
          <DatePicker
            label="Date"
            variant='bordered'
            labelPlacement="outside"
          />
        </div>
        <div className="lg:col-span-2 col-span-5 ">
          <Select label="Category"
            variant='bordered'
            labelPlacement="outside">
            <SelectItem key={"hola"}>Hola</SelectItem>
          </Select>
        </div>
      </div>
      <div className="pt-4">
        <MyEditor />
      </div>
    </div>
  )
}
