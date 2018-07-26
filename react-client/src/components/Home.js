import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux'
import {langChanged} from '../Actions/index'


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles  = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class Home extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            open: false,
            openSignup: false

        };
        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleSignup = this.handleSignup.bind(this)
        this.handleCloseSignup = this.handleCloseSignup.bind(this)
    }   
  handleOpen  ()  {
    this.setState({ open: true });
  };

  handleClose  () {
    this.setState({ open: false });
  };


  handleSignup(){
    this.setState({ openSignup: true });
  }
  handleCloseSignup  () {
    this.setState({ openSignup: false });
  };


  render() {
    const { classes } = this.props;
    console.log(this.props)
    return (
        <div>
      <div>
        
        <Button onClick={this.handleOpen}>Login</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="title" id="modal-title">
              Text in a modal
            </Typography>
            <Typography variant="subheading" id="simple-modal-description">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
            <HomeWrapped />
          </div>
        </Modal>
      </div>
 <div>
        
 <Button onClick={this.handleSignup}>Signup</Button>
 <Modal
   aria-labelledby="simple-modal-title"
   aria-describedby="simple-modal-description"
   open={this.state.openSignup}
   onClose={this.handleCloseSignup} 
 >
   <div style={getModalStyle()} className={classes.paper}>
     <Typography variant="title" id="modal-title">
       Text in a modal
     </Typography>
     <Typography variant="subheading" id="simple-modal-description">
       Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
     </Typography>
     <HomeWrapped />
   </div>
 </Modal>
</div>
</div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const HomeWrapped = withStyles(styles)(Home);

const mapStateToProps = ({langReducer}) =>{
  const {lang} = langReducer
  return {lang}
}


export default connect(mapStateToProps,{langChanged})(HomeWrapped);