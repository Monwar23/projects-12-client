
const SectionTitle = ({heading,subHeading}) => {
    return (
        <div className="mx-auto text-center md:w-6/12 my-8">
        <h3 className="text-4xl uppercase text-pink-500 border-y-4 py-4">{heading}</h3>
        <p className="mb-2">{subHeading}</p>
    </div>
    );
};

export default SectionTitle;