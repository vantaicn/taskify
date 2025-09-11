type AvatarProps = {
  src?: string;
  alt?: string;
  size?: number;
};

export function Avatar({ src, alt = "User", size = 40 }: AvatarProps) {
  return (
    <div
      className="rounded-full overflow-hidden bg-gray-100 flex items-center justify-center cursor-pointer"
      style={{ width: size, height: size }}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <div className="text-white text-sm font-semibold bg-green-700 w-full h-full flex items-center justify-center">
          {alt.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
}

export default Avatar;
