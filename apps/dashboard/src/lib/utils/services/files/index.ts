import { getAccessToken } from '$lib/utils/functions/supabase';

export const uploadFile = async (file: File) => {
  try {
    const accessToken = await getAccessToken();
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/files', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: accessToken
      }
    });
    if (!response.ok) {
      console.log(response);
      throw new Error(await response.text());
    }
    return response.json();
  } catch (error) {
    console.error(error);
  }
};
