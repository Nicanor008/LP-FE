import React, { useEffect, useState } from "react";
import { navigate } from "gatsby";
import {
  Box,
  Button,
  Flex,
  Input,
  FormControl,
  FormLabel,
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
  useToast
} from "@chakra-ui/react";
import axios from "axios";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { Loader } from "../components/common";
import LPBGAuth from "../images/lp_auth_bg.png"
import { useBaseUrl } from "../hooks/useBaseUrl";

const Login = () => {
  const [loading, setLoading] = useState(true);
  const [loadingSignup, setLoadingSignup] = useState(false);
  const [loadingSignin, setLoadingSignin] = useState(false);
  const [signInError, setSignInError] = useState('');
  const [signUpError, setSignUpError] = useState('');
  const [signUpSuccess, setSignupSuccess] = useState('');
  const toast = useToast();
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({ name: "", email: "", password: "" });
  const apiBaseUrl = useBaseUrl()

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true);
      navigate("/todo");
    } else {
      setLoading(false);
    }
  }, []);

  const validateEmail = (email) => {
    const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase());
  };

  const handleLoginChange = (e) => {
    setSignInError('')
    setSignupSuccess('')
    setSignUpError('')
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupSuccess('')
    setSignUpError('')
    setSignInError('')
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    setLoadingSignin(true);
    try {
      if (loginForm.email === "" || loginForm.password === "") {
        setSignInError('All fields are required*')
        return setLoadingSignin(false);
      }
  
      if (!validateEmail(loginForm.email)) {
        setSignInError('Invalid Email, should be as myname@example.com')
        return setLoadingSignin(false);
      }
  
      const response = await axios.post(`${apiBaseUrl}/auth/login`, loginForm);

      localStorage.setItem("token", response.data.token);

      setLoadingSignin(false);
      navigate("/todo");
    } catch (error) {
      setLoadingSignin(false);
      setSignInError(error?.response?.data?.message || "Login failed")
    }
  }

  const createAccount = async () => {
    setLoadingSignup(true)
    try {
      if (signupForm.name === "" || signupForm.email === "" || signupForm.password === "") {
        setSignUpError('All fields are required*')
        setLoadingSignup(false)
        return;
      } else if (!validateEmail(signupForm.email)) {
        setSignUpError('Invalid Email, should be as myname@example.com')
        setLoadingSignup(false)
        return;
      } else {
        await axios
          .post(`${apiBaseUrl}/auth/register`, signupForm)
          .then(function (response) {
            // localStorage.setItem("token", response.data.token)
            // navigate("/todo")
            setSignupSuccess("User registered successfully, Check your email inbox to activate your account.")
            setLoadingSignup(false)
          })
          .catch(function (error) {
            alert(error?.response?.data?.message)
            setLoadingSignup(false)
            return;
          })
      }
    } catch (error) {
      setLoadingSignup(false);
      setSignUpError(error?.response?.data?.message || "Sign Up failed")
    }
  }

  return (
    <Layout>
      <SEO title="Login or Signup" description="Access your LP account" />
      {loading ? (
        <Flex align="center" justify="center" minH="70vh">
          <Loader />
        </Flex>
      ) : (
        <Flex minH={["58vh", "82vh"]}>
          {/* Left Section with Background Image */}
          <Box
            flex="1"
            bgImage={`url(${LPBGAuth})`}
            bgPosition="center"
            bgSize="cover"
            bgRepeat="no-repeat"
            position="relative"
            color="white"
            alignItems="center"
            justifyContent="center"
            p={8}
            display={["none", "flex"]}
          >
            <Flex
              direction="column"
              align="center"
              textAlign="center"
              maxW="lg"
              bg="rgba(117, 122, 255, 1)"
              p={6}
              borderRadius="md"
              fontFamily="arial"
            >
              <Heading as="h1" size="2xl" mb={4}>
                Welcome Back!
              </Heading>
              <Text fontSize="lg" mb={8}>
                Manage your tasks efficiently and stay on top of your goals.
              </Text>
            </Flex>
          </Box>

          {/* Right Section with Login Form */}
          <Flex flex="1" align="center" justify="center" bg="gray.50">
            <Box
              w={["96%", "60%", "40%"]}
              p={8}
              boxShadow="lg"
              borderRadius="md"
              bg="white"
            >
              <Tabs variant="soft-rounded" fontFamily="arial">
                <TabList mb="1em">
                  <Tab w="50%">Sign In</Tab>
                  <Tab w="50%">Sign Up</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    {/* Sign In Form */}
                    <Divider my={6} />
                    <FormControl id="email" mb={4} isRequired>
                      <FormLabel>Email</FormLabel>
                      <Input
                        type="email"
                        name="email"
                        value={loginForm.email}
                        onChange={handleLoginChange}
                        placeholder="example@example.com"
                      />
                    </FormControl>
                    <FormControl id="password" mb={3} isRequired>
                      <FormLabel>Password</FormLabel>
                      <Input
                        type="password"
                        name="password"
                        value={loginForm.password}
                        onChange={handleLoginChange}
                        placeholder="••••••••••"
                      />
                    </FormControl>
                    {signInError ? (
                      <Text color="red" textAlign="center" p={0} m={0} pb={2}>{signInError}</Text>
                    ) : ''}
                    <Button
                      bg="#757aff"
                      color="white"
                      w="full"
                      onClick={loginUser}
                      isLoading={loadingSignin}
                      loadingText="Signing In ..."
                    >
                      Sign In
                    </Button>
                  </TabPanel>
                  <TabPanel>
                    {/* Sign Up Form */}
                    <FormControl id="name" mb={4} isRequired>
                      <FormLabel>Name</FormLabel>
                      <Input
                        type="text"
                        name="name"
                        value={signupForm.name}
                        onChange={handleSignupChange}
                        placeholder="John Doe"
                      />
                    </FormControl>
                    <FormControl id="email" mb={4} isRequired>
                      <FormLabel>Email</FormLabel>
                      <Input
                        type="email"
                        name="email"
                        value={signupForm.email}
                        onChange={handleSignupChange}
                        placeholder="example@example.com"
                      />
                    </FormControl>
                    <FormControl id="password" mb={6} isRequired>
                      <FormLabel>Password</FormLabel>
                      <Input
                        type="password"
                        name="password"
                        value={signupForm.password}
                        onChange={handleSignupChange}
                        placeholder="••••••••••"
                      />
                    </FormControl>
                    {signUpError ? (
                      <Text color="red" textAlign="center" p={0} m={0} pb={2}>{signUpError}</Text>
                    ) : ''}
                    {signUpSuccess ? (
                      <Text color="green" p={0} m={0} pb={2} textAlign="center">{signUpSuccess}</Text>
                    ) : ''}
                    <Button
                      bg="#757aff"
                      color="white"
                      w="full"
                      onClick={createAccount}
                      isLoading={loadingSignup}
                      loadingText="Signing Up ..."
                    >
                      Sign Up
                    </Button>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </Flex>
        </Flex>
      )}
    </Layout>
  );
};

export default Login;
