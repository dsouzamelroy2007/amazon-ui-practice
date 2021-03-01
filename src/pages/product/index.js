import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Information from '../../components/product/Information';
import productsApi from 'api/products';
import Loader from '../../components/general/Loader';
import Error from '../../components/general/Error'
import './index.scss';

function ProductPage() {
  let { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadProduct = useCallback(async () => {
    if(loading || product) return;

    setLoading(true);
    setError(null);

    try{
        const json = await productsApi.getProduct(productId);
        console.log(json);
        setProduct(json);
    }catch(e){
      setError(e);
    }
    setLoading(false);
  }, [loading, product, productId]);
  
  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  if(loading) {
    return <Loader size = {50} />;
  } else if(error) {
    return <Error message = "Failed to load products" actionFn = {loadProduct} />;
  } else if (product) {
    return (
      <div className="product">
        <Information product={product} />
      </div>
    );
  } else {
    return null;
  }
}

export default ProductPage;
