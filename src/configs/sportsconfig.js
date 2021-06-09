import React from "react"
import { Icon } from "@iconify/react"
import tvIcon from '@iconify/icons-entypo/tv';
import bxsCalendar from '@iconify/icons-bx/bxs-calendar';
import lifeRing from '@iconify/icons-fa-solid/life-ring';
import diceD20 from '@iconify/icons-fa-solid/dice-d20';
import outlineSportsSoccer from '@iconify/icons-ic/outline-sports-soccer';
import starFilled from '@iconify/icons-ant-design/star-filled';
import chatAlt from '@iconify/icons-heroicons-outline/chat-alt';
import helpBuoySharp from '@iconify/icons-ion/help-buoy-sharp';
import aboutIcon from '@iconify/icons-flat-color-icons/about';
import newspaperIcon from '@iconify/icons-bi/newspaper';
import uservoiceIcon from '@iconify/icons-logos/uservoice';

const sportsconfig = {
  data : [
    {
      id: "Sports",
      title: "Sports",
      type: "item",
      icon: <Icon icon={outlineSportsSoccer} width="22" height="22" />,
      navLink: "/sports",
    },
    {
      id: "Inplay",
      title: "Inplay",
      type: "item",
      icon: <Icon icon={tvIcon} width="20" height="20" />,
      navLink: "/Inplay",
    },
    {
      id: "Upcoming",
      title: "Upcoming",
      type: "item",
      icon: <Icon icon={bxsCalendar} width="20" height="20" />,
      navLink: "/Upcoming",
    },
    {
      type: "line",
    },
    {
      id: "Casino",
      title: "Casino",
      type: "item",
      icon: <Icon icon={lifeRing} width="20" height="20" />,
      navLink: "/casino",
    },
    {
      id: "Live Casino",
      title: "Live Casino",
      type: "item",
      icon: <Icon icon={diceD20} width="20" height="20" />,
      navLink: "/live-casino",
    },
    {
      type: "line",
    },
    {
      id: "Clubhouse",
      title: "Clubhouse",
      type: "item",
      icon: <Icon icon={starFilled} width="20" height="20" />,
      navLink: "/Clubhouse",
    },
    {
      type: "line",
    },
    {
      id: "Horse racing",
      title: "Horse racing",
      type: "item",
      icon: <Icon icon={starFilled} width="20" height="20" />,
      navLink: "/Horse-racing",
    },
    {
      id: "Virtual sports",
      title: "Virtual sports",
      type: "item",
      icon: <Icon icon={starFilled} width="20" height="20" />,
      navLink: "/Virtual-sports",
    },
    {
      id: "Sports Guru",
      title: "Sports Guru",
      type: "item",
      icon: <Icon icon={starFilled} width="20" height="20" />,
      navLink: "/Sports-Guru",
    },
    {
      type: "line",
    },
    {
      id: "Live Chat",
      title: "Live Chat",
      type: "item",
      icon: <Icon icon={chatAlt} width="20" height="20" />,
      navLink: "/Live-Chat",
    },
    {
      id: "Help centre",
      title: "Help centre",
      type: "item",
      icon: <Icon icon={helpBuoySharp} width="20" height="20" />,
      navLink: "/Help-centre",
    },
    {
      id: "Promotions",
      title: "Promotions",
      type: "item",
      icon: <Icon icon={uservoiceIcon} width="20" height="20" />,
      navLink: "/Promotions",
    },
    {
      id: "About",
      title: "About",
      type: "item",
      icon: <Icon icon={aboutIcon} width="20" height="20" />,
      navLink: "/About",
    },
    {
      id: "News",
      title: "News",
      type: "item",
      icon: <Icon icon={newspaperIcon} width="20" height="20" />,
      navLink: "/News",
    },
  ],
  // topBetMatch : {
  //   color:'rgb(10, 183, 88)',
  //   icon: "M1.705 6.337l2.839 2.767a.542.542 0 01.155.48l-.67 3.906 3.508-1.845a.542.542 0 01.505 0l3.508 1.845-.67-3.907a.542.542 0 01.155-.479l2.839-2.767-3.923-.57a.54.54 0 01-.407-.296L7.79 1.917 6.035 5.47a.54.54 0 01-.408.296l-3.922.57zm10.564 8.684a.545.545 0 01-.252-.062L7.79 12.736 3.562 14.96a.543.543 0 01-.786-.57l.808-4.708-3.42-3.334a.54.54 0 01.3-.924l4.726-.687L7.304.453a.542.542 0 01.971 0l2.114 4.283 4.726.687a.54.54 0 01.3.924l-3.42 3.334.807 4.707a.541.541 0 01-.533.633z",
  //   viewBox:'0 0 20 20',
  //   sport_id: "sr:sport:0",
  //   sport_name: "Top-Bet Matchs",
  // },
  tab : [
    {
        index : 1,
        title : 'Live Bets',
        EventStatus : "Live"
      },
      {
        index : 2,
        title : 'Prematch Bets',
        EventStatus : "NotStarted"
      },
      {
        index : 3,
        title : 'Top-Bet Matchs',
        EventStatus : "TopBet"
      },
      {
        index : 4,
        title : 'Next 24hrs',
        EventStatus : "Next24"
      },
      {
        index : 5,
        title : 'Lengues',
        EventStatus : "All"
      },
      {
        index : 6,
        title : 'News',
        EventStatus : "News"
    },
  ],
  firstPageImage : [
    'https://sportsbet.imgix.net/India/GeneralBrettLee.jpg?w=1200&auto=compress,enhance,format',
    'https://sportsbet.imgix.net/Promotions/Sports/2020/Sportsbet_promo_1800x800_EuropeSoccer.jpg?auto=compress,enhance,format',
    'https://sportsbet.imgix.net/Promotions/Sports/2020/Sportsbet_GeneralMultimaster_promo_1800x800.jpg?auto=compress,enhance,format'
  ],
  historytab : [
    {
      index : 1,
      title : 'Active Bet',
    },
    {
      index : 2,
      title : 'Settled Bet',
    },
    {
      index : 3,
      title : 'Search Bet Id',
    },
  ],
  weekday : [
    { id : 0 , name : "Sunday"},
    { id : 1 , name : "Monday"},
    { id : 2 , name : "Tuesday"},
    { id : 3 , name : "Wednesday"},
    { id : 4 , name : "Thursday"},
    { id : 5 , name : "Friday"},
    { id : 6 , name : "Saturday"}
  ]
}

export default sportsconfig;