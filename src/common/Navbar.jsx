import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Navbar extends Component {

  renderLinks() {
    if (this.props.authenticated) {
      return [
        <li className="item-navbar">
          <Link className="link-navbar" to="/dashboard">Dashboard</Link>
        </li>,
        <li className="item-navbar">        
          <Link className="link-navbar" to="/calendar">Calendar</Link>
        </li>,
        <li className="item-navbar">              
          <Link className="link-navbar" to="/new-task">New Task</Link>
        </li>,
        <li className="item-navbar">        
          <Link className="link-navbar" to="/signout">Sign Out</Link>
        </li>
      ];
    } else {
      return [
        <li className="item-navbar" key={1}>
          <Link className="link-navbar" to="/signin">Sign In</Link>
        </li>,
        <li className="item-navbar" key={2}>
          <Link className="link-navbar" to="/signup">Sign Up</Link>
        </li>
      ];
    }
  }

  render() {
    return (
      <nav className="c-navbar">
        <Link to="/" className="text-logo">Tracky :)</Link>
        <ul className="list-navbar">
          {this.renderLinks()}
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Navbar);