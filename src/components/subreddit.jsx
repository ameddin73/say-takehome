import React from "react";
import he from "he";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import Tooltip from "@material-ui/core/Tooltip";
import withWidth, {isWidthUp} from '@material-ui/core/withWidth';

function Subreddit(props) {
    const {posts, width} = props;

    function isImage(url) {
        return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    }

    function oneColumn() {
        // Sets the layout to be one column if there's 1 post or the screen
        // is smaller than medium
        return posts.length <= 1 || !isWidthUp('md', width);
    }

    return (
        <GridList
            cellHeight={350}
            spacing={25}
            cols={oneColumn() ? 1 : 2}
            justify="center"
            style={oneColumn() ?
                {width: 375} :
                {width: 750}
            }>
            {posts.sort((a, b) => {
                return a.upvotes > b.upvotes ? -1 : a.upvotes < b.upvotes ? 1 : 0;
            }).map((post) => (
                <GridListTile key={post.title}
                              cols={1}
                              styles={{
                                  height: 350,
                                  width: 350,
                              }}>
                    <img src={
                        // Use post image if exists, otherwise reddit logo
                        isImage(post.url) ?
                            post.url :
                            "https://www.redditinc.com/assets/images/site/reddit-logo.png"}
                         alt={he.decode(post.title)}
                         style={{
                             objectFit: "contains",
                         }}/>
                    <GridListTileBar
                        title={he.decode(post.title)}
                        subtitle={
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}>
                                <span style={{
                                    fontWeight: "bold",
                                    color: "orange",
                                    display: "flex",
                                    alignItems: "center",
                                    // Probably shoulda pulled the styles out but it's late ¯\_(ツ)_/¯
                                }}>
                                    <ThumbUpAltIcon fontSize="small"/>&nbsp;
                                    {post.upvotes.toLocaleString()} </span>
                                <span> {post.time.toLocaleDateString()}</span>
                            </div>}
                        actionIcon={
                            <Tooltip title="View on Reddit">
                                <IconButton
                                    alt="View on Reddit"
                                    onClick={() =>
                                        window.open(post.redditUrl)}>
                                    <MoreHorizIcon fontSize="large" style={{color: "white"}}/>
                                </IconButton>
                            </Tooltip>
                        }/>
                </GridListTile>
            ))}
        </GridList>
    )
}

export default withWidth()(Subreddit);