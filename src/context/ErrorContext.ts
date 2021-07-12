
import React, { useState, useEffect } from 'react'

export const showError = (error: string) => alert(error);

export const ErrorContext = React.createContext({ showError });
