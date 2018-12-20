import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = () => ({
  card: {
    position: 'relative',
    margin: '0 0 24px'
  },
  delete: {
    position: 'absolute',
    right: 10,
    bottom: 10
  },
  loader: {
    position: 'relative',
    display: 'inline-block',
    verticalAlign: 'middle'
  },
  loader1: {
    color: '#eef3fd'
  },
  loader2: {
    position: 'absolute',
    left: 0,
    top: 0,
    color: '#6798e5'
  },
  caption: {
    display: 'inline-block',
    marginRight: 10
  },
  progress: {
    margin: 10
  }
});

class Word extends PureComponent {
  state = {
    isAlertOpen: false
  };

  static propTypes = {
    classes: PropTypes.object.isRequired,
    word: PropTypes.object.isRequired,
    removeWord: PropTypes.func.isRequired
  };

  handleClose = () => {
    this.setState({ isAlertOpen: false });
  };

  clickDeleteHandle = () => {
    this.setState({ isAlertOpen: true });
  };

  removeWordHandle = () => {
    const { removeWord, word } = this.props;
    removeWord(word.id);
    this.setState({ isAlertOpen: false });
  };

  render() {
    const { classes, word } = this.props;
    const { isAlertOpen } = this.state;
    const { success, fail } = word.statistics;
    const statDifference = success - fail;
    let progress = 0;
    if (statDifference < 5 && statDifference > 0) {
      progress = statDifference / 4 * 100;
    }
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
          <div className={classes.progress}>
            <Typography variant="caption" className={classes.caption}>Прогресс:</Typography>
            <div className={classes.loader}>
              <CircularProgress
                variant="determinate"
                value={100}
                className={classes.loader1}
                size={24}
                thickness={4}
              />
              <CircularProgress
                variant="static"
                value={progress}
                className={classes.loader2}
                size={24}
                thickness={4}
              />
            </div>
          </div>
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
            <Button onClick={this.removeWordHandle} color="secondary" variant="contained">
              Удалить
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(Word);
