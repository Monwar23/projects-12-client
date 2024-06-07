import SectionTitle from "../../components/SectionTitle";

const ExtraSection1 = () => {
    return (
        <div>
            <SectionTitle
            heading={"Events"}
            subHeading={"Join us at our upcoming events to meet adorable pets looking for their forever homes! From adoption fairs to community fundraisers, there's something for everyone. Check our calendar and mark your dates—your new best friend could be waiting for you!"}
            >
            </SectionTitle>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          <div className="">
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <img 
                        src="https://i.ibb.co/3YbMPSN/1.jpg" 
                        alt="Adoption Drive" 
                        className="w-full h-64 object-cover rounded-t-lg"
                    />
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-2 text-pink-500">1st Adoption Drive</h2>
                        <p className="text-gray-700">
                            LovingPets first adoption drive was a remarkable success. It was held on 4th and 5th January 2024 in in New York,USA.
                        </p>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <img 
                        src="https://i.ibb.co/kGFndsg/2.jpg" 
                        alt="Adoption Drive" 
                        className="w-full h-64 object-cover rounded-t-lg"
                    />
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-2 text-pink-500">2nd Adoption Drive</h2>
                        <p className="text-gray-700">
                            LovingPets first adoption drive was a remarkable success. It was held on 11th and 12th January 2024 in Canada.
                        </p>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <img 
                        src="https://i.ibb.co/3Y5vyrv/luna.jpg" 
                        alt="Adoption Drive" 
                        className="w-full h-64 object-cover rounded-t-lg"
                    />
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-2 text-pink-500">3rd Adoption Drive</h2>
                        <p className="text-gray-700">
                            LovingPets first adoption drive was a remarkable success. It was held on 4th and 5th January 2024 in California,USA.
                        </p>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <img 
                        src="https://i.ibb.co/YpgWFyF/pexels-carlos-santiago-421908853-20440668.jpg" 
                        alt="Adoption Drive" 
                        className="w-full h-64 object-cover rounded-t-lg"
                    />
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-2 text-pink-500">4th Adoption Drive</h2>
                        <p className="text-gray-700">
                            LovingPets first adoption drive was a remarkable success. It was held on 4th and 5th January 2024 in Australia.
                        </p>
                    </div>
                </div>
            </div>

          </div>
        </div>
    );
};

export default ExtraSection1;