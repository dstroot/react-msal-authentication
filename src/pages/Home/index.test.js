import React from "react";
import renderer from "react-test-renderer";

// import component to test
import Home from "../Home";

describe("Home", () => {
  it("it should render", () => {
    const component = renderer.create(<Home />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
