"use client";

import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import ProductCard from "./ProductCard";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const SpecialProducts = ({ Products, UGX, userInfo, category }) => {
  // handle scrolling to right
  const handleRightScroll = () => {
    const SliderDiv = document.getElementById(
      `${category}__container__scrollbar`
    );

    if (SliderDiv.scrollBy) {
      SliderDiv.scrollBy(300, 0);
    }
  };

  // handle scrolling to right
  const handleLeftScroll = () => {
    const SliderDiv = document.getElementById(
      `${category}__container__scrollbar`
    );

    if (SliderDiv.scrollBy) {
      SliderDiv.scrollBy(-300, 0);
    }
  };
  return (
    <>
      <Box>
        <Box padding={"1rem"} position={"relative"}>
          <Flex
            flexShrink={0}
            overflowX={"auto"}
            // overflowX={{ base: "hidden", md: "hidden", xl: "auto" }}
            direction={"row"}
            // direction={{ base: "column", md: "column", xl: "row" }}
            id={`${category}__container__scrollbar`}
            className="container__hide__scrollbar"
          >
            {Products.length > 0
              ? Products.map((product, index) => (
                  <ProductCard
                    key={index}
                    product={product}
                    userInfo={userInfo}
                    UGX={UGX}
                    width={{ base: "200px", md: "250px", xl: "280px" }}
                  />
                ))
              : [1, 2, 3, 4, 5].map((item) => (
                  <Box
                    key={item}
                    padding={{ base: "0.5rem 1rem", md: "1rem", xl: "1rem" }}
                    background={"#fff"}
                    borderRadius={"md"}
                    boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                    width={"200px"}
                    margin={"0 1rem 0 0"}
                    height={"250px"}
                  ></Box>
                ))}
          </Flex>

          {Products.length > 4 && (
            <Box display={{ base: "none", md: "none", xl: "block" }}>
              <Box
                onClick={handleLeftScroll}
                position="absolute"
                top="50%"
                left="-3%"
                cursor="pointer"
              >
                <AiOutlineArrowLeft size={30} />
              </Box>
              <Box
                onClick={handleRightScroll}
                position="absolute"
                top="50%"
                right="-3%"
                cursor="pointer"
              >
                <AiOutlineArrowRight size={30} />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default SpecialProducts;
