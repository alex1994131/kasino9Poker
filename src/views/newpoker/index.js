import React from "react"
import { connect } from "react-redux";
import {Row , Col} from "reactstrap"
import PokerHeader from "./pokerheader"
import PokerNavHeader from "./pokernavheader"

class Poker extends React.Component {

  state = {
    temp : [
      {a:"a"},
      {a:"a"},
      {a:"a"},
      {a:"a"},
      {a:"a"},
      {a:"a"},
      {a:"a"},
      {a:"a"},
      {a:"a"},
      {a:"a"},
      {a:"a"},
      {a:"a"},
      {a:"a"},
      {a:"a"},
      {a:"a"},
      {a:"a"},
      {a:"a"},
      {a:"a"},
      {a:"a"},
      {a:"a"},
      {a:"a"},
      {a:"a"},
      {a:"a"},
      {a:"a"},
      {a:"a"},
      {a:"a"},
    ],
    data : [
      {image : "https://poker-web.vbet.com/4/jackpot-tiny.png" , name : "MINI" , money : "10000$"},
      {image : "https://poker-web.vbet.com/4/jackpot-tiny.png" , name : "MINOR" , money : "10000$"},
      {image : "https://poker-web.vbet.com/4/jackpot-tiny.png" , name : "MAJOR" , money : "10000$"},
      {image : "https://poker-web.vbet.com/4/jackpot-tiny.png" , name : "MEGA" , money : "10000$"},
      
    ],
    navData : [
      {
        icon : "feather feather-monitor",
        name : "Games"
      },
      {
        icon : "feather feather-monitor",
        name : "Games"
      },
      {
        icon : "feather feather-monitor",
        name : "Games"
      },
      {
        icon : "feather feather-monitor",
        name : "Games"
      },
    ]
  }

  render() {
    return(
      <React.Fragment>
        <PokerHeader />
        <Row>
          {this.state.data.map((item,i)=>(
            <Col key={i} className = "p-2 poker-change">
              <img className = "ml-2" src = {item.image} alt = ""></img>
              <span className = "ml-1 poker-change-name">{item.name}</span>
              <span className = "mr-2 poker-change-money">{item.money}</span>
            </Col>
          ))}
        </Row>
        <Row className = "poker-nav-header">
          <Col className = "pl-4" lg="4" md="4" sm="4" xs="4">
            <img style = {{width : "30%"}} src = "https://cms.kasagames.com/upload/8bc5e52134537d72a0e07c436c952d0a.png" alt = ""></img>
          </Col>
          <Col className = "p-2" >
            <span className="ml-2 poker-search-item poker-search-item-active">CASH GAMES</span>
            <span className="ml-2 poker-search-item">SPIN & GO</span>
            <span className="ml-2 poker-search-item">TOURNAMENTS</span>
          </Col>
        </Row>
        <Row>
          <Col lg="9" md="9" sm="9" xs="9" className = "poker-field-item">
            <Row className = "poker-field-item-contanor">
              {this.state.navData.map((data , key)=>(
                <PokerNavHeader key={key} data = {data}></PokerNavHeader>
              ))}
            {/* <div className = "p-1 pl-2" style = {{background : '#4a5162' , width : '5%' , float : 'right' , color : 'white' , fontSize : "25px"}}>A</div> */}
            </Row>
            <Row className = "p-1" style = {{background : "#181c29"}}>
              <Col>Name</Col>
              <Col>Game</Col>
              <Col>Type</Col>
              <Col>Stakes</Col>
              <Col>Players</Col>
              <Col>Wait</Col>
            </Row>
            <div style = {{background : "#212532", overflow : 'scroll'}}>
              <div style = {{height : "62vh"}}>
                {this.state.temp.map((Item,i) => (
                  <Row key = {i} className = "p-1">
                    <Col xs="2">Name</Col>
                    <Col xs="2">Game</Col>
                    <Col xs="2">Type</Col>
                    <Col xs="2">Stakes</Col>
                    <Col xs="2">Players</Col>
                    <Col xs="2">Wait</Col>
                  </Row>
                ))}
              </div>
            </div>
          </Col>
          <Col lg="3" md="3" style = {{background : 'gray'}}>
          </Col>
        </Row>
        <Row className = "p-1" style = {{background : "#121623" , height : "5%", width : '100%' ,margin : '0'}}>
          <Col xs="10">
            <Row>
              <div className = "ml-2" style = {{float : 'left'}}>Head Up</div>
              <div className = "ml-2" style = {{float : 'left'}}>6 Max</div>
              <div className = "ml-2" style = {{float : 'left'}}>9 Max</div>
              <div className = "ml-2" style = {{float : 'left'}}>STRADDLE</div>
              <div className = "ml-2" style = {{float : 'left'}}>ANTE</div>
              <div className = "ml-2" style = {{float : 'left'}}>6+ Holdem</div>
            </Row>
          </Col>
          <Col xs="2"></Col>
        </Row>
      </React.Fragment>
    )
  }
}

const loadStateData  = (state) =>{
    return {

    }
}

const mapDispatchToProps = {

}

export default connect(loadStateData,mapDispatchToProps)(Poker)