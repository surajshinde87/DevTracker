// data/onboardingData.ts

export const stepsData = [
  'Select Your Role',
  'Select Your Skills',
  'AI Generated Roadmap',
  'Edit Your Roadmap',
  'Confirm & Save Roadmap',
];

export const roleSkillMap: Record<string, string[]> = {
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

export const generateFakeRoadmap = (role: string, skills: string[]) => {
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
