import React, { Component } from "react";
import LezzooService from "../../services/lezzoo.service";
import { Link } from "react-router-dom";

import { TextField, Button, withStyles, File } from "@material-ui/core"
import { styles } from "../../css-common"

class AddStore extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeLogo = this.onChangeLogo.bind(this);
        this.saveStore = this.saveStore.bind(this);
        this.newStore = this.newStore.bind(this);

        this.state = {
            name: "",
            logo: ""
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeLogo(e) {
        this.setState({
            logo: e.target.value
        });
    }

    saveStore() {
        var data = {
            name: this.state.name,
            logo: this.state.logo
        };
        if (data.name && data.logo) {
            LezzooService.createStore(data)
                .then(response => {
                    this.setState({
                        name: "",
                        logo: "",
                        submitted: true
                    });
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    newStore() {
        this.setState({ 
            name: "",
            logo: "", 
            submitted: false
        });
    }

    render() {
        const { classes } = this.props

        return (
            <React.Fragment>
                {this.state.submitted ? (
                    <div className={classes.form}>
                        <h4>You submitted successfully!</h4>
                        <Button
                            size="small"
                            color="primary"
                            variant="contained"
                            onClick={this.newStore}>
                            Add
                        </Button>
                        <Link to={"/stores"} className="nav-link">
                            All Stores
                        </Link>
                    </div>
                ) : (
                    <div className={classes.form}>
                        <div className={classes.textField}>
                            <TextField
                                label="Store Name"
                                name="name"
                                value={this.state.name}
                                onChange={this.onChangeName}
                                required
                            />
                        </div>

                        <div className={classes.textField}>
                            <TextField
                                label="Logo"
                                name="logo"
                                value={this.state.logo}
                                onChange={this.onChangeLogo}
                                required
                            />
                        </div>

                        <Button
                            size="small"
                            color="primary"
                            variant="contained"
                            onClick={this.saveStore}>
                            Submit
                            </Button>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(AddStore)