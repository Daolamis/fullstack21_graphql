import React from 'react';

const commonStyle = {
  position: 'fixed',
  top: '15px',
  left: '50%',
  transform: 'translateX(-50%)',
  fontSize: '18px',
  margin: '5px',
  padding: '5px',
}

const infoStyle = {
  ...commonStyle,
  color: 'darkgreen',
  border: '2px solid green',
  backgroundColor: 'lightgreen',
}

const errorStyle = {
  ...commonStyle,
  color: 'darkred',
  border: '2px solid red',
  backgroundColor: 'pink',
}


const Notification = ({ notification }) => {
  if (!notification) {
    return null;
  }
  const style = notification.isError ? errorStyle : infoStyle;
  return (
    <div style={style}>
      {notification.message}
    </div>
  );
};

export default Notification;