import React from 'react';
import { Button, Input } from 'semantic-ui-react';
import noop from 'lodash/noop';

const isEnterKey = key => (key === 'Enter' ? f => f() : noop);

const ItemInput = ({ handleAdd, handleInputChange, handleInputRef, value }) => {
  return (
    <Input
      ref={handleInputRef}
      placeholder="Add an item..."
      value={value}
      onChange={handleInputChange}
      onKeyPress={e => isEnterKey(e.key)(handleAdd)}
      action={<Button color="teal" content="Add" onClick={handleAdd} />}
    />
  );
};

export default ItemInput;
