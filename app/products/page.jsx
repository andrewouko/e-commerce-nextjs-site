"use client";

import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormLabel,
  Grid,
  Heading,
  Input,
  Text,
  useToast,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { Images, ThemeColors } from "@constants/constants";
import * as FA from "react-icons/fa";
import * as HI from "react-icons/hi";
// import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useCartCreateMutation,
  useProductsFilterGetMutation,
  useProductsGetMutation,
} from "@slices/usersApiSlice";
import { useRouter } from "next/navigation";
import currency from "currency.js";

const Products = () => {
  const CategoriesJson = [
    "Starchy Food",
    "Fruits and Vegetables",
    "Dairy",
    "Protein",
    "Fat",
  ];

  const [ProductsTitle, setProductsTitle] = useState("All Products");
  const [Products, setProducts] = useState([]);
  // const [productsFilter, setProductsFilter] = useState([]);

  const UGX = (value) =>
    currency(value, { symbol: "UGX", precision: 0, separator: "," });

  const { userInfo } = useSelector((state) => state.auth);

  const [fetchProducts] = useProductsGetMutation();
  const [fetchProductsFilter] = useProductsFilterGetMutation();

  const [addCartApi, { isLoading }] = useCartCreateMutation();

  const { push } = useRouter();

  const chakraToast = useToast();

  const handleDataFetch = async () => {
    const res = await fetchProducts().unwrap();

    if (res?.status && res?.status == "Success") {
      setProducts(res?.data);
      setProductsTitle("All Products");
    }
  };

  // fetch product categories
  useEffect(() => {
    handleDataFetch();
  }, []);

  // function to handle adding product to cart
  const handleAddCart = async (ID) => {
    // check if user has not logged in
    if (!userInfo) {
      chakraToast({
        title: "Sign In is required",
        description: `You need to sign in to add to cart`,
        status: "error",
        duration: 5000,
        isClosable: false,
      });
      push("/signin");
      return;
    }

    try {
      const res = await addCartApi({ productId: ID, userId: userInfo?._id });

      if (res.data?.message) {
        chakraToast({
          title: "Success",
          description: res.data?.message,
          status: "success",
          duration: 5000,
          isClosable: false,
        });
      }

      if (res.error) {
        chakraToast({
          title: "Error",
          description: res.error.data?.message,
          status: "error",
          duration: 5000,
          isClosable: false,
        });
      }
    } catch (err) {
      chakraToast({
        title: "Error",
        description: err.message.error || err.error,
        status: "error",
        duration: 5000,
        isClosable: false,
      });
    }
  };

  // filter functions
  const handleFilterFetch = async (param) => {
    try {
      const res = await fetchProductsFilter(param).unwrap();

      if (res?.status && res?.status == "Success") {
        setProducts(res?.data?.Products ? res?.data?.Products : res?.data);
        setProductsTitle(
          res?.data?.title ? res?.data?.title : "Filter results"
        );
      }
    } catch (err) {
      chakraToast({
        title: "Error",
        description: err?.message?.error || err?.error,
        status: "error",
        duration: 5000,
        isClosable: false,
      });
    }
  };

  const handleFilterApply = () => {
    // productsFilter.push(filter);
    const CheckedBoxesValues = [];

    const Checkboxes = [
      ...document.querySelectorAll("input.chakra-checkbox__input"),
    ];

    for (const checkbox of Checkboxes) {
      if (checkbox.checked) {
        CheckedBoxesValues.push(checkbox.value);
      }
    }

    handleFilterFetch(JSON.stringify(CheckedBoxesValues));
  };

  return (
    <>
      <Box>
        <Box padding={"2rem"}>
          <Flex>
            <Box
              width={"25%"}
              borderRight={"1.7px solid " + ThemeColors.lightColor}
              padding={"0 1rem"}
            >
              <Box padding={"0 1rem 0.5rem 1rem"}>
                <Heading as={"h2"} size={"md"} className="secondary-extra-bold">
                  Apply Filters
                </Heading>
              </Box>
              <Box
                padding={"1rem 0 0.5rem 0"}
                borderBottom={"1.7px solid " + ThemeColors.lightColor}
              >
                <Text fontSize={"md"}>By price:</Text>
                <Box padding={"0.5rem 0 0 0"}>
                  <Flex margin="0.3rem 0">
                    <Box>
                      <Checkbox
                        name="filterByLowPrice"
                        id="filterByLowPrice"
                        width={"100%"}
                        value={"lowest"}
                        onChange={(e) => handleFilterApply(e.target.value)}
                        className="filter-input"
                      />
                    </Box>
                    <FormLabel
                      margin={"0 0.3rem 0 1rem"}
                      display={"flex"}
                      htmlFor="filterByLowPrice"
                    >
                      <FA.FaArrowDown style={{ margin: "0 0.3rem" }} />{" "}
                      <Text
                        fontSize={"md"}
                        marginBottom={"0.5rem"}
                        className="secondary-light-font"
                      >
                        Lowest
                      </Text>
                    </FormLabel>
                  </Flex>
                  <Flex margin="0.3rem 0">
                    <Box>
                      <Checkbox
                        name="filterByHighPrice"
                        id="filterByHighPrice"
                        width={"100%"}
                        value="highest"
                        onChange={(e) => handleFilterApply(e.target.value)}
                      />
                    </Box>
                    <FormLabel
                      margin={"0 0.3rem 0 1rem"}
                      display={"flex"}
                      htmlFor="filterByHighPrice"
                    >
                      <FA.FaArrowUp style={{ margin: "0 0.3rem" }} />{" "}
                      <Text
                        fontSize={"md"}
                        marginBottom={"0.5rem"}
                        className="secondary-light-font"
                      >
                        Highest
                      </Text>
                    </FormLabel>
                  </Flex>
                </Box>
              </Box>
              {/* category */}
              <Box
                padding={"1rem 0 0.5rem 0"}
                borderBottom={"1.7px solid " + ThemeColors.lightColor}
              >
                <Text fontSize={"md"}>By category:</Text>
                <Box padding={"0.5rem 0 0 0"}>
                  {CategoriesJson.map((category, index) => (
                    <Flex margin="0.3rem 0" key={index}>
                      <Box>
                        <Checkbox
                          name="category"
                          id="category"
                          width={"100%"}
                          value={category.toString().toLowerCase()}
                          onChange={(e) => handleFilterApply(e.target.value)}
                        />
                      </Box>
                      <FormLabel
                        margin={"0 0.3rem 0 1rem"}
                        display={"flex"}
                        htmlFor="category"
                        className="secondary-light-font"
                      >
                        {category}
                      </FormLabel>
                    </Flex>
                  ))}
                </Box>
              </Box>
            </Box>
            <Box width={"75%"} padding={"0 0.5rem 1rem 0.5rem"}>
              <Box padding={"0 1rem 0.5rem 1rem"}>
                <Heading as={"h2"} size={"md"} className="secondary-extra-bold">
                  {ProductsTitle}
                </Heading>
              </Box>
              {Products.length > 0 ? (
                <Grid
                  gridTemplateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(2, 1fr)",
                    xl: "repeat(4, 1fr)",
                  }}
                  gridGap={"1rem"}
                >
                  {Products.map((product, index) => (
                    <Box
                      padding={"1rem"}
                      borderRadius={"md"}
                      _hover={{
                        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                      }}
                      key={index}
                    >
                      <Box height={"150px"} padding="0.5rem">
                        <Link href={`/product?id=${product._id}`}>
                          <Flex
                            alignContent={"center"}
                            justifyContent={"center"}
                            height={"100%"}
                          >
                            <Image
                              src={`http://localhost:8000/uploads/${product.images[0]}`}
                              style={{
                                width: "auto",
                                height: "100%",
                                margin: "auto",
                              }}
                            />
                          </Flex>
                        </Link>
                      </Box>
                      <Box>
                        <Text
                          textAlign={"center"}
                          className="secondary-light-font"
                          fontSize={"2xl"}
                        >
                          {product.name}
                        </Text>
                        <Heading
                          as={"h3"}
                          margin={"0.5rem 0"}
                          textAlign={"center"}
                          className="secondary-extra-bold"
                          fontSize={"lg"}
                          color={ThemeColors.darkColor}
                        >
                          {UGX(product.price).format()}
                        </Heading>
                        <Box padding={"0.5rem 0"}>
                          <Flex justifyContent={"center"}>
                            <Button
                              color={ThemeColors.lightColor}
                              background={ThemeColors.darkColor}
                              border={"1.7px solid " + ThemeColors.darkColor}
                              borderRadius={"0.3rem"}
                              padding={"1rem"}
                              className="secondary-light-font"
                              fontSize={"md"}
                              _hover={{
                                border: "1.7px solid " + ThemeColors.lightColor,
                              }}
                              onClick={() => handleAddCart(product._id)}
                            >
                              {isLoading ? (
                                <Spinner />
                              ) : (
                                <FA.FaCartPlus
                                  size={26}
                                  style={{ margin: "0 0.5rem 0 0" }}
                                  color={ThemeColors.lightColor}
                                />
                              )}
                              Add To cart
                            </Button>
                          </Flex>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Grid>
              ) : (
                <Box>
                  <Box padding={"3rem 0"}>
                    <Text fontSize={"3xl"}>No products currently</Text>
                  </Box>
                </Box>
              )}
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default Products;
