import React, { useEffect, useReducer } from 'react';
import { Header } from 'semantic-ui-react';
import slice from 'lodash/slice';
import Emoji from './Emoji';

const SPACE = ' ';

const ReplaceIndexWithSymbol = ({ index, symbol, text }) => {
  return (
    <span>
      {slice(text, 0, index)}
      <Emoji label="curly_loop" spinning symbol={symbol} />
      {slice(text, index + 1, text.length)}
    </span>
  );
};

function moveSymbolThrough(index, text, incrementIndex) {
  const letterSymbolReplaces = text[index];
  if (!index >= text.length) {
    incrementIndex();
    if (letterSymbolReplaces === SPACE) incrementIndex();
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT_SYMBOL_INDEX':
      return { ...state, symbolIndex: state.symbolIndex + 1 };
    default: {
      return state;
    }
  }
}

function SymbolThroughText({ title, transitionSpeed = 600 }) {
  const [state, dispatch] = useReducer(reducer, {
    symbolIndex: 0
  });
  const { symbolIndex } = state;

  // useEffect(
  //   () => {
  //     if (!symbolIndex >= title.length) {
  //       moveSymbolThrough(symbolIndex, title, () => {
  //         dispatch({ type: 'INCREMENT_SYMBOL_INDEX' });
  //       });
  //       setTimeout(() => {
  //         moveSymbolThrough(symbolIndex, title, () => {
  //           dispatch({ type: 'INCREMENT_SYMBOL_INDEX' });
  //         });
  //       }, transitionSpeed);
  //     }
  //   },
  //   [symbolIndex]
  // );

  return (
    <Header as="h1">
      <ReplaceIndexWithSymbol index={symbolIndex} symbol="➰" text={title} />
    </Header>
  );
}

// class AppTitle extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       targetIndex: -1,
//       title: props.title,
//       transitionSpeed: 600
//     };
//   }

//   getTitleText = () => {
//     const { title, targetIndex } = this.state;
//     let start = slice(title, 0, targetIndex);
//     let end = slice(title, targetIndex + 1, title.length);

//     return (
//       <span>
//         {start}
//         <Emoji label="curly_loop" spinning symbol="➰" />
//         {end}
//       </span>
//     );
//   };

//   increaseIndex = () => {
//     const { targetIndex, title, transitionSpeed } = this.state;
//     const isLastIndex = targetIndex >= title.length;

//     if (!isLastIndex) {
//       let newTargetIndex = targetIndex + 1;
//       if (title[newTargetIndex] === SPACE) newTargetIndex += 1;
//       this.setState({
//         targetIndex: newTargetIndex
//       });
//       setTimeout(this.increaseIndex, transitionSpeed);
//     }
//   };

//   componentDidMount() {
//     this.increaseIndex();
//   }

//   render() {
//     return <Header as="h1">{this.getTitleText()}</Header>;
//   }
// }

export default SymbolThroughText;
