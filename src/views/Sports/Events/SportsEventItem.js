import React from "react"
import { ChevronDown, ChevronRight } from "react-feather";
import { connect } from "react-redux";
import { Col, Row } from "reactstrap";
import { setItem } from '../../../redux/actions/sports';
 
class SportsEventItem extends React.Component {

    constructor(props){
        super(props)
        this.state={
            isopen:false,
            id:0,
        }
    }
  
    IsOpen () {
        this.setState({isopen: !this.state.isopen});
    }

    sportsEventsItems(e){
        this.props.setItem(Object.assign({}, e, this.props.team, this.props.Item));
    }

    render() {
        const Item = this.props.Item;
        return(
            <div>
                <Row
                    onClick={()=>this.IsOpen()}
                    className={
                        '' + 
                        (this.state.isopen ? 'sports-country-active':'sports-country')}
                >
                    <Col sm='12' className='sports-country-title' style={{display:'flex', justifyContent:'space-between'}}>
                        <div className='sports-country-name' >
                            {Item.MarketSpecifiers !== "" ? Item.MarketName + " (" + Item.MarketSpecifiers + ") " : Item.MarketName}
                        </div>
                        <div>
                            {
                                Item.MarketStatus?(
                                    this.state.isopen ?
                                    <ChevronDown size={20}/>:
                                    <ChevronRight size={20}/>
                                ) : <p></p>
                            }
                        </div>
                    </Col>
                </Row>
                {
                    this.state.isopen?(
                        <Row className='p-1'>
                            {Item.Outcomes ? Item.Outcomes.map((eventItem, index)=>(
                                <React.Fragment key={index}>
                                    {
                                        Item.Outcomes.length > 0 ? (
                                            Item.Outcomes.length===3?(
                                                <Col>
                                                    {isNaN(eventItem.OutcomeOdds) ? <div className={'sports-events-items'}>Lock</div> : 
                                                        <div 
                                                            onClick={()=>this.sportsEventsItems(eventItem)} 
                                                            className={'sports-events-items'+(this.props.sportsSidebarData.data.findIndex(
                                                                data => data.OutcomeId === eventItem.OutcomeId && 
                                                                data.OutcomeName === eventItem.OutcomeName &&
                                                                data.MarketId === Item.MarketId && 
                                                                data.MarketName === Item.MarketName && 
                                                                data.MarketSpecifiers === Item.MarketSpecifiers &&
                                                                data.event_id === this.props.team.event_id
                                                            )>-1?' sports-events-items-active':'')}>
                                                            <span 
                                                                className='OutcomeName'
                                                                style = {Item.MarketStatus !== "Active" ? {color : 'black'} : {}}
                                                                >{eventItem.OutcomeName}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            <span 
                                                                className='OutcomeOdds'
                                                                style = {Item.MarketStatus !== "Active" ? {color : 'black'} : {}}
                                                                >{eventItem.OutcomeOdds}</span>
                                                        </div>
                                                    }
                                                </Col>
                                            ):(
                                                <Col sm='6'>
                                                    {isNaN(eventItem.OutcomeOdds) ? <div className={'sports-events-items'}>Lock</div> : 
                                                        <div 
                                                            onClick={()=>this.sportsEventsItems(eventItem)} 
                                                            className={'sports-events-items'+(this.props.sportsSidebarData.data.findIndex(
                                                                data => data.OutcomeId === eventItem.OutcomeId && 
                                                                data.OutcomeName === eventItem.OutcomeName &&
                                                                data.MarketId === Item.MarketId && 
                                                                data.MarketName === Item.MarketName && 
                                                                data.MarketSpecifiers === Item.MarketSpecifiers &&
                                                                data.event_id === this.props.team.event_id
                                                            )>-1?' sports-events-items-active':'')}>
                                                            <span 
                                                                className='OutcomeName'
                                                                style = {Item.MarketStatus !== "Active" ? {color : 'black'} : {}}
                                                            >{eventItem.OutcomeName}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            <span 
                                                                className='OutcomeOdds'
                                                                style = {Item.MarketStatus !== "Active" ? {color : 'black'} : {}}
                                                            >{eventItem.OutcomeOdds}</span>
                                                        </div>
                                                    }
                                                </Col>
                                            )
                                        ) : ""
                                    }
                                </React.Fragment>
                            )):null}
                        </Row>
                    ):null
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        sportsSidebarData : state.sports.sportsSidebarData
    }
}

const mapDispatchToProps = {
    setItem,
}

export default connect (mapStateToProps, mapDispatchToProps)(SportsEventItem)
