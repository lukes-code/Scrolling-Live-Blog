const WebSocket = require("ws");

// Create a WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

// Generate a random post object to push over a set interval time
const generateRandomPost = () => {
  const gender = Math.random() < 0.5 ? "men" : "women";
  const id = Math.floor(Math.random() * 100);

  return ({
  id: Date.now(),
  title: `Random Post ${Math.floor(Math.random() * 1000)}`,
  body: "This is a randomly generated post content.",
  author: {
    name: "John Doe",
    avatar: `https://randomuser.me/api/portraits/${gender}/${id}.jpg`
  }
});
}

wss.on("connection", (ws) => {

  // Send a new post every 5 seconds
  const interval = setInterval(() => {
    const newPost = generateRandomPost();
    ws.send(JSON.stringify(newPost));
  }, 5000);

  ws.on("close", () => {
    clearInterval(interval);
  });

  ws.on("error", (error) => {
    clearInterval(interval);
    console.error("WebSocket error:", error);
  });
});
