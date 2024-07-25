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
  body: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
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
  }, 10000);

  ws.on("close", () => {
    clearInterval(interval);
  });

  ws.on("error", (error) => {
    clearInterval(interval);
    console.error("WebSocket error:", error);
  });
});
