const Avatar = ({ src, size = 12 }: { src: string; size?: number }) => {
  const realSize = `${size * 4}px`;
  return (
    <img
      className={`rounded-full shadow`}
      style={{
        minWidth: realSize,
        minHeight: realSize,
        width: realSize,
        height: realSize,
      }}
      src={src}
    />
  );
};

export default Avatar;
