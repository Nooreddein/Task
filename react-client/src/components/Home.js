import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import { langChanged } from '../Actions/index'
import AppBar from './AppBar';




function getModalStyle() {
  return {
    top: `${50}%`,
    left: `${50}%`,
    transform: `translate(-${50}%, -${50}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class Home extends React.Component {

<<<<<<< HEAD
=======
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openSignup: false

    };
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleSignup = this.handleSignup.bind(this)

    this.changeLang = this.changeLang.bind(this)
  this.handleCloseSignup = this.handleCloseSignup.bind(this)
  }
  handleOpen() {
    this.setState({ open: true });
  };

  handleClose() {
    this.setState({ open: false });
  };


  handleSignup() {
    this.setState({ openSignup: true });
  }
  handleCloseSignup() {
    this.setState({ openSignup: false });
  };
  changeLang() {
    this.props.langChanged(this.props.lang === "en" ? 'ar' : "en")
  }

>>>>>>> 2be80d9d0d907c8b0a502e2651156e1e3dfb4006
  render() {
    const { lang } = this.props;
    console.log(this.state)
    return (

      <div dir={lang === "en" ? "ltr" : "rtl"}>
<<<<<<< HEAD
        <AppBar />
=======
        <Grid container  direction="row">
          <Grid item xs={4}>
            <Button onClick={this.changeLang}>
              {lang === "en" ? "عربي" : "English"}
            </Button>
          </Grid>
            <Button onClick={this.handleOpen}>{Strings[lang].login}</Button>
            <LoginModal open={this.state.open} onClose={this.handleClose} modalStyle={getModalStyle()} />

            <Button onClick={this.handleSignup}>{Strings[lang].signup}</Button>
            <SignUpModal open={this.state.openSignup} onClose={this.handleCloseSignup} modalStyle={getModalStyle()} />
        </Grid>

>>>>>>> 2be80d9d0d907c8b0a502e2651156e1e3dfb4006
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

withStyles(styles)(Home);

const mapStateToProps = ({ langReducer }) => {
  const { lang } = langReducer
  return { lang }
}



export default connect(mapStateToProps, { langChanged })(withStyles(styles)(Home));


