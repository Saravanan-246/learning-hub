const Skeleton = ({ className }) => {
  return (
    <div
      className={`animate-pulse bg-neutral-800 rounded-xl ${className}`}
    />
  );
};

export default Skeleton;