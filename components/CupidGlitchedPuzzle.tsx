'use client'
import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';

const numbers = ['2015', '2018', '2019', '∞'];
const loveWords = ['amor', 'amore', 'amour', '愛', 'Liebe', '사랑', 'любовь', 'αγάπη', '爱', 'kärlek'];
const endGameWords = ['fin del juego', '終局', 'fin du jeu', 'конец игры', 'spielende', '게임 끝', 'τέλος παιχνιδιού', 'fine gioco', '遊戲結束'];
const characters = '01アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';

const CupidGlitchedPuzzle = () => {
  const [cryptoInput, setCryptoInput] = useState('');
  const [cryptoResult, setCryptoResult] = useState('');
  const [translateInput, setTranslateInput] = useState('');
  const [translateResult, setTranslateResult] = useState('');
  const [finalInput, setFinalInput] = useState('');
  const [finalResult, setFinalResult] = useState('');
  const [floatingChars, setFloatingChars] = useState<Array<{id: number; char: string; left: number; delay: number}>>([]);

  useEffect(() => {
    gsap.from(".section", {
      duration: 1,
      opacity: 0,
      y: -50,
      stagger: 0.3,
      ease: "power2.out"
    });

    // Create initial floating characters
    const initialChars = Array.from({length: 20}, (_, i) => {
      const rand = Math.random();
      let char;
      if (rand < 0.1) { // 10% chance for numbers
        char = numbers[Math.floor(Math.random() * numbers.length)];
      } else if (rand < 0.25) { // 15% chance for love words
        char = loveWords[Math.floor(Math.random() * loveWords.length)];
      } else if (rand < 0.35) { // 10% chance for end game words
        char = endGameWords[Math.floor(Math.random() * endGameWords.length)];
      } else { // 65% chance for random characters
        char = characters[Math.floor(Math.random() * characters.length)];
      }
      return {
        id: i,
        char: char,
        left: Math.random() * 100,
        delay: Math.random() * 5
      };
    });
    setFloatingChars(initialChars);

    // Update the interval logic
    const interval = setInterval(() => {
      setFloatingChars(prev => {
        const rand = Math.random();
        let char;
        if (rand < 0.1) {
          char = numbers[Math.floor(Math.random() * numbers.length)];
        } else if (rand < 0.25) {
          char = loveWords[Math.floor(Math.random() * loveWords.length)];
        } else if (rand < 0.35) {
          char = endGameWords[Math.floor(Math.random() * endGameWords.length)];
        } else {
          char = characters[Math.floor(Math.random() * characters.length)];
        }
        const newChar = {
          id: Date.now(),
          char: char,
          left: Math.random() * 100,
          delay: 0
        };
        return [...prev.slice(-19), newChar];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const checkCrypto = () => {
    // "BR OR WHQJR" shifted back by 3 yields "YO LO TENGO"
    const userInput = cryptoInput.trim().toUpperCase();
    const correctAnswer = "YO LO TENGO";
    if (userInput === correctAnswer) {
      setCryptoResult("Correct! (This means 'I've got him')");
    } else {
      setCryptoResult("Glitch detected. Reapply the -3 shift.");
    }
  };

  const checkTranslation = () => {
    // "maintenant dis au revoir" translates to "now say good bye"
    const userInput = translateInput.trim().toLowerCase();
    const correctAnswer = "now say good bye";
    if (userInput === correctAnswer) {
      setTranslateResult("Correct! (Translation accepted)");
    } else {
      setTranslateResult("Error: Translation not recognized.");
    }
  };

  const checkFinal = () => {
    // Final answer: "I've got him, now say good bye"
    const userInput = finalInput.trim().toLowerCase();
    const correctAnswer = "i've got him, now say good bye";
    if (userInput === correctAnswer) {
      setFinalResult("Success! The glitch is resolved, and the secret is revealed.");
    } else {
      setFinalResult("System error: Final message incorrect. Reassess your clues.");
    }
  };

  return (
    <div className="container">
      <div className="floating-characters">
        {floatingChars.map(({id, char, left, delay}) => (
          <div
            key={id}
            className="floating-char"
            style={{
              left: `${left}%`,
              animationDelay: `${delay}s`
            }}
          >
            {char}
          </div>
        ))}
      </div>
      <div className="header-section">
        <h1 className="glitch" data-text="CUPID'S PUZZLE">CUPID'S PUZZLE</h1>
        <p className="glitch" data-text="Decrypt the secrets, translate the unknown, assemble the shards of truth...">
          Decrypt the secrets, translate the unknown, assemble the shards of truth...
        </p>
      </div>

      {/* Layer 1: Cryptography Puzzle */}
      <div className="section" id="crypto-section">
        <h2 className="glitch" data-text="Layer 1: Cryptography">Layer 1: Cryptography</h2>
        <p className="glitch" data-text="Apply a -3 shift to this cipher:">Apply a -3 shift to this cipher:</p>
        <p style={{ textAlign: 'center', fontSize: '1.3em' }} className="glitch" data-text="BR OR WHQJR">
          <strong>BR OR WHQJR</strong>
        </p>
        <input
          type="text"
          value={cryptoInput}
          onChange={(e) => setCryptoInput(e.target.value)}
          placeholder="Enter decrypted text"
        />
        <br />
        <button onClick={checkCrypto}>Submit</button>
        <p className="result">{cryptoResult}</p>
      </div>

      {/* Layer 2: Translation Puzzle */}
      <div className="section" id="translate-section">
        <h2 className="glitch" data-text="Layer 2: Translation">Layer 2: Translation</h2>
        <p className="glitch" data-text="Translate this French incantation:">Translate this French incantation:</p>
        <p style={{ textAlign: 'center', fontSize: '1.3em' }} className="glitch" data-text="maintenant dis au revoir">
          <strong>maintenant dis au revoir</strong>
        </p>
        <input
          type="text"
          value={translateInput}
          onChange={(e) => setTranslateInput(e.target.value)}
          placeholder="Enter translation"
        />
        <br />
        <button onClick={checkTranslation}>Submit</button>
        <p className="result">{translateResult}</p>
      </div>

      {/* Final Combination Puzzle */}
      <div className="section" id="final-section">
        <h2 className="glitch" data-text="Final Layer: Combine the Clues">Final Layer: Combine the Clues</h2>
        <p className="glitch" data-text="Now fuse your revelations into one message.">
          Now fuse your revelations into one message.
        </p>
        <p className="glitch" data-text='Hint: They form the phrase "[Crypto Answer], [Translation Answer]"'>
          Hint: They form the phrase "[Crypto Answer], [Translation Answer]"
        </p>
        <p className="glitch ts-lore" data-text="Remember: 'In the end, truth glitches through.'">
          Remember: "In the end, truth glitches through."
        </p>
        <input
          type="text"
          value={finalInput}
          onChange={(e) => setFinalInput(e.target.value)}
          placeholder="Enter final secret message"
        />
        <br />
        <button onClick={checkFinal}>Submit Final Answer</button>
        <p className="result">{finalResult}</p>
      </div>

      <style jsx>{`
        .container {
          text-align: center;
          padding: 20px;
        }
        .header-section {
          margin: 0 auto;
          max-width: 800px;
          padding: 20px 0 40px;
        }
        h1 {
          font-size: 2.5em;
          margin-bottom: 20px;
        }
        h1.glitch {
          width: 100%;
          text-align: center;
          margin: 0 auto 20px;
        }
        .header-section p {
          font-size: 1.3em;
          max-width: 600px;
          margin: 0 auto;
        }
        .section {
          background: #000;
          border: 2px solid #ff0000;
          border-radius: 8px;
          padding: 15px;
          margin: 20px auto;
          max-width: 600px;
          text-align: left;
          position: relative;
          overflow: hidden;
          box-shadow: 0 0 15px rgba(255, 0, 0, 0.3);
          animation: pulse 2s infinite;
        }
        input[type='text'] {
          width: 90%;
          padding: 8px;
          margin: 10px 0;
          border-radius: 5px;
          border: 1px solid #ff0000;
          background: rgba(0, 0, 0, 0.8);
          color: #fff;
          font-size: 1em;
        }
        button {
          padding: 8px 16px;
          font-size: 1em;
          background: #800000;
          color: #fff;
          border: 1px solid #ff0000;
          border-radius: 5px;
          cursor: pointer;
          margin-bottom: 10px;
          transition: all 0.3s ease;
        }
        button:hover {
          background: #ff0000;
          box-shadow: 0 0 15px #ff0000;
          transform: scale(1.05);
        }
        .result {
          font-size: 1.1em;
          margin-top: 10px;
          color: #ff0000;
          text-shadow: 0 0 5px #ff0000;
        }
        .ts-lore {
          font-style: italic;
          color: #ff8888;
          margin-top: 10px;
        }
        /* Updated Glitch Effect */
        .glitch {
          position: relative;
          color: #fff;
          font-size: 1.2em;
          display: inline-block;
          text-shadow: 0 0 5px #fff;
        }
        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          opacity: 0.8;
        }
        .glitch::before {
          left: 2px;
          text-shadow: -2px 0 #ff0000;
          animation: glitch 2s infinite linear alternate-reverse;
        }
        .glitch::after {
          left: -2px;
          text-shadow: 2px 0 #800000;
          animation: glitch 3s infinite linear alternate-reverse;
        }
        @keyframes glitch {
          0% { clip: rect(42px, 9999px, 44px, 0); transform: skew(0.5deg); }
          5% { clip: rect(12px, 9999px, 80px, 0); transform: skew(-0.5deg); }
          10% { clip: rect(85px, 9999px, 95px, 0); transform: skew(0.5deg); }
          15% { clip: rect(5px, 9999px, 20px, 0); transform: skew(-0.5deg); }
          20% { clip: rect(42px, 9999px, 44px, 0); transform: skew(0.5deg); }
          25% { clip: rect(12px, 9999px, 80px, 0); transform: skew(-0.5deg); }
          30% { clip: rect(85px, 9999px, 95px, 0); transform: skew(0.5deg); }
          35% { clip: rect(5px, 9999px, 20px, 0); transform: skew(-0.5deg); }
          40% { clip: rect(42px, 9999px, 44px, 0); transform: skew(0.5deg); }
          45% { clip: rect(12px, 9999px, 80px, 0); transform: skew(-0.5deg); }
          50% { clip: rect(85px, 9999px, 95px, 0); transform: skew(0.5deg); }
          55% { clip: rect(5px, 9999px, 20px, 0); transform: skew(-0.5deg); }
          60% { clip: rect(42px, 9999px, 44px, 0); transform: skew(0.5deg); }
          65% { clip: rect(12px, 9999px, 80px, 0); transform: skew(-0.5deg); }
          70% { clip: rect(85px, 9999px, 95px, 0); transform: skew(0.5deg); }
          75% { clip: rect(5px, 9999px, 20px, 0); transform: skew(-0.5deg); }
          80% { clip: rect(42px, 9999px, 44px, 0); transform: skew(0.5deg); }
          85% { clip: rect(12px, 9999px, 80px, 0); transform: skew(-0.5deg); }
          90% { clip: rect(85px, 9999px, 95px, 0); transform: skew(0.5deg); }
          95% { clip: rect(5px, 9999px, 20px, 0); transform: skew(-0.5deg); }
          100% { clip: rect(42px, 9999px, 44px, 0); transform: skew(0.5deg); }
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 15px rgba(255, 0, 0, 0.3); }
          50% { box-shadow: 0 0 25px rgba(255, 0, 0, 0.5); }
          100% { box-shadow: 0 0 15px rgba(255, 0, 0, 0.3); }
        }
        /* Add a flickering effect */
        @keyframes flicker {
          0% { opacity: 0.8; }
          5% { opacity: 0.3; }
          10% { opacity: 0.8; }
          15% { opacity: 0.3; }
          20% { opacity: 0.8; }
          100% { opacity: 0.8; }
        }
        .section:hover {
          animation: flicker 0.5s infinite;
        }
        .floating-characters {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
        }
        .floating-char {
          position: absolute;
          color: #ff0000;
          opacity: 0.5;
          font-size: 1.2em;
          animation: float 8s linear infinite;
          text-shadow: 0 0 5px #ff0000;
        }
        @keyframes float {
          0% {
            transform: translateY(100vh);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100px);
            opacity: 0;
          }
        }
        /* Make sure content appears above floating characters */
        .header-section, .section {
          position: relative;
          z-index: 2;
        }
      `}</style>
    </div>
  );
};

export default CupidGlitchedPuzzle;
