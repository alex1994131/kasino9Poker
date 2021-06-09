import React from "react"
import { Link } from "react-router-dom";
import * as Icon from "react-feather"
import { Row, Col } from "reactstrap"
import GameProvider from "./GameProvider"
import { connect } from "react-redux"
import {Root} from "../../../authServices/rootconfig"
import Media from "react-media";


class Footer extends React.Component {

    constructor() {
        super();
        this.state = {
          messageList: [
            {type: 'text', author: 'them', data: { text: "How are you?"} },
           
          ],
          newMessagesCount: 1,
          isOpen: false
        };
      }

      _onMessageWasSent(message) {
        this.setState({
          messageList: [...this.state.messageList, message]
        });
      }
    
      _onFilesSelected(fileList) {
        const objectURL = window.URL.createObjectURL(fileList[0]);
        this.setState({
          messageList: [...this.state.messageList, {
            type: 'file', author: 'me',
            data: {
              url: objectURL,
              fileName: fileList[0].name
            }
          }]
        });
      }
    
      _sendMessage(text) {
        if (text.length > 0) {
          const newMessagesCount = this.state.isOpen ? this.state.newMessagesCount : this.state.newMessagesCount + 1;
          this.setState({
            newMessagesCount: newMessagesCount,
            messageList: [...this.state.messageList, {
              author: 'them',
              type: 'text',
              data: { text }
            }]
          });
        }
      }
    
      _handleClick() {
        this.setState({
          isOpen: !this.state.isOpen,
          newMessagesCount: 0
        });
      }

      componentDidMount(){
       
      }

    render() {

    return (

      <Media 
        queries={{
            Mobile : "(max-width: 767px)",
            Tablet : "(min-width: 769px)",
            Desktop : "(min-width: 992px)"
        }}>
        {matches => (
            <footer>
              {matches.Mobile && 
                <></>
              }
              {matches.Tablet && 
              <>
                <Row>
                  <Col xs="12" md="12" sm="12" lg="12" className="footer-gameprovider-slider mb-1 w-100 ">
                    <GameProvider />
                  </Col>
                  <Col xs="12" md="12" sm="12" lg="12" className="footer-paymentmethod mb-1 w-100 ">
                    <h4>Payment Methods</h4>
                    <div className="paymentmethods-imgs">
                      {
                        !this.props.FirstpagePaymentMethodImg ? "" : this.props.FirstpagePaymentMethodImg.map((item,i) => (
                          <img src={Root.imageurl + item.image} alt={item.image} key={i} />
                        ))
                      }
                      </div>
                    </Col>
                    <Col xs="12" sm="12" md="3" lg="3" className="mb-1">
                      <div className="footer-logo mb-1">
                        <img src={!this.props.firstpagesettinglogoimg ? "" :Root.imageurl + this.props.firstpagesettinglogoimg.content} alt="logo" />
                      </div>
                      <div className="footer-logo-text">
                        {
                          !this.props.title ? '' : this.props.title.content 
                        }                          
                      </div>
                    </Col>
                    <Col xs="6" sm="6" md="3" lg="3" className="footer-menu mb-1">
                      <ul className="ul-list">
                        <li className="ul-list-item"><h4>MENU</h4></li>
                        {
                          !this.props.navigationConfig ? "" :this.props.navigationConfig.map((item,i) => (
                          <li className="ul-list-item" key={i}><Link to={item.navLink}>{item.title}</Link></li>
                          ))
                        }
                      </ul>
                    </Col>
                    <Col xs="6" sm="6" md="3" lg="3" className="footer-menu mb-1">
                      <ul className="ul-list">
                        <li className="ul-list-item"><h4>QUICK LINKS</h4></li>
                        {
                          !this.props.quickdata ? "" :this.props.quickdata.map((item,i) => (
                          <li className="ul-list-item" key={i}>
                            <Link className="Social-icon" to={item.navLink}>
                              {item.title}
                            </Link>
                          </li>                            
                          ))
                        }
                      </ul>
                    </Col>
                    <Col xs="12" sm="12" md="3" lg="3" className="mb-1">
                      <div className="footer-socials-feed">
                        <h4>GET IN TOUCH</h4>
                        {
                          !this.props.socialdata ? "" :this.props.socialdata.map((item,i) => (
                            <a className="Social-icon" key={i} href={item.navLink}  target="_blank" rel="noopener noreferrer" >
                              {
                                <SocialIcon data = {item}/>
                              }
                            </a>
                          ))
                        }
                      </div>
                    </Col>
                    <Col xs="12" md="12" sm="12" lg="12">
                      {
                        !this.props.footertext ? '' : this.props.footertext.content 
                      }
                    </Col>
                    </Row>
                  <div id='footer-hidden'/>
                </>              
              }
           </footer>
        )}
      </Media>
    )
}
}

const SocialIcon = ({data}) => {
  switch(data.icon){
    case "facebook" :
      return <Icon.Facebook color={'gray'} size={20}/>
    case "instagram" :
      return <Icon.Instagram color={'gray'} size={20}/>
    case "twitter" :
      return <Icon.Twitter color={'gray'} size={20}/>
    default :
      return <div/>
  }
}

const mapstops = (state)=>{
    return {
      navigationConfig : state.auth.login.menuload,
      firstpagesettinglogoimg : state.auth.login.firstpagesettinglogoimg,
      FirstpagePaymentMethodImg : state.auth.login.FirstpagePaymentMethodImg,
      title : state.auth.login.title,
      footertext : state.auth.login.footertext,
      socialdata : state.auth.login.socialdata,
      quickdata : state.auth.login.quickdata,
      favicon : state.auth.login.favicon,
      newstext : state.auth.login.newstext,

    }
}

export default connect(mapstops,{})(Footer)