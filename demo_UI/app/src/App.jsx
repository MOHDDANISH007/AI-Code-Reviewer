import React, { useState } from 'react';
import { 
  Code, Trophy, Bot, Users, Zap, GitBranch, CheckCircle, ArrowRight, 
  Menu, X, Star, MessageSquare, Play, Save, Github, Clock, FileText, 
  ChevronLeft, Send, Award, BarChart3, Calendar 
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [code, setCode] = useState('# Write your code here\n\n');
  const [aiResponse, setAiResponse] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedContest, setSelectedContest] = useState(null);
  const [activeProblem, setActiveProblem] = useState(0);

  const features = [
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Coding Contests",
      description: "Join programming competitions, solve challenges, and compete with coders worldwide on a live leaderboard."
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI Code Review",
      description: "Get instant AI-powered feedback, detailed analysis, and personalized tips to improve your code quality."
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Smart Editor",
      description: "Code in Python, Java, C++, or JavaScript with real-time execution powered by Judge0."
    },
    {
      icon: <GitBranch className="w-8 h-8" />,
      title: "GitHub Integration",
      description: "Save your solutions directly to GitHub and maintain your coding portfolio effortlessly."
    }
  ];

  const contests = [
    { 
      id: 1, 
      name: "Weekly Challenge #42", 
      participants: 234, 
      timeLeft: "2d 5h", 
      difficulty: "Medium",
      description: "Solve 5 algorithmic problems covering data structures and dynamic programming.",
      problems: 5,
      duration: "3 hours",
      prize: "$500"
    },
    { 
      id: 2, 
      name: "Algorithm Sprint", 
      participants: 567, 
      timeLeft: "5h 23m", 
      difficulty: "Hard",
      description: "Advanced algorithm challenges for experienced competitive programmers.",
      problems: 7,
      duration: "4 hours",
      prize: "$1000"
    },
    { 
      id: 3, 
      name: "Beginner's Battle", 
      participants: 890, 
      timeLeft: "1d 12h", 
      difficulty: "Easy",
      description: "Perfect for beginners to learn and practice competitive programming.",
      problems: 3,
      duration: "2 hours",
      prize: "$200"
    }
  ];

  const contestProblems = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]

Example 2:
Input: nums = [3,2,4], target = 6
Output: [1,2]

Constraints:
• 2 <= nums.length <= 10^4
• -10^9 <= nums[i] <= 10^9
• -10^9 <= target <= 10^9
• Only one valid answer exists.`
    },
    {
      id: 2,
      title: "Reverse Linked List",
      difficulty: "Medium",
      description: `Given the head of a singly linked list, reverse the list, and return the reversed list.

Example 1:
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]

Example 2:
Input: head = [1,2]
Output: [2,1]

Constraints:
• The number of nodes in the list is in the range [0, 5000].
• -5000 <= Node.val <= 5000`
    },
    {
      id: 3,
      title: "Binary Tree Maximum Path Sum",
      difficulty: "Hard",
      description: `A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once.

The path sum of a path is the sum of the node's values in the path.

Given the root of a binary tree, return the maximum path sum of any non-empty path.

Example 1:
Input: root = [1,2,3]
Output: 6

Example 2:
Input: root = [-10,9,20,null,null,15,7]
Output: 42

