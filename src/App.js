import React from 'react';
import axios from "axios";
//import logo from './logo.svg';
import './App.css';
import Home from './Home.js';
import MyCart from './MyCart';
const API_URL = 'https://api.myjson.com/bins/qzuzi';
class App extends React.Component {
  productsArr1 = [
    { productId: 'p101', productName: 'Box', description: 'Box Desc', longDescription: 'Box Long Desc', price: 100, quantityinHand: 10, imageUrl: 'product.jpg' },
    { productId: 'p102', productName: 'Iphone 7', description: 'phone Desc', longDescription: 'phone Desc', price: 100, quantityinHand: 10, imageUrl: 'iphone.png' },
    { productId: 'p103', productName: 'Box', description: 'Box Desc', longDescription: 'Box Long Desc', price: 100, quantityinHand: 10, imageUrl: 'product.jpg' },
    { productId: 'p104', productName: 'Box', description: 'Box Desc', longDescription: 'Box Long Desc', price: 100, quantityinHand: 10, imageUrl: 'product.jpg' },
    { productId: 'p105', productName: 'iPhone', description: 'iPhone Desc', longDescription: 'iPhone Long Desc', price: 30000, quantityinHand: 10, imageUrl: 'iphone.png' },
]; 
  cartArr = [];
  constructor(props) {
    super(props);
    this.state = {
      showCart:false, productsArr: [], productsArrInit: []
    }
  }
  closeCard=()=>{
        this.setState({
            showCart:false
        });
    }
  componentDidMount() {
    const url = `${API_URL}`;
    axios.get(url).then(response => response.data)
    .then((data) => {
    	//this.productsArr = data;
        this.setState({ productsArr: data, productsArrInit: data });
        //console.log(this.state.productsArrInit);
     })
  }
  sendCartDataFromHometoAppHandler = (obj) => {
  
    var pos =  this.cartArr.findIndex(item=>item.id===obj.id);
    if(pos !== -1){
      var tempData = this.cartArr[pos];
      //console.log(tempData);      
      tempData.quantity +=  obj.quantity;
      var tempArr = [...this.cartArr];
      tempArr.splice(pos,1,tempData);
      this.cartArr = [...tempArr];
    }else{
      this.cartArr =  [...this.cartArr,obj];
      //console.log(this.cartArr);
    }        
    
    // var prodPos = this.state.productsArr.findIndex(item=>item.id === obj.id);
    // var tempData = this.state.productsArr[prodPos];
    // tempData.quantityinHand -= obj.quantity;
    // var tempArr = [...this.state.productsArr];
    // tempArr.splice(pos,1,tempData);
    // this.state.productsArr = [...tempArr];

    
  }
  showCart=(obj)=>{
  	this.setState({
      showCart:true,
    });
  }
  deleteCartDataFromAppHandler=(obj)=>{
    
    var prodPos = this.state.productsArr.findIndex(item=>item.id === obj.id);
    var tempData = this.state.productsArr[prodPos];
   // tempData.quantityinHand += obj.quantity;
   	var itemPos = this.cartArr.findIndex(item=>item.id === obj.id);
   //	alert(itemPos);
    var tempArr = [...this.cartArr];
    tempArr.splice(itemPos,1);    
    this.cartArr = [...tempArr];
    this.setState({});
    //console.log(itemId);
    //console.log(this.cartArr.findIndex(itemId));
    //arr.splice(arr.findIndex(itemId), 1);
  }
  filterTodo=(e)=> { 
		 var updatedList = this.state.productsArrInit;
		 updatedList = updatedList.filter((item =>{
		 return item.name.toLowerCase().search(
		 e.target.value.toLowerCase()) !== -1;
		 }) );
		 this.setState({ 
		 productsArr: updatedList,
		 });
		 // if (updatedList == 0 ) {
		 // this.setState({ 
		 // message: true,
		 // });
		 // } else {
		 // this.setState({ 
		 // message: false,
		 // });
		 // } 
  }
  render() {
    return (
      <React.Fragment>
        <div id="header">
          
        <nav class="navbar">
  			<img src="star.png" alt="Company Logo" />
		    <form class="form-inline">
		        <input type="text" className="center-block"  onChange={this.filterTodo} />
		        <img src="cart.png" onClick={this.showCart} />
		    </form>
		</nav>
          <div class="clearfix marging10"></div>
          <Home productsArr={this.state.productsArr} sendCartDataFromHometoApp={this.sendCartDataFromHometoAppHandler} />
          {this.state.showCart ? <MyCart closeCard={this.closeCard} cartArr={this.cartArr} deleteCartDataFromApp={this.deleteCartDataFromAppHandler}></MyCart>:''}
        </div>
        <div id="navigation"></div>
        <div id="footer"></div>
      </React.Fragment>
    );
  }
}
export default App;
