const Notification = ({ message }) => {
  if (message === null) return null;

  const styles = {
    color: message.type === "success" ? "green" : "red",
    background: "lightgray",
    fontSize: "20px",
    borderStyle: "solid",
    padding: "10px",
    marginBottom: "10px",
  };

  return <div style={styles}>{message.content}</div>;
};

export default Notification;
