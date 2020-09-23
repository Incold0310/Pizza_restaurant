import React from 'react';
import {Link} from 'react-router-dom'

function Banner() {
  return (
    <div id="banner" className="container-fluid p-0 d-flex flex-fill">
      <div className="row d-flex flex-fill">
        <div className="col d-flex align-items-center text-center">
          <h1 className="display-4 p-2">Welcome to the <em>NewPizza</em> <br />and<br /> enjoy your meal!</h1>
        </div>
        <div className="col text-left d-flex align-items-center">
          <div>
            <div>
              <p className="bannerP">Login to manage your orders and get discounts from our restaurant</p>
              <Link to="/auth" type="button" className="btn btn-info">Login</Link>
              <p className="mt-2 bannerP">or just choose a pizza from our menu</p>
              <Link to="/menu" type="button" className="btn btn-warning">Menu</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Banner);
