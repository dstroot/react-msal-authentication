import React from "react";
import renderer from "react-test-renderer";

// import component to test
import Dashboard from "../Dashboard";
import context from "../../components/Authorization/__mocks__/context";

// Mock our AuthConsumer
const mockContext = jest.fn();
jest.mock("../../components/Authorization", () => ({
  AuthConsumer: ({ children }) => children(mockContext())
}));

// Test Dashboard page
describe("Dashboard", () => {
  // mount the component
  let mountedComponent;
  const getMountedComponent = () => {
    if (!mountedComponent) {
      mountedComponent = mount(<Dashboard />);
    }
    return mountedComponent;
  };

  beforeEach(() => {
    mountedComponent = undefined;
    mockContext.mockReset();
  });

  it(`should render`, () => {
    // set our context data
    mockContext.mockReturnValue(context);

    // test rendering
    const component = renderer.create(<Dashboard />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should pass context", () => {
    mockContext.mockReturnValue(context);
    const pre = getMountedComponent()
      .find("pre")
      .first();

    // see if the "pre" tag contains context data
    expect(pre.text()).toContain(
      `"identityProvider": "https://login.microsoftonline.com/v2.0"`
    );
  });
});
