import { Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Message = ({ message }) => {
  return (
    <Link to={`${message.id}`} style={{ textDecoration: "none" }}>
      <Card>
        <CardContent>
          <Typography variant="body1">{message.text}</Typography>
          <Typography variant="body2">{message.username}</Typography>
          <Typography variant="body2">{message.posted}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Message;
