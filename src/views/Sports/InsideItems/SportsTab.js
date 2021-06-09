import React from "react"
import SportsBet from "./SportsBet"
import Swiper from "react-id-swiper"
import Media from 'react-media';
import { Button, Row } from "reactstrap";
import { ChevronRight } from "react-feather";
import {TapChange , get_odds} from "../../../redux/actions/sports/index";
import { connect } from "react-redux"
import sportConfig from "../../../configs/sportsconfig"
import {history} from "../../../history"

const params = {
	spaceBetween: 60,
	centeredSlides: true,
	autoplay: {
	  delay: 5000,
	  disableOnInteraction: false
	},
	pagination: {
	  el: ".swiper-pagination",
	  clickable: true
	},
}

class SportsTab extends React.Component {

    state = {
        page : ""
    }

    componentDidMount(){
        var currentPage = history.location.pathname.split("/")[1];
        this.setState({page : currentPage});
    }

    activeTab = async (Item) => {
        await this.props.TapChange(Item);
        var sendData = {
            sportid : this.props.current_selected_sport.sport_id,
            EventStatus : Item.EventStatus
        }
        this.props.get_odds(sendData);
    }

    render() {
        return(
            <div style={{height:'calc(100% - 105px)', marginBottom:'15px'}}>
                {this.props.current_selected_sport.sport_id && this.props.current_tap.EventStatus !== "News" ? (
                    <>
                    <div className='pt-2 sports-background1' style={{borderRadius:'25px 25px 0px 0px'}}>
                        <div className='sports-tab-title'>
                            <svg style={{color:this.props.current_selected_sport.color, margin:'1.2rem'}} width="22" height="22" viewBox={this.props.current_selected_sport.viewBox}>
                                <path d={this.props.current_selected_sport.icon} fill="currentColor"/>
                            </svg>
                            <span>{this.props.current_selected_sport.sport_name}
                                {this.props.current_tap ? " : "+this.props.current_tap.title : ''}
                            </span>
                        </div>
                        {
                            this.state.page === "sports" ? (
                                sportConfig.tab ? sportConfig.tab.map ((Item, i)=>(
                                    <div 
                                        key={i}
                                        className={
                                            'p-0 pl-1 pr-1 children-tab ' + 
                                            (Item.index === this.props.current_tap.index ? 'children-tab-active':'')
                                        }
                                        onClick = {()=>this.activeTab(Item)}
                                    >
                                        {Item.title}
                                        <div className='mr-auto ml-auto' style={{marginTop:'3px'}}></div>
                                    </div>
                                )):null
                            ) : ""
                        }
                    </div>
                    <div className='sports-featured-back'>
                        <span className='sports-featured-home'>Home &nbsp;&nbsp;&nbsp;<ChevronRight size={15} />&nbsp;&nbsp;&nbsp;</span>
                        <span className='sports-featured-active-button'>{"All " + this.props.current_selected_sport.sport_name + " League"}</span>
                    </div>
                    <div className='sports-event'>
                        {
                            this.props.all_matchs ? this.props.all_matchs.map((sportsBetItem, i)=>(
                                <SportsBet key={i} sportsBetItem={sportsBetItem}/>
                            )):null
                        }
                    </div>
                    </>
                ):(
                    <>
                    <div className='pt-2 pb-2 sports-background' style={{height:'100%', overflow:'auto'}}>
                        <Media queries={{
                            small: "(max-width: 1219px)",
                            medium: "(min-width: 1220px) and (max-width: 1499px)",
                            large: "(min-width: 1500px)"
                            }}>
                            {matches => (
                                <React.Fragment>
                                {matches.small && 
                                    <div id='sports-slider' style={{margin:'auto',padding:'10px'}}>
                                        <Swiper {...params}>
                                            {
                                                sportConfig.firstPageImage.map((item, i) => (
                                                    <div key={i}>
                                                        <img src={item} alt="swiper 1" className="img-fluid" />
                                                    </div>
                                                ))
                                            }
                                        </Swiper>
                                    </div>
                                }
                                {matches.medium && 
                                    <div id='sports-slider' style={{width:'auto',margin:'auto'}}>
                                        <Swiper {...params}>
                                            {
                                                sportConfig.firstPageImage.map((item, i) => (
                                                    <div key={i}>
                                                        <Row>
                                                            <div className='sports-background1' style={{width:'45%'}}>
                                                                <div className='p-2 pl-4'>
                                                                    <h4>Brett Lee's Weekly Casino Cashback</h4>
                                                                    <p>Sportsbet.io has got you covered with up to 250,000 INR weekly cashback on your net Casino losses with Brett Lee's special Weekly Casino Cashback.</p>
                                                                    <Button className='sports-read-me'>Read more</Button>
                                                                </div>
                                                            </div>
                                                            <div style={{width:'55%'}}>
                                                                <img src={item} alt="swiper 1" className="img-fluid" />
                                                            </div>
                                                        </Row>
                                                    </div>
                                                ))
                                            }
                                        </Swiper>
                                    </div>
                                }
                                {matches.large &&
                                    <div id='sports-slider' style={{width:'auto', margin:'auto'}}>
                                        <Swiper {...params}>
                                            {
                                                sportConfig.firstPageImage.map((item, i) => (
                                                    <div key={i}>
                                                        <Row>
                                                            <div className='sports-background1' style={{width:'40%'}}>
                                                                <div className='p-5'>
                                                                    <h3>Brett Lee's Weekly Casino Cashback</h3>
                                                                    <p className='mt-2' style={{lineHeight:'2'}}>Sportsbet.io has got you covered with up to 250,000 INR weekly cashback on your net Casino losses with Brett Lee's special Weekly Casino Cashback.</p>
                                                                    <Button className='sports-read-me'>Read more</Button>
                                                                </div>
                                                            </div>
                                                            <div style={{width:'60%'}}>
                                                                <img src={item} alt="swiper 1" className="img-fluid" />
                                                            </div>
                                                        </Row>
                                                    </div>
                                                ))
                                            }
                                        </Swiper>
                                    </div>
                                }
                                </React.Fragment>
                            )}
                        </Media>
                    </div>
                    </>
                )}
            </div>
        )
    }
}

const load_fp_data = (state) => {
    return {
        current_selected_sport : state.sports.current_selected_sport,
        current_tap : state.sports.current_tap,
        all_matchs : state.sports.all_matchs
	}
}

const mapDispatchToProps = {
    TapChange,
    get_odds
}

export default connect(load_fp_data,mapDispatchToProps)(SportsTab)