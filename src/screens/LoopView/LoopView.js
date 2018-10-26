import React from 'react';
import { Button } from 'semantic-ui-react';
import get from 'lodash/get';
import { Footer, ItemInput, Results } from './components';
import {
  getNewItem,
  orderDown,
  orderFirst,
  orderLast,
  orderUp,
  rankDown,
  rankUp
} from './util';

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
        this.props.onAddItem(newItem, this.props.loopId);
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
