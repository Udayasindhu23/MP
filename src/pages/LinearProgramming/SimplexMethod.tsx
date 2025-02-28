import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

interface SimplexInput {
  objective: {
    type: 'maximize' | 'minimize';
    coefficients: number[];
  };
  constraints: {
    coefficients: number[];
    inequality: string;
    constant: number;
  }[];
}

export const SimplexMethod: React.FC = () => {
  const [input, setInput] = useState<SimplexInput>({
    objective: {
      type: 'maximize',
      coefficients: [3, 2]
    },
    constraints: [
      { coefficients: [2, 1], inequality: '<=', constant: 100 },
      { coefficients: [1, 1], inequality: '<=', constant: 80 }
    ]
  });
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(false);

  const solveSimplex = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/simplex', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });
      const result = await response.json();
      setSolution(result);
    } catch (error) {
      console.error('Error solving simplex:', error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-4 mb-6">
        <Calculator className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800">Simplex Method</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Problem Setup</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Objective Function</label>
                <div className="flex items-center space-x-2 mt-1">
                  <select
                    value={input.objective.type}
                    onChange={(e) => setInput({
                      ...input,
                      objective: {
                        ...input.objective,
                        type: e.target.value as 'maximize' | 'minimize'
                      }
                    })}
                    className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="maximize">Maximize</option>
                    <option value="minimize">Minimize</option>
                  </select>
                  <span>Z =</span>
                  {input.objective.coefficients.map((coeff, index) => (
                    <React.Fragment key={index}>
                      <input
                        type="number"
                        value={coeff}
                        onChange={(e) => {
                          const newCoeffs = [...input.objective.coefficients];
                          newCoeffs[index] = Number(e.target.value);
                          setInput({
                            ...input,
                            objective: {
                              ...input.objective,
                              coefficients: newCoeffs
                            }
                          });
                        }}
                        className="w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                      <span>X{index + 1} {index < input.objective.coefficients.length - 1 ? '+' : ''}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Constraints</label>
                {input.constraints.map((constraint, index) => (
                  <div key={index} className="flex items-center space-x-2 mt-2">
                    {constraint.coefficients.map((coeff, coefIndex) => (
                      <React.Fragment key={coefIndex}>
                        <input
                          type="number"
                          value={coeff}
                          onChange={(e) => {
                            const newConstraints = [...input.constraints];
                            newConstraints[index].coefficients[coefIndex] = Number(e.target.value);
                            setInput({ ...input, constraints: newConstraints });
                          }}
                          className="w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        <span>X{coefIndex + 1} {coefIndex < constraint.coefficients.length - 1 ? '+' : ''}</span>
                      </React.Fragment>
                    ))}
                    <select
                      value={constraint.inequality}
                      onChange={(e) => {
                        const newConstraints = [...input.constraints];
                        newConstraints[index].inequality = e.target.value;
                        setInput({ ...input, constraints: newConstraints });
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
                        const newConstraints = [...input.constraints];
                        newConstraints[index].constant = Number(e.target.value);
                        setInput({ ...input, constraints: newConstraints });
                      }}
                      className="w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={solveSimplex}
                disabled={loading}
                className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {loading ? 'Solving...' : 'Solve'}
              </button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-4">Solution</h3>
          {solution ? (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="space-y-2">
                <p className="font-medium">Optimal Solution:</p>
                {solution.solution.map((value, index) => (
                  <p key={index}>X{index + 1} = {value}</p>
                ))}
                <p className="mt-4 font-medium">Optimal Value:</p>
                <p>Z = {solution.value}</p>
              </div>
            </div>
          ) : (
            <div className="text-gray-500 italic">
              Solution will appear here after clicking solve
            </div>
          )}
        </div>
      </div>
    </div>
  );
};