export const uploadMedia = async (file: File, token: string, is360: boolean = false) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const isVideo = file.type.startsWith('video');
    let endpoint = isVideo ? 'video' : 'image';

    // If it's a 360 image, use the dedicated endpoint
    if (is360 && !isVideo) {
      endpoint = 'image360';
    }

    console.log(`Uploading ${endpoint}: ${file.name}, size: ${file.size} bytes`);

    const res = await fetch(
      `https://tecnycampo-backend.onrender.com/api/media/${endpoint}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Upload failed with status ${res.status}:`, errorText);
      throw new Error(`Error ${res.status}: ${errorText || 'Error subiendo archivo'}`);
    }

    const result = await res.json();
    console.log('Upload successful:', result);
    return result; // { url, public_id }
  } catch (error: any) {
    console.error('Upload error:', error);
    throw new Error(error.message || 'Error de conexión al subir archivo');
  }
};
