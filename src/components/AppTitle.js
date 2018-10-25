import React from 'react';
import { Header } from 'semantic-ui-react';
import slice from 'lodash/slice';
import Emoji from './Emoji';

const SPACE = ' ';

class AppTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      targetIndex: -1,
      title: props.title,
      transitionSpeed: 600
    };
  }

  getTitleText = () => {
    const { title, targetIndex } = this.state;
    let start = slice(title, 0, targetIndex);
    let end = slice(title, targetIndex + 1, title.length);

    return (
      <span>
        {start}
        <Emoji label="curly_loop" spinning symbol="➰" />
        {end}
      </span>
    );
  };

  increaseIndex = () => {
    const { targetIndex, title, transitionSpeed } = this.state;
    const isLastIndex = targetIndex >= title.length;

    if (!isLastIndex) {
      let newTargetIndex = targetIndex + 1;
      if (title[newTargetIndex] === SPACE) newTargetIndex += 1;
      this.setState({
        targetIndex: newTargetIndex
      });
      setTimeout(this.increaseIndex, transitionSpeed);
    }
  };

  componentDidMount() {
    this.increaseIndex();
  }

  render() {
    return <Header as="h1">{this.getTitleText()}</Header>;
  }
}

export default AppTitle;
