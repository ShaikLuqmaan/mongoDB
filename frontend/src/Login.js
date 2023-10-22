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

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    try {
      fetch('http://localhost:9000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
        .then((response) => response.json())
        .then((response) => {
          const userId = response.userId;

          // Navigate to /dashboard and pass userId in the state
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
        Login
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
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          size="md"
        />
      </FormControl>
      <Button colorScheme="teal" onClick={handleLogin}>
        Login
      </Button>
      <Link to="/">Back to Home</Link>
    </VStack>
  );
}

export default Login;
