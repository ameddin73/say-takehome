import React, {useEffect, useState} from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Subreddit from "./subreddit";
import moment from "moment";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";

function SubredditContainer() {
    const [posts, setPosts] = useState({});
    const [selectedSub, setSelectedSub] = useState();
    const [callRefresh, setCallRefresh] = useState(false);

    useEffect(() => {
        setPosts(null);

        async function fetchData() {
            const response = await fetch('https://www.reddit.com/.json')
            const postsData = await response.json();
            setPosts(transformPosts(postsData));
        }

        fetchData();
    }, [callRefresh])

    function transformPosts(postData) {
        const posts = {};
        postData.data.children.forEach((post) => {
            const {data} = post;
            const time = moment.unix(data.created_utc).toDate();

            // Create subreddit property if it doesn't exist and push post in
            !(data.subreddit in posts) && (posts[data.subreddit] = [])
            posts[data.subreddit].push({
                title: data.title,
                url: data.url,
                redditUrl: "https://reddit.com" + data.permalink,
                time: time,
                upvotes: data.ups,
                thumbnail: data.thumbnail,
            })
        });
        return posts;
    }

    function selectSubreddit(e) {
        setSelectedSub(e.target.value);
    }

    function refreshPosts() {
        // Update var to invoke useEffect (value doesn't matter)
        setCallRefresh(!callRefresh);
    }

    const subredditList = () => (
        // Sort keys alphabetically and return as list of option components
        Object.keys(posts).sort((a, b) => (
            a.toLowerCase().localeCompare(b.toLowerCase())
        )).map((subreddit) => {
            return <option key={subreddit}>{subreddit}</option>;
        })
    )

    const allPosts = () => {
        let allPostList = [];
        Object.keys(posts).forEach((key) => (
            allPostList = allPostList.concat(posts[key])
        ))
        return allPostList;
    }

    if (!posts || Object.keys(posts).length === 0) {
        return (
            <div>
                <CircularProgress style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                }}/>
            </div>
        )
    }

    return (
        <Grid container direction="column">
            <Grid container
                  direction="row"
                  alignItems="flex-start"
                  justify="center"
                  style={{
                      marginTop: 75,
                      marginBottom: 60,
                  }}>
                <FormControl variant="outlined"
                             style={{
                                 display: "flex",
                                 width: "auto",
                                 transform: "translate(-25%)"
                             }}>
                    <InputLabel>Subreddit</InputLabel>
                    <Select
                        native
                        onChange={selectSubreddit}
                        label="Subreddit"
                    >
                        <option key="None" value=""></option>
                        {subredditList()}
                    </Select>
                </FormControl>
                <IconButton
                    alt="Refresh"
                    onClick={refreshPosts}>
                    <RefreshIcon fontSize="large"/>
                </IconButton>
            </Grid>
            <Grid align="center" item>
                <Subreddit posts={selectedSub ? posts[selectedSub] : allPosts()}/>
            </Grid>
        </Grid>
    )
}

export default SubredditContainer;
