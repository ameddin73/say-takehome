import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SubredditContainer from "./components/subredditContainer";
import {withStyles} from "@material-ui/styles";

const styles = {
    logo: {
        width: "40px",
        height: "40px",
        marginRight: "0px",
        marginLeft: "auto",
        cursor: "pointer",
    },
}

function App(props) {
    const {classes} = props;

    function onClick() {
        window.open('https://www.reddit.com/');
    }

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Say Reddit
                    </Typography>
                    <img src="logo172.png"
                         alt="reddit.com"
                         onClick={onClick}
                         className={classes.logo}/>
                </Toolbar>
            </AppBar>
            <SubredditContainer/>
        </div>
    );
}

export default withStyles(styles)(App);
