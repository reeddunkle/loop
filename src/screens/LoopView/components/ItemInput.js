import React from 'react';
import { Button, Input } from 'semantic-ui-react';

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

export default ItemInput;
