import { useQuery } from "@tanstack/react-query";
import unsplashApi from "@/api/unsplashApi";

const useUnsplash = () => {
  const useGetPhotos = () => {
    return useQuery({
      queryKey: ["unsplash", "photos"],
      queryFn: () => unsplashApi.getPhotos(),
    });
  };

  return { useGetPhotos };
};

export default useUnsplash;
