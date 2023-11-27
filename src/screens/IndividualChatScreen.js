import React from 'react';
import { useRoute } from '@react-navigation/native';

const IndividualChatScreen = ({ accountUsername, friendUsername }) => {
  return (
    <div>
      <div className="top-banner">
        <h1>{friendUsername}</h1>
      </div>
      {/* Rest of the chat screen content */}
    </div>
  );
};

export default IndividualChatScreen;
