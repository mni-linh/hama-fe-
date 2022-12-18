import React from "react";
import PropTypes from "prop-types";

const FacebookEmbed = ({ embedId }) => (
  // <!-- Your embedded video player code -->
  <div
    class="fb-video"
    // src={`https://www.youtube.com/embed/${embedId}`}
    // width="600"
    // height="380"
    data-href={`https://www.facebook.com/facebook/videos/${embedId}`}
    data-width="600"
    data-height="380"
    data-show-text="false"
  >
    <div class="fb-xfbml-parse-ignore">
      <blockquote cite={`https://www.facebook.com/facebook/videos/${embedId}`}>
        <a href={`https://www.facebook.com/facebook/videos/${embedId}`}>
          Welcome to Ha Ma Corner!
        </a>
        <p>Welcome to Ha Ma Corner!</p>
        Posted by <a href="https://www.facebook.com/facebook/">Facebook</a> on
        Friday, November 25, 2022
      </blockquote>
    </div>
  </div>
);
FacebookEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
};
export default FacebookEmbed;
