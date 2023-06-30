import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

export default function SearchBox() {
  const navigate = useNavigate();

  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || '');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };
  return (
    <Form className="d-flex" onSubmit={submitHandler}>
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5"
        value={keyword}
      />
      <Button type="submit" variant="outline-success" className="p-2 mx-2">
        Search
      </Button>
    </Form>
  );
}
