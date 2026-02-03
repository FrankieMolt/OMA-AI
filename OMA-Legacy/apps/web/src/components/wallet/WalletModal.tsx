'use client';

import * as React from 'react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

interface WalletModalProps {
  trigger: React.ReactNode;
}

export function WalletModal({ trigger }: WalletModalProps) {
  const { setVisible } = useWalletModal();

  const handleClick = () => {
    setVisible(true);
  };

  return (
    <div onClick={handleClick}>
      {trigger}
    </div>
  );
}
