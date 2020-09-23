import React from 'react';

function Footer() {
  return (
    <footer className="container-fluid px-0 py-1 bg-dark">
  		<div className="row align-items-center">
  			<div className="col-4 pl-4">
          <div className="pl-4">
            <span>NewPizza LLC, 2020</span>
          </div>
  			</div>
  			<div className="col-5 offset-3 d-flex align-items-center justify-content-end pr-4">
  				<a href="https://vk.com/id198556503" className="btn ml-2"><i className="fa fa-vk fa-2x" aria-hidden="true"></i></a>
  				<a href="https://github.com/Incold0310" className="btn ml-2"><i className="fa fa-github fa-2x" aria-hidden="true"></i></a>
  				<a href="https://t.me/incold0310" className="btn ml-2"><i className="fa fa-telegram fa-2x" aria-hidden="true"></i></a>
  			</div>
  		</div>
  	</footer>
  )
}

export default Footer;
