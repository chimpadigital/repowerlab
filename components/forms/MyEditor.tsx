"use client"
import "./editor.css"
import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/es.js';
import CustomUploadAdapter from "./custom-upload-adapter";

const MyEditor = ({ content, setContent }: any) => {
  const editorConfiguration = {
    plugins: [
      ...ClassicEditor.builtinPlugins,
      CustomUploadAdapter // Agrega el adaptador de carga personalizado
    ],
    mediaEmbed: {
      previewsInData: true
    },
    language: 'es', // Cambia el idioma del editor si es necesario,
    ckfinder: {
      // Solo si quieres permitir la carga a través de CKFinder en el editor
      // O puedes quitar esto si estás usando el adaptador personalizado exclusivamente
      uploadUrl: `${process.env.API_URL}/entries/images`
    }
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