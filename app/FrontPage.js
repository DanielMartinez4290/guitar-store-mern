import React, { Fragment } from "react";
import ErrorBoundary from "./ErrorBoundary";
import Img from "./Img";
import CategoryHeader from "./CategoryHeader";
import SortHeader from "./SortHeader";
import Dress from "./Dress"; 
import NewProduct from "./NewProduct";

import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { ListGuitars, CreateProduct } from './graphql';

class FrontPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {products:[]}
  }

  componentDidMount() {
    API.graphql(graphqlOperation(ListGuitars))
       .then(response => {
          const products = response.data.listGuitars.items;
          this.setState({products});
       })
       .catch(console.error);

    const {partyCategory} = this.props;
    partyCategory;
  }

  addProduct = product => {
    API.graphql(graphqlOperation(CreateProduct, product)).then(response =>{
      const newProduct = response.data.createProduct;
    });
    
    this.setState({products: [newProduct, ...this.state.products]});
  };

  removeProduct = product => {
    this.setState({
      products: this.state.products.filter(other => other.id !== product.id),
    });
  };

  render() {
    const {dresses, allCategory ,dressCategory, partyCategory} = this.props;

    return (
      <Fragment>
          <div className="frontPage">
            <div className="tagLine">
                Guitar Store
            </div>
            <div className="categories">
              <CategoryHeader category={allCategory} name="ALL"></CategoryHeader>
              <CategoryHeader category={dressCategory} name="GIBSON"></CategoryHeader>
              <CategoryHeader category={partyCategory} name="FENDER"></CategoryHeader>
            </div>
            <div className="firstRow"> 
              {/*<SortHeader></SortHeader> */}
              { this.state.products.map((item, i) => (
                  <Dress key={i} item={item} />
              ))}  
            </div>
            <NewProduct onSubmit={this.addProduct} />
          </div>
      </Fragment>
    );
  }
}

export default function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <FrontPage {...props} />
    </ErrorBoundary>
  );
}
