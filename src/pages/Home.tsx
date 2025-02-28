import React from 'react';
import { TopicCard } from '../components/TopicCard';
import { topics } from '../data/topics';
import { motion } from 'framer-motion';

export const Home: React.FC = () => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Mathematical Programming Platform
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore advanced optimization techniques and mathematical programming concepts
          through interactive learning and problem-solving.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {topics.map((topic, index) => (
          <TopicCard key={topic.id} topic={topic} index={index} />
        ))}
      </div>
    </div>
  );
};