import { Col, Row } from 'react-bootstrap';
// import products from '../products';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productApiSlice';
import { Link, useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';

const HomeScreen = () => {
  const { keyword, pageNumber } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <div className="my-3">
          <Link className="btn btn-light" to="/">
            Go Back
          </Link>
        </div>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data.message || error.error}</Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col sm={12} md={6} lg={4} key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword || ''}
          />
        </>
      )}
    </>
  );
};
export default HomeScreen;
