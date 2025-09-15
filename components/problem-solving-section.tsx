"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Trophy,
  Target,
  Clock,
  Code2,
  Zap,
  Star,
  TrendingUp,
  Award,
  CheckCircle,
  Calendar,
  Filter,
  Search,
  ExternalLink,
  GitBranch,
  Hash,
  Timer,
  Flame,
  Medal,
  Crown,
  Sparkles,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
} from "lucide-react";

interface Problem {
  id: string;
  title: string;
  platform:
    | "LeetCode"
    | "HackerRank"
    | "CodeForces"
    | "AtCoder"
    | "TopCoder"
    | "GeeksforGeeks"
    | "Project Euler";
  difficulty: "Easy" | "Medium" | "Hard" | "Expert";
  category: string[];
  solvedDate: string;
  timeComplexity: string;
  spaceComplexity: string;
  attempts: number;
  solutionTime: number; // in minutes
  description: string;
  approach: string;
  keyInsights: string[];
  url?: string;
  rating?: number;
}

interface PlatformStats {
  platform: string;
  solved: number;
  easy: number;
  medium: number;
  hard: number;
  expert: number;
  rating?: number;
  rank?: string;
  color: string;
  icon: string;
}

const problemsData: Problem[] = [
  {
    id: "1",
    title: "Two Sum",
    platform: "LeetCode",
    difficulty: "Easy",
    category: ["Array", "Hash Table"],
    solvedDate: "2024-01-15",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    attempts: 1,
    solutionTime: 15,
    description: "Find two numbers in array that add up to target sum",
    approach: "Used HashMap to store complements for O(n) solution",
    keyInsights: ["HashMap lookup is O(1)", "Single pass solution possible"],
    url: "https://leetcode.com/problems/two-sum/",
    rating: 1200,
  },
  {
    id: "2",
    title: "Longest Palindromic Substring",
    platform: "LeetCode",
    difficulty: "Medium",
    category: ["String", "Dynamic Programming"],
    solvedDate: "2024-01-18",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    attempts: 3,
    solutionTime: 45,
    description: "Find the longest palindromic substring in given string",
    approach: "Expand around centers technique for optimal space complexity",
    keyInsights: [
      "Consider both odd and even length palindromes",
      "Expand around center is more space efficient than DP",
    ],
    url: "https://leetcode.com/problems/longest-palindromic-substring/",
    rating: 1400,
  },
  {
    id: "3",
    title: "Median of Two Sorted Arrays",
    platform: "LeetCode",
    difficulty: "Hard",
    category: ["Array", "Binary Search", "Divide and Conquer"],
    solvedDate: "2024-01-22",
    timeComplexity: "O(log(min(m,n)))",
    spaceComplexity: "O(1)",
    attempts: 5,
    solutionTime: 120,
    description: "Find median of two sorted arrays in logarithmic time",
    approach: "Binary search on the smaller array to find correct partition",
    keyInsights: [
      "Partition arrays such that left half ≤ right half",
      "Binary search on smaller array for efficiency",
    ],
    url: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
    rating: 2100,
  },
  {
    id: "4",
    title: "Maximum Subarray Sum",
    platform: "HackerRank",
    difficulty: "Medium",
    category: ["Dynamic Programming", "Array"],
    solvedDate: "2024-01-10",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    attempts: 2,
    solutionTime: 30,
    description:
      "Find contiguous subarray with maximum sum (Kadane's Algorithm)",
    approach: "Dynamic programming with running maximum calculation",
    keyInsights: [
      "Reset sum when it becomes negative",
      "Track global maximum separately",
    ],
    rating: 1300,
  },
  {
    id: "5",
    title: "N-Queens Problem",
    platform: "LeetCode",
    difficulty: "Hard",
    category: ["Backtracking", "Recursion"],
    solvedDate: "2024-01-25",
    timeComplexity: "O(N!)",
    spaceComplexity: "O(N²)",
    attempts: 4,
    solutionTime: 90,
    description:
      "Place N queens on NxN chessboard such that no two queens attack each other",
    approach: "Backtracking with constraint checking for diagonals and columns",
    keyInsights: [
      "Use sets for O(1) conflict checking",
      "Diagonal constraints: row±col must be unique",
    ],
    url: "https://leetcode.com/problems/n-queens/",
    rating: 1800,
  },
  {
    id: "6",
    title: "Graph Shortest Path",
    platform: "CodeForces",
    difficulty: "Expert",
    category: ["Graph", "Shortest Path", "Dijkstra"],
    solvedDate: "2024-01-28",
    timeComplexity: "O((V+E)logV)",
    spaceComplexity: "O(V)",
    attempts: 6,
    solutionTime: 150,
    description:
      "Find shortest path in weighted graph with dynamic edge updates",
    approach: "Modified Dijkstra with priority queue and edge relaxation",
    keyInsights: [
      "Priority queue for efficient minimum extraction",
      "Edge relaxation for optimal paths",
    ],
    rating: 2300,
  },
  {
    id: "7",
    title: "Binary Tree Maximum Path Sum",
    platform: "LeetCode",
    difficulty: "Hard",
    category: ["Tree", "DFS", "Recursion"],
    solvedDate: "2024-02-01",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    attempts: 3,
    solutionTime: 75,
    description: "Find maximum sum path between any two nodes in binary tree",
    approach: "Post-order DFS with global maximum tracking",
    keyInsights: [
      "Consider path through current node vs continuing upward",
      "Handle negative values correctly",
    ],
    url: "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
    rating: 1900,
  },
  {
    id: "8",
    title: "Sliding Window Maximum",
    platform: "LeetCode",
    difficulty: "Hard",
    category: ["Array", "Sliding Window", "Deque"],
    solvedDate: "2024-02-05",
    timeComplexity: "O(n)",
    spaceComplexity: "O(k)",
    attempts: 4,
    solutionTime: 100,
    description: "Find maximum element in every sliding window of size k",
    approach: "Monotonic deque to maintain potential maximums",
    keyInsights: [
      "Deque stores indices in decreasing order of values",
      "Remove elements outside window",
    ],
    url: "https://leetcode.com/problems/sliding-window-maximum/",
    rating: 2000,
  },
];

