import { ReactNode } from 'react';
import { TextContext } from '../contexts/TextContext';
import texts from '../data/texts.json';

interface TextProviderProps {
  children: ReactNode;
}

export const TextProvider = ({ children }: TextProviderProps) => {
  return (
    <TextContext.Provider value={{ texts }}>
      {children}
    </TextContext.Provider>
  );
};