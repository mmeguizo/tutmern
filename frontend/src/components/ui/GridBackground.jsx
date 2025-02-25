const GridBackground = ({ children }) => {
  return (
    <div className="w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
        {/* <div className="grid grid-cols-10 gap-4 w-full h-full">
          {[...Array(100)].map((_, i) => (
            <div key={i} className="w-2 h-2 bg-gray-300 rounded-full"></div>
          ))}
        </div> */}
      </div>
      {children}
    </div>
  );
};

export default GridBackground;