const platformStats: PlatformStats[] = [
  {
    platform: "LeetCode",
    solved: 342,
    easy: 156,
    medium: 142,
    hard: 44,
    expert: 0,
    rating: 1847,
    rank: "Knight",
    color: "#FFA116",
    icon: "🟡",
  },
  {
    platform: "HackerRank",
    solved: 89,
    easy: 45,
    medium: 32,
    hard: 12,
    expert: 0,
    rating: 1654,
    rank: "5 Star",
    color: "#00EA64",
    icon: "🟢",
  },
  {
    platform: "CodeForces",
    solved: 67,
    easy: 0,
    medium: 23,
    hard: 32,
    expert: 12,
    rating: 1456,
    rank: "Specialist",
    color: "#1F8ACB",
    icon: "🔵",
  },
  {
    platform: "GeeksforGeeks",
    solved: 124,
    easy: 67,
    medium: 45,
    hard: 12,
    expert: 0,
    color: "#2F8D46",
    icon: "🟢",
  },
];

export function ProblemSolvingSection() {
  const [problems] = useState<Problem[]>(problemsData);
  const [filteredProblems, setFilteredProblems] =
    useState<Problem[]>(problemsData);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [activeView, setActiveView] = useState<
    "overview" | "problems" | "analytics"
  >("overview");

  useEffect(() => {
    let filtered = problems;

    if (selectedDifficulty !== "All") {
      filtered = filtered.filter((p) => p.difficulty === selectedDifficulty);
    }

    if (selectedPlatform !== "All") {
      filtered = filtered.filter((p) => p.platform === selectedPlatform);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.some((cat) =>
            cat.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    setFilteredProblems(filtered);
  }, [selectedDifficulty, selectedPlatform, searchTerm, problems]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-400 bg-green-900/30 border-green-700";
      case "Medium":
        return "text-yellow-400 bg-yellow-900/30 border-yellow-700";
      case "Hard":
        return "text-red-400 bg-red-900/30 border-red-700";
      case "Expert":
        return "text-purple-400 bg-purple-900/30 border-purple-700";
      default:
        return "text-gray-400 bg-gray-900/30 border-gray-700";
    }
  };

  const totalSolved = platformStats.reduce((sum, stat) => sum + stat.solved, 0);
  const avgRating = Math.round(
    platformStats
      .filter((s) => s.rating)
      .reduce((sum, stat) => sum + (stat.rating || 0), 0) /
      platformStats.filter((s) => s.rating).length
  );
  const totalTime = problems.reduce((sum, p) => sum + p.solutionTime, 0);
  const avgAttempts =
    Math.round(
      (problems.reduce((sum, p) => sum + p.attempts, 0) / problems.length) * 10
    ) / 10;

  const overviewContent = (
    <div className="space-y-6">
      {/* Hero Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 p-4 rounded-lg border border-gray-700 text-center"
        >
          <Trophy className="text-yellow-400 mx-auto mb-2" size={24} />
          <div className="text-2xl font-bold text-white">{totalSolved}</div>
          <div className="text-sm text-gray-400">Problems Solved</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-900 p-4 rounded-lg border border-gray-700 text-center"
        >
          <Star className="text-blue-400 mx-auto mb-2" size={24} />
          <div className="text-2xl font-bold text-white">{avgRating}</div>
          <div className="text-sm text-gray-400">Avg Rating</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-900 p-4 rounded-lg border border-gray-700 text-center"
        >
          <Clock className="text-green-400 mx-auto mb-2" size={24} />
          <div className="text-2xl font-bold text-white">
            {Math.round(totalTime / 60)}h
          </div>
          <div className="text-sm text-gray-400">Total Time</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-900 p-4 rounded-lg border border-gray-700 text-center"
        >
          <Target className="text-purple-400 mx-auto mb-2" size={24} />
          <div className="text-2xl font-bold text-white">{avgAttempts}</div>
          <div className="text-sm text-gray-400">Avg Attempts</div>
        </motion.div>
      </div>

      {/* Platform Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <BarChart3 size={20} className="text-blue-400" />
            <span>Platform Statistics</span>
          </h3>

          <div className="space-y-4">
            {platformStats.map((stat, index) => (
              <motion.div
                key={stat.platform}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 p-4 rounded-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{stat.icon}</span>
                    <div>
                      <div className="font-semibold text-white">
                        {stat.platform}
                      </div>
                      {stat.rank && (
                        <div className="text-sm text-gray-400">{stat.rank}</div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">
                      {stat.solved}
                    </div>
                    {stat.rating && (
                      <div className="text-sm" style={{ color: stat.color }}>
                        {stat.rating} rating
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div className="text-center">
                    <div className="text-green-400 font-semibold">
                      {stat.easy}
                    </div>
                    <div className="text-gray-500">Easy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-yellow-400 font-semibold">
                      {stat.medium}
                    </div>
                    <div className="text-gray-500">Medium</div>
                  </div>
                  <div className="text-center">
                    <div className="text-red-400 font-semibold">
                      {stat.hard}
                    </div>
                    <div className="text-gray-500">Hard</div>
                  </div>
                  <div className="text-center">
                    <div className="text-purple-400 font-semibold">
                      {stat.expert}
                    </div>
                    <div className="text-gray-500">Expert</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <Award size={20} className="text-yellow-400" />
            <span>Recent Achievements</span>
          </h3>

          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-3 p-3 bg-yellow-900/20 rounded-lg border border-yellow-700/50"
            >
              <Crown className="text-yellow-400" size={20} />
              <div>
                <div className="text-white font-medium">LeetCode Knight</div>
                <div className="text-sm text-gray-400">
                  Reached 1800+ rating
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center space-x-3 p-3 bg-green-900/20 rounded-lg border border-green-700/50"
            >
              <Medal className="text-green-400" size={20} />
              <div>
                <div className="text-white font-medium">100 Day Streak</div>
                <div className="text-sm text-gray-400">
                  Consistent daily practice
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-3 p-3 bg-purple-900/20 rounded-lg border border-purple-700/50"
            >
              <Sparkles className="text-purple-400" size={20} />
              <div>
                <div className="text-white font-medium">Algorithm Master</div>
                <div className="text-sm text-gray-400">
                  Solved 50+ Hard problems
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center space-x-3 p-3 bg-blue-900/20 rounded-lg border border-blue-700/50"
            >
              <Flame className="text-blue-400" size={20} />
              <div>
                <div className="text-white font-medium">Speed Solver</div>
                <div className="text-sm text-gray-400">
                  Avg solve time under 45min
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );

  const problemsContent = (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search problems..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <select
          value={selectedPlatform}
          onChange={(e) => setSelectedPlatform(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Platforms</option>
          <option value="LeetCode">LeetCode</option>
          <option value="HackerRank">HackerRank</option>
          <option value="CodeForces">CodeForces</option>
          <option value="GeeksforGeeks">GeeksforGeeks</option>
        </select>

        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
          <option value="Expert">Expert</option>
        </select>
      </div>

      {/* Problems Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredProblems.map((problem, index) => (
          <motion.div
            key={problem.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedProblem(problem)}
            className="bg-gray-900 p-4 rounded-lg border border-gray-700 hover:border-gray-600 cursor-pointer transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-1">
                  {problem.title}
                </h4>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <span>{problem.platform}</span>
                  <span>•</span>
                  <span>
                    {new Date(problem.solvedDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div
                className={`px-2 py-1 rounded text-xs border ${getDifficultyColor(
                  problem.difficulty
                )}`}
              >
                {problem.difficulty}
              </div>
            </div>

            <p className="text-sm text-gray-300 mb-3 line-clamp-2">
              {problem.description}
            </p>

            <div className="flex flex-wrap gap-1 mb-3">
              {problem.category.slice(0, 3).map((cat) => (
                <span
                  key={cat}
                  className="px-2 py-1 bg-blue-900/30 text-blue-200 rounded text-xs border border-blue-700/50"
                >
                  {cat}
                </span>
              ))}
              {problem.category.length > 3 && (
                <span className="text-xs text-gray-400">
                  +{problem.category.length - 3}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <Timer size={12} />
                  <span>{problem.solutionTime}min</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Target size={12} />
                  <span>{problem.attempts} attempts</span>
                </div>
              </div>
              {problem.url && (
                <ExternalLink size={12} className="text-blue-400" />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const analyticsContent = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Difficulty Distribution */}
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <PieChart size={20} className="text-green-400" />
            <span>Difficulty Distribution</span>
          </h3>

          <div className="space-y-4">
            {["Easy", "Medium", "Hard", "Expert"].map((difficulty) => {
              const count = problems.filter(
                (p) => p.difficulty === difficulty
              ).length;
              const percentage = Math.round((count / problems.length) * 100);

              return (
                <div key={difficulty} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">{difficulty}</span>
                    <span className="text-white font-semibold">
                      {count} ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`h-full rounded-full ${
                        difficulty === "Easy"
                          ? "bg-green-400"
                          : difficulty === "Medium"
                          ? "bg-yellow-400"
                          : difficulty === "Hard"
                          ? "bg-red-400"
                          : "bg-purple-400"
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Analysis */}
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <BarChart3 size={20} className="text-blue-400" />
            <span>Top Categories</span>
          </h3>

          <div className="space-y-3">
            {Object.entries(
              problems.reduce((acc, problem) => {
                problem.category.forEach((cat) => {
                  acc[cat] = (acc[cat] || 0) + 1;
                });
                return acc;
              }, {} as Record<string, number>)
            )
              .sort(([, a], [, b]) => b - a)
              .slice(0, 6)
              .map(([category, count], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-2 bg-gray-800 rounded"
                >
                  <span className="text-gray-300">{category}</span>
                  <span className="text-white font-semibold">{count}</span>
                </motion.div>
              ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
          <LineChart size={20} className="text-purple-400" />
          <span>Performance Insights</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400 mb-2">
              {Math.round(
                (problems.filter((p) => p.attempts === 1).length /
                  problems.length) *
                  100
              )}
              %
            </div>
            <div className="text-sm text-gray-400">First Attempt Success</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400 mb-2">
              {Math.round(
                problems.reduce((sum, p) => sum + p.solutionTime, 0) /
                  problems.length
              )}
              min
            </div>
            <div className="text-sm text-gray-400">Average Solve Time</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-2">
              {
                problems.filter(
                  (p) => p.difficulty === "Hard" || p.difficulty === "Expert"
                ).length
              }
            </div>
            <div className="text-sm text-gray-400">Hard+ Problems</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full bg-gray-800">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-800 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Brain className="text-purple-400" size={24} />
            <h2 className="text-xl font-bold text-white">
              Problem Solving Journey
            </h2>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Activity size={16} />
            <span>Active Solver</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1">
          {[
            { id: "overview", label: "Overview", icon: TrendingUp },
            { id: "problems", label: "Problems", icon: Code2 },
            { id: "analytics", label: "Analytics", icon: BarChart3 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                activeView === tab.id
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-200"
              }`}
              style={{
                backgroundColor:
                  activeView === tab.id
                    ? "var(--color-primary)"
                    : "transparent",
              }}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 h-full overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeView === "overview" && overviewContent}
            {activeView === "problems" && problemsContent}
            {activeView === "analytics" && analyticsContent}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Problem Detail Modal */}
      <AnimatePresence>
        {selectedProblem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedProblem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-800 rounded-lg border border-gray-700 p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {selectedProblem.title}
                  </h3>
                  <div className="flex items-center space-x-3 text-sm text-gray-400">
                    <span>{selectedProblem.platform}</span>
                    <span>•</span>
                    <span
                      className={
                        getDifficultyColor(selectedProblem.difficulty).split(
                          " "
                        )[0]
                      }
                    >
                      {selectedProblem.difficulty}
                    </span>
                    <span>•</span>
                    <span>
                      {new Date(
                        selectedProblem.solvedDate
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProblem(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Description</h4>
                  <p className="text-gray-300">{selectedProblem.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">Approach</h4>
                  <p className="text-gray-300">{selectedProblem.approach}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">
                    Key Insights
                  </h4>
                  <ul className="space-y-1">
                    {selectedProblem.keyInsights.map((insight, index) => (
                      <li
                        key={index}
                        className="text-gray-300 flex items-start"
                      >
                        <CheckCircle
                          size={16}
                          className="text-green-400 mr-2 mt-0.5 flex-shrink-0"
                        />
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      Complexity
                    </h4>
                    <div className="space-y-1 text-sm">
                      <div className="text-gray-300">
                        Time:{" "}
                        <code className="bg-gray-700 px-1 rounded">
                          {selectedProblem.timeComplexity}
                        </code>
                      </div>
                      <div className="text-gray-300">
                        Space:{" "}
                        <code className="bg-gray-700 px-1 rounded">
                          {selectedProblem.spaceComplexity}
                        </code>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">Stats</h4>
                    <div className="space-y-1 text-sm text-gray-300">
                      <div>Attempts: {selectedProblem.attempts}</div>
                      <div>Time: {selectedProblem.solutionTime} minutes</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProblem.category.map((cat) => (
                      <span
                        key={cat}
                        className="px-2 py-1 bg-blue-900/30 text-blue-200 rounded text-sm border border-blue-700/50"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedProblem.url && (
                  <div className="pt-4 border-t border-gray-700">
                    <a
                      href={selectedProblem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-white transition-colors"
                      style={{ backgroundColor: "var(--color-primary)" }}
                    >
                      <ExternalLink size={16} />
                      <span>View Problem</span>
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
