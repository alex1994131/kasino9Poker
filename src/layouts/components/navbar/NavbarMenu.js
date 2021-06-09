import React, { Component } from "react";
import {MDBNavbar, MDBNavbarBrand,} from "mdbreact";
import {Dropdown,Button,DropdownMenu,DropdownItem,DropdownToggle,} from "reactstrap"
import { Link } from "react-router-dom"
import UserLogin from "../../auth/Login"
import UserRegister from "../../auth/Register"
import {logoutWithJWT,menuload} from "../../../redux/actions/auth/loginActions"
import {getSession,is_session} from "../../../redux/actions/auth/index"
import {get_odds_ , currentSelectedGame , get_sports_lists ,updateSportsSidebar} from "../../../redux/actions/sports/index";
import { connect } from "react-redux"
import avatar from "../../../assets/avatar.png"
import 'mdbreact/dist/css/mdb.css'
import {Root} from "../../../authServices/rootconfig"
import {history} from "../../../history"
import {get_userinfor} from "../../../redux/actions/auth/ProfileActions"
import Clock from "./Clock"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const handleNavigation = (e, path) => {
    e.preventDefault()
    history.push(path)
  }

class NavbarPage extends Component {

    state={
        langDropdown: false,
        users : {},
        isAuthenticated : false,
        dropclassname : "header-dropdown-user nav-item dropdown",
        dropdownclass : "header-user-dropdown-menu dropdown-menu",
        bal : {balance : 0}
    }

    logout = () => {
        this.props.logoutWithJWT();
    }
    
