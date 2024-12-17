import { ReactNode } from 'react';

/**
 * Define the shape of the ProviderProps
 * 
 * This interface is used for contexts that provide a value to their children.
 */
export interface ProviderProps {
    children: ReactNode;
}