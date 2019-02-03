import React from "react";
import renderer from "react-test-renderer";

import NavBar from "../NavBar";
import context from "../AuthContext/__mocks__/context";

// Mock our AuthConsumer
const mockContext = jest.fn();
jest.mock("../../components/AuthContext", () => ({
  AuthConsumer: ({ children }) => children(mockContext())
}));

describe("NavBar", () => {
  beforeEach(() => {
    mockContext.mockReset();
  });

  it("it should render", () => {
    mockContext.mockReturnValue(context);
    const component = renderer.create(<NavBar />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
