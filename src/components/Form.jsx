import React from 'react';

const Form = props => {
  return (
    <form onSubmit={props.getWeather}>
      <input
        className="longinput"
        type="text"
        placeholder="longitude"
        name="longitude"
      />
      <input
        className="latinput"
        type="text"
        placeholder="latitude"
        name="latitude"
      />
      <button className="button"> Submit </button>
    </form>
  );
};

export default Form;
