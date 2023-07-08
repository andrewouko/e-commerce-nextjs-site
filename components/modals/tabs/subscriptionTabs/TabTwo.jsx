"use client";

import {
  Box,
  Checkbox,
  Flex,
  Grid,
  Heading,
  Spacer,
  Text,
  useToast,
} from "@chakra-ui/react";
import ButtonComponent from "@components/Button";
import { Images, ThemeColors } from "@constants/constants";
import currency from "currency.js";

const UGX = (value) =>
  currency(value, { symbol: "UGX", precision: 0, separator: "," });

const TabTwo = ({ data, updateTabIndex }) => {
  const chakraToast = useToast();

  const handleProcessPayment = async () => {
    // check is user has confirmed information
    const confirmInfoBtn = document.querySelector("input#confirmInfoBtn");

    if (!confirmInfoBtn.checked)
      return chakraToast({
        title: "Error",
        description: "Please confirm the information displayed",
        status: "error",
        duration: 5000,
        isClosable: false,
      });

    updateTabIndex(2);
  };
  return (
    <>
      <Box>
        <Box
          padding={"1rem 0"}
          borderBottom={"1.7px solid " + ThemeColors.lightColor}
        >
          <Box>
            <Heading as={"h3"} size={"md"}>
              Personal Information
            </Heading>
          </Box>
          <Box padding={"1rem 0"}>
            <Grid
              gridTemplateColumns={{
                base: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                xl: "repeat(5, 1fr)",
              }}
              gridGap={"1rem"}
            >
              <Box>
                <Text fontSize={"md"}>firstname</Text>
                <Text>
                  <span style={{ fontWeight: "bold" }}>
                    {data?.personalInfo?.firstname}
                  </span>
                </Text>
              </Box>
              <Box>
                <Text fontSize={"md"}>lastname</Text>
                <Text>
                  <span style={{ fontWeight: "bold" }}>
                    {data?.personalInfo?.lastname}
                  </span>
                </Text>
              </Box>
              <Box>
                <Text fontSize={"md"}>email</Text>
                <Text>
                  <span style={{ fontWeight: "bold" }}>
                    {data?.personalInfo?.email}
                  </span>
                </Text>
              </Box>
              <Box>
                <Text fontSize={"md"}>gender</Text>
                <Text>
                  <span style={{ fontWeight: "bold" }}>
                    {data?.personalInfo?.gender}
                  </span>
                </Text>
              </Box>
              <Box>
                <Text fontSize={"md"}>Phone Number</Text>
                <Text>
                  <span style={{ fontWeight: "bold" }}>
                    {data?.personalInfo?.phone}
                  </span>
                </Text>
              </Box>
            </Grid>
          </Box>
        </Box>
        <Box
          padding={"1rem 0"}
          borderBottom={"1.7px solid " + ThemeColors.lightColor}
        >
          <Box>
            <Heading as={"h3"} size={"md"}>
              Delivery Address
            </Heading>
          </Box>
          <Box padding={"1rem 0"}>
            <Grid
              gridTemplateColumns={{
                base: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                xl: "repeat(5, 1fr)",
              }}
              gridGap={"1rem"}
            >
              {data?.deliveryAddress?.address1 ? (
                <Box>
                  <Text fontSize={"md"}>Address 1</Text>
                  <Text>
                    <span style={{ fontWeight: "bold" }}>
                      {data?.deliveryAddress?.address1}
                    </span>
                  </Text>
                </Box>
              ) : (
                ""
              )}
              {data?.deliveryAddress?.address2 ? (
                <Box>
                  <Text fontSize={"md"}>Address 2</Text>
                  <Text>
                    <span style={{ fontWeight: "bold" }}>
                      {data?.deliveryAddress?.address2}
                    </span>
                  </Text>
                </Box>
              ) : (
                ""
              )}
            </Grid>
          </Box>
        </Box>
        <Box
          padding={"1rem 0"}
          borderBottom={"1.7px solid " + ThemeColors.lightColor}
        >
          <Box>
            <Heading as={"h3"} size={"md"}>
              Card Details
            </Heading>
          </Box>
          <Box padding={"1rem 0"}>
            <Grid
              gridTemplateColumns={{
                base: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                xl: "repeat(4, 1fr)",
              }}
              gridGap={"1rem"}
            >
              <Box>
                <Text fontSize={"md"}>Card</Text>
                <Text>
                  <span
                    style={{ fontWeight: "bold", textTransform: "capitalize" }}
                  >
                    YooCard {data?.selectedSubscriptionCard?.type}
                  </span>{" "}
                  <span
                    style={{ fontWeight: "bold", textTransform: "capitalize" }}
                  >
                    {data?.selectedSubscriptionCard?.name}
                  </span>
                </Text>
              </Box>
              <Box>
                <Text fontSize={"md"}>Quantity</Text>
                <Text>
                  <span style={{ fontWeight: "bold" }}>
                    {data?.quantity}{" "}
                    {`${parseInt(data?.quantity) !== 1 ? "cards" : "card"}`}
                  </span>
                </Text>
              </Box>
            </Grid>
          </Box>
        </Box>
        <Box
          padding={"1rem 0"}
          borderBottom={"1.7px solid " + ThemeColors.lightColor}
        >
          <Box padding={"1rem 0"}>
            <Box>
              <Text fontSize={"md"}>Order Total</Text>
              <Text fontSize={"lg"}>
                <span style={{ fontWeight: "bold" }}>
                  {UGX(data?.total).format()}
                </span>
              </Text>
            </Box>
          </Box>
        </Box>
        <Box padding={"1rem 0"}>
          <Checkbox name="confirm" id="confirmInfoBtn">
            I confirm that the above information is correct
          </Checkbox>
        </Box>
        <Box padding={"1rem 0"}>
          <Flex>
            <Box onClick={() => updateTabIndex(0)}>
              <ButtonComponent type={"button"} text={"Back"} />
            </Box>
            <Spacer />
            <Box onClick={() => handleProcessPayment()}>
              <ButtonComponent type={"button"} text={"Choose Payment Method"} />
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default TabTwo;
