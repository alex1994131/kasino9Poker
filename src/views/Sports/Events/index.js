import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Card, CardBody, CardImg, Col, CardImgOverlay } from "reactstrap"
import SportsEventItem from './SportsEventItem'
import {get_odds , currentSelectedGame,get_all_sports_list} from "../../../redux/actions/sports/index"

export class Events extends Component {

    constructor(props) {
        super(props)
        this.state = {
            allData : null,
            team : this.props.location.state,
            category : ""
        }
    }

    async componentDidMount(){
        var sendData = {
            event_id : this.props.location.state.event_id,
        }
        await this.props.get_all_sports_list();
        await this.props.get_odds(sendData);
        if(this.props.all_matchs){
            var currentData = this.props.all_matchs[0].data[0];
            this.props.currentSelectedGame(currentData);
            if(!document.getElementById("matchId")){
                const P = document.createElement("p");
                P.id = "matchId";
                P.className = this.state.team.event_id.split(":")[2];
                document.body.appendChild(P);
            }else{
                document.getElementById("matchId").className = this.state.team.event_id.split(":")[2];
            }
    
            const script = document.createElement("script");
            script.src = "https://kasagames.com/client/script.js";
            script.async = true;
            document.body.appendChild(script);
        }
        var index = this.props.all_sports_list.findIndex(item => item.sport_id === this.state.team.sportid);
        var category = this.props.all_sports_list[index].sport_name;
        if(this.state.team.Venue){
            category += " > " + this.state.team.Venue.country;
        }
        if(this.state.team.Season){
            category += " > " + this.state.team.Season.Name;
        }
        this.setState({category : category});
        // this.props.current_selected_sport.sport_name + " > " + 
        // 'Poland   >   Ekstraklasa'
    }

    render() {
        return (
            <div className='sports-events'>
                <Row>
                    <Col sm='12'>
                        <Row>
                            <Col sm='12'>
                                <div className='sports-events-title'>{ this.state.category}</div>
                            </Col>
                        </Row>
                        <Card className="text-white">
                            <CardImg bottom className="img-fluid" src={'https://sportsbet.io/sports/assets/img/worldcup/3.jpg'} alt="card image cap" />
                            <CardImgOverlay className="d-flex flex-column justify-content-between">
                            <CardBody>
                                <div style={{textAlign:'center', color:'white', fontSize:'2rem'}}>
                                    <span>{this.state.team.HomeCompetitor.Name} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
                                    <span>
                                    {
                                        (this.state.team.Status.HomeScore==="null" || !this.state.team.Status.HomeScore ? 0 + " - " + 0 :
                                        this.state.team.Status.HomeScore + ' - ' + this.state.team.Status.AwayScore)
                                    }
                                    </span>
                                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.team.AwayCompetitor.Name}</span>
                                </div>
                                <div style={{textAlign:'center', color:'white', fontSize:'1.5rem'}}>
                                {
                                    this.state.team.ScheduledTime
                                }
                                </div>
                            </CardBody>
                            </CardImgOverlay>
                        </Card>
                    </Col>
                </Row>
                <Row className='mb-2'>
                    <Col xs='12' lg='9'>
                        {
                            this.props.currentSelected ? (
                                this.props.currentSelected.EventStatus === "Finished" ? 
                                    <h1> Attention! All markets Finished. </h1> 
                                     : (
                                            this.props.currentSelected.market && this.props.currentSelected.market.length ? 
                                                this.props.currentSelected.market.map((Item, index)=>(
                                                    <SportsEventItem team={this.props.currentSelected} Item={Item} key={index}/>
                                                )
                                            ):<h1> Any markets doens't exist! </h1>
                                        )
                            ) : <h1>Attention! All markets Suspended.</h1>
                        }
                    </Col>
                    <Col xs='12' lg='3'>
                        <div className="widgets">
                                <div><div className="sr-widget sr-widget-1"></div></div>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentSelected : state.sports.currentSelectedGame,
        all_matchs : state.sports.all_matchs,
        current_selected_sport : state.sports.current_selected_sport,
        all_sports_list : state.sports.all_sports_list
    }
}

const mapDispatchToProps = {
    get_odds,currentSelectedGame,
    get_all_sports_list
}

export default connect(mapStateToProps, mapDispatchToProps )(Events)
