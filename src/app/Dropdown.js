"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

const API = "https://61824bbb84c2020017d89da4.mockapi.io/api/v1/names";

function Dropdown() {
  const [state, setState] = useState({
    loading: false,
    data: [],
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setState((prevState) => ({ ...prevState, value, open: true }));
  };

  const handlePersonClick = (name) => {
    setState((prevState) => ({ ...prevState, value: name, open: false }));
  };

  useEffect(() => {
    if (state.value) {
      axios
        .get(`${API}?name=${state.value}`)
        .then((res) => {
          const data = res.data?.items;
          if (data) {
            setState((prevState) => ({ ...prevState, data, loading: false }));
          }
        })
        .catch((err) => {
          console.error(err);
          setState((prevState) => ({ ...prevState, loading: false }));
        });
    } else {
      setState((prevState) => ({ ...prevState, data: [] }));
    }
  }, [state.value]);

  return (
    <div>
      <input value={state.value} onChange={handleChange} type="text" />
      <div>
        {state.loading ? (
          "Loading..."
        ) : state.open ? (
          <React.Fragment>
            <ul>
              {state.data.map((person) => {
                const name = person.name;
                const re = new RegExp(state.value, "gi");
                const nameArr = name.split(re);

                console.log(nameArr.join(state.value));

                return (
                  <li
                    key={person.id}
                    onClick={() => handlePersonClick(person.name)}
                  >
                    {nameArr.map((str, index) => {
                      return (
                        <React.Fragment>
                          {str}
                          {index !== nameArr.length - 1 && (
                            <mark>{state.value}</mark>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </li>
                );
              })}
            </ul>
          </React.Fragment>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Dropdown;
