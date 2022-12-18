import React from "react";
import { Link, useHistory } from "react-router-dom";
// import SinglePost from './SinglePost';
// import mem01 from '../assets/images/members/mem01.jpg'

// export default function Post(){}
const Post = () => {
  const history = useHistory();
  const watercolor = () => {
    history.push("/watercolor");
  };
  const pencil = () => {
    history.push("/pencil");
  };
  const pencilcan = () => {
    history.push("/pencilcan");
  };
  const gouache = () => {
    history.push("/gouache");
  };
  return (
    <div>
      <div className="posts">
        <div className="post">
          <img
            className="postImg"
            src="https://i.pinimg.com/564x/4b/93/0e/4b930e17952d79f4f76e9b8a5524ffe0.jpg"
            alt=" "
          />
          <div className="postInfo">
            <div className="postCats">
              {/* <span className="postCat">
                                <Link className="link" to="/posts?cat=Music">
                                    Music
                                </Link>
                            </span>
                            <span className="postCat">
                                <Link className="link" to="/posts?cat=Music">
                                    Life
                                </Link>
                            </span> */}
            </div>
            <span className="postTitle">
              <Link
                to="/"
                // to="/courses/watercolor"
                // onClick={watercolor}
                className="link"
              >
                &nbsp;&nbsp;&nbsp;Basic Water Color Course
              </Link>
            </span>
            <hr />
            <span className="postDate">
              {" "}
              &nbsp;&nbsp;January drawing with Ha Ma
            </span>
            <p className="postDesc">
              <b>Number of sessions: </b> 6 sessions
            </p>
            <p className="postDesc">
              <b>Time: </b> 120 minutes/ sessions
            </p>
            <p className="postDesc">
              <b>Tuition: </b> 2,100,000 VND
            </p>
            <p className="postDesc">
              <b>Opening: </b> 01/01/2022
            </p>
            <p className="postDesc">
              <b>Instructor: </b> Ha Ma
            </p>
          </div>
        </div>
        {/* aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa */}
        <div className="post">
          <img
            className="postImg"
            src="https://i.pinimg.com/564x/48/76/e2/4876e24cf4977befb7b197c671be939f.jpg"
            alt=" "
          />
          <div className="postInfo">
            <div className="postCats">
              {/* <span className="postCat">
                                <Link className="link" to="/posts?cat=Music">
                                    Music
                                </Link>
                            </span>
                            <span className="postCat">
                                <Link className="link" to="/posts?cat=Music">
                                    Life
                                </Link>
                            </span> */}
            </div>
            <span className="postTitle">
              <Link
                to="/"
                //   to="/courses/pencilcolor"
                // onClick={pencil}
                className="link"
              >
                &nbsp;&nbsp;&nbsp;Basic Crayons Course
              </Link>
            </span>
            <hr />
            <span className="postDate">
              {" "}
              &nbsp;&nbsp;January drawing with Bach Tuoc Song.
            </span>
            <p className="postDesc">
              <b>Number of sessions: </b> 8 sessions
            </p>
            <p className="postDesc">
              <b>Time: </b> 120 minutes/ sessions
            </p>
            <p className="postDesc">
              <b>Tuition: </b> 2,800,000 VND
            </p>
            <p className="postDesc">
              <b>Opening: </b> 02/01/2022
            </p>
            <p className="postDesc">
              <b>Instructor: </b> Bach Tuoc Song
            </p>
          </div>
        </div>

        {/* aaaaaaaaaaaaaaaaaaaaaaaaaaa */}
        <div className="post">
          <img
            className="postImg"
            src="https://i.pinimg.com/564x/7d/27/14/7d27140f9d491bc1231612392be9cf84.jpg"
            alt=" "
          />
          <div className="postInfo">
            <div className="postCats">
              {/* <span className="postCat">
                                <Link className="link" to="/posts?cat=Music">
                                    Music
                                </Link>
                            </span>
                            <span className="postCat">
                                <Link className="link" to="/posts?cat=Music">
                                    Life
                                </Link>
                            </span> */}
            </div>
            <span className="postTitle">
              <Link
                to="/"
                // onClick={gouache}
                //   to="/course/gouachecolor"
                className="link"
              >
                &nbsp;&nbsp;&nbsp;Khóa học màu GouacheGouache Color Course
              </Link>
            </span>
            <hr />
            <span className="postDate">
              {" "}
              &nbsp;&nbsp;January drawing with Cua Mo
            </span>
            <p className="postDesc">
              <b>Number of sessions: </b> 6 sessions
            </p>
            <p className="postDesc">
              <b>Time: </b> 120 minutes/ sessions
            </p>
            <p className="postDesc">
              <b>Tuition: </b> 2,100,000 VND
            </p>
            <p className="postDesc">
              <b>Opening: </b> 03/01/2022
            </p>
            <p className="postDesc">
              <b>Instructor: </b> Cua Mo
            </p>
          </div>
        </div>

        {/* aaaaaaaaaaaaaaaaaaaaaaaaaaa */}
        <div className="post">
          <img
            className="postImg"
            src="https://i.pinimg.com/564x/c5/7b/11/c57b11dbde63b90ef7477f1875f8b4d4.jpg"
            alt=" "
          />
          <div className="postInfo">
            <div className="postCats">
              {/* <span className="postCat">
                                <Link className="link" to="/posts?cat=Music">
                                    Music
                                </Link>
                            </span>
                            <span className="postCat">
                                <Link className="link" to="/posts?cat=Music">
                                    Life
                                </Link>
                            </span> */}
            </div>
            <span className="postTitle">
              <Link
                to="/"
                // onClick={pencilcan}
                //   to="/courses/pencilcan"
                className="link"
              >
                &nbsp;&nbsp;&nbsp;January drawing with Mac Ky Doanh
              </Link>
            </span>
            <hr />
            <span className="postDate">
              {" "}
              &nbsp;&nbsp;Basic Pencil Portrait Course
            </span>
            <p className="postDesc">
              <b>Number of sessions: </b> 8 sessions
            </p>
            <p className="postDesc">
              <b>Time: </b> 120 minutes/ sessions
            </p>
            <p className="postDesc">
              <b>Tuition: </b> 2,400,000 VND
            </p>
            <p className="postDesc">
              <b>Opening: </b> 04/01/2022
            </p>
            <p className="postDesc">
              <b>Instructor: </b> Mac Ky Doanh
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Post;
