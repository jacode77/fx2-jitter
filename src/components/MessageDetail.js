import { Card, CardContent, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useGlobalState } from "../utils/stateContext";

const MessageDetail = () => {
  const { store } = useGlobalState();
  const { messageList } = store;

  const params = useParams();
  console.log(params);

  const getMessage = (id) => {
    return messageList.find((m) => m.id === parseInt(id));
  };
  const message = getMessage(params.messageId); //{text: "test message", user: "Test user"}

  return (
    <>
      {message ? (
        <Card>
          <CardContent>
            <Typography variant="body1">{message.text}</Typography>
            <Typography variant="body2">{message.user}</Typography>
          </CardContent>
        </Card>
      ) : (
        <>
          <p>Message not found</p>
          <Link to="/messages">Go back to the main page</Link>
        </>
      )}
    </>
  );
};

export default MessageDetail;
