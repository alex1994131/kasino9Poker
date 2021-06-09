import React from "react"
import { Row, Col, Input,Button} from "reactstrap"
import { connect } from "react-redux";
import {providerchange,gametypechange,filterData,data_load} from "../../redux/actions/livecasino/livecasino" 
import {setloginpage,virtualgames_images,playsaccount,playsaccountguest} from "../../redux/actions/auth/loginActions"
import VirtualSportsItems from "../Casino/CasinoItems"
import {Search} from "react-feather"
import {Root} from "../../authServices/rootconfig"
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/scale-out-animation.css';
// import SelectSearch from 'react-select-search';
import {providerconfig} from "../../configs/providerConfig"
import Select from "react-select"
import MultiSelect from "react-multi-select-component";

const AutoplaySlider = withAutoplay(AwesomeSlider);

class VirtualSports extends React.Component {
    static getDerivedStateFromProps(props, state) {
        if (props.dataList.data.length !== state.data.length || props.allData !== props.dataList.filteredData) {
            return {
            data: props.dataList.data,
            allData: props.dataList.filteredData,
        }
      }
      return null;
    }
    state = {
        livecasinoitems : [],
        index : 1,
        data: [],
        allData: [],
        value: "",
        bool : false
    }

    gameplay = () =>{
        if(!this.props.user.values){
            this.props.setloginpage({login : true, register : false});
        }else{
            this.props.playsaccount({email :this.props.user.values.email,},{gameType : "Roulette"})
        }
    }

    componentDidMount(){
        this.props.virtualgames_images();
        this.props.data_load(providerconfig.VIRTUALGAMES)
        window.addEventListener('scroll', this.listenToScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.listenToScroll)
    }
    
    listenToScroll = () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll+350) / height;
        if(scrolled>=1){
            this.setState({index : this.state.index+1});
        }
    }

  

    handleFilter(e){
        this.setState({ value: e.target.value,index : 1 })
        this.props.filterData(e.target.value);

    }

    
    play = (item) =>{
        if(!this.props.user.values){
          this.props.setloginpage({login : true, register : false});
        }else{
          this.props.playsaccount(this.props.user.values,item.gamedata,true);
        }
      }

    render() {
        let {
            data,
            allData,
            value
        } = this.state
        let indata=value.length ? allData.slice(0,this.state.index*24) : data.slice(0,this.state.index*24);
        if(this.state.bool === false && this.state.index*24 > indata.length){
            this.setState({bool : true});
        }
        return(
            <React.Fragment>
                <Row className="fp-header p-0 m-0 w-100 ">
                    <Col lg="12" md="12" className="p-0 m-0 w-100">
                        <div className="fp-header-image p-0 m-0 w-100">
                            {/* <video autoplay="" controls  loop={true} muted="" playsinline="" data-uk-cover="" class="uk-cover" style={{width:"100vw"}}>
                                <source src="https://goldenrace.com/video/virtual-sports.webm" type="video/webm"/>
                                <source src="https://goldenrace.com/video/virtual-sports.mp4" type="video/mp4"/>
                                </video> */}
                            {
                                this.props.livecasinoSlider_images ?
                                (
                                    <AutoplaySlider
                                        play={true}
                                        cancelOnInteraction={false}
                                        interval={6000}
                                        fillParent={false}
                                        organicArrows={false}
                                        animation="scaleOutAnimation"
                                        bullets={true}
                                    >

									{
										this.props.livecasinoSlider_images.map((item, i) => (
											<div className='livecasinopage-sliber-text' key={i} data-src={Root.imageurl+item.image}>
                                                <div style={{zIndex:50}} className="fp-header-def">

                                            <div className="fp-header-def-c" style={{padding:'10px', top:'70%', right: '2vw'}}>
                                            <Button color="success" onClick={()=>this.play(item.data)}>&nbsp;Play&nbsp;Now</Button>
                                            </div>
                                            </div>
											</div>
										))
									}
								</AutoplaySlider>
                                ):(
                                    <div/>								
                                )
                            }
                        </div>
                           
                    </Col>
                </Row> 
                 <Row className="p-0 m-0 mt-1 w-100" >
                    <Col  md="3" sm="12">
                    </Col>

                    
                    <Col  md="3" sm="12">
                         <div className="React casino-game-show-select m-1 ml-1">
                            <Search size={18} style={{    position: 'absolute',top: '1.6rem',marginLeft:"0.5rem"}} /> 
                            <Input  type="text" name="livecasino-game-search" style={{borderColor: '#18480c',border: '1px solid #d9d9d9',paddingLeft:"2.5rem"}} onChange={e => this.handleFilter(e)} />
                        </div>
                    </Col>
                    <Col  md="3" sm="12">
                      <div className="React casino-game-show-select m-1">
                      <Select
                        options={this.props.types} 
                        placeholder="GAME TYPES"
                        value={this.props.types.find(obj => obj.value === this.props.settype.value)}
                        onChange={(e)=>this.props.gametypechange(e.value)}
                          className="React"
                          classNamePrefix="select"
                        />                       
                      </div>
                    </Col>
                    <Col  md="3" sm="12">
                      <div className="React casino-game-show-select m-1">
                      <MultiSelect
                        options={this.props.provider}
                        className="multi-select"
                        classNamePrefix="select"
                        selectAllLabel="ALL PROVIDER"
                        hasSelectAll="All"
                        shouldToggleOnHover={true}
                        value={this.props.setprovider}
                        focusSearchOnOpen={true}
                        onChange={(e)=>this.props.providerchange(e)}
                        labelledBy={"Select Provider"}
                      />
                      
                      </div>
                    </Col>
                </Row>
                <div style={{minHeight:"25rem"}}>                
                    <Row className="p-0 m-0   w-100" >
                        {
                            indata.length > 0 ?
                            indata.map((item,i) => (
                                <VirtualSportsItems key={i} data={item} me={this.props} />
                            )) : 
                        <div ></div>
                        }
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}

const get_game  = (state) =>{
    return { 
        user : state.auth.login,
        livecasinoSlider_images : state.auth.login.virtual_images,
        dataList: state.livecasinolist,
        provider : state.livecasinolist.providerData,
        types : state.livecasinolist.types,
        settype : state.livecasinolist.settype,
        setprovider : state.livecasinolist.setprovider
    }
}

export default connect(get_game,{playsaccount,setloginpage,providerchange,gametypechange,filterData,data_load,playsaccountguest,virtualgames_images})(VirtualSports)