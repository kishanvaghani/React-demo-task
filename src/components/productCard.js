import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

const ProductCard = ({ product }) => {
  const [description, setDescription] = useState(false);

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden h-fit">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-24 h-24 mx-auto object-cover"
      />

      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {product.title}
        </h3>

        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500 line-through">
            $
            {(
              product.price +
              product.price * (product.discountPercentage / 100)
            ).toFixed(2)}
          </span>
        </div>

        <div className="flex items-center mb-2">
          <span className="text-yellow-500">
            {Array.from({ length: Math.round(product.rating) }).map(
              (_, index) => (
                <span key={index}>&#9733;</span>
              )
            )}
          </span>
          <span className="text-gray-500 ml-2">
            ({product.reviews.length} reviews)
          </span>
        </div>

        <div className="text-gray-600 mb-4">
          {product.reviews.slice(0, 2).map((review, index) => (
            <div key={index} className="mb-1">
              <strong>{review.reviewerName}:</strong> {review.comment}
            </div>
          ))}
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            description ? "max-h-40" : "max-h-0"
          }`}
        >
          <p className="text-gray-600 mb-4">{product.description}</p>
        </div>

        <button
          className="w-full text-gray-600 font-bold py-2 flex gap-2 justify-center items-center rounded-md transition"
          onClick={() => setDescription(!description)}
        >
          {!description ? "View description" : "Hide description"}
          <ChevronDown
            className={`transition-all duration-300 font-bold text-gray-600 ${
              description ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
