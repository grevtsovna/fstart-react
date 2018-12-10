import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  }
};

function Appbar(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            wLearn
          </Typography>
          <Button href="/">Tasks</Button>
          <Button href="/about">About</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Appbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Appbar);
