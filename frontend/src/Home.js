import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Heading, Text, VStack } from '@chakra-ui/react';

function Home() {
  return (
    <VStack spacing={4} align="center" justify="center" h="100vh">
      <Heading as="h1" size="xl" fontWeight="bold">
        Welcome to X Blogging Site
      </Heading>
      <Text fontSize="lg">
        Explore MongoDB operations for Advanced Database Technologies COMP8157 Assignment 1.
      </Text>
      <Link to="/login">
        <Button colorScheme="teal" size="lg">
          Login
        </Button>
      </Link>
      <Link to="/register">
        <Button colorScheme="teal" size="lg">
          Register
        </Button>
      </Link>
    </VStack>
  );
}

export default Home;
