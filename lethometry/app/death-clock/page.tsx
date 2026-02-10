'use client';

import React, { useState } from 'react';
import DeathClock from '@/components/DeathClock';
import { UserData } from '@/types';

export default function DeathClockPage() {
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleUpdateUserData = (data: UserData) => {
    setUserData(data);
  };

  return (
    <div className="pt-24 pb-20">
      <DeathClock 
        userData={userData} 
        onUpdateUserData={handleUpdateUserData}
      />
    </div>
  );
}
