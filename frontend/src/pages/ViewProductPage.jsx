import { 
    Container, 
    SimpleGrid, 
    Text, 
    HStack, 
    Box, 
    Image, 
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import ProductDetails from "../components/ProductDetails";
import { useProductStore } from "../store/product";

const ViewProductPage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const location = useLocation();

  const id = location.pathname.split("/")[2];

  var product = {};

  for (let i = 0; i < products.length; i++) {
    const currentProduct = products[i];
    if (id === currentProduct._id) {
      product = currentProduct;
    }
  }

  return (
    <Container maxW={'container.xl'} py={12}>

      <Box 
      display='flex' alignItems='center' justifyContent='center'
      p={7}
      >
        <ProductDetails key={product._id} product={product} />
      </Box>

      {product.length === 0 && (
        <Text fontSize='xl' TextAlign={"center"} fontWeight='bold' color='gray.500'>
          Product not found{" "}
        </Text>
      )}

    </Container>
  )
}

export default ViewProductPage