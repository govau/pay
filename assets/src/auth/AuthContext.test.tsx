import * as React from "react";
import { shallow } from "enzyme";
import { AuthProvider } from "./AuthContext";

function getComponent() {
  const wrapper = shallow(<AuthProvider />);
  const instance = wrapper.instance() as AuthProvider;
  return { wrapper, instance };
}

test("setEmail updates email", done => {
  const { wrapper, instance } = getComponent();
  instance.setEmail("yo");
  setTimeout(() => {
    expect(wrapper.state("email")).toEqual("yo");
    done();
  });
});
