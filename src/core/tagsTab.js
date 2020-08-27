import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {deepPurple} from "@material-ui/core/colors"
import VirusIcon from '@material-ui/icons/AcUnit';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import AdbIcon from '@material-ui/icons/Adb';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import PetsIcon from '@material-ui/icons/Pets';
import HumanIcon from '@material-ui/icons/SupervisedUserCircle';
import HighlightSharpIcon from '@material-ui/icons/HighlightSharp';
import MoreIcon from '@material-ui/icons/MoreHorizSharp';
import StorageSharpIcon from '@material-ui/icons/StorageSharp';
import FinanceIcon from '@material-ui/icons/AttachMoneySharp';
import EnterTainmentIcon from '@material-ui/icons/TheatersSharp';
import SchoolIcon from '@material-ui/icons/SchoolSharp';

const StyledTabs = withStyles({
    indicator: {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      '& > span': {
        // maxWidth: 40,
        width: '55%',
        backgroundColor: deepPurple["A700"],
      },
    },
  })((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);
  

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  tabContainer:{
      "& .MuiTab-root":{
          color:deepPurple[400]
      },
      " & .Mui-selected":{
          color:deepPurple[900]
      }
  }
}));

const TabContainer = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [scrolling,setScrolling] = React.useState({
    scrolling:false,
    scrollTop:0
  })

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const onScroll = e => {
    setScrolling(curSt => ({
      scrollTop:e.target.documentElement.scrollTop,
      scrolling:e.target.documentElement.scrollTop > 100
    }))
  }
  React.useEffect(() => {
    window.addEventListener('scroll',onScroll)
    return function(){
      window.removeEventListener('scroll',onScroll)
    }
  },[])
  console.log(scrolling)
  return (
      <AppBar elevation={0} 
      style={{transition:"all .3s ease-in",top:0,backgroundColor:scrolling.scrolling ? "black" : "transparent"}} position="sticky">
        <StyledTabs
            className={classes.tabContainer}
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="#607d8b"
          textColor="#ffffff"
          aria-label="scrollable force tabs example"
        >
          <Tab label="Home" icon={<HomeIcon />} {...a11yProps(0)} />
          <Tab label="POPULAR" icon={<FavoriteIcon />} {...a11yProps(1)} />
          <Tab label="Momentum" icon={<WhatshotIcon />} {...a11yProps(2)} />
          <Tab label="CoronaVirus" icon={<VirusIcon />} {...a11yProps(3)} />
          <Tab label="SCHOOL" icon={<SchoolIcon />} {...a11yProps(4)} />
          <Tab label="TECHNOLOGY" icon={<AdbIcon />} {...a11yProps(5)} />
          <Tab label="GEN" icon={<FiberNewIcon />} {...a11yProps(6)} />
          <Tab label="ZORA" icon={<PetsIcon />} {...a11yProps(7)} />
          <Tab label="SOCIETY" icon={<HumanIcon />} {...a11yProps(9)} />
          <Tab label="FINANCE" icon={<FinanceIcon />} {...a11yProps(10)} />
          <Tab label="LEVEL" icon={<StorageSharpIcon />} {...a11yProps(11)} />
          <Tab label="ENTERTAINMENT" icon={<EnterTainmentIcon />} {...a11yProps(12)} />
          <Tab label="SHOPPING" icon={<ShoppingBasket />} {...a11yProps(13)} />
          <Tab label="MORE" icon={<MoreIcon />} {...a11yProps(14)} />
        </StyledTabs>
      </AppBar>
);
}


export default TabContainer