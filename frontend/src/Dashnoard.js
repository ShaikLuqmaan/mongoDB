import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Text,
  Textarea,
  Input,
  VStack,
  FormControl,
  FormLabel,
  IconButton,
  CloseButton,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";


function Dashboard() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [filterTags, setFilterTags] = useState("");
  const [editingPost, setEditingPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: "",
    status: "success",
  });
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:9000/posts";

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleTagsChange = (e) => {
    const tagArray = e.target.value.split(",");
    setTags(tagArray);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const handleShowAllPosts = () => {
    navigate('/allposts');
  }

  const handleEdit = (post) => {
    setTitle(post.title);
    setContent(post.content);
    setTags(post.tags);
    setEditingPost(post);
  };

  const handleSubmit = () => {
    if (editingPost) {
      fetch(`${BASE_URL}/${editingPost._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          tags,
        }),
      })
        .then((response) => response.json())
        .then((updatedPost) => {
          setPosts((prevPosts) =>
            prevPosts.map((post) =>
              post._id === updatedPost._id ? updatedPost : post,
            ),
          );

          setTitle("");
          setContent("");
          setTags([]);
          setEditingPost(null);
          setSnackbar({
            isOpen: true,
            message: "Post updated successfully",
            status: "success",
          });

          setTimeout(() => {
            setSnackbar({ ...snackbar, isOpen: false });
          }, 3000);
        })
        .catch((error) => {
          // Handle errors
          console.error("Error updating post:", error);
          setSnackbar({
            isOpen: true,
            message: "Failed to update post",
            status: "error",
          });
        });
    } else {
      fetch(`${BASE_URL}/author/653357c51b70bf3768dd6c81`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          tags,
        }),
      })
        .then((response) => response.json())
        .then((createdPost) => {
          setPosts([...posts, createdPost]);

          setTitle("");
          setContent("");
          setTags([]);

          // Show a success message
          setSnackbar({
            isOpen: true,
            message: "Post created successfully",
            status: "success",
          });

          setTimeout(() => {
            setSnackbar({ ...snackbar, isOpen: false });
          }, 3000);
        })
        .catch((error) => {
          console.error("Error creating post:", error);
          setSnackbar({
            isOpen: true,
            message: "Failed to create post",
            status: "error",
          });
        });
    }
  };

  const handleClearFilter = () => {
    setFilterTags([]);
    fetchPosts();
  };

  const handleFilterTagsChange = (e) => {
    const tagArray = e.target.value.split(",").map((tag) => tag.trim());
    setFilterTags(tagArray);
  };

  const handleFilter = () => {
    fetchPosts();
  };

  const fetchPosts = () => {
    let url = `${BASE_URL}/author/653357c51b70bf3768dd6c81`;

    if (filterTags.length > 0) {
      const filterTagsParam = filterTags.join(",");
      url += `/tags?tag=${filterTagsParam}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((fetchedPosts) => {
        setPosts(fetchedPosts);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching posts:", error);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, [filterTags]);

  const handleDelete = (postId) => {
    fetch(`${BASE_URL}/${postId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setPosts(posts.filter((post) => post._id !== postId));
          setSnackbar({
            isOpen: true,
            message: "Post deleted successfully",
            status: "success",
          });
        } else {
          setSnackbar({
            isOpen: true,
            message: "Failed to delete post",
            status: "error",
          });
        }
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
        setSnackbar({
          isOpen: true,
          message: "Failed to delete post",
          status: "error",
        });
      });
  };

  return (
    <Box p={4}>
      <Box display="flex" alignItems="center" mb={4}>
        <Text fontSize="xl" flex="1" maxW="200px">
          My Timeline
        </Text>
        <Text flex="2" fontWeight="bold" alignSelf="center" textAlign="center">
          Welcome to the X!
        </Text>
        <Button onClick={handleShowAllPosts} colorScheme="teal" mr={8}>
          Show All posts
        </Button>
        <Button onClick={handleLogout} colorScheme="blue">
          Logout
        </Button>
      </Box>


      <VStack as="form" spacing={4} mt={4}>
        <FormControl>
          <FormLabel>Title:</FormLabel>
          <Input value={title} onChange={handleTitleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Content:</FormLabel>
          <Textarea value={content} onChange={handleContentChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Tags (comma-separated):</FormLabel>
          <Input value={tags.join(",")} onChange={handleTagsChange} />
        </FormControl>

        {editingPost ? (
          <Button colorScheme="teal" onClick={handleSubmit}>
            Update
          </Button>
        ) : (
          <Button colorScheme="teal" onClick={handleSubmit}>
            Post
          </Button>
        )}
      </VStack>

      {/* Filter tags input */}
      <FormControl>
        <FormLabel>Filter by Tags (comma-separated):</FormLabel>
        <Input
          value={Array.isArray(filterTags) ? filterTags.join(",") : ""}
          onChange={handleFilterTagsChange}
        />
      </FormControl>
      <Button mt={4} colorScheme="teal" onClick={handleFilter}>
        Filter
      </Button>

      {/* Clear Filter button */}
      {filterTags.length > 0 && (
        <Button mt={4} pl={4} colorScheme="gray" onClick={handleClearFilter}>
          Clear Filter
        </Button>
      )}
       <FormLabel fontWeight="bold" fontSize="lg" mt={4} mb={2}>
        My posts:
      </FormLabel>

      {posts.map((post) => (
        <Box
          key={post._id}
          mt={4}
          p={4}
          borderWidth="1px"
          borderRadius="md"
          boxShadow="md"
          position="relative"
        >
          <Text fontWeight="bold">{post.title}</Text>
          <Text>{post.content}</Text>
          <Text>Tags: {post.tags.join(", ")}</Text>

          <Box position="absolute" top="1rem" right="1rem" display="flex">
            <IconButton
              icon={<EditIcon />}
              aria-label="Update"
              mr={2}
              onClick={() => handleEdit(post)}
            />
            <IconButton
              icon={<DeleteIcon />}
              aria-label="Delete"
              onClick={() => handleDelete(post._id)}
            />
          </Box>
        </Box>
      ))}

      {snackbar.isOpen && (
        <Box position="fixed" bottom="1rem" right="1rem" width="400px">
          <Text
            px={4}
            py={2}
            bgColor={snackbar.status === "success" ? "green.400" : "red.400"}
            color="white"
            borderRadius="md"
            boxShadow="lg"
          >
            {snackbar.message}
            <CloseButton
              position="absolute"
              right="0.5rem"
              top="0.5rem"
              onClick={() => setSnackbar({ ...snackbar, isOpen: false })}
            />
          </Text>
        </Box>
      )}
    </Box>
  );
}

export default Dashboard;
