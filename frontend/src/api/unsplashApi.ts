import axios from "axios"

const unsplashApi = {
  getPhotos: async () => {
    const response = await axios.get("https://api.unsplash.com/photos/random", {
      params: {
        orientation: "landscape",
        count: 30,
        client_id: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
      },
    });
    return response.data;
  },
};

export default unsplashApi;
