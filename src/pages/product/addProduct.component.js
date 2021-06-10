import React, { Component } from "react";
import LezzooService from "../../services/lezzoo.service";
import { Link } from "react-router-dom";

import { TextField, Button, withStyles, ListItem } from "@material-ui/core"
import { styles } from "../../css-common"

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.saveProduct = this.saveProduct.bind(this);
        this.newProduct = this.newProduct.bind(this);
        this.state = {
            products: [],
            name: "",
            store_id: "",
            description: "",
            price: "",
            image: ""
        };
    }

    componentDidMount() {
        this.retrieveProducts();
    }

    retrieveProducts() {
        LezzooService.getAllProducts(this.props.match.params.categoryId).then(response => {
            this.setState({
                products: response.data.data
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

    onChangePrice(e) {
        this.setState({
            price: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    saveProduct() {
        var data = {
            name: this.state.name,
            category_id: this.props.match.params.categoryId,
            price: this.state.price,
            description: this.state.description,
            image: this.state.image
        };
        if (data.name && data.image) {
            LezzooService.createProduct(data)
                .then(response => {
                    this.setState({
                        name: "",
                        image: "",
                        price: "",
                        description: "",
                        category_id: "",
                        submitted: true
                    });
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    newProduct() {
        this.setState({
            name: "",
            image: "",
            price: "",
            description: "",
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
                                onClick={this.newProduct}>
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
                                    label="Product Name"
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

                            <div className={classes.textField}>
                                <TextField
                                    label="Price"
                                    name="price"
                                    value={this.state.price}
                                    onChange={this.onChangePrice}
                                    required
                                />
                            </div>

                            <div className={classes.textField}>
                                <TextField
                                    label="Description"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.onChangeDescription}
                                    required
                                />
                            </div>

                            <Button
                                size="small"
                                color="primary"
                                variant="contained"
                                onClick={this.saveProduct}>
                                Submit
                            </Button>
                        </div>
                    )}
                    <div className="list-group">
                        {this.state.products && this.state.products.map((product, index) => (
                            <ListItem
                                divider
                                button
                                key={index}>
                                {product.name}
                            </ListItem>
                        ))
                        }
                    </div>
                </React.Fragment>
            </div>
        );
    }
}

export default withStyles(styles)(AddProduct)