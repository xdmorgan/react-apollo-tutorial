import React, { Component, Fragment } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Post from "../components/Post";

export default class FeedPage extends Component {
  render() {
    return (
      <Query query={FEED_QUERY}>
        {({ data, loading, error, refetch }) => {
          if (loading) {
            return (
              <div className="flex w-100 h-100 items-center justify-center pt7">
                <div>Loading ...</div>
              </div>
            );
          }

          if (error) {
            return (
              <div className="flex w-100 h-100 items-center justify-center pt7">
                <div>An unexpected error occured.</div>
              </div>
            );
          }

          return (
            <Fragment>
              <h1>Feed</h1>
              {data.feed &&
                data.feed.map(post => (
                  <Post
                    key={post.id}
                    post={post}
                    refresh={() => console.log(`Refetch`)}
                    isDraft={!post.isPublished}
                  />
                ))}
              {this.props.children}
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

export const FEED_QUERY = gql`
  query FeedQuery {
    feed {
      id
      text
      title
      isPublished
    }
  }
`;
