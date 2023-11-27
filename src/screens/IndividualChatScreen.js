import React from 'react';
import { useRoute } from '@react-navigation/native';

const IndividualChatScreen = () => {
  const route = useRoute();
  const { username } = route.params;
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
