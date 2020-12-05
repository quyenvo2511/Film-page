import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NaviBar = () => {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>
          <img
            src="https://png2.cleanpng.com/sh/70294fe7721701c0062a12d1eb3ab969/L0KzQYm3VcI4N6NtfpH0aYP2gLBuTf5mfJdxgeo2dHXvdcfwkBlwdl5ohNt5LXH1hH7vhL1td5h0RadrMHHlQIG3UcEyO2g3RqMCMkezR4m8UcUzP2U3T6ICMkC6PsH1h5==/kisspng-netflix-television-clip-art-hd-logo-5b0ab000111372.17270785152742707207.png"
            alt="Netflix"
            width="200px"
          />
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/reading">
            Reading List
          </Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NaviBar;