    async componentDidMount() {
        if(is_session()){
            var user = await getSession();
            await this.setState({users : user,isAuthenticated : true});
            await this.props.get_userinfor(user.email);    
        }
        window.addEventListener('resize', this.handleResize, false);
        setTimeout(() => {
            if(Root.socket){
                Root.socket.on("broadcast" , (data) => {
                    if(!data.data.permission) return;
                    var allOddData = this.props.real_all_matchs;
                    var sport_list = this.props.sport_list;
                    var currentSelected = this.props.currentSelected;
                    var betSideBar = this.props.sportsSidebarData;
                    var selectedSport = this.props.current_selected_sport
                    
                    var currentPage = history.location.pathname.split("/")[1];
                    var eventData = data.data;
                    var EventStatus = ""

                    if(eventData.sportid && currentPage !== "sportsevent"){
                        if(currentPage === "sports") {
                            EventStatus = "All"
                        }
                        if(currentPage === "Inplay"){
                            EventStatus = "Live";
                        }
                        if(currentPage === "Upcoming"){
                            EventStatus = "NotStarted";
                        }
                        if(sport_list.findIndex(data => data.sport_id === eventData.sportid) < 0){
                            this.props.get_sports_lists(EventStatus);
                        }
                    }
                    
                    switch(data.key){
                        case "fixturechange":
                            var fixtureOddFlag = allOddData.findIndex(data => data.event_id === eventData.event_id);
                            if(fixtureOddFlag > -1){
                                allOddData[fixtureOddFlag].event_name = eventData.event_name;
                                allOddData[fixtureOddFlag].ScheduledTime = eventData.ScheduledTime;
                                allOddData[fixtureOddFlag].EventStatus = eventData.EventStatus;
                                allOddData[fixtureOddFlag].Status = eventData.Status;
                                allOddData[fixtureOddFlag].Venue = eventData.Venue;
                                allOddData[fixtureOddFlag].HomeCompetitor = eventData.HomeCompetitor;
                                allOddData[fixtureOddFlag].AwayCompetitor = eventData.AwayCompetitor;
                                allOddData[fixtureOddFlag].Season = eventData.Season;
                                this.props.get_odds_(allOddData);
                            }else if(selectedSport.sport_id === eventData.sportid && EventStatus === eventData.EventStatus){
                                allOddData.push(eventData);
                                this.props.get_odds_(allOddData);
                            }
                            
                            if(currentSelected.event_id === eventData.event_id){
                                currentSelected.EventStatus = eventData.EventStatus;
                                this.props.currentSelectedGame(currentSelected);
                            }
                            
                            var betFixtureOddFlag = false;
                            for(var fixBet_i = 0 ; fixBet_i < betSideBar.data.length ; fixBet_i ++){
                                if(betSideBar.data[fixBet_i].event_id === eventData.event_id){
                                    betSideBar.data[fixBet_i].EventStatus = eventData.EventStatus;
                                    if(eventData.EventStatus === "Suspended" || eventData.EventStatus === "Finished"){
                                        betSideBar.data[fixBet_i].message = "This market is " + eventData.EventStatus;
                                    }
                                    betFixtureOddFlag = true;
                                }
                            }
                            if(betFixtureOddFlag){
                                this.props.updateSportsSidebar(betSideBar);
                            }
                            break;
                            
                            case "oddschange":
                                var OddFlag = allOddData.findIndex(data => data.event_id === eventData.event_id);
                                if(OddFlag > -1){
                                    allOddData[OddFlag].event_name = eventData.event_name;
                                    allOddData[OddFlag].ScheduledTime = eventData.ScheduledTime;
                                    allOddData[OddFlag].EventStatus = eventData.EventStatus;
                                    allOddData[OddFlag].Status = eventData.Status;
                                    allOddData[OddFlag].Venue = eventData.Venue;
                                    allOddData[OddFlag].HomeCompetitor = eventData.HomeCompetitor;
                                    allOddData[OddFlag].AwayCompetitor = eventData.AwayCompetitor;
                                    allOddData[OddFlag].Season = eventData.Season;
                                    allOddData[OddFlag].market = eventData.market;
                                    this.props.get_odds_(allOddData);
                                }else if(selectedSport.sport_id === eventData.sportid && EventStatus === eventData.EventStatus){
                                    allOddData.push(eventData);
                                    this.props.get_odds_(allOddData);
                                }
                            if(currentSelected.event_id === eventData.event_id){
                                currentSelected.EventStatus = eventData.EventStatus;
                                this.props.currentSelectedGame(currentSelected);
                            }

                            var betOddFlag = false;
                            for(var oddsBet_i = 0 ; oddsBet_i < betSideBar.data.length ; oddsBet_i ++){
                                if(betSideBar.data[oddsBet_i].event_id === eventData.event_id){
                                    betSideBar.data[oddsBet_i].EventStatus = eventData.EventStatus;
                                    if(eventData.MarketStatus === "Suspended" || eventData.EventStatus === "Finished"){
                                        betSideBar.data[oddsBet_i].message = "This market is " + eventData.EventStatus;
                                    }
                                    if(betSideBar.data[oddsBet_i].message && eventData.MarketStatus !== "Suspended" && eventData.EventStatus !== "Finished"){
                                        betSideBar.data[oddsBet_i].message = "";
                                    }
                                    betOddFlag = true;
                                    if(eventData.market && eventData.market.length){
                                        for(var mak_i = 0 ; mak_i < eventData.market.length ; mak_i ++){
                                            for(var odd_j = 0 ; odd_j < eventData.market[mak_i].Outcomes.length ; odd_j ++){
                                                if(betSideBar.data[oddsBet_i].OutcomeId === eventData.market[mak_i].Outcomes[odd_j].OutcomeId && 
                                                    betSideBar.data[oddsBet_i].OutcomeName === eventData.market[mak_i].Outcomes[odd_j].OutcomeName && 
                                                    betSideBar.data[oddsBet_i].MarketId === eventData.market[mak_i].MarketId && 
                                                    betSideBar.data[oddsBet_i].MarketName === eventData.market[mak_i].MarketName && 
                                                    betSideBar.data[oddsBet_i].MarketSpecifiers === eventData.market[mak_i].MarketSpecifiers &&
                                                    betSideBar.data[oddsBet_i].OutcomeOdds !== eventData.market[mak_i].Outcomes[odd_j].OutcomeOdds){
                                                        betSideBar.data[oddsBet_i].OutcomeOdds_ = eventData.market[mak_i].Outcomes[odd_j].OutcomeOdds;
                                                        betSideBar.data[oddsBet_i].MarketStatus = eventData.market[mak_i].MarketStatus;
                                                        betSideBar.oddsChange = true;
                                                    }
                                            }
                                        }
                                    }
                                }
                            }
                            if(betOddFlag){
                                this.props.updateSportsSidebar(betSideBar);
                            }
                            break;

                        case "betstop":
                            var betStopFlag = allOddData.findIndex(data => data.event_id === eventData.event_id);
                            if(betStopFlag > -1){
                                allOddData[betStopFlag].market = eventData.market;
                                this.props.get_odds_(allOddData);
                            }
                            if(currentSelected){
                                if(currentSelected.event_id === eventData.event_id){
                                    currentSelected.market = eventData.market;
                                    this.props.currentSelectedGame(currentSelected);
                                }
                            }
                            for(var stopBet_i = 0 ; stopBet_i < betSideBar.data.length ; stopBet_i ++){
                                if(betSideBar.data[stopBet_i].event_id === eventData.event_id){
                                    betSideBar.data[stopBet_i].MarketStatus = "Suspended";
                                    betSideBar.data[stopBet_i].message = "This market is Suspended";
                                    betStopFlag = true;
                                }
                            }
                            if(betStopFlag){
                                this.props.updateSportsSidebar(betSideBar);
                            }
                            break;

                        case "betsettlement":
                            var tempData = [];
                            var settlementFlag = false;
                            var betSettlementFlag = false;
                            for(var l = 0 ; l < allOddData.length ; l ++){
                                if(allOddData[l].event_id !== eventData.event_id){
                                   tempData.push(allOddData[l]);
                                }else{
                                    settlementFlag = true;
                                }
                            }
                            if(settlementFlag){
                                this.props.get_odds_(tempData);
                            }
                            if(currentSelected){
                                if(currentSelected.event_id === eventData.event_id){
                                    currentSelected.EventStatus = "Finished";
                                    this.props.currentSelectedGame(currentSelected);
                                }
                            }
                            for(var setBet_i = 0 ; setBet_i < betSideBar.data.length ; setBet_i ++){
                                if(betSideBar.data[setBet_i].event_id === eventData.event_id){
                                    betSideBar.data[setBet_i].EventStatus = "Finished";
                                    betSideBar.data[setBet_i].message = "This market is Finished";
                                    betSettlementFlag = true;
                                }
                            }
                            if(betSettlementFlag){
                                this.props.updateSportsSidebar(betSideBar);
                            }
                            break;
                        default :
                            break;
                    }
                })
            }    
        } , 5000)
    }

