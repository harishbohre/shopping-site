import React from 'react';
import ReactModal from 'react-modal';
class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: true,
            quantity:1,
            quantityInHand:10
        };
    }
    addQuantity = (event)=>{
            this.setState((prevState,props)=>{
                return({
                    quantity:prevState.quantity+1
                }); 
            });
    }
    decQuantity = (event)=>{
        
            this.setState((prevState,props)=>{
                return({
                    quantity:prevState.quantity - 1
                }); 
            });      
        
    }
    handleCloseModal = () => {            
        this.props.closeCard();
      }
      saveToCartArrHandler = ()=>{
          var {id,name,price,quantityinHand} = this.props.datatoSend;
          var tempObj = {
            id,  name, price,
            quantity:this.state.quantity
          }
          this.props.sendCartDatatoHome(tempObj);
      }
    render() {
        const { datatoSend } = { ...this.props };
        return (
            <React.Fragment>
<ReactModal   isOpen={this.state.showModal} style={{
              overlay: {
                backgroundColor: '#000',                
              }
            }}>
                <ul className="list-group">
                    <li className="list-group-item active">Cart Component</li>
                    <li className="list-group-item productimg">
                        <img src={datatoSend.img_url} alt="Product Image" style={{height:'150px'}} />
                    </li>
                    <li className="list-group-item"><span className="label">Product Name:</span> {datatoSend.name}</li>
                    <li className="list-group-item"><span className="label">Product Price:</span> {datatoSend.price}</li>
                    <li className="list-group-item"><span className="label">Product Description:</span> {datatoSend.category}</li>
                    <li className="list-group-item"><span className="label">Discount</span> {datatoSend.discount}</li>
                    <li className="list-group-item">

                        <button className="btn btn-primary" disabled = {this.state.quantity === this.state.quantityInHand?true:false || this.state.quantityInHand === 0 } onClick={this.addQuantity.bind(this)}>+</button>&nbsp;&nbsp;
                        <span>{this.state.quantity}</span>&nbsp;&nbsp;
            <button className="btn btn-primary" disabled={this.state.quantity === 1?true:false} onClick={this.decQuantity.bind(this)}>-</button>
                        <div style={{ marginTop: '10px' }}>
                            <button className="btn btn-primary" disabled={this.state.quantityInHand === 0?true:false} onClick={this.saveToCartArrHandler}>Confirm</button>&nbsp;
                            <button className="btn btn-primary" onClick={this.handleCloseModal}>Close</button>
                        </div>

                    </li>
                </ul>
                </ReactModal>
            </React.Fragment>
        );
    }
}
export default Cart;