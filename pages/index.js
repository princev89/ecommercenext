import { useEffect, useState } from "react"
import Product from '../components/Product'
import { initMongoose } from "../lib/mongoose";
import { findAllProducts } from "./api/products";
import Layout from "../components/Layout"; 


export default function Home({ products }) {
  // const [productsInfo, setProdcutsInfo] = useState([]);
  const [phrase, setPhrase] = useState('');
  // useEffect(() => {
  //   fetch('/api/products')
  //     .then(response => response.json())
  //     .then(json => setProdcutsInfo(json));
  // }, []);

  const categoriesName = [...new Set(products.map(p => p.category))];
  if (phrase) {
    products = products.filter(p => p.name.toLowerCase().includes(phrase));
  }

  return (

 <Layout>
      <input type="text" value={phrase} onChange={e => setPhrase(e.target.value)} placeholder="Search for products...." className="bg-gray-100 w-full py-2 px-4 rounded-xl" />
      <div >
        {categoriesName.map(categoryName => (

          products.find(p => p.category === categoryName) && (
            <div key={categoryName}>
              <h2 className="text-2xl py-5 capitalize" >{categoryName}</h2>
              <div className="flex -mx-5 overflow-x-scroll snap-x scrollbar-hide">
                {products.filter(p => p.category == categoryName).map(productInfo => (
                  <div key={productInfo._id} className="px-5 snap-start">
                    <Product {...productInfo} />
                  </div>
                ))}
              </div>
            </div>
          )

        ))}

      </div>

      
      </Layout>


  )
}


export async function getServerSideProps() {
  await initMongoose();
  const products = await findAllProducts();
  console.log(products);


  return {
    props: {
      products: JSON.parse(JSON.stringify(products))
    }
  };

}