    handleLangDropdown = () =>{
        this.setState({ langDropdown: !this.state.langDropdown })
    }

    async componentDidUpdate(prevProps, prevState){

        if(!this.props.user.values)
        {
            if(prevState.isAuthenticated === true){
                this.setState({isAuthenticated : false});
            }
        }else{
            if(prevState.isAuthenticated === false){
                this.setState({isAuthenticated : true});
            }
        }
        if(prevProps.user.values !== this.props.user.values){
            await this.setState({users : this.props.user.profile_user});
        }

        if(prevState.bal !== this.props.bal){
            await this.setState({bal : this.props.bal});
        }
    }

render(){
    const guestLinks = (
        <div style={{display:"flex"}}>
            <div className="header-user-info" id="usersinfor">
                <Button color="warning" onClick={()=>history.push("/mywallet/deposit")} >Deposit</Button>
                <div className="header-user-balance">
                    <h5>{this.state.bal ?isNaN(Number(this.state.bal.balance + this.state.bal.bonusbalance).toFixed(2) ) ? 0 :Number(this.state.bal.balance + this.state.bal.bonusbalance).toFixed(2)  + " INR":""}</h5>
                </div>
            </div>

            <Dropdown
                tag="li"
                className="dropdown-language nav-item "
                style={{listStyle : "none"}}
                isOpen={this.state.langDropdown}
                toggle={this.handleLangDropdown}
                onMouseEnter={this.handleLangDropdown}
                onMouseLeave={this.handleLangDropdown}
                data-tour="language"
              >
                <DropdownToggle
                  tag="a"
                     className="nav-link"
                     
                    onClick={e => handleNavigation(e, "/myprofile/profile-info")}
                    style={{overflow: 'hidden',
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"}}
                >
                    {
                        this.props.user.profile_user && this.props.user.profile_user.avatar ? (
                            <img src={Root.imageurl +this.props.user.profile_user.avatar} style={{width:"40px", borderRadius:'50%'}} alt=''/> 
                        ):(
                            <img src={avatar} style={{width:"40px", borderRadius:'50%'}} alt=''/>  
                        ) 
                    }
                </DropdownToggle>
                <DropdownMenu right className="user-dropdown-menu p-0">
                <DropdownItem
                style={{overflow:"hidden",whiteSpace:'nowrap',textOverflow:'ellipsis'}}
                    tag="a"
                    href="#" 
                    onClick={e => handleNavigation(e, "/myprofile/profile-info")}
                >
                    {
                        this.props.user.profile_user  ? (
                            <span  className="align-middle">{this.props.user.profile_user.firstname + " " + this.props.user.profile_user.lastname}</span>
                        ):(
                            <span>&nbsp;</span>
                        )
                    }
                </DropdownItem>
                    <DropdownItem
                        tag="a"
                        href="#"
                        onClick={e => handleNavigation(e, "/mywallet/deposit")}
                    >
                        <span className="align-middle">My Wallet</span>
                    </DropdownItem>
                    <DropdownItem
                        tag="a"
                        href="#"
                        onClick={e => handleNavigation(e, "/myprofile/profile-info")}
                    >
                        <span className="align-middle">My Profile</span>
                    </DropdownItem>
                    <DropdownItem
                        tag="a"
                        href="#"
                        onClick={e => handleNavigation(e, "/Mybets/casinos")}
                    >
                        <span className="align-middle">My Bets</span>
                    </DropdownItem>
                    <DropdownItem
                        tag="a"
                        href="#"
                        onClick={e => handleNavigation(e, "/Bonuses/casinos")}
                    >
                        <span className="align-middle">Bonuses</span>
                    </DropdownItem>
                    <DropdownItem
                        tag="a"
                        href="#"
                        onClick={e => handleNavigation(e, "/Messages/messages")}
                    >
                        <span className="align-middle">Messages</span>
                    </DropdownItem>
                    <DropdownItem className="border-bottom-0"
                        tag="div"
                        onClick={()=>this.logout()}
                    >
                        <span className="align-middle">Log Out</span>
                    </DropdownItem>
                </DropdownMenu>
              </Dropdown>
        </div>
      )
    return (
      <div>
        <MDBNavbar className="header-nav-bar" color="indigo"  expand="md" style={{background:"#1d184e !important"}}>
            <MDBNavbarBrand className="header-nav-bar-brand">
                <Link to="/">
                {this.props.firstpagesettinglogoimg ?(
                        <LazyLoadImage
                            alt='logo'
                            style={{width:'170px'}}
                            effect="blur"
                            src ={Root.imageurl + this.props.firstpagesettinglogoimg.content}
                        />
                    ):null}
                    {
                        this.props.firstpagesettinglogoimg ? 
                        (()=> {
                            let link = document.querySelector('link[rel="shortcut icon"]') ||
                            document.querySelector('link[rel="icon"]');
    
                            if (!link) {
                                link = document.createElement('link');
                                link.id = 'favicon';
                                link.rel = 'shortcut icon';
                                document.head.appendChild(link);
                            }
    
                            link.href = Root.imageurl + this.props.firstpagesettinglogoimg.content;
                        })():null
                    }
                </Link>
            </MDBNavbarBrand>
            <div className="header-nav-bar-user imtem-center">
            <Clock />
                <>
                {
                    (()=> {
                        if(this.state.isAuthenticated){
                            return guestLinks;
                        }else{  
                            return <UserLogin /> 
                        }
                    })()
                }
                {
                    (()=> {
                        if(!this.state.isAuthenticated){
                            return <UserRegister />
                        }
                    })()
                }
                </>
            </div>
        </MDBNavbar>
      </div>
    );
  }
}

const getusers = (state) => {
    return {
        real_all_matchs : state.sports.all_matchs_save,
        sport_list : state.sports.sports_list,
        sportsSidebarData : state.sports.sportsSidebarData,
        currentSelected : state.sports.currentSelectedGame,
        current_selected_sport : state.sports.current_selected_sport,
        current_tap : state.sports.current_tap,

        user : state.auth.login,
        bal : state.balance.value,
        firstpagesettinglogoimg : state.auth.login.firstpagesettinglogoimg,
    }
}

export default connect(getusers,{
    logoutWithJWT,
    menuload,
    get_userinfor, 
    get_odds_,
    currentSelectedGame,
    get_sports_lists,
    updateSportsSidebar,
})(NavbarPage);