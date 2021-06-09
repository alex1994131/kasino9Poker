import React, { Component } from 'react'
import { X, Menu } from 'react-feather'
import { connect } from 'react-redux'
import {Row , Col} from "reactstrap"
import classnames from "classnames"

export class pokerheader extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      activeTab:null,
      tabs:[
        { id:1,title:'Rangoon'},
        { id:2,title:'Surabaya'},
        { id:3,title:'Quito7'},
        { id:4,title:'Québec City9'},
        { id:5,title:'Urfa9'},
      ]
    }
  }
  
  tabClose(e){
    var index = this.state.tabs.findIndex(item=>item.id===e);
    var data = this.state.tabs;
    data.splice(index, 1)
    this.setState({tabs:data});
  }
  
  render() {
    return (
      <Row className = "poker-header p-1 m-0" style = {{background : "#121623"}}>
        <div className="header-container-p">
          <div className="home-icon-wrapper ng-star-inserted"><b className="home-icon-view"></b></div>
            <div className="tab-nav-container-v ng-star-inserted">
              <ul>
                <li 
                  className={
                    classnames( `ng-star-inserteds`, {"active":this.state.activeTab === null})
                  }
                  onClick={()=>this.setState({activeTab:null})}>
                    <div className="single-tab-v-p active">
                      <p>
                        {/* <Menu className="tab-icon-view-p lobby-icon-view-p"/> */}
                        <span>Lobby</span>
                      </p>
                      <span>
                        <i className="line-view-color-p"></i>
                      </span>
                    </div>
                </li>
                {
                  this.state.tabs.map((item, key)=>(
                    <li 
                      key={key}  
                      onClick={()=>this.setState({activeTab:key})}
                      className={
                        classnames( `ng-star-inserted`, {"active":this.state.activeTab === key,})
                      }
                    >
                      <div className="ng-star-inserted">
                        <div className="single-tab-v-p">
                            <p>
                              <span className="tab-info-view-p"> 
                                  <i>{item.title}</i>
                              </span>
                            </p>
                            <ul>
                              <li className="closed-tab-icon-p" onClick={()=>this.tabClose(item.id)}>
                                <span><X className="closed-tab-icon-p"/></span>
                              </li>
                            </ul>
                        </div>
                      </div>
                    </li>
                  ))
                }
              </ul>
          </div>
          <div className="user-menu-p-wrapper">
              <a target="_blank" className="user-menu-icon-p live-chat-p ng-star-inserted" href="https://www.vbet.com/contact-us"></a>
              <div className="user-menu-icon-p settings-p ng-star-inserted"></div>
              <div className="user-menu-icon-p jackpot-ico ng-star-inserted"></div>
          </div>
          <a href="#" target="_top"></a>
        </div>
      </Row>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(pokerheader)
