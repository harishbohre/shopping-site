import React from 'react';
import Details from './Details';
import Cart from './Cart';
class Home extends React.Component {
   
    constructor(props){
        super(props);
        this.state = {
            tempData:{},
            isShowingDetails: false,
            showCart:false,
          }
    }
    detailsEventHandler=(item)=>{             
        this.setState({
            isShowingDetails:true,
            tempData:item
        });
    }
    closeDetailsEventHandler=()=>{
        this.setState({
            isShowingDetails:false
        });
    }
    closeCard=()=>{
        this.setState({
            showCart:false
        });
    }
    addToCart=(obj)=>{
        this.setState({
            showCart:true,
            tempData:obj
        });
        
    }
    sendCartDatatoHome = (obj) => {        
        this.setState({
            showCart:false
        });        
        var pos =  this.props.productsArr.findIndex(item=>item.productId===obj.productId);
        var preQuantity =  this.props.productsArr[pos].quantityinHand;
        var newQuantity =  preQuantity -  obj.quantity;

        this.setState({
           // this.productsArr[pos].quantityinHand:newQuantity
        });
        this.props.sendCartDataFromHometoApp(obj);
    }
    render() {
        var productImgStyle = {width:'80px',height:'100px'}
        var products = this.props.productsArr.map((item) => {
            return (
                <div class="item col-xs-4 col-lg-4" key={item.id}>
                        <div class="thumbnail card">
                            <div class="img-event">
                                <img height="100" class="group list-group-image img-fluid" src={item.img_url} alt="" />
                            </div>
                            <div class="caption card-body">
                                <h4 class="group card-title inner list-group-item-heading">
                                    {item.name}</h4>
                                <p class="group inner list-group-item-text">
                                    {item.category}</p>
                                <div class="row">
                                    <div class="col-xs-12 col-md-6">
                                        <p class="lead">
                                            {item.price}</p>
                                    </div>
                                    <div class="col-xs-12 col-md-6">
                                        <input className="btn btn-warning" type="button" value="Add to Card" onClick={this.addToCart.bind(this,item)}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
                
            );
        });
        return (
            <div class="container">
                <div id="products" class="row view-group">
                    {products}
                </div>
            {this.state.isShowingDetails && <Details productData={this.state.tempData} closeDetails={this.closeDetailsEventHandler}></Details>}   
            {this.state.showCart && <Cart datatoSend={this.state.tempData} sendCartDatatoHome={this.sendCartDatatoHome} closeCard={this.closeCard}></Cart>}            
            </div>
            
        );
    }
}
export default Home;