import React from "react";
import Helmet from "../components/Helmet";
import Post from "../components/Post";
const Courses = () => {
  return (
    <Helmet title="Courses">
      <div className="courses">
        <div className="coursesTitles">
          <span className="coursesTitleSm"> Draw with Ha Ma </span>
          <br />
          <span className="coursesTitleLg" style={{ textAlign: "center" }}>
            {" "}
            After many months of cherishing, Ha Ma had the first common house.{" "}
          </span>
          {/* <br/> */}
          <span className="coursesTitleLg" style={{ textAlign: "center" }}>
            {" "}
            Hope this place will bring everyone moments of peace and joy.{" "}
          </span>
        </div>
        <br />
        <br />
        <div className="post">
          <Post />
        </div>
      </div>
    </Helmet>
  );
};

export default Courses;