Constraints:
• The number of nodes in the tree is in the range [1, 3 * 10^4].
• -1000 <= Node.val <= 1000`
    }
  ];

  const contestLeaderboard = [
    { rank: 1, name: 'CodeMaster', score: 2450, solved: 5, time: '1:23:45' },
    { rank: 2, name: 'AlgoNinja', score: 2380, solved: 5, time: '1:45:20' },
    { rank: 3, name: 'DevWizard', score: 2310, solved: 4, time: '2:01:15' },
    { rank: 4, name: 'BugHunter', score: 2205, solved: 4, time: '2:15:30' },
    { rank: 5, name: 'SyntaxKing', score: 2180, solved: 3, time: '2:30:45' }
  ];

  const leaderboard = [
    { rank: 1, name: "CodeMaster", score: 2450, solved: 45 },
    { rank: 2, name: "AlgoNinja", score: 2380, solved: 43 },
    { rank: 3, name: "DevWizard", score: 2310, solved: 41 },
    { rank: 4, name: "BugHunter", score: 2205, solved: 38 },
    { rank: 5, name: "SyntaxKing", score: 2180, solved: 37 }
  ];

  const handleCodeAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setAiResponse(`✅ Code Analysis Complete!\n\n📊 Overall Quality: Good (8/10)\n\n💡 Suggestions:\n• Consider adding error handling for edge cases\n• Variable naming could be more descriptive\n• Time complexity: O(n) - Optimal\n• Space complexity: O(1) - Excellent\n\n🎯 Best Practices:\n✓ Clean code structure\n✓ Proper indentation\n• Add comments for complex logic\n\n🚀 Performance: Your solution is efficient!`);
      setIsAnalyzing(false);
    }, 1500);
  };

  const handleJoinContest = (contest) => {
    setSelectedContest(contest);
    setActiveTab('contest-detail');
  };

  const handleSubmitSolution = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setAiResponse(`🎉 Solution Submitted!\n\n✅ Test Cases: 5/5 passed\n⏱️ Runtime: 45ms (beats 85%)\n💾 Memory: 16.2MB (beats 92%)\n\n🏆 Points earned: 100\n📈 Rank improved: +2 positions`);
      setIsAnalyzing(false);
    }, 2000);
  };

  // Contest Detail View
  if (activeTab === 'contest-detail' && selectedContest) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        {/* Header */}
        <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-lg border-b border-purple-500/20 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setActiveTab('contests')}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                  <Trophy className="w-6 h-6" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {selectedContest.name}
                </span>
              </div>

              <div className="hidden md:flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-yellow-400">
                  <Clock className="w-4 h-4" />
                  {selectedContest.timeLeft}
                </div>
                <div className="flex items-center gap-2 text-sm text-green-400">
                  <Users className="w-4 h-4" />
                  {selectedContest.participants} participants
                </div>
                <button className="bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all">
                  Submit Solution
                </button>
              </div>

              <button 
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </nav>

        {/* Contest Content */}
        <div className="pt-20 pb-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Problems List */}
              <div className="lg:col-span-1">
                <div className="bg-slate-800/50 backdrop-blur-lg border border-purple-500/20 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-400" />
                    Problems
                  </h3>
                  <div className="space-y-2">
                    {contestProblems.map((problem, index) => (
                      <button
                        key={problem.id}
                        onClick={() => setActiveProblem(index)}
                        className={`w-full text-left p-3 rounded-lg transition-all ${
                          activeProblem === index
                            ? 'bg-purple-600 text-white'
                            : 'bg-slate-700/50 hover:bg-slate-700'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">{problem.title}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            problem.difficulty === 'Easy' 
                              ? 'bg-green-500/20 text-green-400' 
                              : problem.difficulty === 'Medium'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {problem.difficulty}
                          </span>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          Problem {index + 1} of {contestProblems.length}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contest Info */}
                <div className="bg-slate-800/50 backdrop-blur-lg border border-purple-500/20 rounded-xl p-6 mt-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-400" />
                    Contest Details
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Duration:</span>
                      <span className="text-white">{selectedContest.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Problems:</span>
                      <span className="text-white">{selectedContest.problems}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Prize Pool:</span>
                      <span className="text-yellow-400">{selectedContest.prize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Difficulty:</span>
                      <span className={`${
                        selectedContest.difficulty === 'Easy' ? 'text-green-400' :
                        selectedContest.difficulty === 'Medium' ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {selectedContest.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content - Problem & Editor */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {/* Problem Description */}
                  <div className="bg-slate-800/50 backdrop-blur-lg border border-purple-500/20 rounded-xl overflow-hidden">
                    <div className="bg-slate-900/80 border-b border-purple-500/20 p-4 flex justify-between items-center">
                      <h3 className="text-lg font-bold">
                        {contestProblems[activeProblem].title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        contestProblems[activeProblem].difficulty === 'Easy' 
                          ? 'bg-green-500/20 text-green-400' 
                          : contestProblems[activeProblem].difficulty === 'Medium'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {contestProblems[activeProblem].difficulty}
                      </span>
                    </div>
                    <div className="p-6 h-96 overflow-y-auto">
                      <pre className="text-sm text-gray-300 whitespace-pre-wrap font-sans">
                        {contestProblems[activeProblem].description}
                      </pre>
                    </div>
                  </div>

                  {/* Code Editor */}
                  <div className="bg-slate-800/50 backdrop-blur-lg border border-purple-500/20 rounded-xl overflow-hidden">
                    <div className="bg-slate-900/80 border-b border-purple-500/20 p-4 flex justify-between items-center">
                      <select
                        value={selectedLanguage}
                        onChange={e => setSelectedLanguage(e.target.value)}
                        className="bg-slate-800 border border-purple-500/30 rounded-lg px-4 py-2 text-white text-sm"
                      >
                        <option value="python">Python</option>
                        <option value="javascript">JavaScript</option>
                        <option value="java">Java</option>
                        <option value="cpp">C++</option>
                      </select>
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-slate-800 rounded-lg transition-all" title="Save">
                          <Save className="w-4 h-4 text-blue-400" />
                        </button>
                        <button className="p-2 hover:bg-slate-800 rounded-lg transition-all" title="GitHub">
                          <Github className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                    <textarea
                      value={code}
                      onChange={e => setCode(e.target.value)}
                      className="w-full h-48 bg-slate-900/50 text-gray-100 p-4 font-mono text-sm resize-none focus:outline-none"
                      placeholder={`Write your ${contestProblems[activeProblem].title} solution here...`}
                    />
                    
                    {/* AI Response */}
                    <div className="border-t border-purple-500/20">
                      <div className="bg-slate-900/80 border-b border-purple-500/20 p-3 flex items-center gap-2">
                        <Bot className="w-4 h-4 text-purple-400" />
                        <span className="font-semibold text-sm">AI Review & Output</span>
                      </div>
                      <div className="p-4 h-48 overflow-y-auto">
                        {aiResponse ? (
                          <pre className="text-sm text-gray-300 whitespace-pre-wrap font-sans">
                            {aiResponse}
                          </pre>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                            <MessageSquare className="w-8 h-8 mb-2 opacity-50" />
                            <p className="text-xs">Submit your solution to see results</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-slate-900/80 border-t border-purple-500/20 p-4 flex gap-3">
                      <button
                        onClick={handleCodeAnalysis}
                        disabled={isAnalyzing}
                        className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
                      >
                        {isAnalyzing ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                            Testing...
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4" />
                            Run Test Cases
                          </>
                        )}
                      </button>
                      <button
                        onClick={handleSubmitSolution}
                        disabled={isAnalyzing}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
                      >
                        <Send className="w-4 h-4" />
                        Submit Solution
                      </button>
                    </div>
                  </div>
                </div>

                {/* Leaderboard */}
                <div className="mt-6">
                  <div className="bg-slate-800/50 backdrop-blur-lg border border-purple-500/20 rounded-xl overflow-hidden">
                    <div className="bg-slate-900/80 border-b border-purple-500/20 p-4 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-green-400" />
                      <span className="font-semibold">Live Leaderboard</span>
                    </div>
                    <div className="p-4">
                      <div className="space-y-2">
                        {contestLeaderboard.map(entry => (
                          <div key={entry.rank} className="flex items-center justify-between p-2 bg-slate-700/30 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                entry.rank === 1 ? 'bg-yellow-500 text-white' :
                                entry.rank === 2 ? 'bg-gray-400 text-white' :
                                entry.rank === 3 ? 'bg-orange-600 text-white' :
                                'bg-slate-600 text-gray-300'
                              }`}>
                                {entry.rank}
                              </div>
                              <span className="font-medium text-sm">{entry.name}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-green-400 font-bold text-sm">{entry.score}</div>
                              <div className="text-gray-400 text-xs">{entry.solved} solved</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-lg border-b border-purple-500/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                <Code className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI Code Reviewer
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              {['home', 'contests', 'editor', 'leaderboard'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activeTab === tab 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all" onClick={() => setShowAuthModal(true)}>
                Sign In
              </button>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-16 left-0 right-0 bg-slate-900 border-b border-purple-500/20 z-40 md:hidden">
          <div className="flex flex-col p-4 gap-2">
            {['home', 'contests', 'editor', 'leaderboard'].map(tab => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setMobileMenuOpen(false);
                }}
                className={`px-4 py-2 rounded-lg text-left ${
                  activeTab === tab ? 'bg-purple-600' : 'hover:bg-slate-800'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="pt-20 pb-12 px-4">
        {/* Auth Modal */}
        {showAuthModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowAuthModal(false)}>
            <div className="bg-slate-800 rounded-2xl border border-purple-500/30 max-w-md w-full p-8 shadow-2xl shadow-purple-500/20" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Welcome Back!</h2>
                <button onClick={() => setShowAuthModal(false)} className="text-gray-400 hover:text-white transition-all">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* OAuth Login */}
              <div className="mb-6">
                <button className="w-full bg-slate-900 border border-purple-500/30 hover:border-purple-500/50 px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-3 group">
                  <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Continue with GitHub
                </button>
                <p className="text-xs text-gray-400 text-center mt-2">Quick sign in with OAuth</p>
              </div>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-purple-500/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-slate-800 text-gray-400">or continue with email</span>
                </div>
              </div>

              {/* Email Login Form */}
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                  <input 
                    type="email" 
                    placeholder="your@email.com"
                    className="w-full bg-slate-900 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full bg-slate-900 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-all"
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-gray-400">
                    <input type="checkbox" className="rounded border-purple-500/30" />
                    Remember me
                  </label>
                  <a href="#" className="text-purple-400 hover:text-purple-300 transition-all">Forgot password?</a>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                >
                  Sign In
                </button>
              </form>

              {/* Sign Up Link */}
              <p className="text-center text-sm text-gray-400 mt-6">
                Don't have an account? <button className="text-purple-400 hover:text-purple-300 font-semibold transition-all">Sign Up</button>
              </p>
            </div>
          </div>
        )}

        {/* Home Tab */}
        {activeTab === 'home' && (
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16 mt-8">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Your Personal AI
                <br />
                Coding Coach
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Compete in contests, write better code, and learn from AI-powered reviews. 
                Think LeetCode + ChatGPT combined! 🚀
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <button 
                  onClick={() => setActiveTab('contests')}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center gap-2"
                >
                  Start Competing <ArrowRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setActiveTab('editor')}
                  className="bg-slate-800 px-8 py-4 rounded-xl font-semibold hover:bg-slate-700 transition-all border border-purple-500/30"
                >
                  Try AI Review
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
              {[
                { label: "Active Users", value: "10K+", icon: <Users /> },
                { label: "Code Reviews", value: "50K+", icon: <Bot /> },
                { label: "Contests", value: "200+", icon: <Trophy /> },
                { label: "Languages", value: "4+", icon: <Code /> }
              ].map((stat, i) => (
                <div key={i} className="bg-slate-800/50 backdrop-blur-lg border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/50 transition-all">
                  <div className="text-purple-400 mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, i) => (
                <div key={i} className="bg-slate-800/50 backdrop-blur-lg border border-purple-500/20 rounded-xl p-8 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all">
                  <div className="text-purple-400 mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contests Tab */}
        {activeTab === 'contests' && (
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-4">Active Contests</h2>
              <p className="text-gray-400">Join programming contests, solve challenges with real-time compilation, and get AI-powered feedback!</p>
            </div>

            {/* Contest Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Active Contests", value: "12", icon: <Trophy className="w-5 h-5" /> },
                { label: "Total Participants", value: "2.4K", icon: <Users className="w-5 h-5" /> },
                { label: "Problems Solved", value: "15.8K", icon: <CheckCircle className="w-5 h-5" /> },
                { label: "Prize Pool", value: "$5K", icon: <Zap className="w-5 h-5" /> }
              ].map((stat, i) => (
                <div key={i} className="bg-slate-800/50 backdrop-blur-lg border border-purple-500/20 rounded-xl p-4 text-center hover:border-purple-500/50 transition-all">
                  <div className="text-purple-400 mb-2 flex justify-center">{stat.icon}</div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="grid gap-6">
              {contests.map(contest => (
                <div key={contest.id} className="bg-slate-800/50 backdrop-blur-lg border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/50 transition-all group">
                  <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-2xl font-bold group-hover:text-purple-300 transition-colors">
                          {contest.name}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          contest.difficulty === 'Easy'
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : contest.difficulty === 'Medium'
                            ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {contest.difficulty}
                        </span>
                      </div>

                      <p className="text-gray-400 mb-4">{contest.description}</p>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                        <span className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <strong className="text-white">{contest.participants}</strong> participants
                        </span>
                        <span className="flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          <strong className="text-yellow-400">{contest.timeLeft}</strong> remaining
                        </span>
                        <span className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          <strong>{contest.problems} problems</strong>
                        </span>
                        <span className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <strong>{contest.duration}</strong>
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-3 text-xs mb-4">
                        <span className="flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-400 rounded-full border border-green-500/20">
                          <Play className="w-3 h-3" /> Live Compilation
                        </span>
                        <span className="flex items-center gap-2 px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20">
                          <Bot className="w-3 h-3" /> AI Code Review
                        </span>
                        <span className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
                          <MessageSquare className="w-3 h-3" /> AI Assistant
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 lg:items-end">
                      <button 
                        onClick={() => handleJoinContest(contest)}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all whitespace-nowrap flex items-center gap-2 group-hover:scale-105 transform transition-transform"
                      >
                        <Trophy className="w-5 h-5" />
                        Join Contest
                      </button>
                      <div className="text-yellow-400 font-semibold text-sm">
                        {contest.prize} Prize
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Features Info */}
            <div className="mt-8 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-400" />
                What You Get in Every Contest
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-start gap-3">
                  <Play className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-green-400 mb-1">Real-time Compilation</div>
                    <div className="text-gray-400">Execute your code instantly with Judge0 in Python, Java, C++, or JavaScript</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Bot className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-purple-400 mb-1">AI Code Review</div>
                    <div className="text-gray-400">Get instant feedback, suggestions, and code quality analysis from AI</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-blue-400 mb-1">AI Assistant</div>
                    <div className="text-gray-400">Chat with AI to get hints, explanations, and debug help</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Editor Tab */}
        {activeTab === 'editor' && (
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h2 className="text-4xl font-bold mb-4">Smart Code Editor</h2>
              <p className="text-gray-400">Write code, compile, and get instant AI feedback</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Code Editor */}
              <div className="bg-slate-800/50 backdrop-blur-lg border border-purple-500/20 rounded-xl overflow-hidden">
                <div className="bg-slate-900/80 border-b border-purple-500/20 p-4 flex justify-between items-center">
                  <select 
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="bg-slate-800 border border-purple-500/30 rounded-lg px-4 py-2 text-white"
                  >
                    <option value="python">Python</option>
                    <option value="javascript">JavaScript</option>
                    <option value="java">Java</option>
                    <option value="cpp">C++</option>
                  </select>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-slate-800 rounded-lg transition-all" title="Save">
                      <Save className="w-5 h-5 text-blue-400" />
                    </button>
                    <button className="p-2 hover:bg-slate-800 rounded-lg transition-all" title="GitHub">
                      <Github className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-96 bg-slate-900/50 text-gray-100 p-4 font-mono text-sm resize-none focus:outline-none"
                  placeholder="Write your code here..."
                />
                <div className="bg-slate-900/80 border-t border-purple-500/20 p-4 flex gap-3">
                  <button 
                    onClick={handleCodeAnalysis}
                    disabled={isAnalyzing}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                        Running...
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5" />
                        Compile & Run
                      </>
                    )}
                  </button>
                  <button 
                    onClick={handleCodeAnalysis}
                    disabled={isAnalyzing}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Bot className="w-5 h-5" />
                    AI Review
                  </button>
                </div>
              </div>

              {/* AI Response */}
              <div className="bg-slate-800/50 backdrop-blur-lg border border-purple-500/20 rounded-xl overflow-hidden">
                <div className="bg-slate-900/80 border-b border-purple-500/20 p-4 flex items-center gap-2">
                  <Bot className="w-5 h-5 text-purple-400" />
                  <span className="font-semibold">AI Code Review & Output</span>
                </div>
                <div className="p-6 h-96 overflow-y-auto">
                  {aiResponse ? (
                    <pre className="text-sm text-gray-300 whitespace-pre-wrap font-sans">
                      {aiResponse}
                    </pre>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                      <MessageSquare className="w-16 h-16 mb-4 opacity-50" />
                      <p className="font-semibold mb-2">Ready to analyze your code!</p>
                      <p className="text-sm">Click "Compile & Run" to execute your code</p>
                      <p className="text-sm mt-1">Click "AI Review" to get instant feedback</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <h2 className="text-4xl font-bold mb-4">Global Leaderboard</h2>
              <p className="text-gray-400">Top performers this week</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-lg border border-purple-500/20 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-900/80 border-b border-purple-500/20">
                    <tr>
                      <th className="px-6 py-4 text-left">Rank</th>
                      <th className="px-6 py-4 text-left">User</th>
                      <th className="px-6 py-4 text-right">Score</th>
                      <th className="px-6 py-4 text-right">Solved</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map(entry => (
                      <tr key={entry.rank} className="border-b border-purple-500/10 hover:bg-slate-700/30 transition-all">
                        <td className="px-6 py-4">
                          <div className={`flex items-center gap-2 ${
                            entry.rank <= 3 ? 'font-bold' : ''
                          }`}>
                            {entry.rank <= 3 && (
                              <Star className={`w-5 h-5 ${
                                entry.rank === 1 ? 'text-yellow-400' :
                                entry.rank === 2 ? 'text-gray-400' :
                                'text-orange-600'
                              }`} />
                            )}
                            #{entry.rank}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold">{entry.name}</td>
                        <td className="px-6 py-4 text-right text-purple-400 font-bold">{entry.score}</td>
                        <td className="px-6 py-4 text-right text-gray-400">{entry.solved} problems</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-slate-900/80 border-t border-purple-500/20 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
              <Code className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold">AI Code Reviewer</span>
          </div>
          <p className="text-gray-400 mb-4">Where every coder gets their own AI coach! 🚀</p>
          <div className="flex justify-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-purple-400 transition-all">Documentation</a>
            <a href="#" className="hover:text-purple-400 transition-all">GitHub</a>
            <a href="#" className="hover:text-purple-400 transition-all">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;