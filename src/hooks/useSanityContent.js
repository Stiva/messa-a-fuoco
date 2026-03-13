import { useState, useEffect } from 'react';
import { fetchSanity } from '../lib/sanity';

const CACHE_KEY = 'sanity_content_cache';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCachedContent() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, timestamp } = JSON.parse(raw);
    if (Date.now() - timestamp > CACHE_TTL) {
      sessionStorage.removeItem(CACHE_KEY);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

function setCachedContent(data) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
  } catch {
    // sessionStorage quota exceeded or unavailable
  }
}

export default function useSanityContent() {
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cached = getCachedContent();
    if (cached) {
      setContent(cached);
      setIsLoading(false);
      return;
    }

    async function load() {
      // Fetch all content types in a single request using GROQ
      const query = `{
        "step1": *[_type == "step1Intro"][0]{
          title, subtitle, bodyParagraphs, buttonLabel
        },
        "quizQuestions": *[_type == "quizQuestion"] | order(order asc) {
          questionId, text, order,
          options[]{ id, label }
        },
        "quizProfiles": *[_type == "quizProfile"] {
          key, name, tagline, emoji
        },
        "focusCards": *[_type == "step3Focus"] {
          profileKey, name, subtitle,
          punti, 
          extra[]{ title, note }
        },
        "gameInstructions": *[_type == "gameInstructions"][0]{
          sections[]{ title, icon, items }
        },
        "step4": *[_type == "step4Output"][0]{
          headerTitle, headerText,
          action1Title, action1Text, action1SubText,
          action2Title, action2Text, action2SubText, action2Note, formUrl,
          closingText
        }
      }`;

      const result = await fetchSanity(query);

      if (result && Object.values(result).some(v => v !== null)) {
        // Transform quiz profiles into a keyed object { A: {...}, B: {...}, C: {...} }
        if (result.quizProfiles && result.quizProfiles.length > 0) {
          const profilesMap = {};
          result.quizProfiles.forEach(p => { profilesMap[p.key] = p; });
          result.quizProfiles = profilesMap;
        }

        // Transform focus cards into a keyed object { A: {...}, B: {...}, C: {...} }
        if (result.focusCards && result.focusCards.length > 0) {
          const focusMap = {};
          result.focusCards.forEach(f => { focusMap[f.profileKey] = f; });
          result.focusCards = focusMap;
        }

        // Transform quiz questions to match current format
        if (result.quizQuestions && result.quizQuestions.length > 0) {
          result.quizQuestions = result.quizQuestions.map(q => ({
            id: q.questionId,
            text: q.text,
            options: q.options
          }));
        }

        setCachedContent(result);
        setContent(result);
      }

      setIsLoading(false);
    }

    load();
  }, []);

  return { content, isLoading };
}
