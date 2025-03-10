import { createContext, useContext, type ReactNode } from 'react';
import type { AgentConfiguration } from './types';

const defaultConfig: AgentConfiguration = {
  agentAvatarImageSrc: '',
  agentName: 'น้องทีที',
  userAvatarImageSrc: '',
  userName: 'คุณ',
  onFetchAnswer: async () => ({ answer: 'not implemented' }),
  language: 'th',
};

const ChatContext = createContext<AgentConfiguration>(defaultConfig);

interface ChatProviderProps {
  children: ReactNode;
  config?: AgentConfiguration;
}

export const ChatProvider = ({ children, config }: ChatProviderProps) => {
  const mergedConfig = {
    ...defaultConfig,
    ...config,
  };

  return (
    <ChatContext.Provider value={{ ...mergedConfig }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatConfig = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatConfig must be used within ChatProvider');
  }
  return context;
}; 