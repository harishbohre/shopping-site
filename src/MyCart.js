import React from 'react';
import ReactModal from 'react-modal';
class MyCart extends React.Component {
    deleteCartItemHandler=(itemId)=>{
        //console.log("delete method"+item);
        this.props.deleteCartDataFromApp(itemId);
    }
    handleCloseModal = () => {            
        this.props.closeCard();
      }
    render(){
        console.log(this.props.cartArr);
        var cartData = this.props.cartArr.map((item) => {
            return(
                <tr key={item.id}  className="table-primary1">                
                <td scope="row">{item.name}</td>
                <td scope="row">{item.quantity}</td>
                <td>{item.price * item.quantity}</td>    
                <td>
                <button className="btn btn-danger" onClick={this.deleteCartItemHandler.bind(this,item)}>Delete</button>
                </td>            
            </tr>
            ) 
        });
        return(            
            
            <div className="container-fluid">
            <ReactModal  isOpen="true"  style={{
              overlay: {
                backgroundColor: '#000',                
              }
            }}>
            
                <table className="table">
                    <thead className="thead-primary" >
                        <tr>                                                    
                            <th scope="col">Product Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                            <th>&nbsp;</th>                            
                        </tr>
                    </thead>
                    <tbody>
                    {cartData}                        
                    </tbody>
                </table>   
                <div style={{ marginTop: '10px', float: 'right' }}>
                    <button className="btn btn-primary" onClick={this.handleCloseModal}>Close</button>
                </div>
                </ReactModal>
                </div>
                 
        );
    }
}
export default MyCart;