import BlogForm from '@/components/forms/BlogForm'
import { title } from '@/components/primitives'
import React from 'react'

export default function NewBlog() {
  return (
    <>
      <div className="w-full flex pb-6">
        <h1 className={title({ size: "sm" })}>New Success Case</h1>
      </div>

      <BlogForm />
    </>
  )
}
