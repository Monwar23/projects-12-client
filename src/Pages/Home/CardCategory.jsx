

const CardCategory = ({ item }) => {
    const { category, image_url } = item;

    return (
        <div className="max-w-sm bg-white rounded-lg overflow-hidden shadow-lg hover:scale-105 transition">
            <div className="relative w-full h-48 overflow-hidden">
                <img className="absolute inset-0 w-full h-full object-cover" src={image_url} alt={category} />
            </div>
            <div className="px-6 py-4">
                <div className="font-bold text-center text-xl mb-2 text-pink-500">{category}</div>
            </div>
        </div>
    );
};

export default CardCategory;
