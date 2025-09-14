'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Zap, BookOpen, Lightbulb } from 'lucide-react';
import { CodeEditor } from './code-editor';

export function PlaygroundSection() {
  const [activeTab, setActiveTab] = useState<'javascript' | 'react'>('javascript');

  const handleCodeRun = (code: string) => {
    // Track code execution for achievements
    if (typeof window !== 'undefined' && (window as any).achievementSystem) {
      (window as any).achievementSystem.unlock('playground-master');
    }
  };

  return (
    <section id="playground" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Code className="text-white" size={32} />
            <Zap size={24} style={{ color: 'var(--color-primary)' }} />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Code Playground
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experiment with JavaScript and React in a safe, interactive environment. 
            Write code, see results instantly, and explore modern web development.
          </p>
        </motion.div>

        {/* Language Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-gray-800 p-1 rounded-lg border border-gray-700">
            {[
              { id: 'javascript', label: 'JavaScript', icon: Code },
              { id: 'react', label: 'React JSX', icon: Zap }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'javascript' | 'react')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-md transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'text-white shadow-lg'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
                style={{
                  backgroundColor: activeTab === tab.id ? 'var(--color-primary)' : 'transparent'
                }}
              >
                <tab.icon size={18} />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Code Editor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <CodeEditor 
            key={activeTab}
            language={activeTab}
            onRun={handleCodeRun}
          />
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: Zap,
              title: 'Instant Execution',
              description: 'Run JavaScript code immediately with real-time output and error handling in a secure sandbox environment.'
            },
            {
              icon: Code,
              title: 'Modern Syntax',
              description: 'Full ES6+ support with async/await, destructuring, arrow functions, and all modern JavaScript features.'
            },
            {
              icon: BookOpen,
              title: 'React Playground',
              description: 'Experiment with JSX, hooks, and React components. Perfect for testing ideas and learning React patterns.'
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div 
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  <feature.icon className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
              </div>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.0 }}
          className="mt-12 bg-gray-800 rounded-lg p-6 border border-gray-700"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Lightbulb className="text-yellow-400" size={24} />
            <h3 className="text-lg font-semibold text-white">Pro Tips</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div className="space-y-2">
              <p><strong className="text-white">Keyboard Shortcuts:</strong></p>
              <ul className="space-y-1 text-gray-400">
                <li>• <code className="bg-gray-700 px-1 rounded">Ctrl+Enter</code> - Run code</li>
                <li>• <code className="bg-gray-700 px-1 rounded">Tab</code> - Indent (2 spaces)</li>
                <li>• <code className="bg-gray-700 px-1 rounded">Ctrl+A</code> - Select all</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <p><strong className="text-white">Try These Examples:</strong></p>
              <ul className="space-y-1 text-gray-400">
                <li>• Async/await with fetch API</li>
                <li>• Array methods (map, filter, reduce)</li>
                <li>• React hooks (useState, useEffect)</li>
                <li>• DOM manipulation</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}