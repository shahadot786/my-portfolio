"use client";
import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Target,
  TrendingUp,
  Award,
  BookOpen,
  Code,
  CheckCircle,
  Github,
  Settings,
  Download,
  Upload,
} from "lucide-react";

// Types
interface DayData {
  day: number;
  date: string;
  hours: number;
  topics: string[];
  projects: string;
  leetcode: number;
  notes: string;
}

interface FormData {
  hours: string;
  topics: string;
  projects: string;
  leetcode: string;
  notes: string;
}

interface GitHubConfig {
  token: string;
  repo: string;
  owner: string;
}

export default function LearningTracker() {
  const [days, setDays] = useState<DayData[]>([]);
  const [currentDay, setCurrentDay] = useState<DayData | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    hours: "",
    topics: "",
    projects: "",
    leetcode: "",
    notes: "",
  });
  const [githubConfig, setGithubConfig] = useState<GitHubConfig>({
    token: process.env.NEXT_PUBLIC_GITHUB_TOKEN || "",
    repo: process.env.NEXT_PUBLIC_GITHUB_REPO || "",
    owner: process.env.NEXT_PUBLIC_GITHUB_OWNER || "",
  });
  const [syncStatus, setSyncStatus] = useState<string>("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = (): void => {
    try {
      const storedDays = localStorage.getItem("learning-tracker-days");
      if (storedDays) {
        const parsedDays: DayData[] = JSON.parse(storedDays);
        setDays(parsedDays.sort((a, b) => a.day - b.day));
      }
    } catch (error) {
      console.error("Error loading data:", error);
      setDays([]);
    }
  };

  const saveDaysToStorage = (daysToSave: DayData[]): void => {
    try {
      localStorage.setItem("learning-tracker-days", JSON.stringify(daysToSave));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  const saveGithubConfig = (): void => {
    try {
      localStorage.setItem("github-config", JSON.stringify(githubConfig));
      setSyncStatus("✅ GitHub config saved!");
      setTimeout(() => setSyncStatus(""), 3000);
      setShowSettings(false);
    } catch (error) {
      setSyncStatus("❌ Error saving config");
    }
  };

  const generateReadme = (): string => {
    const totalHours = days.reduce((sum, d) => sum + d.hours, 0);
    const totalLeetcode = days.reduce((sum, d) => sum + d.leetcode, 0);
    const avgHoursPerDay =
      days.length > 0 ? (totalHours / days.length).toFixed(1) : "0";
    const progress = Math.round((days.length / 90) * 100);
    const daysLeft = 90 - days.length;

    const getCurrentBatch = (): string => {
      const day = days.length;
      if (day <= 10) return "🩵 Batch 1: Fundamentals";
      if (day <= 25) return "💛 Batch 2: JS/TS & DSA";
      if (day <= 35) return "💚 Batch 3: Web & Systems";
      if (day <= 45) return "💙 Batch 4: React";
      if (day <= 55) return "🧡 Batch 5: Backend";
      if (day <= 70) return "💜 Batch 6: React Native";
      if (day <= 80) return "❤️ Batch 7: DevOps";
      if (day <= 85) return "🤍 Batch 8: System Design";
      if (day <= 88) return "🖤 Batch 9: Security";
      return "💫 Batch 10: Capstone";
    };

    const progressBar =
      "█".repeat(Math.floor(progress / 10)) +
      "░".repeat(10 - Math.floor(progress / 10));

    let readme = `# 🚀 90-Day Master Software Engineer Challenge

**Current Status:** ${getCurrentBatch()}  
**Last Updated:** ${new Date().toLocaleDateString()}

## 📊 Progress Overview

\`\`\`
Progress: [${progressBar}] ${progress}%
Days Completed: ${days.length}/90
Days Remaining: ${daysLeft}
\`\`\`

## 📈 Statistics

| Metric | Value |
|--------|-------|
| 📚 Total Study Hours | ${totalHours}h |
| ⚡ Average Hours/Day | ${avgHoursPerDay}h |
| 💻 LeetCode Problems | ${totalLeetcode} |
| 🎯 Current Streak | ${days.length} days |

## 📅 Recent Progress

`;

    const recentDays = days.slice(-10).reverse();
    recentDays.forEach((day) => {
      readme += `### Day ${day.day} - ${day.date}\n\n`;
      readme += `- ⏱️ **Hours:** ${day.hours}h\n`;
      readme += `- 📖 **Topics:** ${day.topics.join(", ")}\n`;
      readme += `- 🏗️ **Projects:** ${day.projects}\n`;
      readme += `- 💻 **LeetCode:** ${day.leetcode} problems\n`;
      if (day.notes) {
        readme += `- 📝 **Notes:** ${day.notes}\n`;
      }
      readme += `\n`;
    });

    readme += `## 🎯 Batch Progress

| Batch | Topic | Days | Status |
|-------|-------|------|--------|
| 🩵 1 | Programming Fundamentals | 1-10 | ${
      days.length >= 10 ? "✅" : days.length >= 1 ? "🔄" : "⏳"
    } |
| 💛 2 | JavaScript & TypeScript | 11-25 | ${
      days.length >= 25 ? "✅" : days.length >= 11 ? "🔄" : "⏳"
    } |
| 💚 3 | Web & System Design | 26-35 | ${
      days.length >= 35 ? "✅" : days.length >= 26 ? "🔄" : "⏳"
    } |
| 💙 4 | React Core | 36-45 | ${
      days.length >= 45 ? "✅" : days.length >= 36 ? "🔄" : "⏳"
    } |
| 🧡 5 | Backend Engineering | 46-55 | ${
      days.length >= 55 ? "✅" : days.length >= 46 ? "🔄" : "⏳"
    } |
| 💜 6 | React Native | 56-70 | ${
      days.length >= 70 ? "✅" : days.length >= 56 ? "🔄" : "⏳"
    } |
| ❤️ 7 | DevOps & Testing | 71-80 | ${
      days.length >= 80 ? "✅" : days.length >= 71 ? "🔄" : "⏳"
    } |
| 🤍 8 | System Design Deep Dive | 81-85 | ${
      days.length >= 85 ? "✅" : days.length >= 81 ? "🔄" : "⏳"
    } |
| 🖤 9 | Security & Privacy | 86-88 | ${
      days.length >= 88 ? "✅" : days.length >= 86 ? "🔄" : "⏳"
    } |
| 💫 10 | Capstone Project | 89-90 | ${
      days.length >= 90 ? "✅" : days.length >= 89 ? "🔄" : "⏳"
    } |

## 📚 All Topics Covered

`;

    const allTopics = Array.from(new Set(days.flatMap((d) => d.topics)));
    readme += allTopics.map((topic) => `- ${topic}`).join("\n");

    readme += `\n\n## 🏆 Milestones

`;

    const milestones = [
      { day: 10, title: "Fundamentals Complete", achieved: days.length >= 10 },
      { day: 25, title: "JS/TS Mastery", achieved: days.length >= 25 },
      { day: 45, title: "React Proficiency", achieved: days.length >= 45 },
      { day: 70, title: "Mobile Development", achieved: days.length >= 70 },
      { day: 90, title: "Challenge Complete!", achieved: days.length >= 90 },
    ];

    milestones.forEach((m) => {
      readme += `- [${m.achieved ? "x" : " "}] Day ${m.day}: ${m.title}\n`;
    });

    readme += `\n---\n\n*This README is auto-generated by my 90-Day Learning Tracker*\n`;
    readme += `*Last sync: ${new Date().toLocaleString()}*\n`;

    return readme;
  };

  const syncToGithub = async (): Promise<void> => {
    if (!githubConfig.token || !githubConfig.repo || !githubConfig.owner) {
      setSyncStatus("❌ Please configure GitHub settings first");
      return;
    }

    setSyncStatus("🔄 Syncing to GitHub...");

    try {
      const readme = generateReadme();

      const getResponse = await fetch(
        `https://api.github.com/repos/${githubConfig.owner}/${githubConfig.repo}/contents/README.md`,
        {
          headers: {
            Authorization: `token ${githubConfig.token}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      let sha: string | null = null;
      if (getResponse.ok) {
        const data = await getResponse.json();
        sha = data.sha;
      }

      const response = await fetch(
        `https://api.github.com/repos/${githubConfig.owner}/${githubConfig.repo}/contents/README.md`,
        {
          method: "PUT",
          headers: {
            Authorization: `token ${githubConfig.token}`,
            Accept: "application/vnd.github.v3+json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: `📚 Update Day ${days.length} progress`,
            content: btoa(unescape(encodeURIComponent(readme))),
            ...(sha && { sha }),
          }),
        }
      );

      if (response.ok) {
        setSyncStatus("✅ Successfully synced to GitHub!");
        setTimeout(() => setSyncStatus(""), 5000);
      } else {
        const error = await response.json();
        setSyncStatus(`❌ GitHub Error: ${error.message}`);
      }
    } catch (error) {
      setSyncStatus(
        `❌ Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  };

  const saveDay = async (): Promise<void> => {
    if (!formData.hours || !formData.topics) {
      alert("Please fill in hours and topics at minimum");
      return;
    }

    const dayNumber = days.length + 1;
    const newDay: DayData = {
      day: dayNumber,
      date: new Date().toLocaleDateString(),
      hours: parseFloat(formData.hours),
      topics: formData.topics.split(",").map((t) => t.trim()),
      projects: formData.projects || "None",
      leetcode: parseInt(formData.leetcode) || 0,
      notes: formData.notes || "",
    };

    try {
      const updatedDays = [...days, newDay];
      setDays(updatedDays);
      saveDaysToStorage(updatedDays);
      setFormData({
        hours: "",
        topics: "",
        projects: "",
        leetcode: "",
        notes: "",
      });
      setShowForm(false);
      setCurrentDay(null);

      if (githubConfig.token && githubConfig.repo && githubConfig.owner) {
        setTimeout(() => syncToGithub(), 500);
      }
    } catch (error) {
      alert(
        `Error saving data: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  const updateDay = async (): Promise<void> => {
    if (!currentDay) return;

    const updatedDay: DayData = {
      ...currentDay,
      hours: parseFloat(formData.hours),
      topics: formData.topics.split(",").map((t) => t.trim()),
      projects: formData.projects || "None",
      leetcode: parseInt(formData.leetcode) || 0,
      notes: formData.notes || "",
    };

    try {
      const updatedDays = days.map((d) =>
        d.day === currentDay.day ? updatedDay : d
      );
      setDays(updatedDays);
      saveDaysToStorage(updatedDays);
      setFormData({
        hours: "",
        topics: "",
        projects: "",
        leetcode: "",
        notes: "",
      });
      setShowForm(false);
      setCurrentDay(null);
    } catch (error) {
      alert(
        `Error updating data: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  const editDay = (day: DayData): void => {
    setCurrentDay(day);
    setFormData({
      hours: day.hours.toString(),
      topics: day.topics.join(", "),
      projects: day.projects,
      leetcode: day.leetcode.toString(),
      notes: day.notes,
    });
    setShowForm(true);
  };

  const deleteDay = async (dayNumber: number): Promise<void> => {
    if (!confirm("Delete this day?")) return;

    try {
      const updatedDays = days.filter((d) => d.day !== dayNumber);
      setDays(updatedDays);
      saveDaysToStorage(updatedDays);
    } catch (error) {
      alert(
        `Error deleting: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  const resetAll = async (): Promise<void> => {
    if (!confirm("⚠️ This will delete ALL your progress. Are you sure?"))
      return;

    try {
      localStorage.removeItem("learning-tracker-days");
      setDays([]);
      setFormData({
        hours: "",
        topics: "",
        projects: "",
        leetcode: "",
        notes: "",
      });
      setShowForm(false);
      setCurrentDay(null);
    } catch (error) {
      alert(
        `Error resetting: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  const exportData = (): void => {
    const dataStr = JSON.stringify(days, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `90day-progress-${
      new Date().toISOString().split("T")[0]
    }.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportReadme = (): void => {
    const readme = generateReadme();
    const blob = new Blob([readme], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "README.md";
    link.click();
    URL.revokeObjectURL(url);
  };

  const importData = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const result = event.target?.result;
        if (typeof result === "string") {
          const imported: DayData[] = JSON.parse(result);
          setDays(imported);
          saveDaysToStorage(imported);
          alert("✅ Data imported successfully!");
        }
      } catch (error) {
        alert(
          `❌ Error importing data: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    };
    reader.readAsText(file);
  };

  const totalHours = days.reduce((sum, d) => sum + d.hours, 0);
  const totalLeetcode = days.reduce((sum, d) => sum + d.leetcode, 0);
  const avgHoursPerDay =
    days.length > 0 ? (totalHours / days.length).toFixed(1) : "0";
  const progress = Math.round((days.length / 90) * 100);
  const daysLeft = 90 - days.length;

  const getCurrentBatch = (): string => {
    const day = days.length + 1;
    if (day <= 10) return "🩵 Batch 1: Fundamentals";
    if (day <= 25) return "💛 Batch 2: JS/TS & DSA";
    if (day <= 35) return "💚 Batch 3: Web & Systems";
    if (day <= 45) return "💙 Batch 4: React";
    if (day <= 55) return "🧡 Batch 5: Backend";
    if (day <= 70) return "💜 Batch 6: React Native";
    if (day <= 80) return "❤️ Batch 7: DevOps";
    if (day <= 85) return "🤍 Batch 8: System Design";
    if (day <= 88) return "🖤 Batch 9: Security";
    return "💫 Batch 10: Capstone";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                90-Day Master Engineer Challenge
              </h1>
              <p className="text-gray-600">{getCurrentBatch()}</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-indigo-600">
                {days.length}/90
              </div>
              <div className="text-sm text-gray-500">Days Completed</div>
            </div>
          </div>

          {syncStatus && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
              {syncStatus}
            </div>
          )}

          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <Clock className="w-6 h-6 text-blue-600 mb-2" />
              <div className="text-2xl font-bold text-gray-800">
                {totalHours}h
              </div>
              <div className="text-xs text-gray-600">Total Hours</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <TrendingUp className="w-6 h-6 text-green-600 mb-2" />
              <div className="text-2xl font-bold text-gray-800">
                {avgHoursPerDay}h
              </div>
              <div className="text-xs text-gray-600">Avg per Day</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <Code className="w-6 h-6 text-purple-600 mb-2" />
              <div className="text-2xl font-bold text-gray-800">
                {totalLeetcode}
              </div>
              <div className="text-xs text-gray-600">LeetCode Solved</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <Target className="w-6 h-6 text-orange-600 mb-2" />
              <div className="text-2xl font-bold text-gray-800">{daysLeft}</div>
              <div className="text-xs text-gray-600">Days Left</div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => {
              setShowForm(!showForm);
              setCurrentDay(null);
              setFormData({
                hours: "",
                topics: "",
                projects: "",
                leetcode: "",
                notes: "",
              });
            }}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center gap-2"
          >
            <BookOpen className="w-5 h-5" />
            {showForm ? "Cancel" : `Log Day ${days.length + 1}`}
          </button>

          <button
            onClick={syncToGithub}
            className="bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!githubConfig.token}
          >
            <Github className="w-5 h-5" />
            Sync to GitHub
          </button>

          {/* <button
            onClick={() => setShowSettings(!showSettings)}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition flex items-center gap-2"
          >
            <Settings className="w-5 h-5" />
            Settings
          </button> */}

          {days.length > 0 && (
            <>
              <button
                onClick={exportReadme}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Export README
              </button>
              <button
                onClick={exportData}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Export Data
              </button>
              <label className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition flex items-center gap-2 cursor-pointer">
                <Upload className="w-5 h-5" />
                Import Data
                <input
                  type="file"
                  accept=".json"
                  onChange={importData}
                  className="hidden"
                />
              </label>
              <button
                onClick={resetAll}
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Reset All
              </button>
            </>
          )}
        </div>

        {showSettings && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Github className="w-6 h-6" />
              GitHub Configuration
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub Personal Access Token
                </label>
                <input
                  type="password"
                  value={githubConfig.token}
                  onChange={(e) =>
                    setGithubConfig({ ...githubConfig, token: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="ghp_xxxxxxxxxxxx"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Create token at: GitHub → Settings → Developer settings →
                  Personal access tokens → Generate new token (Classic)
                  <br />
                  Required scope:{" "}
                  <code className="bg-gray-100 px-1 rounded">repo</code>
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Repository Owner (Username)
                </label>
                <input
                  type="text"
                  value={githubConfig.owner}
                  onChange={(e) =>
                    setGithubConfig({ ...githubConfig, owner: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="your-username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Repository Name
                </label>
                <input
                  type="text"
                  value={githubConfig.repo}
                  onChange={(e) =>
                    setGithubConfig({ ...githubConfig, repo: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="90-day-challenge"
                />
              </div>
              <button
                onClick={saveGithubConfig}
                className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Save Configuration
              </button>
            </div>
          </div>
        )}

        {showForm && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {currentDay
                ? `Edit Day ${currentDay.day}`
                : `Day ${days.length + 1}`}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hours Studied *
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={formData.hours}
                  onChange={(e) =>
                    setFormData({ ...formData, hours: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="3.5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LeetCode Problems
                </label>
                <input
                  type="number"
                  value={formData.leetcode}
                  onChange={(e) =>
                    setFormData({ ...formData, leetcode: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="3"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Topics Learned * (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.topics}
                  onChange={(e) =>
                    setFormData({ ...formData, topics: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Closures, Async/Await, Promises"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Projects Worked On
                </label>
                <input
                  type="text"
                  value={formData.projects}
                  onChange={(e) =>
                    setFormData({ ...formData, projects: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Calculator App, REST API"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes / Reflections
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows={3}
                  placeholder="What went well? What was challenging?"
                />
              </div>
            </div>
            <button
              onClick={currentDay ? updateDay : saveDay}
              className="mt-4 bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition w-full"
            >
              {currentDay ? "Update Day" : "Save Day"}
            </button>
          </div>
        )}

        {days.length > 0 ? (
          <div className="space-y-3">
            {[...days].reverse().map((day) => (
              <div
                key={day.day}
                className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-100 text-indigo-700 font-bold rounded-full w-12 h-12 flex items-center justify-center">
                      {day.day}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">
                        Day {day.day}
                      </div>
                      <div className="text-sm text-gray-500">{day.date}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => editDay(day)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteDay(day.day)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-600">
                      {day.hours}h studied
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-purple-600" />
                    <span className="text-sm text-gray-600">
                      {day.leetcode} problems
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-600">
                      {day.projects}
                    </span>
                  </div>
                </div>

                <div className="mb-2">
                  <div className="text-xs font-semibold text-gray-500 mb-1">
                    Topics:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {day.topics.map((topic, i) => (
                      <span
                        key={i}
                        className="bg-indigo-50 text-indigo-700 text-xs px-3 py-1 rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {day.notes && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="text-xs font-semibold text-gray-500 mb-1">
                      Notes:
                    </div>
                    <p className="text-sm text-gray-600">{day.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Start Your Journey
            </h3>
            <p className="text-gray-500">
              Click &quot;Log Day 1&quot; to begin tracking your 90-day
              challenge!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
