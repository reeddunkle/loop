import React from 'react';
import { Button } from 'semantic-ui-react';
import kebabCase from 'lodash/kebabCase';
import get from 'lodash/get';
import { move } from '../../util';
import { Footer, ItemInput, Results } from './components';

const getNewItem = (label, id, indexHistory = []) => {
  return {
    label,
    id: id || kebabCase(label) || null,
    indexHistory
  };
};

function updateIndexHistories(result) {
  return result.map((item, currentIndex) => {
    return {
      ...item,
      indexHistory: [...item.indexHistory, currentIndex]
    };
  });
}

function rankUp(index, collection = []) {
  if (index === 0) return { result: collection, newIndex: index };
  const bound = 0;
  let toIndex = Math.floor((bound + index) / 2);

  const result = move(collection, index, toIndex);
  return { result: updateIndexHistories(result), newIndex: toIndex };
}

function rankDown(index, collection = []) {
  if (index >= collection.length - 1)
    return { result: collection, newIndex: index };
  const bound = collection.length - 1;
  let toIndex = Math.ceil((index + bound) / 2);

  const result = move(collection, index, toIndex);
  return { result: updateIndexHistories(result), newIndex: toIndex };
}

function orderFirst(index, collection = []) {
  if (index === 0) return { result: collection, newIndex: index };
  const toIndex = 0;
  const result = move(collection, index, toIndex);
  return { result: updateIndexHistories(result), newIndex: toIndex };
}

function orderLast(index, collection = []) {
  if (index >= collection.length - 1)
    return { result: collection, newIndex: index };
  const toIndex = collection.length - 1;
  const result = move(collection, index, toIndex);
  return { result: updateIndexHistories(result), newIndex: toIndex };
}

function orderUp(index, collection = []) {
  if (index === 0) return { result: collection, newIndex: index };
  const toIndex = index - 1;
  const result = move(collection, index, toIndex);
  return { result: updateIndexHistories(result), newIndex: toIndex };
}

function orderDown(index, collection = []) {
  if (index >= collection.length - 1)
    return { result: collection, newIndex: index };
  const toIndex = index + 1;
  const result = move(collection, index, toIndex);
  return { result: updateIndexHistories(result), newIndex: toIndex };
}

class App extends React.Component {
  state = {
    dataInput: '',
    recentlyTouchedIndex: null
  };

  handleInputRef = c => {
    this.inputRef = c;
  };

  handleInputChange = (event, { value }) => {
    this.setState({
      dataInput: value
    });
  };

  handleAdd = () => {
    const { dataInput } = this.state;
    const { collection } = this.props;
    const newItem = getNewItem(dataInput);
    this.setState(
      {
        collection: [...collection, newItem],
        dataInput: '',
        recentlyTouchedIndex: collection.length
      },
      () => {
        this.handleRecentlyTouchedIndex();
        console.log({ newItem });
        this.props.onAddItem(newItem);
      }
    );
  };

  componentDidMount() {
    this.inputRef.focus();
  }

  log = () => {
    console.log({ state: this.state, props: this.props });
  };

  handleRecentlyTouchedIndex = () => {
    setTimeout(() => {
      this.setState({
        recentlyTouchedIndex: null
      });
    }, 1500);
  };

  rankUp = index => {
    const { collection } = this.state;
    const { result, newIndex } = rankUp(index, collection);
    this.setState(
      {
        collection: result,
        recentlyTouchedIndex: newIndex
      },
      this.handleRecentlyTouchedIndex
    );
  };

  rankDown = index => {
    const { collection } = this.state;
    const { result, newIndex } = rankDown(index, collection);
    this.setState(
      {
        collection: result,
        recentlyTouchedIndex: newIndex
      },
      this.handleRecentlyTouchedIndex
    );
  };

  orderUp = index => {
    const { collection } = this.state;
    const { result, newIndex } = orderUp(index, collection);
    this.setState(
      {
        collection: result,
        recentlyTouchedIndex: newIndex
      },
      this.handleRecentlyTouchedIndex
    );
  };

  orderDown = index => {
    const { collection } = this.state;
    const { result, newIndex } = orderDown(index, collection);
    this.setState(
      {
        collection: result,
        recentlyTouchedIndex: newIndex
      },
      this.handleRecentlyTouchedIndex
    );
  };

  orderFirst = index => {
    const { collection } = this.state;
    const { result, newIndex } = orderFirst(index, collection);
    this.setState(
      {
        collection: result,
        recentlyTouchedIndex: newIndex
      },
      this.handleRecentlyTouchedIndex
    );
  };

  orderLast = index => {
    const { collection } = this.state;
    const { result, newIndex } = orderLast(index, collection);
    this.setState(
      {
        collection: result,
        recentlyTouchedIndex: newIndex
      },
      this.handleRecentlyTouchedIndex
    );
  };

  render() {
    const { dataInput, recentlyTouchedIndex } = this.state;
    const { collection } = this.props;

    return (
      <div>
        <ItemInput
          handleAdd={this.handleAdd}
          handleInputChange={this.handleInputChange}
          handleInputRef={this.handleInputRef}
          value={dataInput}
        />
        {!!get(collection, 'length') && (
          <React.Fragment>
            <Results
              recentlyTouchedIndex={recentlyTouchedIndex}
              results={collection}
              orderDown={this.orderDown}
              orderFirst={this.orderFirst}
              orderLast={this.orderLast}
              orderUp={this.orderUp}
              rankUp={this.rankUp}
              rankDown={this.rankDown}
            />
            <Footer className="App-footer">
              <Button onClick={this.log} content="Log" />
            </Footer>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default App;
