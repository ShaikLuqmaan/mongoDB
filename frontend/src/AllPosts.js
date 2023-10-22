import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  VStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

function AllPosts() {
   const location = useLocation();
  const userId = location?.state?.userId || null;
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState({});
  const [commentText, setCommentText] = useState("");
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Send a GET request to your API to fetch all posts
    fetch("http://localhost:9000/posts")
      .then((response) => response.json())
      .then((fetchedPosts) => {
        setPosts(fetchedPosts);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching posts:", error);
      });
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  const openCommentModal = (post) => {
    setSelectedPost(post);
    setIsCommentModalOpen(true);
  };

  const closeCommentModal = () => {
    setSelectedPost(null);
    setIsCommentModalOpen(false);
    setCommentText("");
  };

  const addComment = () => {
    // Create a new comment object
    const newComment = {
      commentText,
      authorId: "653357c51b70bf3768dd6c81"
    };

    // Send a POST request to your API to add the comment
    fetch(`http://localhost:9000/comments/posts/${selectedPost._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    })
      .then((response) => response.json())
      .then((comment) => {
        // Add snackbar
        closeCommentModal();
      })
      .catch((error) => {
        // Handle errors
        console.error("Error adding comment:", error);
      });
  };

  const showComments = (postId) => {
    setIsCommentSectionOpen((prevState) => ({
      ...prevState,
      [postId]: true,
    }));
    fetch(`http://localhost:9000/comments/posts/${postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((comment) => {
        setComments(comment);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error getting comments:", error);
      });
  };

  return (
    <Box p={4}>
        <Box
      display="flex"
      justify="space-between"
      alignItems="center"
      mb={4}
    >
      <Text fontSize="xl" flex="1" maxW="200px">
        All Posts
      </Text>
      <Button
        onClick={() => {
          navigate("/dashboard");
        }}
        colorScheme="teal"
        mr={8}
      >
        Back to my posts
      </Button>
    </Box>



      <VStack spacing={4} mt={4}>
        {posts.map((post) => (
          <Box
            key={post._id}
            p={4}
            borderWidth="1px"
            borderRadius="md"
            boxShadow="md"
            width="100%"
            position="relative"
          >
            <Text fontWeight="bold">{post.title}</Text>
            <Text>{post.content}</Text>
            <Text>Tags: {post.tags.join(", ")}</Text>
            <Button
              colorScheme="teal"
              position="absolute"
              bottom="1rem"
              right="8rem"
              onClick={() => showComments(post._id)}
            >
              Show Comments
            </Button>
            <Button
              colorScheme="teal"
              position="absolute"
              bottom="1rem"
              right="1rem"
              onClick={() => openCommentModal(post)}
            >
              Comment
            </Button>
            {isCommentSectionOpen[post._id] && (
                <Button
                    colorScheme="red"
                    position="absolute"
                    bottom="1rem"
                    right="21rem"
                    onClick={() => setIsCommentSectionOpen({ ...isCommentSectionOpen, [post._id]: false })}
                >
                    Close
                </Button>
                )}

            {/* Display comments for the post */}
            {isCommentSectionOpen[post._id] && (
                <Box mt={4}>
                    <Text fontWeight="bold" mb={2}>
                    Comments:
                    </Text>
                    {comments && comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <Box key={index} p={2} bgColor="gray.100" borderRadius="md">
                        <Text>
                            <strong>{comment.commenterName}:</strong> {comment.commentText}
                        </Text>
                        </Box>
                    ))
                    ) : (
                    <Text>No comments</Text>
                    )}
                </Box>
                )}

          </Box>
        ))}
      </VStack>

      {/* Comment Modal */}
      <Modal isOpen={isCommentModalOpen} onClose={closeCommentModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Comment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mt={4}>
              <FormLabel>Comment Text:</FormLabel>
              <Textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={addComment}>
              Add Comment
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default AllPosts;
