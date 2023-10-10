import React from 'react'
import { Product } from '../../page/admin/Admin'
import { BiLeftArrow } from 'react-icons/bi'

const SideBarCart = ({lastItem}:{lastItem:Product}) => {
  return (
    <div className='bottom-cart'>
        <div className='bottom-cart-top'><BiLeftArrow className='icon-show-sidebar'/></div>
        slide
    </div>
  )
}

export default SideBarCart