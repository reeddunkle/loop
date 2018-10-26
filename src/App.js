import React from 'react';
import { Button, Input } from 'semantic-ui-react';
import kebabCase from 'lodash/kebabCase';
import get from 'lodash/get';
import { AppTitle, Results } from './components';
import { move } from './util';
import './App.css';

const getNewItem = ({ id, indexHistory = [], label = '' }) => {
  return {
    label,
    id: id || kebabCase(label) || null,
    indexHistory
  };
};

const TEST_COLLECTION = [
  getNewItem({ label: 'Apple', indexHistory: [] }),
  getNewItem({ label: 'Tree', indexHistory: [] }),
  getNewItem({ label: 'Dinosaur', indexHistory: [] }),
  getNewItem({ label: 'Cracker', indexHistory: [] }),
  getNewItem({ label: 'Box', indexHistory: [] })
];

const ItemInput = ({ handleAdd, handleInputChange, handleInputRef, value }) => {
  return (
    <Input
      ref={handleInputRef}
      placeholder="Add an item..."
      value={value}
      onChange={handleInputChange}
      onKeyPress={e => {
        if (e.key === 'Enter') {
          handleAdd();
        }
      }}
      action={<Button color="teal" content="Add" onClick={handleAdd} />}
    />
  );
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
    collection: TEST_COLLECTION,
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
    const { collection, dataInput } = this.state;
    const newItem = getNewItem({ label: dataInput });
    this.setState(
      {
        collection: [...collection, newItem],
        dataInput: '',
        recentlyTouchedIndex: collection.length
      },
      this.handleRecentlyTouchedIndex
    );
  };

  componentDidMount() {
    this.inputRef.focus();
  }

  log = () => {
    console.log({ state: this.state });
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
    const { collection, dataInput, recentlyTouchedIndex } = this.state;
    return (
      <div className="App">
        <AppTitle title="Curly Loop" />
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
            <div className="App-footer">
              <Button onClick={this.log} content="Log" />
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default App;
