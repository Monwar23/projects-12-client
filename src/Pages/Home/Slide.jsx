
const Slide = ({image,title,text}) => {
    return (
        <div
        className='w-full bg-center bg-cover h-[38rem]'
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div className='flex items-center justify-center w-full h-full bg-gray-900/70'>
          <div className='text-center'>
            <h1 className='text-3xl font-semibold text-white lg:text-3xl'>
              {title}
            </h1>
            <p className="text-white max-w-3xl mt-4">
                {text}
            </p>
            <br />
          </div>
        </div>
      </div>
    );
};

export default Slide;