import { createContext } from 'react';
import texts from '../data/texts.json';

export type Texts = typeof texts;

export interface TextContextType {
  texts: Texts;
}

export const TextContext = createContext<TextContextType>({
  texts
});