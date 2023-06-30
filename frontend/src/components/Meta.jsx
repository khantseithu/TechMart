import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function Meta({ title, description, keywords }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
}

Meta.defaultProps = {
  title: 'TechMart - A Full-Stack Ecommerce Web Application',
  description:
    'TechMart is a feature-rich ecommerce web application developed using the MERN stack, which includes MongoDB, Express.js, React.js, and Node.js. It offers a comprehensive set of functionalities and tools to facilitate seamless online shopping experiences for customers.',
  keywords:
    'TechMart, ecommerce web application, full-stack, MERN stack, MongoDB, Express.js, React.js, Node.js, online shopping, features, tools.',
};
