import React from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import CardDisplay from "../components/CardDisplay/CardDisplay";
import { useQuery, gql } from "@apollo/client";

const CATEGORY_QUERY = gql`
  query ($slug: String!) {
    catelog(slug: $slug) {
      id
      category
      slug
      animal {
        id
        title
        price
        image
      }
    }
  }
`;

function CategoryPage() {
  const { slug } = useParams();
  const { loading, error, data } = useQuery(CATEGORY_QUERY, {
    variables: {
      slug,
    },
  });
  if (loading) return <div>Loading</div>;

  if (error) return <div>Error</div>;

  return (
    <div className="py-5">
      <Container>
        <h1 className="text-capitalize">
          {data.catelog.category}
          <CardDisplay animals={data.catelog.animal} />
        </h1>
      </Container>
    </div>
  );
}

export default CategoryPage;
