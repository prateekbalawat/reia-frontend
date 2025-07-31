const FullScreenLoader = () => {
  return (
    <div className="absolute inset-0 bg-white/70  z-40 flex justify-center items-center rounded-xl">
      <div className="w-10 h-10 border-4 border-t-blue-600 border-white rounded-full animate-spin"></div>
    </div>
  );
};

export default FullScreenLoader;
