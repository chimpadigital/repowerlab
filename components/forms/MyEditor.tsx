"use client"
import "./editor.css"
import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/es.js';
import { CustomUploadAdapter, MyCustomUploadAdapterPlugin } from "./custom-upload-adapter";


const MyEditor = ({ content, setContent }: any) => {
  const editorConfiguration = {
    mediaEmbed: {
      previewsInData: true
    },
    language: 'es',
    extraPlugins: [MyCustomUploadAdapterPlugin],
  };

  return (
    <CKEditor
      editor={ClassicEditor}
      data={content}
      onChange={(event, editor) => {
        const data = editor.getData();
        setContent(data);
      }}
      config={editorConfiguration}
    />
  );
};

export default MyEditor;