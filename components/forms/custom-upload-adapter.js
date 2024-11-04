
import { getCookie } from "@/utils/cookieHandler";

export class CustomUploadAdapter {
  constructor(loader) {
    this.loader = loader;
    this.url = `${process.env.API_URL}/entries/images`; // URL para la carga
    this.token = getCookie("token"); // Asegúrate de que esta función esté definida y devuelva el token
  }

  upload() {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      this.loader.file
        .then((file) => {
          data.append('upload', file);
          return fetch(this.url, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${this.token}`,
            },
            body: data,
          });
        })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          reject(`Upload failed: ${response.statusText}`);
        })
        .then((responseData) => {
          resolve({
            default: responseData.data.url, // Cambia esto según tu respuesta del servidor
          });
        })
        .catch((error) => {
          reject(`Upload failed: ${error}`);
        });
    });
  }

  abort() {
    // Opcional: Maneja la abortación de la carga
  }
}

export function MyCustomUploadAdapterPlugin( editor ) {
  editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
      // Configure the URL to the upload script in your backend here!
      return new CustomUploadAdapter( loader );
  };
}