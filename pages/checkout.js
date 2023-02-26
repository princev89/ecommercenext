import { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { ProductsContext } from "../components/ProductsContext";
import Image from "next/image";

export default function Checkout(){
    const {selectedProducts} = useContext(ProductsContext);
    const [productsInfos, setProductsInfos]  = useState([]);
    useEffect(()=> {
        const uniqIds = [...new Set(selectedProducts)];
        fetch('/api/products?ids='+ uniqIds.join(','))
        .then(response => response.json())
        .then(json => setProductsInfos(json));
    }, [selectedProducts]);
    return (
       <Layout>
        {!productsInfos.length && (
            <div>no products in your shopping cart</div>
        )}
        {productsInfos.length && productsInfos.map(productInfo => (
            <div key={productInfo._id}>
                <div className="bg-gray-100 p-3 rounded-xl">
                    <Image src={productInfo.picture} width={100} height={100}/>
                </div>
            </div>
        ))}
       </Layout>
    );
}