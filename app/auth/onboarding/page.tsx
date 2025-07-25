"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  roleSkillMap,
  stepsData,
  generateFakeRoadmap,
} from "@/data/onboardingData";

export default function Onboarding() {
  const totalSteps = stepsData.length;
  const [step, setStep] = useState(1);
  const [customRole, setCustomRole] = useState("");
  const [customSkill, setCustomSkill] = useState("");
  const router = useRouter();

  const [formData, setFormData] = useState({
    role: "",
    skills: [] as string[],
    aiRoadmap: "",
    editedRoadmap: "",
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));
  const saveData = (key: keyof typeof formData, value: any) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const getRoadmapValue = formData.editedRoadmap || formData.aiRoadmap;
  const skillsForRole = roleSkillMap[formData.role.toLowerCase()] || [];

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-gray-500">
          Step {step} of {totalSteps}
        </span>
        <span className="text-sm text-gray-400">{stepsData[step - 1]}</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-700 shadow rounded-2xl p-6 border"
        >
          {/* Step 1: Role */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold mb-4">👤 Select Your Role</h2>
              {Object.keys(roleSkillMap).map((role) => (
                <button
                  key={role}
                  onClick={() => saveData("role", role)}
                  className={`block w-full mb-3 rounded-lg px-4 py-3 font-medium border ${
                    formData.role === role
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                  }`}
                >
                  {role
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </button>
              ))}
              <button
                onClick={() => saveData("role", customRole)}
                className={`block w-full mb-3 rounded-lg px-4 py-3 font-medium border ${
                  formData.role === customRole
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                }`}
              >
                Other
              </button>
              {formData.role === customRole && (
                <input
                  type="text"
                  value={customRole}
                  onChange={(e) => {
                    setCustomRole(e.target.value);
                    saveData("role", e.target.value);
                  }}
                  placeholder="Specify your role..."
                  className="mt-3 w-full border rounded-lg p-2"
                />
              )}
            </div>
          )}

          {/* Step 2: Skills */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold mb-4">🛠️ Select Your Skills</h2>
              {skillsForRole.map((skill) => (
                <label
                  key={skill}
                  className="block mb-2 bg-gray-50 rounded-lg px-4 py-2 border hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition"
                >
                  <input
                    type="checkbox"
                    checked={formData.skills.includes(skill)}
                    onChange={(e) => {
                      const updated = e.target.checked
                        ? [...formData.skills, skill]
                        : formData.skills.filter((s) => s !== skill);
                      saveData("skills", updated);
                    }}
                    className="mr-3"
                  />
                  {skill}
                </label>
              ))}
              <div className="mt-4">
                <input
                  type="text"
                  value={customSkill}
                  onChange={(e) => setCustomSkill(e.target.value)}
                  placeholder="Add another skill..."
                  className="w-full border rounded-lg p-2"
                />
                <button
                  onClick={() => {
                    if (customSkill && !formData.skills.includes(customSkill)) {
                      saveData("skills", [...formData.skills, customSkill]);
                      setCustomSkill("");
                    }
                  }}
                  className="mt-2 bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg w-full"
                >
                  ➕ Add Skill
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Generate AI Roadmap */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold mb-4">
                🤖 AI Generated Roadmap
              </h2>
              <button
                onClick={() => {
                  const roadmap = generateFakeRoadmap(
                    formData.role.toLowerCase(),
                    formData.skills
                  );
                  saveData("aiRoadmap", roadmap);
                }}
                className="mb-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
              >
                Generate Roadmap 🤖
              </button>
              <textarea
                className="w-full border rounded-lg p-3 h-56"
                value={formData.aiRoadmap}
                onChange={(e) => saveData("aiRoadmap", e.target.value)}
              />
            </div>
          )}

          {/* Step 4: Edit Roadmap */}
          {step === 4 && (
            <div>
              <h2 className="text-xl font-bold mb-4">✏️ Edit Your Roadmap</h2>
              <textarea
                className="w-full border rounded-lg p-3 h-56"
                value={getRoadmapValue}
                onChange={(e) => saveData("editedRoadmap", e.target.value)}
              />
            </div>
          )}

          {/* Step 5: Confirm */}
          {step === 5 && (
            <div>
              <h2 className="text-xl font-bold mb-4">
                ✅ Confirm & Save Roadmap
              </h2>
              <div className="mb-4">
                <strong>Role:</strong> {formData.role}
              </div>
              <div className="mb-4">
                <strong>Skills:</strong> {formData.skills.join(", ")}
              </div>
              <div className="mb-4">
                <strong>Roadmap:</strong>
                <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg whitespace-pre-wrap">
                  {getRoadmapValue}
                </pre>
              </div>
              <button
                onClick={() => {
                  alert("✅ Roadmap saved locally!");
                  router.push("/dashboard");
                }}
                className="bg-green-600 text-white py-3 w-full rounded-lg font-semibold"
              >
                Save Roadmap
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-8">
        {step > 1 && (
          <button
            onClick={prevStep}
            className="text-blue-600 font-medium hover:underline"
          >
            ← Back
          </button>
        )}
        {step < totalSteps && (
          <button
            onClick={nextStep}
            disabled={
              (step === 1 && !formData.role) ||
              (step === 2 && formData.skills.length === 0) ||
              (step === 3 && !formData.aiRoadmap) ||
              (step === 4 && !getRoadmapValue)
            }
            className="ml-auto bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-lg text-white font-semibold disabled:opacity-50"
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
}