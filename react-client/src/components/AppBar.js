import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import LoginModal from "./LoginModal"
import SignUpModal from "./SignUpModal"
import Button from "@material-ui/core/Button"
import { Strings } from './Strings'
import { connect } from 'react-redux'
import { langChanged } from '../Actions/index'

const styles = (theme) => ({
    root: {
        flexGrow: 1,
        color: "white"
    },
    flex: {
        flexGrow: 1,
        color: "white"
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
});


function getModalStyle() {
    return {
        top: `${50}%`,
        left: `${50}%`,
        transform: `translate(-${50}%, -${50}%)`,
    };
}

class NavBar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            openSignup: false,
        }
        this.handleOpen = this.handleOpen.bind(this)
        this.handleSignup = this.handleSignup.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleCloseSignup = this.handleCloseSignup.bind(this)
        this.changeLang = this.changeLang.bind(this)
    }
    handleClose() {
        this.setState({ open: false });
    };
    handleOpen() {
        this.setState({ open: true });
    };
    handleSignup() {
        this.setState({ openSignup: true });
    }
    handleCloseSignup() {
        this.setState({ openSignup: false });
    };
    changeLang() {
        const { lang, langChanged } = this.props

        langChanged(lang === "en" ? "ar" : "en")
    }

    render() {
        const { classes, lang } = this.props;
        const { alo } = this.state
        return (
            <div className={classes.root} dir={lang === "en" ? "ltr" : "rtl"}>
                <AppBar position="static">
                    <Toolbar>
                            <div>
                                <Button onClick={this.handleOpen}>
                                    <p style={{ color: "white" }}>
                                        {Strings[lang].login}</p>
                                </Button>
                                <LoginModal open={this.state.open} onClose={this.handleClose} modalStyle={getModalStyle()} />
                            </div> 
                            <div className={classes.flex}>
                                <Button onClick={this.handleSignup}><p style={{ color: "white" }}>{Strings[lang].signup}</p></Button>
                                <SignUpModal open={this.state.openSignup} onClose={this.handleCloseSignup} modalStyle={getModalStyle()} />
                            </div> 
                        <Button onClick={this.changeLang}>
                            <p style={{ color: "white" }}>{lang === "en" ? "عربي" : "English"}</p>
                        </Button>
                    </Toolbar>

                </AppBar>
            </div>
        );
    }

}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = ({ langReducer }) => {
    const { lang } = langReducer
    return { lang }
}

export default connect(mapStateToProps, { langChanged })(withStyles(styles)(NavBar));