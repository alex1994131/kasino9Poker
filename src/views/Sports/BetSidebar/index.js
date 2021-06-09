import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Col, Input, Row ,FormGroup, Label} from "reactstrap"
import { TrendingUp } from "react-feather"
import { 
    removeItem, 
    removeAllItem , 
    placeBet , 
    updateSportsSidebar,
    changeBetType,
    setItem
} from "../../../redux/actions/sports"
import { ChevronDown, ChevronRight , Plus} from "react-feather";
import {toast} from "react-toastify";
import Select from "react-select"

 class BetSidebar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            active : 'single',
            isopen : true,
            smartBetFlag : false,
            multiAmount : 0,
            priceBoost : false,

            matchData : [{value : "" , label : "Please select Match"}],
            marketData : [{value : "" , label : "Please select Market"}],
            OddsData : [{value : "" , label : "Please select Odd"}],

            smartMatchId: "",
            smartMarketId: "",
            smartOddId: "",
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.all_matchs !== this.props.all_matchs){
            var setData = [];
            for(var i = 0 ; i < this.props.all_matchs.length ; i ++){
                var temp = {
                    value : this.props.all_matchs[i].event_id,
                    label : this.props.all_matchs[i].event_id.split(":")[2]
                }
                setData.push(temp);
            }
            this.setState({matchData : setData});
        }
    }

    bet(){
        var betData = this.props.sportsSidebarData;
        var sendData = { user : this.props.user._id };
        if(this.state.active === "single"){
            var data = this.props.sportsSidebarData.data;
            for(var i = 0 ; i <data.length ;i ++){
                if( !data[i].amount || data[i].amount < 5){
                    toast.error("The minimum bet is 5 INR.");
                    return;
                }
                if(data[i].MarketStatus === "Suspended"){
                    toast.warn("There are exist not allowed market!")
                    return;
                } 
                if(data[i].EventStatus === "Finished"){
                    toast.warn("There are exist not allowed market!")
                    return;
                } 
                data[i].MatchName = data[i].AwayCompetitor.Name + " - " + data[i].HomeCompetitor.Name
                data[i].priceBoost = data[i].priceBoost ? data[i].priceBoost : false
            }
            sendData.betType = "SINGLE";
            sendData.bet = data;
            sendData.allAmount = betData.totalMoney;
        }
        else{
            if(this.state.multiAmount < 5){
                toast.error("The Bet Minimum Amount is 5 INR.");
                return;
            }
            sendData.betType = "MULTI";
            var bet = [];
            for(var j = 0 ; j < this.props.sportsSidebarData.data.length ; j ++){
                if(this.props.sportsSidebarData.data[j].MarketStatus === "Suspended"){
                    toast.warn("There are exist not allowed market!")
                    return;
                } 
                if(this.props.sportsSidebarData.data[j].EventStatus === "Finished"){
                    toast.warn("There are exist not allowed market!")
                    return;
                }
                var temp = {
                    event_id : this.props.sportsSidebarData.data[j].event_id,
                    OutcomeId : this.props.sportsSidebarData.data[j].OutcomeId,
                    OutcomeName : this.props.sportsSidebarData.data[j].OutcomeName,
                    OutcomeOdds : this.props.sportsSidebarData.data[j].OutcomeOdds,
                    MarketId : this.props.sportsSidebarData.data[j].MarketId,
                    MarketSpecifiers : this.props.sportsSidebarData.data[j].MarketSpecifiers,
                    MarketName : this.props.sportsSidebarData.data[j].MarketName,
                    sportid : this.props.sportsSidebarData.data[j].sportid,
                    amount : this.state.multiAmount,
                    MatchName : this.props.sportsSidebarData.data[j].AwayCompetitor.Name + " - " + this.props.sportsSidebarData.data[j].HomeCompetitor.Name,
                    priceBoost : this.props.sportsSidebarData.data[j].priceBoost ? this.props.sportsSidebarData.data[j].priceBoost : false
                }
                bet.push(temp);
                if(this.props.sportsSidebarData.data[j].MarketStatus === "Suspended"){
                    toast.warn("There are exist not allowed market!")
                    return;
                } 
                if(this.props.sportsSidebarData.data[j].EventStatus === "Finished"){
                    toast.warn("There are exist not allowed market!")
                    return;
                }
            }
            sendData.bet = bet;
            sendData.allAmount = this.state.multiAmount;
            this.setState({multiAmount : 0})
        }
        sendData.betId = this.props.betId;
        console.log(sendData);
        this.props.placeBet(sendData);
    }

    updateOdds(){
        var betData = this.props.sportsSidebarData;
        for(var bet_i = 0 ; bet_i < betData.data.length ; bet_i ++){
            betData.totalOdds = (parseFloat(betData.totalOdds) - parseFloat(betData.data[bet_i].OutcomeOdds) + parseFloat(betData.data[bet_i].OutcomeOdds_)).toFixed(2);
            if(betData.data[bet_i].amount){
                if(this.state.active === "single"){
                    betData.totalStack = (parseFloat(betData.totalStack) - 
                        parseFloat(betData.data[bet_i].OutcomeOdds) * parseFloat(betData.data[bet_i].amount) + 
                        parseFloat(betData.data[bet_i].OutcomeOdds_) * parseFloat(betData.data[bet_i].amount)).toFixed(2);
                }else{
                    betData.totalStack = (parseFloat(betData.totalStack) / 
                        parseFloat(betData.data[bet_i].OutcomeOdds) * 
                        parseFloat(betData.data[bet_i].OutcomeOdds_)).toFixed(2);                    
                }
            }
            if(betData.data[bet_i].OutcomeOdds_){
                if(betData.data[bet_i].priceBoost){
                    betData.data[bet_i].OutcomeOdds = parseFloat(betData.data[bet_i].OutcomeOdds_) + 0.05;
                }else{
                    betData.data[bet_i].OutcomeOdds = betData.data[bet_i].OutcomeOdds_;
                }
                betData.data[bet_i].OutcomeOdds_ = null;
            }
        }
        betData.oddsChange = false;
        this.props.updateSportsSidebar(betData);
    }

    changeAmount(item , value){
        var data = this.props.sportsSidebarData.data;
        var totalStack = 0;
        var totalOdds = 0;
        var totalMoney = 0;

        for(var i = 0 ; i < data.length ; i ++){
            if(data[i].OutcomeId === item.OutcomeId && 
                data[i].OutcomeName === item.OutcomeName && 
                data[i].MarketId === item.MarketId && 
                data[i].MarketName === item.MarketName && 
                data[i].MarketSpecifiers === item.MarketSpecifiers && 
                data[i].event_id === item.event_id){
                data[i].amount = value; 
            }
            if(data[i].amount){
                totalStack = (parseFloat(totalStack) + parseFloat(data[i].amount * data[i].OutcomeOdds)).toFixed(2);
                if(data[i].amount < 5) {
                    data[i].message = "The minimum bet amount is 5 INR.";
                }else{
                    totalMoney = (parseFloat(totalMoney) + parseFloat(data[i].amount)).toFixed(2);
                    data[i].message = "";
                }
            }
            totalOdds = (parseFloat(totalOdds) + parseFloat(data[i].OutcomeOdds)).toFixed(2);
        }

        let sendData = {
            data : data,
            totalStack : totalStack,
            totalOdds : totalOdds,
            totalMoney : totalMoney
        }

        this.props.updateSportsSidebar(sendData);
    }

    multiAmountChange(value){
        if(!value) value = 0
        this.setState({multiAmount : value});
        var data = this.props.sportsSidebarData.data;
        var totalStack = value;
        var totalOdds = 0;
        for(var i = 0 ; i < data.length ; i ++){
            totalStack = (parseFloat(totalStack) * parseFloat(data[i].OutcomeOdds)).toFixed(2);
            totalOdds = (parseFloat(totalOdds) + parseFloat(data[i].OutcomeOdds)).toFixed(2);
        }
        var sendData = {
            data : data,
            totalStack : totalStack,
            totalOdds : totalOdds,
            totalMoney : value,
            message : value < 5 ? "The minimum bet amount is 5 INR." : ""
        }
        this.props.updateSportsSidebar(sendData);
    }

    changeType(type){
        this.setState({active:type, isopen:true});
        this.props.changeBetType(type);
        var data = this.props.sportsSidebarData;
        var totalOdds = 0;
        if(type === "multi"){
            var totalStack = this.state.multiAmount;
            for(var i = 0 ; i < data.data.length ; i ++){
                totalOdds = (parseFloat(totalOdds) + parseFloat(data.data[i].OutcomeOdds)).toFixed(2)
                if(totalStack) totalStack = (parseFloat(totalStack) * parseFloat(data.data[i].OutcomeOdds)).toFixed(2)
            }
            data.totalStack = totalStack;
            data.totalOdds = totalOdds;
            data.totalMoney = this.state.multiAmount
        }else{
            var totalStack1 = 0;
            var totalMoney = 0;
            for(var j = 0 ; j < data.data.length ; j ++){
                totalStack1 = (parseFloat(totalStack1) + (parseFloat(data.data[j].amount) * parseFloat(data.data[j].OutcomeOdds))).toFixed(2);
                totalMoney = (parseFloat(totalMoney) + parseFloat(data.data[j].amount)).toFixed(2);
                totalOdds = (parseFloat(totalOdds) + parseFloat(data.data[j].OutcomeOdds)).toFixed(2);
            }
            data.totalStack = totalStack1
            data.totalMoney = totalMoney
            data.totalOdds = totalOdds
        }
        this.props.updateSportsSidebar(data);
    }

    changeSmartBetFlag(){
        this.setState({smartBetFlag : !this.state.smartBetFlag})
    }

    priceBoost(){
        this.setState({priceBoost : !this.state.priceBoost});
    }

    setPriceBoost(data){
        var betData = this.props.sportsSidebarData;
        var index = betData.data.findIndex(item => item.OutcomeId === data.OutcomeId && item.OutcomeName === data.OutcomeName && item.MarketId === data.MarketId && item.MarketName === data.MarketName && item.MarketSpecifiers === data.MarketSpecifiers && item.event_id === data.event_id );
        betData.data[index].OutcomeOdds = parseFloat(data.OutcomeOdds) + 0.05
        betData.data[index].priceBoost = true
        betData.priceBoost = true;
        this.props.updateSportsSidebar(betData);
        this.setState({priceBoost : false})
    }

    removePriceBoost(data){
        var betData = this.props.sportsSidebarData;
        var index = betData.data.findIndex(item => item.OutcomeId === data.OutcomeId && item.OutcomeName === data.OutcomeName && item.MarketId === data.MarketId && item.MarketName === data.MarketName && item.MarketSpecifiers === data.MarketSpecifiers && item.event_id === data.event_id );
        betData.data[index].OutcomeOdds = parseFloat(data.OutcomeOdds) - 0.05
        betData.data[index].priceBoost = false;
        betData.priceBoost = false;
        this.props.updateSportsSidebar(betData);
        this.setState({priceBoost : false})
    }
    
    matchChange(e){
        this.setState({smartMatchId : e});
        var index = this.props.all_matchs.findIndex(item => item.event_id === e);
        var market = [{value : "" , label : "Please Select Market"}];
        if(index >= -1){
            market = [];
            if(this.props.all_matchs[index].market && this.props.all_matchs[index].market.length){
                for(var i = 0 ; i < this.props.all_matchs[index].market.length ; i ++){
                    var temp = {
                        value : this.props.all_matchs[index].market[i].MarketId
                    }
                    if(this.props.all_matchs[index].market[i].MarketSpecifiers){
                        temp.label = this.props.all_matchs[index].market[i].MarketName + "(" + this.props.all_matchs[index].market[i].MarketSpecifiers + ")";
                    }else{
                        temp.label = this.props.all_matchs[index].market[i].MarketName;
                    }
                    market.push(temp);
                }
            }
        }
        this.setState({marketData : market})
    }

    changeMarket(e){
        this.setState({smartMarketId : e});
        var index = this.props.all_matchs.findIndex(item => item.event_id === this.state.smartMatchId);
        var index_ = this.props.all_matchs[index].market.findIndex(item => item.MarketId === e);
        var odd = [{value : "" , label : "Please Select Odds"}];
        if(this.props.all_matchs[index].market[index_].Outcomes && this.props.all_matchs[index].market[index_].Outcomes.length){
            odd = [];
            for(var i = 0 ; i < this.props.all_matchs[index].market[index_].Outcomes.length ; i ++){
                var temp = {
                    value : this.props.all_matchs[index].market[index_].Outcomes[i].OutcomeId,
                    label : this.props.all_matchs[index].market[index_].Outcomes[i].OutcomeName,
                }
                odd.push(temp);
            }
        }
        this.setState({OddsData : odd});
    }

    smartBet(){
        if(!this.state.smartMatchId || !this.state.smartMarketId || !this.state.smartOddId){
            toast.error("Please select correct odds.");
            return;
        }
        var match = this.props.all_matchs.findIndex(item => item.event_id === this.state.smartMatchId);
        var market = this.props.all_matchs[match].market.findIndex(item => item.MarketId === this.state.smartMarketId);
        var odd = this.props.all_matchs[match].market[market].Outcomes.findIndex(item => item.OutcomeId === this.state.smartOddId);
        this.props.setItem(Object.assign({}, this.props.all_matchs[match] , this.props.all_matchs[match].market[market] , this.props.all_matchs[match].market[market].Outcomes[odd]));
    }

    render() {
        return (
            this.props.sportsSidebarData.data && this.props.sportsSidebarData.data.length ? (
                <div className='sports-bet-sidebar'>
                    <div className='betslip'>
                        <div className='wrapper active u-bordercolor-piccolo'>
                            <ul className='betslip-tabs'>
                                <li className='tab' onClick={() => this.changeType('single')}>
                                    <div className={this.state.active==='single' ? 'active' :''}>Single
                                        <span className="amount">{this.props.sportsSidebarData.data ? this.props.sportsSidebarData.data.length : 0}</span>
                                    </div>
                                </li>
                                <li className='tab' onClick={() => this.changeType('multi')}>
                                    <div className={this.state.active==='multi' ? 'active' :''}>Multi
                                        <span className="amount">{this.props.sportsSidebarData.data ? this.props.sportsSidebarData.data.length : 0}</span>
                                    </div>
                                </li>
                                <li className='button'>
                                    <div onClick={()=>this.setState({isopen:!this.state.isopen})}>
                                        <svg fill="#fff" height="32" width="32" viewBox="0 0 512 512">
                                            {
                                                this.state.isopen?(
                                                    <path d="M507 205.8H5v100.4h502z"></path>
                                                ):(
                                                    <path d="M506.997 205.799H306.201V5H205.799v200.799H5.003v100.399h200.796V507h100.402V306.198h200.796z"></path>
                                                )
                                            }
                                        </svg>
                                    </div>
                                </li>
                            </ul>
                            {this.state.isopen?(
                                <>
                                    <Row onClick={()=>this.changeSmartBetFlag()} className={(this.state.smartBetFlag ? 'sports-country-active':'sports-country')}>
                                        <Col sm='12' className='sports-country-title' style={{display:'flex', justifyContent:'space-between'}}>
                                            <div className='sports-country-name' >
                                                SMART BET
                                            </div>
                                            <div>
                                                {
                                                    this.state.smartBetFlag ? <ChevronDown size={20}/> : <ChevronRight size={20}/>
                                                }
                                            </div>
                                        </Col>
                                    </Row>
                                    {
                                        this.state.smartBetFlag ? 
                                            <Row className='sports-country'>
                                                <Col lg='12' md='12' sm='12' xs='12'>
                                                    <FormGroup>
                                                        <Label for="STATUS"> Match Id </Label>
                                                        <Select
                                                            style={{border:'1px solid #7367f0'}}
                                                            className="React"
                                                            classNamePrefix="select"
                                                            options={this.state.matchData}
                                                            defaultValue={this.state.matchData[0]}
                                                            onChange={e => this.matchChange(e.value)}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg='12' md='12' sm='12' xs='12'>
                                                    <FormGroup>
                                                        <Label for="STATUS"> Market </Label>
                                                        <Select
                                                            style={{border:'1px solid #7367f0'}}
                                                            className="React"
                                                            classNamePrefix="select"
                                                            options={this.state.marketData}
                                                            defaultValue={this.state.marketData[0]}
                                                            onChange={e => this.changeMarket(e.value)}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg='12' md='12' sm='12' xs='12'>
                                                    <FormGroup>
                                                        <Label for="STATUS"> Odds </Label>
                                                        <Select
                                                            style={{border:'1px solid #7367f0'}}
                                                            className="React"
                                                            classNamePrefix="select"
                                                            options={this.state.OddsData}
                                                            defaultValue={this.state.OddsData[0]}
                                                            onChange={e => this.setState({smartOddId : e.value})}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg='11' md='11' sm='11' xs='11' className = "ml-1">
                                                    <Button
                                                        style={{float:'right' , color : 'white' , width : "100%"}}
                                                        className="add-new-btn ml-1 account_submit_btn"
                                                        color="primary"
                                                        onClick={() => this.smartBet()}
                                                        outline>
                                                        <Plus size={15} />
                                                        <span className="align-middle" color="primary" style = {{color : 'white'}}> Add Bet </span>
                                                    </Button>
                                                </Col>
                                            </Row>
                                             : ""
                                    }
                                    <Row className='p-1'>
                                        <Col md={12} className='pl-1 pr-1 btn-block w-100'>
                                            <Button.Ripple onClick = {() => this.priceBoost()} className="square" style={{width:'100%'}} outline color="info">
                                                <TrendingUp size={15}/><span>&nbsp;&nbsp;Price Boost</span>
                                            </Button.Ripple>
                                        </Col>
                                    </Row>
                                    <Row className='p-1'>
                                        <Col md={12} className='pl-1 pr-1 btn-block w-100'>
                                            <Input value={"Bet Id : " + this.props.betId } className='round' style = {{color : 'white' , opacity : "1" , textAlign : 'center'}} readOnly />
                                        </Col>
                                    </Row>
                                    <div className='scrolllock'>
                                    {
                                        this.state.active === 'single' ? (this.props.sportsSidebarData.data ? this.props.sportsSidebarData.data.map((item, i)=>(
                                            <div key={i} className='bets'>
                                                <div>
                                                    <div className='event'>
                                                        <div className='target'>
                                                            <div className="title">{item.AwayCompetitor.Name+' - '+item.HomeCompetitor.Name}</div>
                                                            <span className="animate">
                                                                <span>{item.event_id.split(":")[2]}</span>
                                                            </span>
                                                        </div>                                                        
                                                        <div className='type' style = {{color : 'white'}}>
                                                            {item.MarketName}
                                                        </div>
                                                        <div className='target'>
                                                            <div className="team">{item.OutcomeName}</div>
                                                            <span className="animate">
                                                                <span className="u-color-piccolo">{item.OutcomeOdds}</span>
                                                            </span>
                                                        </div>
                                                        <div className='BetInput jZDdQz'>
                                                            {
                                                                this.state.priceBoost ? 
                                                                    (
                                                                        this.props.sportsSidebarData.priceBoost ? 
                                                                            (
                                                                                item.priceBoost ? 
                                                                                    <Col md={12} className='pl-1 pr-1 btn-block w-100'>
                                                                                        <Button.Ripple onClick = {() => this.removePriceBoost(item)} className="square" style={{width:'100%'}} outline color="info">
                                                                                            <TrendingUp size={15}/><span>&nbsp;&nbsp;{"Remove to " + (parseFloat(item.OutcomeOdds) - 0.05)}</span>
                                                                                        </Button.Ripple>
                                                                                    </Col> : ""
                                                                            )
                                                                             : 
                                                                            <Col md={12} className='pl-1 pr-1 btn-block w-100'>
                                                                                <Button.Ripple onClick = {() => this.setPriceBoost(item)} className="square" style={{width:'100%'}} outline color="info">
                                                                                    <TrendingUp size={15}/><span>&nbsp;&nbsp;{"Price Boost to " + (parseFloat(item.OutcomeOdds) + 0.05)}</span>
                                                                                </Button.Ripple>
                                                                            </Col> 
                                                                            
                                                                    )
                                                                     : 
                                                                    <Input value = {item.amount ? item.amount : ""} onChange = {(e) => this.changeAmount(item , e.target.value)} className='round mt-1' id='input-statk' placeholder='Enter your stake' type='number' style={{textAlign:'right'}}/>                                                                    
                                                            }
                                                        </div>
                                                        <div className='event-footer mt-1' style={{display:'flex'}}>
                                                            <div className='remove u-color-piccolo' onClick={()=>this.props.removeItem(item)}>
                                                                Remove&nbsp;&nbsp;<b>×</b>
                                                            </div>
                                                            <div className='potentialwin' style = {{color : 'white'}}>
                                                                {"Potential win : "}
                                                                <span className="sum">&nbsp;{"INR "}
                                                                    <span className="numbers">{ item.amount ? parseFloat(item.amount * item.OutcomeOdds).toFixed(2) : 0.00}</span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className='event-footer mt-1' style={{display:'flex' , color : "red"}}>
                                                            <b>{item.message}</b>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )):null):(this.props.sportsSidebarData.data ? this.props.sportsSidebarData.data.map((item, i)=>(
                                            <>
                                                <div key={i} className='bets'>
                                                    <div>
                                                        <div className='event'>
                                                            <div className='title'>
                                                                {item.AwayCompetitor.Name+' - '+item.HomeCompetitor.Name}
                                                            </div>
                                                            <div className='type' style = {{color : 'white'}}>
                                                                {item.MarketName}
                                                            </div>
                                                            <div className='target'>
                                                                <div className="team">{item.OutcomeName}</div>
                                                                <span className="animate">
                                                                    <span className="u-color-piccolo">{item.OutcomeOdds}</span>
                                                                </span>
                                                            </div>
                                                            {
                                                                this.state.priceBoost ? 
                                                                    (
                                                                        this.props.sportsSidebarData.priceBoost ? 
                                                                            (
                                                                                item.priceBoost ? 
                                                                                    <Col md={12} className='pl-1 pr-1 btn-block w-100'>
                                                                                        <Button.Ripple onClick = {() => this.removePriceBoost(item)} className="square" style={{width:'100%'}} outline color="info">
                                                                                            <TrendingUp size={15}/><span>&nbsp;&nbsp;{"Remove to " + (parseFloat(item.OutcomeOdds) - 0.05)}</span>
                                                                                        </Button.Ripple>
                                                                                    </Col> : ""
                                                                            )
                                                                             : 
                                                                            <Col md={12} className='pl-1 pr-1 btn-block w-100'>
                                                                                <Button.Ripple onClick = {() => this.setPriceBoost(item)} className="square" style={{width:'100%'}} outline color="info">
                                                                                    <TrendingUp size={15}/><span>&nbsp;&nbsp;{"Price Boost to " + (parseFloat(item.OutcomeOdds) + 0.05)}</span>
                                                                                </Button.Ripple>
                                                                            </Col> 
                                                                            
                                                                    ) : "" 
                                                            }                                                            
                                                            <div className='event-footer mt-1' style={{display:'flex'}}>
                                                                <div className='remove u-color-piccolo'  onClick={()=>this.props.removeItem(item)}>
                                                                    Remove&nbsp;&nbsp;<b>×</b>
                                                                </div>
                                                            </div>
                                                            <div className='event-footer mt-1' style={{display:'flex' , color : "red"}}>
                                                                <b>{item.message}</b>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )):null)
                                    }
                                    {
                                        this.state.active !== 'single' ? (
                                            <div className='p-1' style={{borderTop: '1px solid #31373f'}}>
                                                <div className='lower'>
                                                    <Input value={this.state.multiAmount ? this.state.multiAmount : ""} onChange = {(e) => this.multiAmountChange(e.target.value)} className='round' id='input-statk' placeholder='Enter your stake' type='number' style={{textAlign:'right'}}/>
                                                </div>
                                                <div className='event-footer pt-1' style={{display:'flex'}}>
                                                    <div style={{display:'flex', justifyContent:'flex-start',color : 'white'}}>
                                                        Potential Winnings
                                                    </div>
                                                </div>
                                                <div className='event-footer pt-1' style={{display:'flex'}}>
                                                    <div style={{display:'flex', justifyContent:'flex-start',width: '80px' , color : 'white'}}>
                                                        Total stake:
                                                    </div>
                                                    <div className='potentialwin' style={{display:'flex', justifyContent:'flex-end',width: 'calc(100% - 80px)'}}>
                                                        <span className="sum"> {"INR "}
                                                            <span className="numbers">{this.props.sportsSidebarData.totalStack ? this.props.sportsSidebarData.totalStack : 0.00}</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className='event-footer pt-1' style={{display:'flex'}}>
                                                    <div style={{display:'flex', justifyContent:'flex-start',width: '80px' , color : 'white'}}>
                                                        Total Odds:
                                                    </div>
                                                    <div className='potentialwin' style={{display:'flex', justifyContent:'flex-end',width: 'calc(100% - 80px)'}}>
                                                        <span className="sum">
                                                            <span className="numbers">{this.props.sportsSidebarData.totalOdds ? this.props.sportsSidebarData.totalOdds : 0.00}</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className='event-footer mt-1' style={{display:'flex' , color : "red"}}>
                                                    <b>{this.props.sportsSidebarData.message}</b>
                                                </div>
                                                <Row>
                                                    <Col md={12} className='pt-1 pl-1 pr-1'>
                                                        {
                                                            this.props.user ? (
                                                                (this.props.balance && this.props.balance >= this.state.multiAmount) ? (
                                                                    this.props.sportsSidebarData.oddsChange ? (
                                                                        <Button 
                                                                            onClick = {()=>this.updateOdds()}  
                                                                            className="round btn-block" 
                                                                            color="success"> 
                                                                            {"Update Odds"}
                                                                        </Button>
                                                                    ) : (
                                                                        <Button 
                                                                            onClick = {()=>this.bet()}  
                                                                            className="round btn-block" 
                                                                            color="success"> 
                                                                            {this.state.multiAmount ? "Place Bet " + this.state.multiAmount + " INR": "Place Bet "}
                                                                        </Button> 
                                                                    )
                                                                ) : <Button 
                                                                        className="round btn-block" 
                                                                        color="success"> Deposit 
                                                                    </Button>
                                                            ) : <Button className="round btn-block" color="success"> Login </Button>                                                                
                                                        }
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={12} className='pt-1 pl-1 pr-1'>
                                                        <div onClick={()=>this.props.removeAllItem()} className='remove u-color-piccolo' style={{textAlign:'center', cursor:'pointer'}}>
                                                            Remove all bets&nbsp;&nbsp;×
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        ):(
                                            <div className='p-1' style={{borderTop: '1px solid #31373f'}}>
                                                <div className='event-footer' style={{display:'flex',}}>
                                                    <div style={{display:'flex', justifyContent:'flex-start',width: '80px' , color : 'white'}}>
                                                        Total stake :
                                                    </div>
                                                    <div className='potentialwin' style={{display:'flex', justifyContent:'flex-end',width: 'calc(100% - 80px)'}}>
                                                        <span className="sum"> {"INR "}
                                                            <span className="numbers">{this.props.sportsSidebarData.totalStack ? this.props.sportsSidebarData.totalStack : 0.00}</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className='event-footer' style={{display:'flex',}}>
                                                    <div style={{display:'flex', justifyContent:'flex-start',width: '80px' , color : 'white'}}>
                                                        Total Odds :
                                                    </div>
                                                    <div className='potentialwin' style={{display:'flex', justifyContent:'flex-end',width: 'calc(100% - 80px)'}}>
                                                        <span className="sum">
                                                            <span className="numbers">{this.props.sportsSidebarData.totalOdds ? this.props.sportsSidebarData.totalOdds : 0.00}</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <Row>
                                                    <Col md={12} className='pt-1 pl-1 pr-1'>
                                                        {
                                                            this.props.user ? (
                                                                this.props.balance && this.props.balance >= this.props.sportsSidebarData.totalMoney ? (
                                                                    this.props.sportsSidebarData.oddsChange ? (
                                                                        <Button
                                                                            onClick = {()=>this.updateOdds()}
                                                                            className="round btn-block"
                                                                            color="success">
                                                                            {"Update Odds"}
                                                                        </Button>
                                                                    ) : (
                                                                        <Button onClick = {()=>this.bet()} className="round btn-block" color="success">
                                                                            {this.props.sportsSidebarData.totalMoney ? "Place Bet " + this.props.sportsSidebarData.totalMoney + " INR": "Place Bet "}
                                                                        </Button>
                                                                    )
                                                                ) : <Button  className="round btn-block" color="success"> Deposit </Button>
                                                            ) : <Button className="round btn-block" color="success"> Login </Button>                                                                
                                                        }
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={12} className='pt-1 pl-1 pr-1'>
                                                        <div onClick={()=>this.props.removeAllItem()} className='remove u-color-piccolo' style={{textAlign:'center', cursor:'pointer'}}>
                                                            Remove all bets&nbsp;&nbsp;×
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        )
                                    }
                                    </div>
                                </>
                            ):null}
                        </div>
                    </div>
                </div>
            ):<div/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        sportsSidebarData : state.sports.sportsSidebarData,
        all_matchs : state.sports.all_matchs_save,
        balance : state.balance.value.balance,
        user : state.auth.login.values,
        betId : state.sports.betId
    }
}

const mapDispatchToProps = {
    removeItem,
    removeAllItem,
    placeBet,
    updateSportsSidebar,
    changeBetType,
    setItem
}

export default connect(mapStateToProps, mapDispatchToProps)(BetSidebar)