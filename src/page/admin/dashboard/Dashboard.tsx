import React from 'react'
import "../../../styles/admin/dashboard.scss"
import Topbox from '../compoent/topbox/Topbox'
import Chartbox from '../compoent/chartbox/Chartbox'
import {chartBoxUser,chartBoxProduct,chartBoxRevenue,chartBoxConversion
} from "../../../services/data"

const Dashboard = () => {
  return (
    <div className='dashboard'> 
    <div className="box box-1">
      <Topbox/>
    </div>
    <div className="box box-2"><Chartbox {...chartBoxUser} /></div>
    <div className="box box-3"><Chartbox {...chartBoxProduct}  /></div>
    <div className="box box-4">box4</div>
    <div className="box box-5"><Chartbox {...chartBoxConversion}/></div>
    <div className="box box-6"><Chartbox {...chartBoxRevenue}/></div>
    <div className="box box-7">box 7</div>
    <div className="box box-8">box 8</div>
    <div className="box box-9">box 9</div>
    </div>
  )
}

export default Dashboard