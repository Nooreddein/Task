import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Grid, TextField, Button } from "@material-ui/core"
import { Strings } from "./Strings"
import { connect } from 'react-redux';


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

class SignUpModal extends Component {
    render() {
        const { classes, lang } = this.props;
        return (
            <Modal
                open={this.props.open}
                onClose={this.props.onClose}>
                <Grid className={classes.paper}
                    style={this.props.modalStyle}
                    container
                    justify="center"
                    alignContent="center"
                    direction="column"
                    dir={lang === "en" ? "ltr" : "rtl"}
                >
                    <Grid item xs style={{ marginTop: "10px" }}>
                        <TextField style={{ width: "100%", textAlign: "center"}}
                            required
                            label={Strings[lang].loginModal.palceholderUser}
                            placeholder={Strings[lang].loginModal.palceholderUser} />
                        <TextField style={{ width: "100%", textAlign: "center"}}
                            required
                            label={Strings[lang].loginModal.palceholderPass}
                            placeholder={Strings[lang].loginModal.palceholderPass} />
                        <TextField style={{ width: "100%", textAlign: "center"}}
                            required
                            label={Strings[lang].loginModal.palceholderEmail}
                            placeholder={Strings[lang].loginModal.palceholderEmail} />
                    </Grid>
                    <Grid item xs
                        style={{
                            margin: "15px",
                            outline: "none"
                        }}
                    >
                        <Button variant="contained" color="primary">
                            {Strings[lang].loginModal.signup}
                        </Button>
                    </Grid>
                </Grid>
            </Modal>
        )
    }
}

SignUpModal.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = ({ langReducer }) => {
    const { lang } = langReducer
    return { lang }
}


export default connect(mapStateToProps)(withStyles(styles)(SignUpModal))
