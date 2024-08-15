"use client";

import {
  Box,
  Button,
  Stack,
  TextField,
  IconButton,
  useTheme,
  darken,
  Typography,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ChatIcon from "@mui/icons-material/Chat";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm the Headstarter support assistant. How can I help you today?",
    },
  ]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const theme = useTheme();

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;
    setIsLoading(true);

    setMessage("");
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([...messages, { role: "user", content: message }]),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ];
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((messages) => [
        ...messages,
        {
          role: "assistant",
          content:
            "I'm sorry, but I encountered an error. Please try again later.",
        },
      ]);
    }
    setIsLoading(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box
        width="50vw"
        height="50vh"
        alignContent="center"
        justifyContent="center"
      >
        <Typography variant="h3" color="primary">
          Your Content here.
        </Typography>
        <Typography variant="h3" color="primary">
          For Support Box check bottom right corner.
        </Typography>
      </Box>
      {/* Chat Button */}
      {!isChatOpen && (
        <IconButton
          onClick={toggleChat}
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            bgcolor: "primary.main",
            color: "white",
            zIndex: 999,
            "&:hover": {
              bgcolor: "secondary.main",
            },
          }}
        >
          <ChatIcon />
        </IconButton>
      )}

      {/* Chat Box */}
      {isChatOpen && (
        <Box
          sx={{
            position: "fixed",
            right: 16,
            bottom: 40,
            height: "80vh",
            width: "400px", // Default width for larger screens
            bgcolor: theme.palette.background.paper,
            boxShadow: `0 4px 8px ${theme.palette.primary.main}`, // Use primary color for shadow
            borderRadius: 5,
            border: "none",
            zIndex: 999,
            display: "flex",
            flexDirection: "column",
            // Responsive styles
            [theme.breakpoints.down("xs")]: {
              width: "90%", // Adjust width for small screens
              right: "5%", // Center horizontally
              bottom: "20px", // Bring closer to the bottom
            },
            [theme.breakpoints.down("sm")]: {
              width: "90%", // Adjust width for small screens
              right: "5%", // Center horizontally
              bottom: "20px", // Bring closer to the bottom
            },
          }}
        >
          <Stack direction="column" p={2} spacing={3} height="100%">
            {/* Chat Header with "Customer Support" and Close Button */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 2,
                color: theme.palette.primary.main,
                borderRadius: 5,
              }}
            >
              <ChatIcon />
              <Box
                sx={{
                  fontSize: "1.3rem",
                  [theme.breakpoints.down("sm")]: { fontSize: "1.1rem" },
                }}
              >
                Customer Support
              </Box>
              <IconButton
                onClick={toggleChat}
                sx={{
                  color: theme.palette.primary.main,
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Chat Messages */}
            <Stack
              direction={"column"}
              spacing={2}
              flexGrow={1}
              overflow="auto"
              maxHeight="100%"
            >
              {messages.map((message, index) => (
                <Box
                  key={index}
                  display="flex"
                  justifyContent={
                    message.role === "assistant" ? "flex-start" : "flex-end"
                  }
                >
                  <Box
                    bgcolor={
                      message.role === "assistant"
                        ? "primary.main"
                        : "secondary.main"
                    }
                    color="text.secondary"
                    borderRadius={7}
                    p={1.75}
                  >
                    {message.content}
                  </Box>
                </Box>
              ))}
              <div ref={messagesEndRef} />
            </Stack>

            {/* Chat Input */}
            <Stack direction={"row"} spacing={2} p={2}>
              <TextField
                label="Message"
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
              />
              <Button
                variant="contained"
                onClick={sendMessage}
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send"}
              </Button>
            </Stack>
          </Stack>
        </Box>
      )}
    </Box>
  );
}
