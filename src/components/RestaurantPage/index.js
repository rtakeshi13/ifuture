import React from "react";

import { useParams } from "react-router-dom";
import useRestaurantDetail from "../../hooks/useRestaurantDetail";

import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";

import {
  Restaurant,
  Img,
  Name,
  Category,
  Delivery,
  Shipping,
  Address,
  Loading,
  ProductCategory,
} from "./styles";

import ProductCard from "../ProductCard";

const RestaurantPage = () => {
  const { restaurantId } = useParams();
  const [restaurant] = useRestaurantDetail(restaurantId);

  // O bloco abaixo vai separar os produtos por categoria e renderiza-lo
  let categories;
  let sortedProducts = [];
  let renderedProducts;
  if (restaurant) {
    // Extrai o nome das categorias, sem repeticao, ordenadas
    categories = new Set(
      restaurant.products.map((item) => item.category).sort()
    );
    // Para cada categoria ...
    categories.forEach((category) => {
      // Filtra os produtos correspondetes
      const filteredProducts = restaurant.products.filter(
        (product) => product.category === category
      );
      // Cria um objeto com o nome da categoria e o array de produtos filtrados
      const productsByCategory = {
        category: category,
        products: filteredProducts,
      };
      // Coloca esse objeto no array de produtos organizados
      sortedProducts.push(productsByCategory);
    });
    // Renderiza os produtos separados por categorias
    renderedProducts = sortedProducts.map((productsGroup) => (
      <div key={productsGroup.category}>
        <ProductCategory>{productsGroup.category}</ProductCategory>
        {productsGroup.products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    ));
  }

  return restaurant ? (
    <Container maxWidth="xs">
      <Restaurant>
        <Img src={restaurant.logoUrl} />
        <Name>{restaurant.name}</Name>
        <Category>{restaurant.category}</Category>
        <Delivery>
          {restaurant.deliveryTime - 10}
          {" - "}
          {restaurant.deliveryTime + 10}
          {" min"}
        </Delivery>
        <Shipping>Frete R${restaurant.shipping.toFixed(2)}</Shipping>
        <Address>{restaurant.address}</Address>
      </Restaurant>
      {renderedProducts}
    </Container>
  ) : (
    <Loading>
      <CircularProgress style={{ color: "red" }} />
    </Loading>
  );
};

export default RestaurantPage;
