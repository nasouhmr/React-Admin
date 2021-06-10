import React, { Component } from "react";
import LezzooService from "../../services/lezzoo.service";
import { Link } from "react-router-dom";

import { styles } from "../../css-common"
import { Grid, ListItem, withStyles } from "@material-ui/core";

class StoresList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stores: [],
      currentStore: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveStores();
  }

  retrieveStores() {
    LezzooService.getAllStores().then(response => {
      this.setState({
        stores: response.data.data
      });
      console.log(response.data);
    }).catch(e => {
      console.log(e);
    });
  }

  render() {

    const { classes } = this.props
    const { searchTitle, stores, currentStore, currentIndex } = this.state;

    return (
      <div className={classes.form}>

        <Grid container>  
          <Grid item md={12}>
            <h2>Store List</h2>
            <Link to={"/addStore"} className="nav-link">
              Create Store
            </Link>
            <div className="list-group">
              {stores && stores.map((store, index) => (
                <ListItem
                  selected={index === currentIndex}
                  divider
                  button
                  key={index}>
                  <Link to={"/addCategory/"+store.id} className="nav-link">
                    {store.name}
                  </Link> 
                </ListItem>
              ))
              }
            </div>
          </Grid> 
        </Grid>
      </div>
    );
  }

}

export default withStyles(styles)(StoresList)