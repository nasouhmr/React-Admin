import React, { Component } from "react";
import LezzooService from "../../services/lezzoo.service";
import { Link } from "react-router-dom";

import { TextField, Button, withStyles, ListItem } from "@material-ui/core"
import { styles } from "../../css-common"

class AddCategory extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.saveCategory = this.saveCategory.bind(this);
        this.newCategory = this.newCategory.bind(this);
        this.state = {
            categories: [],
            name: "",
            store_id: "",
            image: ""
        };
    }

    componentDidMount() {
        this.retrieveCategories();
    }

    retrieveCategories() {
        LezzooService.getAllCategories(this.props.match.params.storeId).then(response => {
            this.setState({
                categories: response.data.data
            });
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeImage(e) {
        this.setState({
            image: e.target.value
        });
    }

    saveCategory() { 
        var data = {
            name: this.state.name,
            store_id: this.props.match.params.storeId,
            image: this.state.image
        };
        if (data.name && data.image) {
            LezzooService.createCategory(data)
                .then(response => {
                    this.setState({
                        name: "",
                        image: "",
                        store_id: "",
                        submitted: true
                    });
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    newCategory() {
        this.setState({
            name: "",
            image: "",
            submitted: false
        });
    }

    render() {
        const { classes } = this.props

        return (
            <div>
                <React.Fragment>
                    {this.state.submitted ? (
                        <div className={classes.form}>
                            <h4>You submitted successfully!</h4>
                            <Button
                                size="small"
                                color="primary"
                                variant="contained"
                                onClick={this.newCategory}>
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
                                    label="Category Name"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChangeName}
                                    required
                                />
                            </div>

                            <div className={classes.textField}>
                                <TextField
                                    label="Image"
                                    name="image"
                                    value={this.state.image}
                                    onChange={this.onChangeImage}
                                    required
                                />
                            </div>

                            <Button
                                size="small"
                                color="primary"
                                variant="contained"
                                onClick={this.saveCategory}>
                                Submit
                            </Button>
                        </div>
                    )}
                    <div className="list-group">
                        {this.state.categories && this.state.categories.map((category, index) => (
                            <ListItem
                                divider
                                button
                                key={index}>
                                <Link to={"/addProduct/"+category.id} className="nav-link">
                                    {category.name}
                                </Link>
                            </ListItem>
                        ))
                        }
                    </div>
                </React.Fragment>
            </div>
        );
    }
}

export default withStyles(styles)(AddCategory)