import React, { useState, useContext } from "react";
import GithubContext from "./../../context/github/githubContext";
import AlertContext from "./../../context/alert/AlertContext";

const Search = (props) => {
  const { users, searchUsers, clearUsers } = useContext(GithubContext);
  const { showAlert } = useContext(AlertContext);
  const [text, setText] = useState("");

  const onChange = (e) => setText(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      showAlert("Please Enter Something", "light");
    } else {
      searchUsers(text);
      setText("");
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <input
          type="text"
          name="text"
          value={text}
          onChange={onChange}
          placeholder="Search Users..."
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      {users.length > 0 && (
        <button className="btn btn-light btn-block" onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
