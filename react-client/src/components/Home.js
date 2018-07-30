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

  render() {
    const { lang } = this.props;
    console.log(this.state)
    return (
      <div dir={lang === "en" ? "ltr" : "rtl"}>
        <AppBar />
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

