import BuyCartButton from "@/app/_components/BuyCartButton";
import { singleProductHandler } from "@/lib/axiosHandler";
import Image from "next/image";

export default async function ProductPage({ params }) {
  const param = await params;
  const { data } = await singleProductHandler(param.productId);

  return (
    <>
      <div className="flex flex-col items-center p-6">
        <h1 className="text-3xl font-semibold mb-6">{data.name}</h1>

        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-[auto_auto] gap-6 mb-6">
            {/* Left: Image Section */}
            <div className="flex justify-center">
              <Image
                src={data.image}
                alt={data.name}
                width={300}
                height={300}
                className="hover:scale-110 transition ease-in mix-blend-multiply object-contain max-w-xs w-full h-auto"
              />
            </div>

            {/* Right: Product Details */}
            <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
              <p className="text-xl ">
                <span className="font-bold">Price:</span> ₹{data.price}
              </p>
              <p className="text-xl ">
                <span className="font-bold">Internal:</span>{" "}
                {data.specsId.internal}
              </p>
              <p className="text-xl ">
                <span className="font-bold">Color:</span> {data.color}
              </p>

              {/* Buttons */}
              <div className="flex space-x-4 justify-center lg:justify-start">
                <BuyCartButton id = {param.productId}/>
              </div>
            </div>

            {/* Description Below Both Sections */}
            <div className="lg:col-span-2 text-center lg:text-left">
              <p className="text-gray-600">{data.description}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mx-auto px-6 lg:px-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2 text-center">
              Specifications
            </h2>
            <ul className="list-none space-y-2 text-gray-700">
              {[
                ["Model Name", data.specsId.modelName],
                ["Dimensions", data.specsId.dimensions],
                ["Weight", data.specsId.weight],
                ["Size", `${data.specsId.size}"`],
                ["Chip", data.specsId.chip],
                ["Internal Storage", data.specsId.internal],
                ["Camera", data.specsId.camera],
                ["OS", data.specsId.os],
                ["Battery", `${data.specsId.battery} mAh`],
                ["SIM", data.specsId.sim],
                ["Bluetooth", data.specsId.bluetooth],
                ["Warranty", data.specsId.warranty],
              ].map(([label, value]) => (
                <li
                  key={label}
                  className="flex justify-between border-b border-gray-300 py-2 last:border-none"
                >
                  <span className="font-medium">{label}:</span>
                  <span className="font-bold">{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
     
    </>
  );
}
