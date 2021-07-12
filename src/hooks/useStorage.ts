
import React, { useState, useEffect } from 'react';

export interface IStorage {
    getItems: () => any,
    setItems: (items: Array<any>) => any
}

export const useStorage = () => {

    const getStorage = async (name: string): Promise<IStorage>  => {
        const STORAGE_NAME = `${name}_storage`;

        const getItems = () => JSON.parse(localStorage.getItem(STORAGE_NAME) || '[]');
        const setItems = (items: any) => localStorage.setItem(STORAGE_NAME, JSON.stringify(items));
    
        return { getItems, setItems };
    };
    
    return { getStorage };
}
