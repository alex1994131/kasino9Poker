import React from "react";
import Media from "react-media";
import { Col, Row } from "reactstrap";
import { history } from "../../../history"
import { connect } from 'react-redux'
import { setItem } from '../../../redux/actions/sports';

class Sportsevents extends React.Component {

    sportsEvent(e){
        history.push('/sportsevent',e);
    }
    
    setOdds(p1 , p2){
        this.props.setItem(Object.assign({}, p1 , p2 ,this.props.sportsEvents));
    }

    render() {
        return(
            <Media queries={{
                small: "(max-width: 768px)",
                medium: "(min-width: 769px) and (max-width: 999px)",
                large: "(min-width: 1000px)"
                }}>
                {matches => (
                    <React.Fragment>
                        {matches.small && 
                            <Row className='m-1'>
                            </Row>
                        }
                        {matches.medium && 
                            <Row className='m-1'>
                            </Row>
                        }
                        {matches.large &&
                            <Row className='m-1'>
                                <div className='sports-align-left' style={{width:'calc(100% - 30px)'}}>
                                    <Row style={{width:'100%'}}>
                                        <Col sm={6}>
                                            <Row>
                                                <Col sm={2} className='sports-team'>
                                                    <div className = "mt-1">{this.props.sportsEvents.event_id.split(":")[2]}</div>
                                                </Col>
                                                <Col sm={6} className='sports-team'>
                                                    <div onClick={()=>this.sportsEvent(this.props.sportsEvents)}>{this.props.sportsEvents.HomeCompetitor.Name}</div>
                                                    <div onClick={()=>this.sportsEvent(this.props.sportsEvents)}>{this.props.sportsEvents.AwayCompetitor.Name}</div>
                                                </Col>
                                                <Col sm={2} className='sports-start-time'>
                                                    {this.props.sportsEvents.ScheduledTime}
                                                </Col>
                                                <Col sm={2} className='sports-score-board'>
                                                    <div>{!this.props.sportsEvents.Status.HomeScore ? 0 : this.props.sportsEvents.Status.HomeScore}</div>
                                                    <div>{!this.props.sportsEvents.Status.AwayScore ? 0 : this.props.sportsEvents.Status.AwayScore}</div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col className='item-center' sm={6}>
                                            <div>
                                                {
                                                    this.props.sportsEvents.oneTotwo.one || this.props.sportsEvents.EventStatus === "Finished" ?
                                                        <div onClick={(e)=>this.setOdds(this.props.sportsEvents.oneTotwo , this.props.sportsEvents.oneTotwo.one)}
                                                            style = {(this.props.sportsSidebarData.data.findIndex( data => data.OutcomeId === this.props.sportsEvents.oneTotwo.one.OutcomeId && data.OutcomeName === this.props.sportsEvents.oneTotwo.one.OutcomeName && data.MarketId === this.props.sportsEvents.oneTotwo.MarketId && data.MarketName === this.props.sportsEvents.oneTotwo.MarketName && data.MarketSpecifiers === this.props.sportsEvents.oneTotwo.MarketSpecifiers && data.event_id === this.props.sportsEvents.event_id) > -1 ? 
                                                                ( this.props.sportsEvents.oneTotwo.MarketStatus !== "Active" ? {color : 'black' , background : '#0cd664'} : {background : '#0cd664'})
                                                                 : 
                                                                ( this.props.sportsEvents.oneTotwo.MarketStatus !== "Active" ? {color : 'black'} : {} )
                                                            )}>
                                                            {isNaN(this.props.sportsEvents.oneTotwo.one.OutcomeOdds) ? "Lock" : this.props.sportsEvents.oneTotwo.one.OutcomeOdds}
                                                        </div> : <div> Lock </div>
                                                }
                                                {
                                                    this.props.sportsEvents.oneTotwo.draw || this.props.sportsEvents.EventStatus === "Finished" ?
                                                    <div onClick={(e)=>this.setOdds(this.props.sportsEvents.oneTotwo , this.props.sportsEvents.oneTotwo.draw)}
                                                        style = {(this.props.sportsSidebarData.data.findIndex( data => data.OutcomeId === this.props.sportsEvents.oneTotwo.draw.OutcomeId && data.OutcomeName === this.props.sportsEvents.oneTotwo.draw.OutcomeName && data.MarketId === this.props.sportsEvents.oneTotwo.MarketId && data.MarketName === this.props.sportsEvents.oneTotwo.MarketName && data.MarketSpecifiers === this.props.sportsEvents.oneTotwo.MarketSpecifiers && data.event_id === this.props.sportsEvents.event_id) > -1 ? 
                                                            ( this.props.sportsEvents.oneTotwo.MarketStatus !== "Active" ? {color : 'black' , background : '#0cd664'} : {background : '#0cd664'})
                                                            : 
                                                            ( this.props.sportsEvents.oneTotwo.MarketStatus !== "Active" ? {color : 'black'} : {} )
                                                        )}>
                                                        {isNaN(this.props.sportsEvents.oneTotwo.draw.OutcomeOdds) ? "Lock" : this.props.sportsEvents.oneTotwo.draw.OutcomeOdds}
                                                    </div> : <div> Lock </div>
                                                }
                                                {
                                                    this.props.sportsEvents.oneTotwo.two || this.props.sportsEvents.EventStatus === "Finished" ?
                                                    <div onClick={(e)=>this.setOdds(this.props.sportsEvents.oneTotwo , this.props.sportsEvents.oneTotwo.two)}
                                                        style = {(this.props.sportsSidebarData.data.findIndex( data => data.OutcomeId === this.props.sportsEvents.oneTotwo.two.OutcomeId && data.OutcomeName === this.props.sportsEvents.oneTotwo.two.OutcomeName && data.MarketId === this.props.sportsEvents.oneTotwo.MarketId && data.MarketName === this.props.sportsEvents.oneTotwo.MarketName && data.MarketSpecifiers === this.props.sportsEvents.oneTotwo.MarketSpecifiers && data.event_id === this.props.sportsEvents.event_id) > -1 ? 
                                                            ( this.props.sportsEvents.oneTotwo.MarketStatus !== "Active" ? {color : 'black' , background : '#0cd664'} : {background : '#0cd664'})
                                                            : 
                                                            ( this.props.sportsEvents.oneTotwo.MarketStatus !== "Active" ? {color : 'black'} : {} )
                                                        )}>
                                                        {isNaN(this.props.sportsEvents.oneTotwo.two.OutcomeOdds) ? "Lock" : this.props.sportsEvents.oneTotwo.two.OutcomeOdds}
                                                    </div> : <div> Lock </div>
                                                }
                                            </div>
                                            <div>
                                                {
                                                    this.props.sportsEvents.handicap.one || this.props.sportsEvents.EventStatus === "Finished" ?
                                                    <div onClick={(e)=>this.setOdds(this.props.sportsEvents.handicap , this.props.sportsEvents.handicap.one)}
                                                        style = {(this.props.sportsSidebarData.data.findIndex( data => data.OutcomeId === this.props.sportsEvents.handicap.one.OutcomeId && data.OutcomeName === this.props.sportsEvents.handicap.one.OutcomeName && data.MarketId === this.props.sportsEvents.handicap.MarketId && data.MarketName === this.props.sportsEvents.handicap.MarketName && data.MarketSpecifiers === this.props.sportsEvents.handicap.MarketSpecifiers && data.event_id === this.props.sportsEvents.event_id) > -1 ? 
                                                            ( this.props.sportsEvents.handicap.MarketStatus !== "Active" ? {color : 'black' , background : '#0cd664'} : {background : '#0cd664'})
                                                            : 
                                                            ( this.props.sportsEvents.handicap.MarketStatus !== "Active" ? {color : 'black'} : {} )
                                                        )}>
                                                        {isNaN(this.props.sportsEvents.handicap.one.OutcomeOdds) ? "Lock" : this.props.sportsEvents.handicap.one.OutcomeOdds}
                                                    </div> : <div> Lock </div>
                                                }
                                                {
                                                    this.props.sportsEvents.handicap.two || this.props.sportsEvents.EventStatus === "Finished" ?
                                                    <div onClick={(e)=>this.setOdds(this.props.sportsEvents.handicap , this.props.sportsEvents.handicap.two)}
                                                        style = {(this.props.sportsSidebarData.data.findIndex( data => data.OutcomeId === this.props.sportsEvents.handicap.two.OutcomeId && data.OutcomeName === this.props.sportsEvents.handicap.two.OutcomeName && data.MarketId === this.props.sportsEvents.handicap.MarketId && data.MarketName === this.props.sportsEvents.handicap.MarketName && data.MarketSpecifiers === this.props.sportsEvents.handicap.MarketSpecifiers && data.event_id === this.props.sportsEvents.event_id) > -1 ? 
                                                            ( this.props.sportsEvents.handicap.MarketStatus !== "Active" ? {color : 'black' , background : '#0cd664'} : {background : '#0cd664'})
                                                            : 
                                                            ( this.props.sportsEvents.handicap.MarketStatus !== "Active" ? {color : 'black'} : {} )
                                                        )}>
                                                        {isNaN(this.props.sportsEvents.handicap.two.OutcomeOdds) ? "Lock" : this.props.sportsEvents.handicap.two.OutcomeOdds}
                                                    </div> : <div> Lock </div>
                                                }
                                            </div>
                                            <div>
                                                {
                                                    this.props.sportsEvents.total.one || this.props.sportsEvents.EventStatus === "Finished" ?
                                                    <div onClick={(e)=>this.setOdds(this.props.sportsEvents.total , this.props.sportsEvents.total.one)}
                                                        style = {(this.props.sportsSidebarData.data.findIndex( data => data.OutcomeId === this.props.sportsEvents.total.one.OutcomeId && data.OutcomeName === this.props.sportsEvents.total.one.OutcomeName && data.MarketId === this.props.sportsEvents.total.MarketId && data.MarketName === this.props.sportsEvents.total.MarketName && data.MarketSpecifiers === this.props.sportsEvents.total.MarketSpecifiers && data.event_id === this.props.sportsEvents.event_id) > -1 ? 
                                                            ( this.props.sportsEvents.total.MarketStatus !== "Active" ? {color : 'black' , background : '#0cd664'} : {background : '#0cd664'})
                                                            : 
                                                            ( this.props.sportsEvents.total.MarketStatus !== "Active" ? {color : 'black'} : {} )
                                                        )}>
                                                        {isNaN(this.props.sportsEvents.total.one.OutcomeOdds) ? "Lock" : this.props.sportsEvents.total.one.OutcomeOdds}
                                                    </div> : <div> Lock </div>                                                
                                                }
                                                {
                                                    this.props.sportsEvents.total.two || this.props.sportsEvents.EventStatus === "Finished" ?
                                                    <div onClick={(e)=>this.setOdds(this.props.sportsEvents.total , this.props.sportsEvents.total.two)}
                                                        style = {(this.props.sportsSidebarData.data.findIndex( data => data.OutcomeId === this.props.sportsEvents.total.two.OutcomeId && data.OutcomeName === this.props.sportsEvents.total.two.OutcomeName && data.MarketId === this.props.sportsEvents.total.MarketId && data.MarketName === this.props.sportsEvents.total.MarketName && data.MarketSpecifiers === this.props.sportsEvents.total.MarketSpecifiers && data.event_id === this.props.sportsEvents.event_id) > -1 ? 
                                                            ( this.props.sportsEvents.total.MarketStatus !== "Active" ? {color : 'black' , background : '#0cd664'} : {background : '#0cd664'})
                                                            : 
                                                            ( this.props.sportsEvents.total.MarketStatus !== "Active" ? {color : 'black'} : {} )
                                                        )}>
                                                        {isNaN(this.props.sportsEvents.total.two.OutcomeOdds) ? "Lock" : this.props.sportsEvents.total.two.OutcomeOdds}
                                                    </div> : <div> Lock </div>
                                                }
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div className='sports-other-markets'>{this.props.sportsEvents.market ? this.props.sportsEvents.market.length : 0}</div>
                            </Row>
                        }
                    </React.Fragment>
                )}
            </Media>
        )
    }
}

const mapStateToProps = (state) => ({
    sportsSidebarData : state.sports.sportsSidebarData
})

const mapDispatchToProps = {
    setItem,
}

export default connect (mapStateToProps, mapDispatchToProps)(Sportsevents)