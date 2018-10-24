import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Emoji = styled.div.attrs({
  className: 'emoji',
  role: 'img'
})`
  aria-label: ${props => (props.label ? props.label : '')};
  aria-hidden: ${props => (props.label ? 'false' : 'true')};
  display: inline-block;
`;

const SpinningEmoji = styled(Emoji)`
  animation: ${rotate} 2s linear infinite;
`;

export default ({ label, spinning, symbol }) =>
  spinning ? (
    <SpinningEmoji label={label}>{symbol}</SpinningEmoji>
  ) : (
    <Emoji label={label}>{symbol}</Emoji>
  );
