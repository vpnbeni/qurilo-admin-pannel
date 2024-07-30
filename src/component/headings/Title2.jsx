// Title2.js
const Title2 = ({ heading, subheading, className }) => {
    return (
      <div className='lg:ms-14 md:ms-12 ms-6'>
        <h3 className={`tracking-widest mb-4 font-semibold text-[1rem] uppercase ${className}`}>{heading}</h3>
        <h2 className={`${className} text-4xl mb-4 capitalize`}>{subheading}</h2>
      </div>
    );
  };
  
export default Title2;
  