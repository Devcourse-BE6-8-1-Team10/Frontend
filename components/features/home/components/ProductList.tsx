import { PRODUCTS } from "../data/products";
import ProductCard from "./ProductCard";
import { Product } from "../ProductPanel";

interface ProductListProps {
    addToCart: (product: Product, quantity: number) => void;
}

const ProductList = ({ addToCart }: ProductListProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))}
        </div>
    );
};

export default ProductList;