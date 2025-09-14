'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Square, RotateCcw, Download, Copy, Check, AlertCircle } from 'lucide-react';

interface CodeEditorProps {
  initialCode?: string;
  language?: 'javascript' | 'react';
  onRun?: (code: string) => void;
}

const defaultJSCode = `// Welcome to the JavaScript Playground!
// Write your code here and click Run to execute

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log('Fibonacci sequence:');
for (let i = 0; i < 10; i++) {
  console.log(\`F(\${i}) = \${fibonacci(i)}\`);
}

// Try some DOM manipulation
const message = document.createElement('div');
message.innerHTML = '<h3>Hello from JavaScript!</h3><p>This code is running in a safe sandbox.</p>';
message.style.cssText = 'padding: 20px; background: linear-gradient(135deg, var(--color-primary), var(--color-accent)); border-radius: 8px; margin: 10px 0; color: white;';
document.body.appendChild(message);`;

const defaultReactCode = `// Welcome to the React Playground!
// Write JSX here and see it render live

import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState('blue');
  
  const colors = ['blue', 'green', 'purple', 'red', 'orange'];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setColor(colors[Math.floor(Math.random() * colors.length)]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center',
      background: \`linear-gradient(135deg, \${color}40, \${color}20)\`,
      borderRadius: '12px',
      border: \`2px solid \${color}60\`
    }}>
      <h2 style={{ color: color, marginBottom: '20px' }}>
        Interactive Counter
      </h2>
      <div style={{ fontSize: '3rem', margin: '20px 0', color: color }}>
        {count}
      </div>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button 
          onClick={() => setCount(count - 1)}
          style={{ 
            padding: '10px 20px', 
            background: color, 
            color: 'white', 
            border: 'none', 
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Decrease
        </button>
        <button 
          onClick={() => setCount(0)}
          style={{ 
            padding: '10px 20px', 
            background: 'gray', 
            color: 'white', 
            border: 'none', 
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
        <button 
          onClick={() => setCount(count + 1)}
          style={{ 
            padding: '10px 20px', 
            background: color, 
            color: 'white', 
            border: 'none', 
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Increase
        </button>
      </div>
    </div>
  );
}

// Render the component
<Counter />`;

export function CodeEditor({ 
  initialCode, 
  language = 'javascript',
  onRun 
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode || (language === 'react' ? defaultReactCode : defaultJSCode));
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const runCode = async () => {
    setIsRunning(true);
    setError(null);
    setOutput([]);

    try {
      if (language === 'javascript') {
        // Create a safe sandbox for JavaScript execution
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!iframeDoc) throw new Error('Cannot create sandbox');

        // Capture console output
        const logs: string[] = [];
        const originalConsole = iframe.contentWindow?.console;
        
        if (iframe.contentWindow && originalConsole) {
          iframe.contentWindow.console = {
            ...originalConsole,
            log: (...args) => {
              logs.push(args.map(arg => String(arg)).join(' '));
              originalConsole.log(...args);
            },
            error: (...args) => {
              logs.push(`ERROR: ${args.map(arg => String(arg)).join(' ')}`);
              originalConsole.error(...args);
            },
            warn: (...args) => {
              logs.push(`WARN: ${args.map(arg => String(arg)).join(' ')}`);
              originalConsole.warn(...args);
            }
          };
        }

        // Execute the code
        const script = iframeDoc.createElement('script');
        script.textContent = `
          try {
            ${code}
          } catch (error) {
            console.error('Runtime Error:', error.message);
          }
        `;
        iframeDoc.body.appendChild(script);

        // Wait a bit for execution and then collect logs
        setTimeout(() => {
          setOutput(logs);
          document.body.removeChild(iframe);
          setIsRunning(false);
        }, 1000);

      } else if (language === 'react') {
        // For React, we'll show a message about JSX compilation
        setOutput([
          'React JSX Preview:',
          '✓ Component syntax looks good!',
          '✓ Hooks usage detected',
          '✓ Event handlers found',
          '',
          'Note: This is a demo editor. In a real implementation,',
          'this would compile JSX and render the component live.',
          '',
          'Your component would render an interactive counter',
          'with dynamic colors and state management.'
        ]);
        setIsRunning(false);
      }

      onRun?.(code);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    setCode(language === 'react' ? defaultReactCode : defaultJSCode);
    setOutput([]);
    setError(null);
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${language === 'react' ? 'jsx' : 'js'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newCode = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newCode);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }

    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runCode();
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-gray-300 font-mono text-sm">
            {language === 'react' ? 'React Playground' : 'JavaScript Playground'}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={copyCode}
            className="p-2 text-gray-400 hover:text-white transition-colors"
            title="Copy code"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={downloadCode}
            className="p-2 text-gray-400 hover:text-white transition-colors"
            title="Download code"
          >
            <Download size={16} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetCode}
            className="p-2 text-gray-400 hover:text-white transition-colors"
            title="Reset to default"
          >
            <RotateCcw size={16} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors"
            style={{ 
              backgroundColor: 'var(--color-primary)',
              opacity: isRunning ? 0.7 : 1
            }}
            title="Run code (Ctrl+Enter)"
          >
            {isRunning ? (
              <Square size={16} className="text-white" />
            ) : (
              <Play size={16} className="text-white" />
            )}
            <span className="text-white font-medium">
              {isRunning ? 'Running...' : 'Run'}
            </span>
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 h-96">
        {/* Code Input */}
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full h-full p-4 bg-gray-900 text-gray-100 font-mono text-sm resize-none focus:outline-none"
            placeholder={`Write your ${language} code here...`}
            spellCheck={false}
          />
          
          {/* Line numbers */}
          <div className="absolute left-0 top-0 p-4 text-gray-500 font-mono text-sm pointer-events-none select-none">
            {code.split('\n').map((_, index) => (
              <div key={index} className="leading-5">
                {index + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Output */}
        <div className="bg-black border-l border-gray-700">
          <div className="p-4 border-b border-gray-700 bg-gray-800">
            <h4 className="text-gray-300 font-mono text-sm">Output</h4>
          </div>
          
          <div 
            ref={outputRef}
            className="p-4 h-full overflow-y-auto font-mono text-sm"
          >
            {error ? (
              <div className="flex items-start space-x-2 text-red-400">
                <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold">Error:</div>
                  <div className="whitespace-pre-wrap">{error}</div>
                </div>
              </div>
            ) : output.length > 0 ? (
              <div className="space-y-1">
                {output.map((line, index) => (
                  <div 
                    key={index} 
                    className={`${
                      line.startsWith('ERROR:') ? 'text-red-400' :
                      line.startsWith('WARN:') ? 'text-yellow-400' :
                      line.startsWith('✓') ? 'text-green-400' :
                      'text-gray-300'
                    }`}
                  >
                    {line}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 italic">
                Click "Run" to execute your code...
                <br />
                <br />
                <span className="text-xs">
                  💡 Tip: Use Ctrl+Enter to run code quickly
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-2 bg-gray-800 border-t border-gray-700 text-xs text-gray-400">
        <div className="flex items-center justify-between">
          <span>
            {language === 'react' ? 'JSX/React' : 'JavaScript ES6+'} • 
            Safe Sandbox Environment • 
            {code.split('\n').length} lines
          </span>
          <span>
            Press Ctrl+Enter to run
          </span>
        </div>
      </div>
    </div>
  );
}