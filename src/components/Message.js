import { Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Message = ({ message }) => {
  return (
    <Card>
      <CardContent>
        {/* `${message.id}` is a relative path as it only includes the id at the end of the url, the absolute path would be '/messages/${message.id} */}
        <Link to={`/messages/${message.id}`} style={{ textDecoration: "none" }}>
          <Typography variant="body1">{message.text}</Typography>
        </Link>
        {/* insert a link to display all messages by selected user */}
        <Link to={`/messages/user/${message.username}`}>
          <Typography variant="body2">{message.username}</Typography>
        </Link>
        <Typography variant="body2">{message.posted}</Typography>
      </CardContent>
    </Card>
  );
};

export default Message;
