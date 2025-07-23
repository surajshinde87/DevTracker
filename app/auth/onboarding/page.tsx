'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const stepsData = [
  'Select Your Role',
  'Select Your Skills',
  'AI Generated Roadmap',
  'Edit Your Roadmap',
  'Confirm & Save Roadmap',
];

const roleSkillMap: Record<string, string[]> = {
  'frontend developer': ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Vue.js', 'Tailwind CSS'],
  'backend developer': ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'Java', 'Python', 'Spring Boot', 'Django'],
  'fullstack developer': [
    'HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Express.js',
    'MongoDB', 'Next.js', 'TypeScript', 'REST APIs', 'GraphQL'
  ],
  'devops engineer': [
    'Linux', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'CI/CD', 'Terraform', 'Ansible', 'Jenkins', 'Monitoring Tools'
  ],
  'mobile developer': ['Flutter', 'React Native', 'Kotlin', 'Swift', 'Firebase'],
  'data scientist': ['Python', 'R', 'Pandas', 'NumPy', 'TensorFlow', 'PyTorch', 'SQL', 'Machine Learning'],
  'ai/ml engineer': ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Deep Learning', 'NLP', 'Data Engineering'],
};

const generateFakeRoadmap = (role: string, skills: string[]) => {
  if (role.includes('frontend')) {
    return `
🚀 Frontend Developer Roadmap

1️⃣ Learn Basics:
- HTML, CSS, JavaScript

2️⃣ Frameworks:
- ${skills.includes('React') ? 'React' : 'Vue.js'}
- Next.js for SSR & Routing

3️⃣ Styling:
- ${skills.includes('Tailwind CSS') ? 'Tailwind CSS' : 'SASS / SCSS'}

4️⃣ State Management:
- Redux or Context API

5️⃣ APIs:
- REST APIs / GraphQL

6️⃣ Deployment:
- Vercel or Netlify

7️⃣ Optimization:
- SEO, Accessibility, Performance

8️⃣ Projects:
- Build 3-5 real-world projects`;
  }
  if (role.includes('backend')) {
    return `
🔧 Backend Developer Roadmap

1️⃣ Language:
- Node.js / Java / Python

2️⃣ Framework:
- Express.js / Spring Boot / Django

3️⃣ Databases:
- MongoDB / PostgreSQL / MySQL

4️⃣ API Design:
- REST APIs, GraphQL

5️⃣ Authentication:
- JWT, OAuth2

6️⃣ Deployment:
- AWS / Azure

7️⃣ Testing & Scaling:
- Unit tests, Load balancing

8️⃣ Real-World Projects`;
  }
  if (role.includes('devops')) {
    return `
⚙️ DevOps Engineer Roadmap

1️⃣ Linux Essentials

2️⃣ Docker & Containers

3️⃣ Kubernetes Orchestration

4️⃣ Cloud:
- AWS / Azure / GCP

5️⃣ CI/CD Pipelines:
- Jenkins / GitHub Actions

6️⃣ Infrastructure as Code:
- Terraform / Ansible

7️⃣ Monitoring:
- Prometheus, Grafana

8️⃣ Security Best Practices`;
  }
  return `AI Generated Roadmap will appear here based on your role and skills.`;
};

export default function OnboardingPage() {
  const totalSteps = stepsData.length;
  const [step, setStep] = useState(1);
  const [customRole, setCustomRole] = useState('');
  const [customSkill, setCustomSkill] = useState('');

  const [formData, setFormData] = useState({
    role: '',
    skills: [] as string[],
    aiRoadmap: '',
    editedRoadmap: '',
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));
  const saveData = (key: keyof typeof formData, value: any) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const getRoadmapValue = formData.editedRoadmap || formData.aiRoadmap;
  const skillsForRole = roleSkillMap[formData.role.toLowerCase()] || [];

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 font-sans">
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
          className="bg-white shadow rounded-2xl p-6 border"
        >
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold mb-4">👤 Select Your Role</h2>
              {Object.keys(roleSkillMap).map((role) => (
                <button
                  key={role}
                  onClick={() => saveData('role', role)}
                  className={`block w-full mb-3 rounded-lg px-4 py-3 font-medium border ${
                    formData.role === role
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {role.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                </button>
              ))}
              <button
                onClick={() => saveData('role', customRole)}
                className={`block w-full mb-3 rounded-lg px-4 py-3 font-medium border ${
                  formData.role === customRole ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
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
                    saveData('role', e.target.value);
                  }}
                  placeholder="Specify your role..."
                  className="mt-3 w-full border rounded-lg p-2 focus:ring focus:outline-none"
                />
              )}
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold mb-4">🛠️ Select Your Skills</h2>
              {[...new Set([...skillsForRole, ...formData.skills])].map((skill) => (
  <label
    key={skill}
    className="block mb-2 bg-gray-50 rounded-lg px-4 py-2 border hover:bg-gray-100 transition"
  >
    <input
      type="checkbox"
      checked={formData.skills.includes(skill)}
      onChange={(e) => {
        const updated = e.target.checked
          ? [...formData.skills, skill]
          : formData.skills.filter((s) => s !== skill);
        saveData('skills', updated);
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
                      saveData('skills', [...formData.skills, customSkill]);
                      setCustomSkill('');
                    }
                  }}
                  className="mt-2 bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg w-full"
                >
                  ➕ Add Skill
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold mb-4">🤖 AI Generated Roadmap</h2>
              <p className="mb-4 text-gray-600">
                Click to generate your personalized static roadmap based on your role and skills.
              </p>
              <button
                onClick={() => {
                  const roadmap = generateFakeRoadmap(formData.role.toLowerCase(), formData.skills);
                  saveData('aiRoadmap', roadmap);
                }}
                className="mb-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
              >
                Generate Roadmap 🤖
              </button>
              <textarea
                className="w-full border rounded-lg p-3 h-56 focus:ring focus:outline-none"
                value={formData.aiRoadmap}
                onChange={(e) => saveData('aiRoadmap', e.target.value)}
                placeholder="Click generate to view roadmap"
              />
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-xl font-bold mb-4">✏️ Edit Your Roadmap</h2>
              <textarea
                className="w-full border rounded-lg p-3 h-56 focus:ring focus:outline-none"
                value={getRoadmapValue}
                onChange={(e) => saveData('editedRoadmap', e.target.value)}
                placeholder="Customize the AI roadmap..."
              />
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="text-xl font-bold mb-4">✅ Confirm & Save Roadmap</h2>
              <div className="mb-4">
                <p className="font-semibold text-gray-700">Role:</p>
                <p>{formData.role}</p>
              </div>
              <div className="mb-4">
                <p className="font-semibold text-gray-700">Skills:</p>
                <p>{formData.skills.join(', ')}</p>
              </div>
              <div className="mb-4">
                <p className="font-semibold text-gray-700">Final Roadmap:</p>
                <pre className="bg-gray-100 p-3 rounded-lg whitespace-pre-wrap">{getRoadmapValue}</pre>
              </div>
              <button
                onClick={() => alert('✅ Roadmap saved locally (static preview)!')}
                className="bg-green-600 w-full py-3 rounded-lg text-white font-semibold hover:bg-green-700 transition"
              >
                Confirm & Save
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

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
