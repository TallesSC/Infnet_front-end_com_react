'use client';
import styles from './TermoGame.module.scss';
import { useEffect, useState } from 'react';
import { WORDS } from '@/data/words';
import classNames from 'classnames';

const MAX_ROUNDS = 6;
const MAX_LETTERS = 5;

export default function TermoGame() {

  const secretWord = 'lapis';

  const [currentRound, setCurrentRound] = useState<number>(1);
  const [currentWord, setCurrentWord] = useState<string>('');
  const [words, setWords] = useState<string[]>([]);

  function deleteLetter() {
    setCurrentWord((oldWord) => oldWord.slice(0, -1));
  }

  function checkGuess() {
    setCurrentWord('');
    setCurrentRound((oldRound) => oldRound > MAX_ROUNDS ? oldRound : oldRound + 1);
  }

  function insertLetter(letter: string) {
    setCurrentWord((oldWord) => oldWord.length === MAX_LETTERS ? oldWord : oldWord.concat(letter));
  }

  function handleKey(event: KeyboardEvent) {
    if (currentRound > MAX_ROUNDS) return;

    const {key} = event;
    console.log(`PRESSED ${key}`);

    if (key === 'Enter') {
      checkGuess();
      return;
    }
    
    if (key === 'Backspace') {
      deleteLetter();
      return;
    } 

    const keyIsLetter = key.match(/[a-zA-Z]/gi);
    if (!keyIsLetter || keyIsLetter.length > 1 || currentWord.length >= MAX_LETTERS) return;

    insertLetter(key.toLowerCase());

    console.log('------------------')
  }

  useEffect(() => {
    console.log(`currentWord = ${currentWord}`);
    setWords(oldWords => {
      let newWords = oldWords;
      newWords[currentRound-1] = currentWord;
      return newWords;
    })
  }, [currentWord]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  return (
    <section className="container">
      <h1 className={styles.title}>TERMO</h1>
      <div className={styles.wrapper}>
        {
          Array(MAX_ROUNDS).fill('').map((item, index) => (
            <Line key={`line_${index}`}
                  // word={index + 1 === currentRound ? currentWord : (words?.[index] ?? '')}
                  word={index + 1 === currentRound ? currentWord : (words?.[index] ?? '')}
                  // isCurrent={index + 1 === currentRound}
                  round={index + 1}
                  currentRound={currentRound}
                  secretWord={secretWord}/>
          ))
        }
      </div>
    </section>
  );
}

interface Line {
  word: string,
  round: number,
  currentRound: number,
  secretWord: string,
}

function Line({word, round, currentRound, secretWord}: Line) {
  return (
    <div className={classNames(styles.line)}>
      {
        Array(MAX_LETTERS).fill('').map((item, index) => (
          <Square key={`line_${round}-letter_${index + 1}`}
                  letter={word[index]}
                  word={word}
                  secretWord={secretWord}
                  round={round}
                  currentRound={currentRound}
                  index={index}/>
        ))
      }
    </div>
  );
}


interface Square {
  letter?: string;
  word: string,
  secretWord: string,
  index: number
  round: number,
  currentRound: number,
}

function Square({letter = '', word, secretWord, index, round, currentRound}: Square) {

  const isOldRound = round < currentRound;
  const isFutureRound = round > currentRound;
  const isCorrect = letter === secretWord[index] && isOldRound;
  const isPresent = letter !== '' && letter !== secretWord[index] && secretWord.includes(letter) && isOldRound;
  const isWrong = !isCorrect && !isPresent && isOldRound;

  return (
    <div className={classNames(
      styles.square,
      {[styles.correct]: isCorrect},
      {[styles.present]: isPresent},
      {[styles.wrong]: isWrong},
      {[styles.disabled]: isFutureRound},
      {[styles.highlighted]: !isOldRound && !isFutureRound && index === word.length }
    )}>
      {letter}
    </div>
  );
}
