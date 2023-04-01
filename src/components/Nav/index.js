import React from 'react'
import { Link } from "react-router-dom";


function Nav() {
  return (
    <>
      <ul>
      <Link className='nav' to ='/'><li>Homepage</li></Link>
        <Link className='nav' to ='/recipes'><li>Recipes</li></Link>
        <Link className='nav' to ='/nutrition'><li>Nutrition</li></Link>
      </ul>
    </>
  )
}

export default Nav