import React from 'react';
import logo from '../assets/images/logo.png';
import {Link} from 'react-router-dom';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from "../store/reducers/rootReducer";


const connector = connect(
    (state: RootState) => ({
        count: state.basket.count,
        total: state.basket.total,
        currency: state.menu.currency
    })
)

function Navbar(props: ConnectedProps<typeof connector>) {
  return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      	<div className="container-fluid">
          <Link className="navbar-brand" to="/"><img src={logo} alt="logo"/></Link>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>


          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/menu">Menu</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/delivery">Delivery</Link>
              </li>
            </ul>
            <Link to="/basket" type="button" className="btn">
              { props.count != 0 && (
                  <span className="badge badge-danger">
                    <div>{(props.total*props.currency.rate).toFixed(2)} <i className={`fa ${props.currency.symbol}`}></i></div>
                    <div className="mt-1">{props.count} pcs</div>
                  </span>
                )
              }
              <i className="fa fa-shopping-basket fa-2x"></i>
            </Link>
            <Link to="/account" type="button" className="btn"><i className="fa fa-user-circle-o fa-2x"></i></Link>
          </div>
      	</div>
      </nav>
  )
}

export default connector(React.memo(Navbar));
