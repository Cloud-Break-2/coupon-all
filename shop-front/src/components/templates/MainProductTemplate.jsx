import Container from "../atoms/Container";
import ProductGrid from "../organisms/ProductGrid";
import { useEffect, useRef, useState } from "react";
import { fetchProducts } from "../../services/api/product";
import { useQuery } from "react-query";
import _ from "lodash";
import ErrorTypo from "../atoms/ErrorTypo";

const MainProductTemplate = () => {
  const [page, setPage] = useState(0);
  const isFirstLoad = useRef(true);
  const bottomObserver = useRef(null);
  const [products, setProducts] = useState([]);
  const [isEnd, setIsEnd] = useState(false);

  const { data, error, isLoading } = useQuery(`/products?page=${page}`, () =>
    fetchProducts(page)
  );

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isEnd) {
            setPage((page) => page + 1);
          }
        });
      },
      {
        root: null,
        threshold: 1,
      }
    );

    const currentObserver = bottomObserver.current;
    if (currentObserver && !isFirstLoad.current && !isLoading) {
      io.observe(currentObserver);
    }

    return () => {
      if (currentObserver) {
        io.unobserve(currentObserver);
      }
    };
  }, [isLoading, isEnd]);

  const MAX_RESPONSE_COUNT = 9;
  useEffect(() => {
    if (!isLoading && !!data) {
      setProducts((prevProducts) =>
        _.uniqBy([...prevProducts, ...data.data.response], "id")
      );
      if (data.data.response.length < MAX_RESPONSE_COUNT) setIsEnd(true);
    }
  }, [data, isLoading, MAX_RESPONSE_COUNT]);

  useEffect(() => {
    isFirstLoad.current = false;
  }, []);

  if (error) {
    return <ErrorTypo />;
  }

  return (
    <Container className="w-full px-24 py-16 m-auto">
      <ProductGrid products={products} isLoading={isLoading} />
      <div ref={bottomObserver}></div>
    </Container>
  );
};

export default MainProductTemplate;
