'use client';

import React, { createContext, useContext, useState } from 'react';

export interface PredictionResult {
  disease: string;
  percentage: number;
  description: string;
}

export interface SymptomCheckerState {
  symptoms: string[];
  results: PredictionResult[] | null;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'EMERGENCY' | null;
  reasoning: string;
  recommendation: string;
  isLoading: boolean;
  timestamp: Date | null;
}

interface SymptomContextType extends SymptomCheckerState {
  addSymptom: (symptom: string) => void;
  removeSymptom: (symptom: string) => void;
  clearSymptoms: () => void;
  setResults: (results: PredictionResult[], riskLevel: SymptomCheckerState['riskLevel'], reasoning: string, recommendation: string) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

const defaultState: SymptomCheckerState = {
  symptoms: [],
  results: null,
  riskLevel: null,
  reasoning: '',
  recommendation: '',
  isLoading: false,
  timestamp: null,
};

const SymptomContext = createContext<SymptomContextType | undefined>(undefined);

export function SymptomProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<SymptomCheckerState>(defaultState);

  const addSymptom = (symptom: string) => {
    const trimmed = symptom.trim().toLowerCase();
    if (trimmed && !state.symptoms.includes(trimmed)) {
      setState(prev => ({
        ...prev,
        symptoms: [...prev.symptoms, trimmed],
      }));
    }
  };

  const removeSymptom = (symptom: string) => {
    setState(prev => ({
      ...prev,
      symptoms: prev.symptoms.filter(s => s !== symptom),
    }));
  };

  const clearSymptoms = () => {
    setState(prev => ({
      ...prev,
      symptoms: [],
    }));
  };

  const setResults = (
    results: PredictionResult[],
    riskLevel: SymptomCheckerState['riskLevel'],
    reasoning: string,
    recommendation: string
  ) => {
    setState(prev => ({
      ...prev,
      results,
      riskLevel,
      reasoning,
      recommendation,
      timestamp: new Date(),
      isLoading: false,
    }));
  };

  const setLoading = (loading: boolean) => {
    setState(prev => ({
      ...prev,
      isLoading: loading,
    }));
  };

  const reset = () => {
    setState(defaultState);
  };

  return (
    <SymptomContext.Provider
      value={{
        ...state,
        addSymptom,
        removeSymptom,
        clearSymptoms,
        setResults,
        setLoading,
        reset,
      }}
    >
      {children}
    </SymptomContext.Provider>
  );
}

export function useSymptom() {
  const context = useContext(SymptomContext);
  if (!context) {
    throw new Error('useSymptom must be used within SymptomProvider');
  }
  return context;
}
