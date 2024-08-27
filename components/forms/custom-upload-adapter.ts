import { getCookie } from '@/utils/cookieHandler';
import { UploadAdapter, UploadResponse } from '@ckeditor/ckeditor5-upload';

class CustomUploadAdapter implements UploadAdapter {
  private loader: any;
  private abortController: AbortController;

  constructor(loader: any) {
    this.loader = loader;
    this.abortController = new AbortController(); // Controlador para cancelar la solicitud si es necesario
  }

  // Método para subir el archivo
  async upload(): Promise<UploadResponse> {
    const { loader } = this;
    const formData = new FormData();
    formData.append('file', loader.file);
    
    try {
      const response = await fetch(`${process.env.API_URL}/entries/images`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${this.getToken}`, // Agrega el token si es necesario
        },
        signal: this.abortController.signal // Permite cancelar la solicitud si es necesario
      });

      if (!response.ok) {
        throw new Error('Upload failed.');
      }

      const result = await response.json();
      return {
        default: result.data.url // Asegúrate de que la respuesta JSON tenga un campo `url` con la URL del archivo
      };
    } catch (error: any) {
      console.error('Upload error:', error);
      throw error; // Propaga el error para que CKEditor pueda manejarlo
    }
  }

  // Método para cancelar la carga
  abort(): void {
    this.abortController.abort();
  }

  // Método para obtener el token de autorización
  private getToken(): string {
    // Implementa la lógica para obtener el token de autenticación aquí
    const token = getCookie("token")
    
    return token ? token : ""; // Cambia esto según la lógica de tu aplicación
  }
}

export default CustomUploadAdapter;