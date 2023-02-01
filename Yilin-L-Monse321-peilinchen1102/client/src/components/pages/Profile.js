import React, { useState, Component } from "react";
import { get, post } from "../../utilities";
import Description from "../modules/Description.js";
import { redirectTo } from "@reach/router";
import "../../utilities.css";
import "./Profile.css";
import { areComponentsEqual } from "react-hot-loader";
import { UserTokenContext } from "../../context/userToken";

class Profile extends Component {
  static contextType = UserTokenContext;

  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      catHappiness: 0,
      photoInputURL: "",
    };
  }

  componentDidMount() {
    document.title = "Profile Page";
    if (!this.props.userId) {
      //console.log("there is no userId");

      return redirectTo("/");
    }

    get(`/api/user`, { userId: this.props.userId })
      .then((data) => {
        const user = data.user;
        if (!user) {
          redirectTo("/");

          return;
        }

        this.setState({ user: user });
      })
      .catch((err) => redirectTo("/"));
  }

  handleSubmit = (event) => {
    event.preventDefault();

    // this.props.onSubmit && this.props.onSubmit(value);
    // this.state.user.photo = this.state.photoInputURL;

    this.setState({ photoInputURL: "" });

    const userToken = this.context;

    //console.log(userToken);

    post(`/api/profile`, { token: userToken, ...this.state.user }).then((user) => {
      this.setState({ user });
    });
  };

  handleChangePhotoURL = (e) => {
    const label = e.target.getAttribute("label"); /*label description, etc*/
    const content = e.target.value;

    //console.log(e.target);

    this.setState({ photoInputURL: content });
    this.setState({
      ...this.state,
      user: {
        ...this.state.user,
        photo: content /*dynamic property*/,
      },
    });
  };

  handleChange = (e) => {
    const label = e.target.getAttribute("label"); /*label description, etc*/
    const content = e.target.value;

    //console.log(e.target);

    this.setState({
      ...this.state,
      user: {
        ...this.state.user,
        [label]: content /*dynamic property*/,
      },
    });
  };

  render() {
    if (!this.state.user) {
      return <div> Loading! </div>;
    }
    return (
      <>
        <link rel="shortcut icon" href="./assets/img/favicon.ico" />
        <link rel="apple-touch-icon" sizes="76x76" href="./assets/img/apple-icon.png" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />
        <div className="Profile-avatarContainer">
          {/* <div className="Profile-avatar" /> */}
          <img src={this.state.user?.photo} alt="display image" />
        </div>
        <h1 className="Profile-name u-textCenter">{this.state.user.name}</h1>
        {/* <button
          className="bg-purple-500 active:bg-purple-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 u-flex-middle "
          type="button"
        >
          Connect
        </button> */}

        <textarea
          className="Profile-pic"
          type="text"
          placeholder="Paste in an image URL to upload profile picture"
          size="1000"
          rows="1"
          value={this.state.photoInputURL}
          label="photo"
          onChange={this.handleChangePhotoURL}
        />
        <hr className="Profile-line" />
        <div className="u-flex">
          <div className="Profile-subContainer u-textCenter">
            <h4 className="Profile-subTitle">
              {" "}
              <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>Location
            </h4>
            <textarea
              className="Profile-paragraph"
              type="text"
              placeholder="Add Description"
              size="100"
              rows="6"
              value={this.state.user?.description}
              label="description"
              onChange={this.handleChange}
            />
          </div>
          <div className="Profile-subContainer u-textCenter">
            <h4 className="Profile-subTitle">
              <i className="fas fa-briefcase mr-2 text-lg text-gray-500"></i>
              Profession
            </h4>
            <textarea
              className="Profile-paragraph"
              type="text"
              placeholder="Add Description"
              size="100"
              rows="6"
              label="profession"
              value={this.state.user?.profession}
              onChange={this.handleChange}
            />
          </div>
          <div className="Profile-subContainer u-textCenter">
            <h4 className="Profile-subTitle">
              <i className="fas fa-university mr-2 text-lg text-gray-500"></i>Education
            </h4>
            <textarea
              className="Profile-paragraph"
              type="text"
              placeholder="Add Description"
              size="100"
              rows="6"
              label="education"
              value={this.state.user?.education}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="u-textCenter">
          <button
            className="text-purple-500 bg-transparent border border-solid border-purple-500 hover:bg-purple-500 hover:text-white active:bg-purple-600 font-bold uppercase px-8 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </div>
      </>
    );
  }
}

export default Profile;
