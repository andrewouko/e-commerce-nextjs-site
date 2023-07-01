"use client";

import {
  Box,
  Flex,
  FormControl,
  Heading,
  Text,
  FormLabel,
  Input,
  Button,
  Grid,
  Select,
  Checkbox,
} from "@chakra-ui/react";
import { ThemeColors } from "@constants/constants";
import Link from "next/link";
import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "@slices/usersApiSlice";
import { setCredentials } from "@slices/authSlice";
import { redirect, useRouter } from "next/navigation";

const SignUp = () => {
  // states
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [vegan, setVegan] = useState(false);

  const { push } = useRouter();

  const chakraToast = useToast();

  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) return push("/");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await register({
        firstname,
        lastname,
        email,
        phone,
        gender,
        vegan,
        password,
      }).unwrap();

      dispatch(setCredentials({ ...res }));

      chakraToast({
        title: "Logged In",
        description: `Successfully logged in as ${res?.lastname}`,
        status: "success",
        duration: 5000,
        isClosable: false,
      });
      push("/");
    } catch (err) {
      chakraToast({
        title: "Error",
        description: err.data?.message
          ? err.data?.message
          : err.data || err.error,
        status: "error",
        duration: 5000,
        isClosable: false,
      });
    }
  };

  return (
    <>
      <Box>
        <Box paddingBottom={"1rem"}>
          <Box padding={"1rem 0"}>
            <Heading as={"h2"} fontSize={"lg"} textAlign={"center"}>
              Are you new
            </Heading>
            <Text fontSize={"3xl"} textAlign={"center"}>
              Create a new account
            </Text>
            <Flex>
              <Box
                height={"0.2rem"}
                width={"8rem"}
                margin={"0.5rem auto"}
                background={ThemeColors.primaryColor}
              ></Box>
            </Flex>
          </Box>
          <Flex>
            <Box margin={"auto"} width={"60%"} padding={"1rem"}>
              <form onSubmit={handleSubmit}>
                <Grid
                  gridTemplateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(1, 1fr)",
                    xl: "repeat(2, 1fr)",
                  }}
                  gridGap={"1rem"}
                >
                  <Box padding={"0.5rem 0"}>
                    <FormControl>
                      <FormLabel htmlFor="firstname">Firstname</FormLabel>
                      <Input
                        type="text"
                        id="firstname"
                        placeholder="firstname is required"
                        name="firstname"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                      />
                    </FormControl>
                  </Box>
                  <Box padding={"0.5rem 0"}>
                    <FormControl>
                      <FormLabel htmlFor="lastname">Lastname</FormLabel>
                      <Input
                        type="text"
                        id="lastname"
                        placeholder="lastname is required"
                        name="lastname"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                      />
                    </FormControl>
                  </Box>
                </Grid>
                <Grid
                  gridTemplateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(1, 1fr)",
                    xl: "repeat(2, 1fr)",
                  }}
                  gridGap={"1rem"}
                >
                  <Box padding={"0.5rem 0"}>
                    <FormControl>
                      <FormLabel htmlFor="phone">Phone Number</FormLabel>
                      <Input
                        type="text"
                        placeholder="Include country code [+256.....]"
                        name="phone"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </FormControl>
                  </Box>
                  <Box padding={"0.5rem 0"}>
                    <FormControl>
                      <FormLabel htmlFor="gender">Gender</FormLabel>
                      <Select
                        placeholder="Select gender"
                        name="gender"
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Box padding={"0.5rem 0"}>
                  <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      type="text"
                      id="email"
                      placeholder="email is required"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box padding={"0.5rem 0"}>
                  <FormControl>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                      type="password"
                      placeholder="password is required"
                      name="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box padding="1rem 0">
                  <Text display="flex">
                    Access your account{" "}
                    <Link
                      href={"/signin"}
                      style={{
                        color: ThemeColors.darkColor,
                        margin: "0 0.5rem",
                      }}
                    >
                      Sign In
                    </Link>
                  </Text>
                </Box>
                <Box padding={"0.5rem 0"}>
                  <Checkbox
                    name="vegan"
                    value={vegan}
                    onChange={(e) => setVegan(e.target.value)}
                  >
                    Are you vegetarian ?
                  </Checkbox>
                </Box>
                <Box padding={"0.5rem 0"}>
                  <Button
                    type="submit"
                    color={ThemeColors.lightColor}
                    background={ThemeColors.darkColor}
                    border={"1.7px solid " + ThemeColors.darkColor}
                    borderRadius={"0.3rem"}
                    padding={"1rem"}
                    className="secondary-light-font"
                    fontSize={"md"}
                    _hover={{
                      background: "none",
                      color: ThemeColors.darkColor,
                    }}
                  >
                    Sign Up
                  </Button>
                </Box>
              </form>
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default SignUp;
