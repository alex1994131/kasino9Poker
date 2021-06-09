import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Col} from "reactstrap"

export class pokerheader extends Component {
  render() {
    return (
      <Col className="col pt-1 pl-2" style = {{borderRight : "3px solid #5c616d" , cursor : 'pointer' , background : "#3f4553"}}>
        <svg xmlns="http://www.w3.org/2000/svg" style = {{color : 'gray'}} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={this.props.data.icon}><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
        <span style = {{fontSize : '16px'}} className="ml-1">{this.props.data.name}</span>
        <svg style = {{float : 'right' , color : 'gray'}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather chevron-right"><polyline points="6 9 12 15 18 9"></polyline></svg>
        <p style = {{color : 'white'}}>Show All</p>
      </Col>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(pokerheader)
