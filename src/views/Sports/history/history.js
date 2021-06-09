import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row , Col ,Badge,Button} from "reactstrap"
import { cashOut } from "../../../redux/actions/sports/index"
import { ChevronDown, ChevronRight } from "react-feather";


export class Events extends Component {

    state = {
        sportType : {},
        flag : false
    }

    async componentDidMount(){
        var sport = this.props.all_sports_list.findIndex(item => item.sport_id === this.props.data.sportid);
        this.setState({ sportType : this.props.all_sports_list[sport]});
    }

    changeFlag(){
        this.setState({flag : !this.state.flag})
    }

    cashOut(){
        this.props.cashOut(this.props.data);
    }

    render() {
        return (
            <Col key={this.props.id} lg="6" md="6" sm="12" className="mt-1"> 
                <div style = {{background : "#113536" , borderRadius : "1vh"}} onClick = {() => this.changeFlag()}>
                    <svg style={{color:this.state.sportType.color, margin:'1.2rem'}} width="22" height="22" viewBox={this.state.sportType.viewBox}>
                        <path d={this.state.sportType.icon} fill="currentColor"/>
                    </svg>
                    <Badge color={this.props.data.betType === "SINGLE" ? "light-success" : "light-warning"} pill>
                        {this.props.data.betType}
                    </Badge>
                    {
                        this.props.selectId !== 1 ?
                        <Badge color={this.props.data.betResult === "WIN" ? "light-success" : "light-warning"} pill>
                            {this.props.data.betResult}
                        </Badge> : ""
                    }
                    {
                        this.props.data.isBoosted?
                        <Badge color={"light-success"} pill>
                            {"Boosted"}
                        </Badge> : ""                        
                    }
                    <div className= {"sports-country-title mr-1 mt-2"} style={{float : 'right'}}>
                        {this.state.flag ? <ChevronDown style={{ color : "#28c76f" , strokeWidth : '5px'}} size={20}/> : <ChevronRight size={20}/>}
                    </div>
                </div>
                {
                    this.state.flag ?
                        <div style = {{background : "#113536" , borderRadius : "1vh",marginTop: "2px" , color : 'white'}} className = "p-1">
                            <Row>
                                <Col lg="4" md="4" sm="4">{this.props.data.MatchName}</Col>
                                <Col lg="4" md="4" sm="4">{this.props.data.MarketName}</Col>
                                <Col lg="4" md="4" sm="4">{this.props.data.OutcomeName}</Col>
                                <Col lg="4" md="4" sm="4">{this.props.data.currentTime}</Col>                        
                            </Row>
                        </div> : ""
                }
                <div style = {{background : "#113536" , borderRadius : "1vh",marginTop: "2px" , color : 'white'}} className = "p-1">
                    <Row>
                        <Col lg="4" md="4" sm="4">Odds</Col>
                        <Col lg="4" md="4" sm="4">Stack INR</Col>
                        <Col lg="4" md="4" sm="4">Potential win INR</Col>
                        <Col lg="4" md="4" sm="4" style = {{color: "#28c76f"}}>{this.props.data.OutcomeOdds}</Col>
                        <Col lg="4" md="4" sm="4">{parseFloat(this.props.data.amount).toFixed(2)}</Col>                   
                        <Col lg="4" md="4" sm="4">{parseFloat(this.props.data.amount * this.props.data.OutcomeOdds).toFixed(2)}</Col>                   
                    </Row>
                </div>
                <div style = {{background : "#113536" , borderRadius : "1vh",marginTop: "2px" , color : 'white'}} className = "p-1">
                    <Row>
                        <Col lg="12" md="12" sm="12">
                            {
                                this.props.selectId === 1 ?
                                    <Button className="round btn-block bet-cashout bet-cashout" onClick = {()=>this.cashOut()}>
                                        {"Cash Out " + (parseFloat(this.props.data.amount) - 0.1).toFixed(2) + " INR"}
                                    </Button> : ""
                            }
                        </Col>
                        {/* <Col lg="2" md="2" sm="2">
                            <Button className="round btn-block bet-cashout">
                                {"ID"}
                            </Button> 
                        </Col> */}
                    </Row>
                </div>
            </Col>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = {
    cashOut
}

export default connect(mapStateToProps, mapDispatchToProps )(Events)
