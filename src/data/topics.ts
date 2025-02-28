import { Topic } from '../types';

export const topics: Topic[] = [
  {
    id: 'linear-programming',
    title: 'Linear Programming',
    description: 'Optimize linear objective functions subject to linear constraints',
    icon: 'LineChart',
    subtopics: [
      {
        id: 'graphical-method',
        title: 'Graphical Method',
        description: 'Solve LPP problems using geometric visualization',
        path: '/linear-programming/graphical-method'
      },
      {
        id: 'simplex-method',
        title: 'Simplex Method',
        description: 'Systematic approach to solving linear programming problems',
        path: '/linear-programming/simplex-method'
      },
      // Add other subtopics...
    ]
  },
  {
    id: 'combinatorial-optimization',
    title: 'Combinatorial Optimization',
    description: 'Find optimal objects from a finite set of objects',
    icon: 'Network',
    subtopics: [
      {
        id: 'integer-programming',
        title: 'Integer Programming',
        description: 'Optimization problems with integer variables',
        path: '/combinatorial-optimization/integer-programming'
      },
      // Add other subtopics...
    ]
  },
  {
    id: 'non-linear-programming',
    title: 'Non-Linear Programming',
    description: 'Optimize objective functions with non-linear constraints',
    icon: 'TrendingUp',
    subtopics: [
      {
        id: 'quadratic-programming',
        title: 'Quadratic Programming',
        description: 'Optimize quadratic objective functions',
        path: '/non-linear-programming/quadratic-programming'
      },
      // Add other subtopics...
    ]
  },
  {
    id: 'infinite-dimensional-optimization',
    title: 'Infinite Dimensional Optimization',
    description: 'Advanced optimization techniques for complex problems',
    icon: 'Infinity',
    subtopics: [
      {
        id: 'genetic-algorithm',
        title: 'Genetic Algorithm',
        description: 'Nature-inspired optimization method',
        path: '/infinite-dimensional-optimization/genetic-algorithm'
      },
      // Add other subtopics...
    ]
  }
];