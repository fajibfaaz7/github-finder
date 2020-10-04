import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  GET_REPOS,
  GET_USERS,
  SET_LOADING,
  CLEAR_USERS,
} from "../types";

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(GithubReducer, initialState);
  let gitClientId;
  let gitClientSecret;

  if (process.env.NODE_ENV !== "production") {
    gitClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    gitClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
  } else {
    gitClientId = process.env.GITHUB_CLIENT_ID;
    gitClientSecret = process.env.GITHUB_CLIENT_SECRET;
  }
  //Search users
  const searchUsers = async (text) => {
    setLoading();
    const { data } = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${gitClientId}&client_secret=${gitClientSecret}`
    );
    dispatch({
      type: SEARCH_USERS,
      payload: data.items,
    });
  };
  //Get users
  const getUser = async (username) => {
    setLoading();
    const { data } = await axios.get(
      `https://api.github.com/users/${username}?&client_id=${gitClientId}&client_secret=${gitClientSecret}`
    );
    dispatch({
      type: GET_USERS,
      payload: data,
    });
  };
  //Get repos
  const getUserRepos = async (username) => {
    setLoading();
    const { data } = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${gitClientId}&client_secret=${gitClientSecret}`
    );
    dispatch({
      type: GET_REPOS,
      payload: data,
    });
  };
  //Set loading
  const setLoading = () => dispatch({ type: SET_LOADING });
  //Clear users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
