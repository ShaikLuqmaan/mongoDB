import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  Input,
  VStack,
  Text,
} from '@chakra-ui/react';

function Registration() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleRegistration = () => {
    try {
      // Send a POST request to your registration API
      fetch('http://localhost:9000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      })
        .then((response) => response.json())
        .then((response) => {
          navigate('/dashboard');
        })
        .catch((error) => {
          console.error('An error occurred:', error);
        });
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <VStack spacing={4} align="center" justify="center" h="100vh">
      <Text fontSize="2xl" fontWeight="bold">
        Registration
      </Text>
      <FormControl w="sm">
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          size="md"
        />
      </FormControl>
      <FormControl w="sm">
        <Input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          size="md"
        />
      </FormControl>
      <FormControl w="sm">
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          size="md"
        />
      </FormControl>
      <Button colorScheme="teal" onClick={handleRegistration}>
        Register
      </Button>
      <Link to="/login">Already have an account? Login</Link>
    </VStack>
  );
}

export default Registration;
