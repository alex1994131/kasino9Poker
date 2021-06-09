import React from "react"
import { connect } from "react-redux"
import { FormGroup, Input ,Row,Col,Button} from "reactstrap"
import { Search } from "react-feather"
import {get_sports_lists,get_odds,current_select_sport,remove_all_match} from "../../../redux/actions/sports"
import SportsTab from '../InsideItems/SportsTab';
import { history } from "../../../history"
    
class Sports extends React.Component{

    state = { value : "" }

    componentDidMount(){
        this.props.get_sports_lists("Live");
        this.props.remove_all_match();
    }

    position(Item){
        this.props.current_select_sport(Item);
        var sendData = {
            sportid : Item.sport_id,
            EventStatus : "Live"
        }
        console.log(sendData)
        this.props.get_odds(sendData);
    }

    render(){
        return(
            <div className='sports-background height-100'>
                {
                    this.props.user ? 
                        <Row>
                            <Col lg='10' md='9' sm='8' xs='12'>
                                <FormGroup className="position-relative has-icon-left">
                                    <Input type="text" className="round" placeholder='Search' value={this.state.value} onChange={e => this.setState({ value: e.target.value })} />
                                    <div className="form-control-position px-1">
                                        <Search size={15} />
                                    </div>
                                </FormGroup>                    
                            </Col>
                            <Col>
                                <Button onClick = {() => history.push("bethistory")} className='sports-read-me' style = {{width : '100%'}}> Bet History </Button>
                            </Col>
                        </Row>
                         : 
                         <FormGroup className="position-relative has-icon-left">
                            <Input type="text" className="round" placeholder='Search' value={this.state.value} onChange={e => this.setState({ value: e.target.value })} />
                            <div className="form-control-position px-1">
                                <Search size={15} />
                            </div>
                        </FormGroup>
                }
                <div className = "overflow-auto">
                    <div className = "sport-1">
                        {this.props.sport_list && this.props.sport_list.length > 0 ? this.props.sport_list.map( (Item,i) => (
                            <div key={i} onClick={()=>this.position(Item)} className = "sport-2">
                                {
                                    Item.sport_id === this.props.current_selected_sport.sport_id ? ( <div className='sports-tab-active-background'></div> ) : null
                                }
                                <div className='sports-tab-background sport-3'>
                                    <svg style={{color:Item.color, margin:'1.2rem'}} width="22" height="22" viewBox={Item.viewBox}>
                                        <path d={Item.icon} fill="currentColor"/>
                                    </svg>
                                </div>
                                <div className={Item.sport_id === this.state.id ? 'sport-4 font-color-2':'sport-4 font-color-1'}>
                                    {Item.sport_name}
                                </div>
                            </div>
                        )) : null}
                    </div>
                </div>
                <SportsTab />
            </div>
        )
    }
}

const load_fp_data = (state) => {
	return {
        sport_list : state.sports.sports_list,
        current_selected_sport : state.sports.current_selected_sport,
        user : state.auth.login.values,
        current_tap : state.sports.current_tap
	}
}

const mapDispatchToProps = {
    get_sports_lists,
    get_odds,
    current_select_sport,
    remove_all_match
}

export default connect(load_fp_data,mapDispatchToProps)(Sports)