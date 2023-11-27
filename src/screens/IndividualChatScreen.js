import React from 'react';

const IndividualChatScreen = ({ username }) => {
  return (
    <div>
      <div className="top-banner">
        <h1>{username}</h1>
      </div>
      {/* Rest of the chat screen content */}
    </div>
  );
};

export default IndividualChatScreen;
