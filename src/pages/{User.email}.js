import React, { useEffect } from 'react';
import { useToast, Box, Spinner, Heading, Text } from '@chakra-ui/react';
import { navigate } from 'gatsby';
import { useLocation } from 'react-router';

export default function Component () {
  const toast = useToast();
  const location = useLocation()
  
  useEffect(() => {
    // Extract email or token from the query params
    const params = new URLSearchParams(location.search);
    const email = params.get('email');

    // Call backend to activate account
    const activateAccount = async () => {
      try {
        const response = await fetch('https://localhost:4001/api/activate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          toast({
            title: 'Account activated',
            description: 'Login to continue.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          navigate('/login');
        } else {
          const errorData = await response.json();
          toast({
            title: 'Activation failed',
            description: errorData.message || 'Please try again later.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Unable to activate account. Please try again later.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    activateAccount();
  }, [location.search, toast]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      background="gray.50"
    >
      <Box textAlign="center">
        <Spinner size="xl" color="blue.500" />
        <Heading as="h3" size="lg" mt={4}>
          Activating your account...
        </Heading>
        <Text mt={2} color="gray.600">
          Please wait a moment while we activate your account.
        </Text>
      </Box>
    </Box>
  );
};
