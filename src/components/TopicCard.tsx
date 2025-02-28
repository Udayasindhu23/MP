import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { Topic } from '../types';
import { motion } from 'framer-motion';

interface TopicCardProps {
  topic: Topic;
  index: number;
}

export const TopicCard: React.FC<TopicCardProps> = ({ topic, index }) => {
  const navigate = useNavigate();
  const Icon = Icons[topic.icon as keyof typeof Icons];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
      onClick={() => navigate(`/${topic.id}`)}
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="p-3 bg-blue-50 rounded-lg">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">{topic.title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{topic.description}</p>
      <div className="space-y-2">
        {topic.subtopics.slice(0, 3).map((subtopic) => (
          <div key={subtopic.id} className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
            <span className="text-sm text-gray-700">{subtopic.title}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};