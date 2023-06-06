import { Col, Row } from 'react-bootstrap';
// import products from '../products';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productApiSlice';

const HomeScreen = () => {
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const { data } = await axios.get(
  //       'https://khantseithu-potential-train-p594gqv6x5636457-5000.preview.app.github.dev/api/products'
  //     );
  //     console.log(data);
  //     setProducts(data);
  //   };
  //   fetchProducts();
  // }, []);

  const { data: products, isLoading, error } = useGetProductsQuery();
  console.log(products);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data.message || error.error}</Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products.map((product) => (
              <Col sm={12} md={6} lg={4}>
                <Product product={product} key={product._id} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};
export default HomeScreen;
