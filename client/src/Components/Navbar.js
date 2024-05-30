import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <ul className='Navbar'>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/Ingredients" >
          <li>Ingredients</li>
        </Link>
        <Link to="/Plats">
          <li>Plats</li>
        </Link>
        <Link to="/Calcul">
          <li>Calcul</li>
        </Link>
    </ul>
  )
}

export default Navbar