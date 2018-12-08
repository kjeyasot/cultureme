import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    maxWidth: 345
  }
};

function ClientCard(props) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="client img"
          className={classes.media}
          height="140"
          image="http://spokenvision.com/wp-content/uploads/2016/10/Islamic-Geometric-Patterns-770x548.jpg"
          title="Insert Client Name"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Service Provider Name
          </Typography>
          <Typography component="p">
            Insert small description about the service provider. Insert something about something.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="secondary">
          Contact Info
        </Button>
      </CardActions>
    </Card>
  );
}

ClientCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ClientCard);
