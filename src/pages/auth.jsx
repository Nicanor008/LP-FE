// // src/pages/login.js

// import React, { useEffect, useState } from "react";
// import { navigate } from "gatsby";
// import {
//   Box,
//   Button,
//   Flex,
//   Input,
//   FormControl,
//   FormLabel,
//   Separator,
//   Heading,
//   Text,
//   Tabs,
//   TabList,
//   TabPanels,
//   Tab,
//   TabPanel,
//   Divider,
//   useToast,
//   HStack,
// } from "@chakra-ui/react";
// // import { GoogleLogin } from "react-google-login";
// import axios from "axios";
// import Layout from "../components/layout";
// import SEO from "../components/seo";
// import { Loader } from "../components/common";
// import { useBaseUrl } from "../hooks/useBaseUrl";
// import OrSeparator from "../components/common/Separator/OrSeparator";

// const Login = () => {
//   const apiBaseUrl = useBaseUrl();
//   const [loading, setLoading] = useState(true);
//   const [loadingSignup, setLoadingSignup] = useState(false);
//   const [loadingSignin, setLoadingSignin] = useState(false);
//   const toast = useToast();

//   const [loginForm, setLoginForm] = useState({
//     email: "",
//     password: "",
//   });

//   const [signupForm, setSignupForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setLoading(true);
//       navigate("/todo");
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   // Validate email format
//   const validateEmail = (email) => {
//     const re =
//       /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
//   };

//   // Handle Login Input Change
//   const handleLoginChange = (e) => {
//     setLoginForm({
//       ...loginForm,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Handle Signup Input Change
//   const handleSignupChange = (e) => {
//     setSignupForm({
//       ...signupForm,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Login User
//   const loginUser = async () => {
//     setLoadingSignin(true);
//     try {
//       if (!loginForm.email || !loginForm.password) {
//         toast({
//           title: "Error",
//           description: "All fields are required",
//           status: "error",
//           duration: 5000,
//           isClosable: true,
//         });
//         setLoadingSignin(false);
//         return;
//       }

//       if (!validateEmail(loginForm.email)) {
//         toast({
//           title: "Error",
//           description: "Invalid email format",
//           status: "error",
//           duration: 5000,
//           isClosable: true,
//         });
//         setLoadingSignin(false);
//         return;
//       }

//       const response = await axios.post(`${apiBaseUrl}/auth/login`, loginForm);
//       localStorage.setItem("token", response.data.token);
//       setLoadingSignin(false);
//       navigate("/todo");
//     } catch (error) {
//       setLoadingSignin(false);
//       toast({
//         title: "Error",
//         description: error?.response?.data?.message || "Login failed",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//       });
//     }
//   };

//   // Create User Account
//   const createAccount = async () => {
//     setLoadingSignup(true);
//     try {
//       if (!signupForm.name || !signupForm.email || !signupForm.password) {
//         toast({
//           title: "Error",
//           description: "All fields are required",
//           status: "error",
//           duration: 5000,
//           isClosable: true,
//         });
//         setLoadingSignup(false);
//         return;
//       }

//       if (!validateEmail(signupForm.email)) {
//         toast({
//           title: "Error",
//           description: "Invalid email format",
//           status: "error",
//           duration: 5000,
//           isClosable: true,
//         });
//         setLoadingSignup(false);
//         return;
//       }

//       const response = await axios.post(
//         `${apiBaseUrl}/auth/register`,
//         signupForm
//       );
//       localStorage.setItem("token", response.data.token);
//       setLoadingSignup(false);
//       navigate("/todo");
//     } catch (error) {
//       setLoadingSignup(false);
//       toast({
//         title: "Error",
//         description: error?.response?.data?.message || "Signup failed",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//       });
//     }
//   };

//   // Handle Google Login Success
// //   const handleGoogleSuccess = async (response) => {
// //     try {
// //       const { tokenId } = response;
// //       const res = await axios.post(`${apiBaseUrl}/auth/google`, {
// //         idToken: tokenId,
// //       });
// //       localStorage.setItem("token", res.data.token);
// //       navigate("/todo");
// //     } catch (error) {
// //       toast({
// //         title: "Error",
// //         description: error?.response?.data?.message || "Google login failed",
// //         status: "error",
// //         duration: 5000,
// //         isClosable: true,
// //       });
// //     }
// //   };

// //   // Handle Google Login Failure
// //   const handleGoogleFailure = (response) => {
// //     toast({
// //       title: "Error",
// //       description: "Google login failed",
// //       status: "error",
// //       duration: 5000,
// //       isClosable: true,
// //     });
// //   };

