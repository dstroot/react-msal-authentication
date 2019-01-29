import React from "react";
import renderer from "react-test-renderer";
import NavBar from "../NavBar";

describe("NavBar", () => {
  it("it should render", () => {
    const component = renderer.create(<NavBar />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

// https://medium.com/@ryandrewjohnson/unit-testing-components-using-reacts-new-context-api-4a5219f4b3fe

// https://medium.com/@wyattsweet/testing-react-components-using-the-new-context-api-a1c553edc2fa

// https://github.com/airbnb/enzyme/issues/1636
