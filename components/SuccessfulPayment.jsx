import { CheckCircleIcon } from "@chakra-ui/icons";
import { Box, Heading, Text } from "@chakra-ui/react";

export default function SuccessfulPayment({ data }) {
  return (
    <Box textAlign="center" py={10} px={6}>
      <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Successful Payment
      </Heading>
      <Heading as="h4" size="md" mt={2} mb={2}>
        Transaction Details
      </Heading>
      <Text color={"gray.500"}>{`Transaction Reference: ${data.tx_ref}`}</Text>
      <Text color={"gray.500"}>{`Amount: ${data.currency} ${Number(
        data.amount
      ).toLocaleString()}`}</Text>
      <Heading as="h4" size="md" mt={2} mb={2}>
        Delivery Details
      </Heading>
      {Object.keys(data.delivery).map((item) => (
        <Text color={"gray.500"}>{`${item
          .replaceAll("_", " ")
          .toUpperCase()}: ${data.delivery[item]}`}</Text>
      ))}
    </Box>
  );
}
