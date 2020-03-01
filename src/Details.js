import React from 'react';
import ReactModal from 'react-modal';
import './Details.css';
ReactModal.setAppElement('#root');

class Details extends React.Component {    
    constructor (props) {
        super(props);
        this.state = {
          showModal: true
        };
    }
    handleCloseModal = () => {
        this.setState({ showModal: false });
        this.props.closeDetails();
      }
    render() {
        const { productData } = this.props;        
        return (
            <React.Fragment>
                <ReactModal   isOpen={this.state.showModal} style={{
              overlay: {
                backgroundColor: '#000',                
              }
            }}>
                    <ul className="list-group">
                    <li className="list-group-item active">Product Info</li>
                        <li className="list-group-item productimg">
                            <img width="20px" src={productData.imageUrl} alt="Product Image" />
                        </li>                        
                        <li className="list-group-item"><span className="label">Product Name:</span> {productData.productName}</li>
                        <li className="list-group-item"><span className="label">Product Price:</span> {productData.price}</li>
                        <li className="list-group-item"><span className="label">Product Description:</span> {productData.longDescription}</li>
                    </ul>
                    <button className="btn btn-primary close-btn" onClick={this.handleCloseModal}>Close Modal</button>
                </ReactModal>
            </React.Fragment>
        );
    }
}
export default Details;