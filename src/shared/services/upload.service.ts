export const uploadImage = async (file: File, token: string) => {
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch('https://tecnycampo-backend.onrender.com/api/media/image', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error('Error subiendo imagen');
  }

  return res.json(); // { url, public_id }
};
