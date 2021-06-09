import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row , Col , Input , Button} from "reactstrap"
import { get_bet_history , get_all_sports_list } from "../../../redux/actions/sports/index"
import sportsConfig from "../../../configs/sportsconfig";
import History from "./history"

export class Events extends Component {

    state = {
        selectId : 1,
        betId : ""
    }

    async componentDidMount(){
        if(this.props.user){
            var sendData = {
                user : this.props.user._id,
                selectId : this.state.selectId
            }
            await this.props.get_all_sports_list();
            this.props.get_bet_history(sendData);
        }
    }

    tabChange(item){
        this.setState({selectId : item.index})
        var sendData = {
            user : this.props.user._id,
            selectId : item.index
        }
        this.props.get_bet_history(sendData);
    }

    search(){
        var sendData = {
            user : this.props.user._id,
        }
        if(this.state.betId){
            sendData.betId = this.state.betId
        }else{
            sendData.selectId = 3
        }
        this.props.get_bet_history(sendData);
    }

    render() {
        return (
            <div className='sports-events'>
                <Row className = "mr-1">
                    <Col lg="6" md="6" sm="6">
                        <Row className="pl-1">
                            {
                                sportsConfig.historytab.map( (item , id) => (
                                    <div key={id} onClick = {() => this.tabChange(item)} style = {{float : 'left' , width: '15%' , textAlign: 'center'}}>
                                        <div className='sports-events-title' 
                                            style = { this.state.selectId === item.index ? { color : "#0dd884" , borderBottom : "3px solid rgb(13, 216, 132)" } : {}}
                                        >{item.title}</div>
                                    </div>
                                ))
                            }                            
                        </Row>
                    </Col>
                </Row>
                {
                    this.state.selectId === 3 ? 
                        <Row className = "p-2" style = {{background : "#102226" , borderRadius : '2vh' , marginTop : '-3px'}}>
                            <Col lg='4' md='4' sm='6' xs='12' style ={{float : 'right'}}>
                                <Input onChange = {(e) => this.setState({betId : e.target.value})} style = {{color : 'white' , opacity : "1" , textAlign : 'center',border: '2px solid'}} placeholder="Please Input Bet Id" />
                            </Col>
                            <Button className='sports-read-me' onClick = {()=>this.search()}> Search </Button>
                        </Row> : ""
                }
                <Row className = "p-2" style = {{background : "#102226" , borderRadius : '2vh' , marginTop : '-3px'}}>
                    {
                        this.props.bet_history_list.length ? (
                            this.props.bet_history_list.map((item , id) => (
                                <History selectId={this.state.selectId} key={id} data = {item} id={id} all_sports_list={this.props.all_sports_list} />
                            ))
                        ) : <div style = {{color : 'white'}}>There are not exist any bets.</div>
                    }
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user : state.auth.login.values,
        bet_history_list : state.sports.bet_history_list,
        all_sports_list : state.sports.all_sports_list
    }
}

const mapDispatchToProps = {
    get_bet_history , get_all_sports_list
}

export default connect(mapStateToProps, mapDispatchToProps )(Events)
