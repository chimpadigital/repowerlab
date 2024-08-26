"use client"
import "./editor.css"
import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/es.js';

const MyEditor = ({content, setContent}: any) => {
  

  return (
    <CKEditor
      editor={ClassicEditor}
      data={content}
      onChange={(event, editor) => {
        const data = editor.getData();
        setContent(data);
      }}
      // config={{
      //   ckfinder: {
      //      uploadUrl: `${process.env.API_url}`, // URL para el endpoint de subida
      //    },
      //   language: 'es', // Cambiar el idioma del editor si es necesario
      // }}
    />
  );
};

export default MyEditor;