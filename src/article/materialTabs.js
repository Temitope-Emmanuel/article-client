import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles,withStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import {Tab,TextField,Button} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import useInputState from "../hook/inputState"
import Markdown from "markdown-to-jsx"
import CreateIcon from '@material-ui/icons/Create';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {blueGrey,deepPurple} from "@material-ui/core/colors"
import ArticleDialog from "./articleDialog"
import {AlertContext} from "../MainRouter"

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
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
  const StyledTabs = withStyles({
    indicator: {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      position:"absolute",
      top:"0",
      '& > span': {
        maxWidth: 40,
        width: '100%',
        backgroundColor: deepPurple["A700"],
      },
    },
  })((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);
  
  const StyledTab = withStyles((theme) => ({
    root: {
      textTransform: 'none',
      color: blueGrey["A200"],
      fontWeight: theme.typography.fontWeightRegular,
      backgroundColor: 'black',
      fontSize: theme.typography.pxToRem(15),
      '&:focus': {
        opacity: 1,
      },
    },
  }))((props) => <Tab disableRipple {...props} />);

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "60vw",
    marginTop:"2em"
  },
  tabContainer:{
      height:"61vh !important",
    },
    previewContainer:{
        height:"61vh !important",
        "& > div":{
            display:"flex",
            flexDirection:"column",
            height:"98%",
            padding:theme.spacing(.5),
            "& > p":{
                alignSelf: "flex-end",
                justifySelf: "flex-end",
                width:"100%",
                height:"100%",
                display:"flex",
                flexDirection:"column",
                "& > button":{
                    padding:".7em 2.7em",
                    alignSelf:"flex-end"
                }
            }
        }
    },
    preview:{
        width:"100%",
        height:"90%"
    }
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [open,setOpen] = React.useState(false)
  const [text,setText,resetText] = useInputState("")

  const handleToggle = () => {
    setOpen(!open)
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleText = (e) => {
      setText(e)
  }

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <>
    <AlertContext.Consumer>
      {(context) => (
        <ArticleDialog open={open} handleAlert={context.handleAlert} article={text} handleToggle={handleToggle} />
      )}
    </AlertContext.Consumer>
    <Paper elevation={5} className={classes.root}>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel className={classes.tabContainer} value={value} index={0} dir={theme.direction}>
            <TextField required 
                id="Input Text" label="Write markdown to create article"
                value={text} multiline rows={10}
                onChange={handleText} variant="outlined"
                style={{margin:"3em 0"}} fullWidth
                margin="dense"
            />
        </TabPanel>
        <TabPanel className={classes.previewContainer} value={value} index={1} dir={theme.direction}>
            <Box className={classes.preview}>
                <Markdown>{text}</Markdown>
            </Box>
            <Button onClick={handleToggle} style={{backgroundColor:"black",color:blueGrey[500],marginTop:"auto"}} >Submit</Button>
        </TabPanel>
      </SwipeableViews>
        <AppBar position="relative" centered color="default">
            <StyledTabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
            >
            <StyledTab icon={<CreateIcon/>} label="New Article" {...a11yProps(0)} />
            <StyledTab icon={<VisibilityIcon/>} label="Preview" {...a11yProps(1)} />
            </StyledTabs>
        </AppBar>
    </Paper>
    </>
  );
}
