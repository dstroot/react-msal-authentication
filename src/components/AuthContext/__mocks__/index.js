import context from "./context";

export const AuthConsumer = {
  Consumer(props) {
    return props.children(context);
  }
};
