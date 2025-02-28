import React, { useState } from 'react';
import { LineChart } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Constraint {
  x1Coefficient: number;
  x2Coefficient: number;
  inequality: string;
  constant: number;
}

export const LinearProgramming: React.FC = () => {
  const [objective, setObjective] = useState({
    x1Coefficient: 3,
    x2Coefficient: 2,
    type: 'maximize'
  });
  const [constraints, setConstraints] = useState<Constraint[]>([
    { x1Coefficient: 2, x2Coefficient: 1, inequality: '<=', constant: 100 },
    { x1Coefficient: 1, x2Coefficient: 1, inequality: '<=', constant: 80 },
    { x1Coefficient: 1, x2Coefficient: 0, inequality: '>=', constant: 0 },
    { x1Coefficient: 0, x2Coefficient: 1, inequality: '>=', constant: 0 }
  ]);

  // Generate points for plotting constraints
  const generatePoints = (constraint: Constraint) => {
    const points = [];
    const { x1Coefficient, x2Coefficient, constant } = constraint;
    
    if (x1Coefficient === 0) {
      // Vertical line
      for (let y = 0; y <= 100; y += 10) {
        points.push({ x: constant / x2Coefficient, y });
      }
    } else if (x2Coefficient === 0) {
      // Horizontal line
      for (let x = 0; x <= 100; x += 10) {
        points.push({ x, y: constant / x1Coefficient });
      }
    } else {
      // Regular line
      for (let x = 0; x <= 100; x += 10) {
        const y = (constant - x1Coefficient * x) / x2Coefficient;
        if (y >= 0 && y <= 100) {
          points.push({ x, y });
        }
      }
    }
    return points;
  };

  const chartData = {
    datasets: constraints.map((constraint, index) => ({
      label: `Constraint ${index + 1}`,
      data: generatePoints(constraint),
      borderColor: `hsl(${index * 90}, 70%, 50%)`,
      tension: 0.1,
      fill: false
    }))
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        type: 'linear' as const,
        position: 'bottom' as const,
        min: 0,
        max: 100,
        title: {
          display: true,
          text: 'X₁'
        }
      },
      y: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: 'X₂'
        }
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Graphical Method Visualization'
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <LineChart className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">Linear Programming</h1>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Graphical Method</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Problem Setup</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Objective Function</label>
                <div className="flex items-center space-x-2 mt-1">
                  <select
                    value={objective.type}
                    onChange={(e) => setObjective({ ...objective, type: e.target.value })}
                    className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="maximize">Maximize</option>
                    <option value="minimize">Minimize</option>
                  </select>
                  <span>Z =</span>
                  <input
                    type="number"
                    value={objective.x1Coefficient}
                    onChange={(e) => setObjective({ ...objective, x1Coefficient: Number(e.target.value) })}
                    className="w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <span>X₁ +</span>
                  <input
                    type="number"
                    value={objective.x2Coefficient}
                    onChange={(e) => setObjective({ ...objective, x2Coefficient: Number(e.target.value) })}
                    className="w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <span>X₂</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Constraints</label>
                {constraints.map((constraint, index) => (
                  <div key={index} className="flex items-center space-x-2 mt-2">
                    <input
                      type="number"
                      value={constraint.x1Coefficient}
                      onChange={(e) => {
                        const newConstraints = [...constraints];
                        newConstraints[index].x1Coefficient = Number(e.target.value);
                        setConstraints(newConstraints);
                      }}
                      className="w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <span>X₁ +</span>
                    <input
                      type="number"
                      value={constraint.x2Coefficient}
                      onChange={(e) => {
                        const newConstraints = [...constraints];
                        newConstraints[index].x2Coefficient = Number(e.target.value);
                        setConstraints(newConstraints);
                      }}
                      className="w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <span>X₂</span>
                    <select
                      value={constraint.inequality}
                      onChange={(e) => {
                        const newConstraints = [...constraints];
                        newConstraints[index].inequality = e.target.value;
                        setConstraints(newConstraints);
                      }}
                      className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="<=">≤</option>
                      <option value=">=">≥</option>
                      <option value="=">=</option>
                    </select>
                    <input
                      type="number"
                      value={constraint.constant}
                      onChange={(e) => {
                        const newConstraints = [...constraints];
                        newConstraints[index].constant = Number(e.target.value);
                        setConstraints(newConstraints);
                      }}
                      className="w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Visualization</h3>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Theory and Concepts</h2>
        <div className="prose max-w-none">
          <p>
            Linear Programming (LP) is a method to achieve the best outcome (such as maximum profit or lowest cost)
            in a mathematical model whose requirements are represented by linear relationships.
          </p>
          <h3>Key Components:</h3>
          <ul>
            <li>
              <strong>Decision Variables:</strong> Unknown values to be determined (X₁, X₂)
            </li>
            <li>
              <strong>Objective Function:</strong> The goal to be maximized or minimized
            </li>
            <li>
              <strong>Constraints:</strong> Limitations or requirements expressed as linear inequalities or equations
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};