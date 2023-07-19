import { Box, Flex, Grid, Text, Heading, Stack } from "@chakra-ui/react";
import { ThemeColors } from "@constants/constants";
import React from "react";
import ButtonComponent from "./Button";
import currency from "currency.js";
import Link from "next/link";

const SubscriptionCard = ({ card }) => {
  const UGX = (value) =>
    currency(value, { symbol: "UGX", precision: 0, separator: "," });
  return (
    <>
      <Box
        width={"auto"}
        maxHeight={"400px"}
        borderRadius={"md"}
        border={"1.7px solid " + ThemeColors.darkColor}
        className={"card__design"}
      >
        <Box position={"relative"} height={"100%"}>
          <Box hidden>
            <Text>YooCard {card.type}</Text>
          </Box>
          <Box padding={"1rem 1.5rem"}>
            <Box
              padding={"0.5rem 0 1rem 0"}
              borderBottom={"1.7px solid " + ThemeColors.lightColor}
            >
              <Heading as={"h2"} size={"md"} display={"flex"}>
                YooCard
                <Heading
                  as={"h2"}
                  textTransform={"capitalize"}
                  size={"md"}
                  margin={"0 0.3rem"}
                  color={ThemeColors.darkColor}
                >
                  {card.type}
                </Heading>
              </Heading>
              <Text fontSize={"lg"}>{card.name}</Text>
            </Box>
            <Box
              padding={"0.5rem 0 0.5rem 1rem"}
              borderBottom={"1.7px solid " + ThemeColors.lightColor}
            >
              <Stack>
                {card?.details.map((detail, index) => (
                  <Box key={index}>
                    <Text>{detail}</Text>
                  </Box>
                ))}
              </Stack>
            </Box>
            <Box paddingTop={"2rem"}>
              <Box padding={"0.5rem 0"}>
                {card?.currPrice ? (
                  <Flex>
                    <Text
                      fontSize={"md"}
                      marginTop={"0.2rem"}
                      fontWeight={"light"}
                      textDecoration={"line-through"}
                    >
                      {UGX(card?.prevPrice).format()} -
                    </Text>
                    <Text
                      fontSize={"lg"}
                      margin={"0 0 0 0.3rem"}
                      fontWeight={"bold"}
                    >
                      {UGX(card?.currPrice).format()}
                    </Text>
                  </Flex>
                ) : (
                  <Text fontSize={"lg"} fontWeight={"bold"}>
                    Contact for price
                  </Text>
                )}
              </Box>
              <Box>
                <Link
                  href={`/subscription?card=${card?.type}${
                    card?.currPrice ? `&price=${card?.currPrice}` : ""
                  }`}
                >
                  <ButtonComponent type={"button"} text={`Get ${card?.type}`} />
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SubscriptionCard;
