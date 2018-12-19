import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';

const styles = () => ({
  card: {
    position: 'relative',
    margin: '0 0 24px'
  },
  delete: {
    position: 'absolute',
    right: 10,
    bottom: 10
  }
});

class Word extends PureComponent {
  state = {
    isAlertOpen: false
  };

  static propTypes = {
    classes: PropTypes.object.isRequired,
    word: PropTypes.object.isRequired
  };

  handleClose = () => {
    this.setState({ isAlertOpen: false });
  };

  clickDeleteHandle = () => {
    this.setState({ isAlertOpen: true });
  };

  removeWord = () => {
    console.log('remove!');
    this.setState({ isAlertOpen: false });
  };

  render() {
    const { classes, word } = this.props;
    const { isAlertOpen } = this.state;
    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2">
              { word.de }
            </Typography>
            <Typography component="p" className={classes.translation}>
              { word.ru }
            </Typography>
          </CardContent>
          <IconButton size="small" color="secondary" className={classes.delete} onClick={this.clickDeleteHandle}>
            <DeleteIcon />
          </IconButton>
        </Card>

        <Dialog
          open={isAlertOpen}
          onClose={this.handleClose}
        >
          <DialogTitle>
            Вы действительно хотите удалить слово?
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Отмена
            </Button>
            <Button onClick={this.removeWord} color="secondary" variant="contained">
              Удалить
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(Word);