//   return (
//     <Layout>
//       <SEO title="Login or Signup" description="Access your LP account" />
//       {loading ? (
//         <Flex align="center" justify="center" minH="70vh">
//           <Loader />
//         </Flex>
//       ) : (
//         <Flex align="center" justify="center" minH="81.5vh">
//           <Box
//             w={["90%", "60%", "20%"]}
//             p={8}
//             boxShadow="lg"
//             borderRadius="md"
//             bg="white"
//             fontFamily="Arial"
//           >
//             <Tabs variant="soft-rounded">
//               <TabList mb="1em">
//                 <Tab w="50%" _active={{ bg: "#757aff" }}>Sign In</Tab>
//                 <Tab w="50%">Sign Up</Tab>
//               </TabList>
//               <TabPanels>
//                 {/* Sign In Panel */}
//                 <TabPanel>
//                   <Divider my={6} />
//                   <FormControl id="email" mb={4} isRequired>
//                     <FormLabel>Email</FormLabel>
//                     <Input
//                       type="email"
//                       name="email"
//                       value={loginForm.email}
//                       onChange={handleLoginChange}
//                       placeholder="nicanor.korir@example.com"
//                     />
//                   </FormControl>
//                   <FormControl id="password" mb={6} isRequired>
//                     <FormLabel>Password</FormLabel>
//                     <Input
//                       type="password"
//                       name="password"
//                       value={loginForm.password}
//                       onChange={handleLoginChange}
//                       placeholder="**********************"
//                     />
//                   </FormControl>
//                   <>Forgot Password</>
//                   <Button
//                     bg="#757aff"
//                     color="white"
//                     fontWeight={600}
//                     w="full"
//                     isLoading={loadingSignin}
//                     loadingText="Signing In..."
//                     onClick={loginUser}
//                   >
//                     Sign In
//                   </Button>

//                   <OrSeparator />
//                   <Button
//                         colorScheme="red"
//                         variant="outline"
//                         mb={4}
//                         w="full"
//                         // onClick={renderProps.onClick}
//                       >
//                         Sign in with Google
//                       </Button>
//                 </TabPanel>
//                 {/* Sign Up Panel */}
//                 <TabPanel>
//                   <FormControl id="name" mb={4} isRequired>
//                     <FormLabel>Name</FormLabel>
//                     <Input
//                       type="text"
//                       name="name"
//                       value={signupForm.name}
//                       onChange={handleSignupChange}
//                       placeholder="Nicanor"
//                     />
//                   </FormControl>
//                   <FormControl id="email" mb={4} isRequired>
//                     <FormLabel>Email</FormLabel>
//                     <Input
//                       type="email"
//                       name="email"
//                       value={signupForm.email}
//                       onChange={handleSignupChange}
//                       placeholder="nicanor.korir@example.com"
//                     />
//                   </FormControl>
//                   <FormControl id="password" mb={6} isRequired>
//                     <FormLabel>Password</FormLabel>
//                     <Input
//                       type="password"
//                       name="password"
//                       value={signupForm.password}
//                       onChange={handleSignupChange}
//                       placeholder="**********************"
//                     />
//                   </FormControl>
//                   <>I agree to the terms and conditions</>
//                   <Button
//                     bg="#757aff"
//                     color="white"
//                     fontWeight={600}
//                     w="full"
//                     isLoading={loadingSignup}
//                     loadingText="Creating Account..."
//                     onClick={createAccount}
//                   >
//                     Sign Up
//                   </Button>
//                   <Box mt={4}>
//                     <OrSeparator />
//                     <Button
//                         colorScheme="red"
//                         variant="outline"
//                         mb={4}
//                         w="full"
//                         // onClick={renderProps.onClick}
//                       >
//                         Sign up with Google
//                       </Button>
//                   </Box>
//                 </TabPanel>
//               </TabPanels>
//             </Tabs>
//           </Box>
//         </Flex>
//       )}
//     </Layout>
//   );
// };

// export default Login;

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
  useToast,
  FormHelperText,
  FormErrorMessage,
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
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };

  // const loginUser = async () => {
  //   setLoadingSignin(true);
  //   // Login logic
  // };

  // const createAccount = async () => {
  //   setLoadingSignup(true);
  //   // Signup logic
  // };

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
            setSignupSuccess("User registered successfully, Proceed to Sign In")
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
              w={["96%", "60%", "60%"]}
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
                      <Text color="red" p={0} m={0} pb={2}>{signInError}</Text>
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
                      <Text color="red" p={0} m={0} pb={2}>{signUpError}</Text>
                    ) : ''}
                    {signUpSuccess ? (
                      <Text color="green" p={0} m={0} pb={2}>{signUpSuccess}</Text>
                    ) : ''}
                    <Button
                      bg="#757aff"
                      color="white"
                      w="full"
                      onClick={createAccount}
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
