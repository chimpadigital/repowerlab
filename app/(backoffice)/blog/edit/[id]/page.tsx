import React from 'react'

export default function EditBlog({ params }: { params: { id: number } }) {
  return (
    <div>page {params.id}</div>
  )
}
