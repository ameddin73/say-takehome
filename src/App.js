import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SubredditContainer from "./components/subredditContainer";

function App() {

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
                         style={{
                             width: "40px",
                             height: "40px",
                             marginRight: "0px",
                             marginLeft: "auto",
                             cursor: "pointer",
                         }}/>
                </Toolbar>
            </AppBar>
            <SubredditContainer/>
        </div>
    );
}

export default App;
