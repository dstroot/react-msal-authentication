import React from 'react';
import renderer from 'react-test-renderer';

// import component to test
import FourOhFour from '../FourOhFour';

describe('FourOhFour', () => {
  it('it should render', () => {
    const component = renderer.create(<FourOhFour />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
