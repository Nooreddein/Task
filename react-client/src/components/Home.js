import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import { langChanged } from '../Actions/index'
import AppBar from './AppBar';
import Axios from '../../../node_modules/axios';




function getModalStyle() {
  return {
    top: `${50}%`,
    left: `${50}%`,
    transform: `translate(-${50}%, -${50}%)`,
    outline: "none"
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
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openSignup: false

    };
    this.adminPost = this.adminPost.bind(this)
    this.NotadminPost = this.NotadminPost.bind(this)

  }

  adminPost() {
    Axios.post("/admin", {
         access_token: "Bearer ALO_!@#$"
    }).then((res) => {
      console.log(res.data)
    })
  }

  NotadminPost() {
    Axios.post("/admin")
      .then((res) => {
        console.log(res.data)
      })
  }


  render() {
    const { lang } = this.props;
    console.log(this.state)
    return (

      <div dir={lang === "en" ? "ltr" : "rtl"}>
        <AppBar />
        <Button onClick={this.adminPost}>
          ADMIN
        </Button>
        <Button onClick={this.NotadminPost}>
          NOT ADMIN
        </Button>
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