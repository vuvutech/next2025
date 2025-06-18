'use client';
// import styles from './style.module.scss';
import { useEffect, useState } from 'react';
import { motion, useAnimation, easeInOut } from 'framer-motion';

const words = [
  'Hello',
  'Bonjour',
  'Ciao',
  'Olà',
  'やあ',
  'Hallå',
  'Guten tag',
  'Hallo',
];
const welcomeWords = [
  'Welcome', // English
  'Bienvenue', // French
  'Benvenuto', // Italian
  'Bienvenido', // Spanish
  'Willkommen', // German
  'Bem-vindo', // Portuguese
  'ようこそ', // Japanese (Yōkoso)
  '欢迎', // Chinese (Huānyíng)
  '환영합니다', // Korean (Hwanyeonghamnida)
  'Добро пожаловать', // Russian (Dobro pozhalovat')
  'Velkommen', // Norwegian/Danish
  'Välkommen', // Swedish
  'Welkom', // Dutch
  'Καλωσόρισες', // Greek (Kalósórises)
  'Sveiki atvykę', // Lithuanian
  'Tervetuloa', // Finnish
  'Witamy', // Polish
  'Karibu', // Swahili
  'Bula', // Fijian
  'स्वागत है', // Hindi (Swāgat hai)
];

export default function Preloader() {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    if (index == words.length - 1) return;
    setTimeout(
      () => {
        setIndex(index + 1);
      },
      index == 0 ? 1000 : 150
    );
  }, [index]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height + 300} 0 ${
    dimension.height
  }  L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`;

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: easeInOut },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: easeInOut, delay: 0.3 },
    },
  };

  const line = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: 'linear' },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: 'linear', delay: 0.3 },
    },
  };

  return (
    <motion.div
      variants={slideUp}
      initial='initial'
      exit='exit'
      className={`introduction `}>
      {dimension.width > 0 && (
        <>
          <motion.p variants={opacity} initial='initial' animate='enter'>
            <span></span>
            {welcomeWords[index]}
          </motion.p>
          <svg>
            <motion.path
              variants={curve}
              initial='initial'
              exit='exit'></motion.path>
          </svg>
        </>
      )}
    </motion.div>
  );
}

export const opacity = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 0.75,
    transition: { duration: 1, delay: 0.2 },
  },
};

export const slideUp = {
  initial: {
    top: 0,
  },
  exit: {
    top: '-100vh',
    transition: { duration: 0.8, ease: easeInOut, delay: 0.2 },
  },
};
