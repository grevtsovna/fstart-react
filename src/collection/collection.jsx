import React, { PureComponent } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = () => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    width: '50%'
  },
  paper: {
    padding: '15px 30px',
    position: 'relative'
  },
  delete: {
    position: 'absolute',
    right: 20,
    top: '50%',
    transform: 'translateY(-50%)'
  },
  preloader: {
    marginTop: 20,
    marginLeft: 10
  }
});

class Collection extends PureComponent {
  state = {
    isAlertOpen: false
  };

  static propTypes = {
    collection: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    changeName: PropTypes.func.isRequired,
    removeCollection: PropTypes.func.isRequired,
    isLoading: PropTypes.object.isRequired
  };

  handleClose = () => {
    this.setState({ isAlertOpen: false });
  };

  clickHandle = (evt) => {
    const { isLoading } = this.props;
    evt.preventDefault();
    if (!isLoading.status) {
      this.setState({ isAlertOpen: true });
    }
  };

  clickLinkHandle = (evt) => {
    const { isLoading } = this.props;
    if (isLoading.status) {
      evt.preventDefault();
    }
  };

  removeHandle = () => {
    const { removeCollection, collection } = this.props;
    removeCollection(collection.id);
    this.handleClose();
  };

  render() {
    const {
      collection,
      classes,
      changeName,
      isLoading
    } = this.props;
    const { isAlertOpen } = this.state;
    return (
      <Grid item xs={12}>
        <Link to={`/collections/${collection.id}`} onClick={this.clickLinkHandle}>
          <Paper className={classes.paper}>
            <TextField
              id={collection.id}
              label="Название словаря"
              className={classes.textField}
              defaultValue={collection.name}
              onBlur={changeName(collection.id)}
              onClick={(evt) => { evt.preventDefault(); }}
            />
            {isLoading.status
            && isLoading.id === collection.id
            && <CircularProgress size={20} className={classes.preloader} />}
            <Fab size="small" color="secondary" className={classes.delete} onClick={this.clickHandle}>
              <DeleteIcon />
            </Fab>
          </Paper>
        </Link>
        <Dialog
          open={isAlertOpen}
          onClose={this.handleClose}
        >
          <DialogTitle>
            Вы действительно хотите удалить словарь &laquo;{collection.name}&raquo;?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              При удалении словаря, все слова, входящие в него, будут утеряны.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Отмена
            </Button>
            <Button onClick={this.removeHandle} color="secondary" variant="contained">
              Удалить
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    );
  }
}

export default withStyles(styles)(Collection);
