import { useState, useEffect } from 'react';

/** Bump when plan storage shape changes (e.g. tappa1..5 → dynamic keys). */
const PLAN_VERSION = 2;

const initialState = {
  currentStep: 1,
  quizAnswers: {},
  profile: null,
  plan: {},
  planVersion: PLAN_VERSION,
};

const STORAGE_KEY = 'scoutWizardState';

function normalizeLoadedState(raw) {
  if (!raw || typeof raw !== 'object') return initialState;
  const plan = raw.plan && typeof raw.plan === 'object' ? raw.plan : {};
  const hasLegacyKeys = Object.keys(plan).some((k) => /^tappa\d+$/.test(k));
  const version = raw.planVersion ?? 1;
  if (hasLegacyKeys && version < PLAN_VERSION) {
    return {
      ...raw,
      plan: {},
      planVersion: PLAN_VERSION,
    };
  }
  return {
    ...initialState,
    ...raw,
    plan,
    planVersion: PLAN_VERSION,
  };
}

export default function useWizardState() {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? normalizeLoadedState(JSON.parse(saved)) : initialState;
    } catch (e) {
      return initialState;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const nextStep = () => {
    setState((prev) => ({ ...prev, currentStep: Math.min(prev.currentStep + 1, 4) }));
  };

  const prevStep = () => {
    setState((prev) => ({ ...prev, currentStep: Math.max(prev.currentStep - 1, 1) }));
  };

  const setQuizAnswer = (questionId, answer) => {
    setState((prev) => ({
      ...prev,
      quizAnswers: {
        ...prev.quizAnswers,
        [questionId]: answer,
      },
    }));
  };

  const setProfile = (profile) => {
    setState((prev) => ({ ...prev, profile }));
  };

  const updatePlan = (stepKey, value) => {
    setState((prev) => ({
      ...prev,
      plan: {
        ...prev.plan,
        [stepKey]: value,
      },
    }));
  };

  /** Allinea le chiavi del piano alle tappe da CMS (preserva testo già scritto). */
  const syncPlanKeys = (stepKeys) => {
    if (!Array.isArray(stepKeys) || stepKeys.length === 0) return;
    setState((prev) => {
      const next = {};
      stepKeys.forEach((k) => {
        next[k] = prev.plan[k] ?? '';
      });
      return { ...prev, plan: next, planVersion: PLAN_VERSION };
    });
  };

  const jumpToStep = (step) => {
    setState((prev) => ({ ...prev, currentStep: step }));
  };

  const resetState = () => {
    if (
      window.confirm(
        'Sei sicuro di voler azzerare il sentiero? Perderai tutti i progressi.'
      )
    ) {
      localStorage.removeItem(STORAGE_KEY);
      setState(initialState);
    }
  };

  return {
    state,
    actions: {
      nextStep,
      prevStep,
      jumpToStep,
      setQuizAnswer,
      setProfile,
      updatePlan,
      syncPlanKeys,
      resetState,
    },
  };
}
