import { useContext } from 'react';
import { TextContext } from '../contexts/TextContext';

export const useTexts = () => {
  const context = useContext(TextContext);
  if (context === undefined) {
    throw new Error('useTexts must be used within a TextProvider');
  }
  return context.texts;
};