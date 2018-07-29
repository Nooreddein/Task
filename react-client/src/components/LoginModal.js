import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import { Grid, Button, TextField, Divider } from '@material-ui/core';
import { Strings } from './Strings'
import fb from './fb.svg'
const styles = theme => ({
    paper: {
        position: 'absolute',
        width: "auto",
        backgroundColor: theme.palette.background.paper,
        textAlign: "center",
        padding: "15px",
        borderRadius: 10,
        borederWidth: 0
    },

});

class LoginModal extends Component {
    render() {
        const { classes, lang } = this.props;
        return (
            <Modal
                open={this.props.open}
                onClose={this.props.onClose}
            >
                <div style={this.props.modalStyle} className={classes.paper} dir={lang === "en" ? "ltr" : "rtl"}>
                    <Grid container justify="center" direction="column">
                        <Grid item xs>
                            <p>{Strings[lang].loginModal.head}</p>
                        </Grid>
                        <Divider />
                        <Grid item xs>

                            <Button style={{ width: "100%", margin: 5 }} variant="contained" color="primary">
                            <Grid>
                                </Grid>
                                <img alt=""
                                    src={fb}
                                    style={{ height: "15px", width: "15px", }}
                                />{lang === "ar" ? "الو" : "ALO"}
                                    
                            </Button>
                                <TextField placeholder={Strings[lang].loginModal.palceholderUser} />
                        </Grid>
                            <Grid item xs>
                                <TextField placeholder={Strings[lang].loginModal.palceholderPass} />
                            </Grid>
                        </Grid>
                </div>
            </Modal>
                )
            }
        }
        
LoginModal.propTypes = {
                    classes: PropTypes.object.isRequired,
            };
const mapStateToProps = ({langReducer}) => {
    const {lang} = langReducer
    return {lang}
                }
                
                
                export default connect(mapStateToProps)(withStyles(styles)(LoginModal))
