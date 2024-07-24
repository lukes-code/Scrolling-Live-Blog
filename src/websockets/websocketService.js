let socket = null;

const connect = (url) => {
  socket = new WebSocket(url);
};

const onMessage = (callback) => {
  if (socket) {
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      callback(message);
    };
  }
};

const disconnect = () => {
  if (socket) {
    socket.close();
  }
};

export default {
  connect,
  onMessage,
  disconnect,
};
