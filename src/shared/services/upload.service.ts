export const uploadMedia = async (file: File, token: string) => {
  const formData = new FormData();
  formData.append('file', file);

  const isVideo = file.type.startsWith('video');
  const endpoint = isVideo ? 'video' : 'image';

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
    throw new Error(`Error subiendo ${isVideo ? 'video' : 'imagen'}`);
  }

  return res.json(); // { url, public_id }
};
