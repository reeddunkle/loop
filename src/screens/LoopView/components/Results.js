import React from 'react';
import styled from 'styled-components';
import get from 'lodash/get';
import isNil from 'lodash/isNil';
import noop from 'lodash/noop';
import { Button, Header, Icon, Table } from 'semantic-ui-react';

const Segment = styled.div`
  margin: 1em;
`;

const ResultItem = ({
  index,
  orderDown = noop,
  orderFirst = noop,
  orderLast = noop,
  orderUp = noop,
  rankDown = noop,
  rankUp = noop,
  recentlyTouchedIndex,
  result
}) => {
  const isTouched = !isNil(recentlyTouchedIndex)
    ? recentlyTouchedIndex === index
    : false;
  const rank = index + 1;

  return (
    <Table.Row positive={isTouched}>
      <Table.Cell collapsing>{rank}</Table.Cell>
      <Table.Cell>
        <Header as="h4" textAlign="center">
          {result.label}
        </Header>
      </Table.Cell>
      <Table.Cell collapsing>
        <Button.Group>
          <Button icon onClick={rankUp} color="green">
            <Button.Content>
              <Icon name="thumbs up" />
            </Button.Content>
          </Button>
          <Button icon onClick={rankDown} color="red">
            <Button.Content>
              <Icon name="thumbs down" />
            </Button.Content>
          </Button>
        </Button.Group>
      </Table.Cell>
      <Table.Cell collapsing>
        <Button.Group>
          <Button icon onClick={orderFirst} color="green" basic>
            <Button.Content>
              <Icon name="angle double up" />
            </Button.Content>
          </Button>
          <Button icon onClick={orderLast} color="red" basic>
            <Button.Content>
              <Icon name="angle double down" />
            </Button.Content>
          </Button>
          <Button icon onClick={orderUp} color="green" basic>
            <Button.Content>
              <Icon name="angle up" />
            </Button.Content>
          </Button>
          <Button icon onClick={orderDown} color="red" basic>
            <Button.Content>
              <Icon name="angle down" />
            </Button.Content>
          </Button>
        </Button.Group>
      </Table.Cell>
    </Table.Row>
  );
};

const Results = ({
  orderDown = noop,
  orderFirst = noop,
  orderLast = noop,
  orderUp = noop,
  rankDown = noop,
  rankUp = noop,
  recentlyTouchedIndex,
  results = []
}) => {
  return (
    <Segment>
      <Table celled color="teal" selectable textAlign="center">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Rank</Table.HeaderCell>
            <Table.HeaderCell>Item</Table.HeaderCell>
            <Table.HeaderCell>Rank Up/Down</Table.HeaderCell>
            <Table.HeaderCell>Move to Top/Bottom/Up/Down</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {!!get(results, 'length') &&
            results.map((result, index) => (
              <ResultItem
                key={index}
                index={index}
                orderFirst={() => orderFirst(index)}
                orderLast={() => orderLast(index)}
                orderUp={() => orderUp(index)}
                orderDown={() => orderDown(index)}
                rankDown={() => rankDown(index)}
                rankUp={() => rankUp(index)}
                recentlyTouchedIndex={recentlyTouchedIndex}
                result={result}
              />
            ))}
        </Table.Body>
      </Table>
    </Segment>
  );
};

export default Results;
