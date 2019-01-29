import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../NavBar";

describe("NavBar", () => {
  it("it should render", () => {
    const component = renderer.create(
      <Router>
        <NavBar />
      </Router>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
