import React from "react"
import { ChevronDown, ChevronRight } from "react-feather";
import { Col, Row } from "reactstrap";
import Sportsevents from "./Sportsevents";
import { connect } from "react-redux"


class SportsBet extends React.Component {

    constructor(props){
        super(props)
        this.state={
            isopen:false,
        }
    }
  
    IsOpen () {
        this.setState({isopen: !this.state.isopen});
    }

    render() {
        const sportsBetItem = this.props.sportsBetItem;
        return(
            <div>
                <Row onClick={()=>this.IsOpen()} className={ this.state.isopen ? 'sports-country-active':'sports-country' } >
                    <Col sm={10} xs={10} className='sports-country-title' style={{marginLeft:'-10px'}}>
                        <div> { this.state.isopen ? <ChevronDown size={20}/>: <ChevronRight size={20}/> }</div>
                        <div className='sports-country-name'>{sportsBetItem.name}</div>
                    </Col>
                    <Col sm={2} xs={2} className='sports-country-length'>
                        { sportsBetItem.data ? sportsBetItem.data.length : 0 }
                    </Col>
                </Row>
                {
                    this.state.isopen ?(
                        <div className='sports-events-all'>
                            <Row>
                                <Col xs={6}></Col>
                                <Col xs={6}>
                                    <Row>
                                        <Col style={{textAlign:'center' , color : "white"}} xs={3}> 1 X 2 </Col>
                                        <Col style={{textAlign:'center' , color : "white"}} xs={4}> HANDICAP </Col>
                                        <Col style={{textAlign:'center' , color : "white"}} xs={4}> TOTAL </Col>
                                        <Col style={{textAlign:'center' , color : "white"}} xs={1}></Col>
                                    </Row>
                                </Col>
                            </Row>
                            {
                                sportsBetItem.data ? sportsBetItem.data.map((sportsEvents, i)=>(
                                    <Sportsevents key={i} sportsEvents={sportsEvents}/>
                                )):""
                            }
                        </div>
                    ):null
                }
            </div>
        )
    }
}

const load_fp_data = (state) => {
    return {
        current_selected_sport : state.sports.current_selected_sport,
	}
}

export default connect(load_fp_data,{})(SportsBet)