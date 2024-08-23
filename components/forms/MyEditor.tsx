"use client"
import "./editor.css"
import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/es.js';

const MyEditor = () => {
  const [editorData, setEditorData] = useState('');

  return (
    <CKEditor
      editor={ClassicEditor}
      data={editorData}
      onChange={(event, editor) => {
        const data = editor.getData();
        setEditorData(data);
      }}
      config={{
        ckfinder: {
          uploadUrl: '/your-upload-endpoint-url', // URL para el endpoint de subida
        },
        language: 'es', // Cambiar el idioma del editor si es necesario
      }}
    />
  );
};

export default MyEditor;