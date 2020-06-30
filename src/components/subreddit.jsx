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
import {withStyles} from "@material-ui/styles";
import {compose} from "recompose";

const styles = {
    tile: {
        height: 350,
        width: 350,
    },
    subtitle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    upvotes: {
        fontWeight: "bold",
        color: "orange",
        display: "flex",
        alignItems: "center",
    },
    image: {
        objectFit: "contains",
    },
    moreIcon: {
        color: "white",
    },
}

function Subreddit(props) {
    const {posts, width, classes} = props;

    function isImage(url) {
        return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    }

    function oneColumn() {
        // Sets the layout to be one column if there's 1 post or the screen
        // is smaller than medium
        return posts.length <= 1 || !isWidthUp('md', width);
    }

    function sortByUpvotes(a, b) {
        return a.upvotes > b.upvotes ? -1 : a.upvotes < b.upvotes ? 1 : 0;
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
            {posts.sort(sortByUpvotes).map((post) => (
                <GridListTile key={post.title}
                              cols={1}
                              className={classes.tile}>
                    <img src={
                        // Use post image if exists, otherwise reddit logo
                        isImage(post.url) ?
                            post.url :
                            "logo512.png"}
                         alt={he.decode(post.title)}
                         className={classes.image}/>
                    <GridListTileBar
                        title={he.decode(post.title)}
                        subtitle={
                            <div className={classes.subtitle}>
                                <span className={classes.upvotes}>
                                    <ThumbUpAltIcon fontSize="small"/>&nbsp;
                                    {post.upvotes.toLocaleString()} </span>
                                <span> {post.time.toLocaleDateString()}</span>
                            </div>}
                        actionIcon={
                            <Tooltip title="View on Reddit">
                                <IconButton
                                    alt="View on Reddit"
                                    onClick={() => window.open(post.redditUrl)}>
                                    <MoreHorizIcon fontSize="large" className={classes.moreIcon}/>
                                </IconButton>
                            </Tooltip>
                        }/>
                </GridListTile>
            ))}
        </GridList>
    )
}

export default compose(withWidth(), withStyles(styles))(Subreddit);