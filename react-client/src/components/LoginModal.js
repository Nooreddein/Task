import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import { Grid, TextField, Divider, Button } from '@material-ui/core';
import { Strings } from './Strings'
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import fb from './fb.svg'

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: "auto",
        backgroundColor: theme.palette.background.paper,
        textAlign: "center",
        padding: "20px",
        borderRadius: 10,
        borederWidth: 0
    },

});

const responseFacebook = (response) => {
    console.log(response);
}

const responseGoogle = (response) => {
    console.log(response);
}

class LoginModal extends Component {
    render() {
        const { classes, lang } = this.props;
        return (
            <Modal
                open={this.props.open}
                onClose={this.props.onClose}
            >
                <Grid container justify="center" direction="column"
                    style={this.props.modalStyle}
                    className={classes.paper}
                    dir={lang === "en" ? "ltr" : "rtl"}>
                    <Grid item xs>
                        <p>{Strings[lang].loginModal.head}</p>
                    </Grid>
                    <Divider style={{ margin: "10px" }} />
                    <Grid item xs={12}>
                        <GoogleLogin
                            clientId="113021884886-314ovegh53pf00d99jn8moc2bj1la6sq.apps.googleusercontent.com"
                            buttonText={lang === "en" ? "Login using Google" : " تسجيل الدخول باستخدام جوجل"}
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            style={{
                                width: "68%",
                                height: "50px",
                                backgroundColor: "orange",
                                color: "white",
                                borderRadius: 5,
                                outline: "none",
                                marginBottom: "10px",
                                fontSize:"15px"
                            }}
                        />
                        <FacebookLogin
                            appId="560666954348661"
                            autoLoad={false}
                            fields="name,email,picture"
                            callback={responseFacebook}
                            icon="fa-facebook"
                            style={{
                                backgroundColor: "blue",
                                color: "white",
                                borderRadius: 5,
                                outline: "none",
                                marginTop: "10px"
                            }}
                        />
                    </Grid>
                    <Divider style={{ margin: "10px" }} />
                    <p>OR</p>
                    <Grid item xs style={{ marginTop: "10px" }}>
                        <div>
                            <TextField style={{ width: "100%", textAlign: "center" }}
                                placeholder={Strings[lang].loginModal.palceholderUser} />
                        </div>
                        <br />
                        <div>
                            <TextField style={{ width: "100%", textAlign: "center" }}
                                placeholder={Strings[lang].loginModal.palceholderPass} />
                        </div>
                    </Grid>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{
                            margin: "12px",
                            height:"30px"
                        }}>
                        Login
                    </Button>
                </Grid>
            </Modal>
        )
    }
}

LoginModal.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = ({ langReducer }) => {
    const { lang } = langReducer
    return { lang }
}


export default connect(mapStateToProps)(withStyles(styles)(LoginModal))
