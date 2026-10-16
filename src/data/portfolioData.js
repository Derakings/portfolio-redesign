// ============================================================
// portfolioData.js — Central content configuration
// Edit this file to update the text, links and projects on the site.
// ============================================================

export const personalInfo = {
  name: "Chidera Ojimba",
  title: "Cloud Engineer",
  // Rotating roles shown by the typewriter in the hero
  roles: [
    "Cloud Engineer",
    "DevOps Engineer",
    "Infrastructure as Code Builder",
    "CI/CD Automator",
  ],
  tagline:
    "Building scalable, secure infrastructure on AWS, Azure and Cloud-native platforms.",

  bio: `I'm a Cloud Engineer with hands-on experience designing and maintaining scalable,
        secure, and highly available infrastructure on major cloud platforms.
        I specialize in Infrastructure as Code, Kubernetes orchestration, and
        building automated CI/CD pipelines that accelerate software delivery.`,
  email: "chideraojimba878@gmail.com",
  linkedin: "https://www.linkedin.com/in/chidera-ojimba",
  github: "https://github.com/Derakings",
  resumeUrl:
    "https://docs.google.com/document/d/1iDMIpTeeFSWL4rmoTX438kHJz-zKTdWw/edit?usp=sharing&ouid=116729427123835559428&rtpof=true&sd=true",
  // Photo lives in /public
  photoUrl: "/profile-pic.jpeg",
  photoAlt: "Portrait of Chidera Ojimba",
};

export const introVideo = {
  // YouTube video ID from the share URL of your YouTube video.
  youtubeId: "nWgWPt0xTRA",
  title: "Who I Am as a Cloud Engineer",
  description:
    "A quick introduction to my background, what I do, and what excites me about cloud engineering and DevOps.",
};

// Scrolling technology strip under the hero
export const techStack = [
  "AWS",
  "Azure",
  "Terraform",
  "Kubernetes",
  "Docker",
  "OpenShift",
  "Ansible",
  "Helm",
  "GitHub Actions",
  "Jenkins",
  "Prometheus",
  "Grafana",
  "Linux",
  "Python",
  "Bash",
];

// "What I do" cards in the About section
export const focusAreas = [
  {
    icon: "cloud",
    title: "Cloud Infrastructure",
    text: "Scalable, secure and highly available environments on AWS, Azure and OpenShift.",
  },
  {
    icon: "code",
    title: "Infrastructure as Code",
    text: "Repeatable provisioning with Terraform, Ansible and CloudFormation.",
  },
  {
    icon: "cube",
    title: "Containers & Kubernetes",
    text: "Docker images and Kubernetes workloads on EKS, AKS and OKD, packaged with Helm.",
  },
  {
    icon: "loop",
    title: "CI/CD Automation",
    text: "Automated build, test and deploy pipelines with GitHub Actions, Jenkins and GitLab CI.",
  },
];

export const skills = [
  {
    category: "Cloud Platforms",
    items: [
      "Amazon Web Services (AWS)",
      "Microsoft Azure",
      "Red Hat OpenShift",
      "Google Cloud Platform",
    ],
  },
  {
    category: "Infrastructure as Code",
    items: ["Terraform", "Ansible", "AWS CloudFormation"],
  },
  {
    category: "Containers & Orchestration",
    items: ["Docker", "Kubernetes (EKS/AKS/OKD)", "Helm", "Amazon ECS"],
  },
  {
    category: "CI/CD & DevOps",
    items: ["GitHub Actions", "Jenkins", "GitLab CI"],
  },
  {
    category: "Monitoring & Logging",
    items: ["AWS CloudWatch", "Prometheus", "Grafana"],
  },
  {
    category: "Programming & Scripting",
    items: ["Python (beginner)", "Bash"],
  },
  {
    category: "Version Control & Collaboration",
    items: ["Git", "GitHub", "GitLab"],
  },
  {
    category: "Security & Identity",
    items: ["AWS IAM", "Security Groups", "Network ACLs"],
  },
  {
    category: "Linux & Networking",
    items: [
      "Linux Server Management",
      "Linux administration",
      "TCP/IP",
      "DNS",
      "Load Balancing",
    ],
  },
  {
    category: "Web development",
    items: ["HTML", "CSS", "JavaScript", "Node.js"],
  },
  {
    category: "Soft Skills",
    items: [
      "Effective Communication",
      "Problem Solving",
      "Team Collaboration",
      "Adaptability",
    ],
  },
];

// credentialUrl: leave empty ("") when there is no public verification link.
export const certifications = [
  {
    name: "HNG Internship - certified by HNGi8",
    issuer: "HNG",
    credentialUrl:
      "https://drive.google.com/file/d/1PvwEk5qvimX2AKV6W9XRVzVneD8_nH53/view?usp=drive_link",
    year: "2025",
  },
  {
    name: "AltSchool Africa — School of Engineering Cloud Engineering Program",
    issuer: "Altschool - expected",
    credentialUrl: "",
    year: "2024",
  },
  {
    name: "Kubernetes African Developer Training Program (KADT)",
    issuer: "Andela",
    credentialUrl: "",
    year: "2026",
  },
];

// categories drive the filter chips in the Projects section
export const projects = [
  {
    id: 1,
    title: "AWS Infrastructure Automation with Terraform",
    description:
      "Designed and provisioned complete AWS infrastructure using Terraform, including custom VPC, public subnets, route tables, security groups, EC2, ALB, Auto Scaling, and CloudWatch monitoring to improve scalability and deployment consistency.",
    tags: ["Terraform", "AWS VPC", "EC2", "ALB", "Auto Scaling", "CloudWatch"],
    categories: ["AWS", "Terraform"],
    githubUrl: "https://github.com/Derakings/Bedrock-project.git",
    liveUrl: null,
    featured: true,
  },
  {
    id: 2,
    title: "Kubernetes Application Deployment (Super Mario)",
    description:
      "Deployed a containerized Super Mario web application on Kubernetes, provisioned cloud resources with Terraform, and configured deployments, services, and networking for reliable application accessibility.",
    tags: ["Kubernetes", "Docker", "Terraform", "AWS"],
    categories: ["Kubernetes", "Docker", "Terraform", "AWS"],
    githubUrl: "https://github.com/Derakings/super-mario-eks-terraform.git",
    liveUrl: null,
    featured: true,
  },
  {
    id: 3,
    title: "Java Microservice Web App Deployment",
    description:
      "Designed a production-grade multi-VPC AWS architecture with Terraform, Transit Gateway, NLB, EC2 Auto Scaling Group, private subnet security, IAM least privilege, custom AMIs, and CloudWatch plus VPC Flow Logs for monitoring and resilience.",
    tags: [
      "Terraform",
      "AWS",
      "Transit Gateway",
      "NLB",
      "ASG",
      "IAM",
      "Apache",
    ],
    categories: ["AWS", "Terraform"],
    githubUrl: "https://github.com/Derakings/VPC_project_deployment.git",
    liveUrl: null,
    featured: false,
  },
  {
    id: 4,
    title: "CI/CD Pipeline with Azure and DevOps",
    description:
      "Designed and implemented an end-to-end CI/CD pipeline for a Python FastAPI microservice using Azure DevOps Pipelines, and OpenShift, with GitOps-driven deployments across dev, staging, and production.",
    tags: ["Azure DevOps", "OpenShift", "Kubernetes", "FastAPI", "GitOps"],
    categories: ["CI/CD", "Kubernetes"],
    githubUrl: "https://github.com/Derakings/AZURE_devops.git",
    liveUrl: null,
    featured: false,
  },
  {
    id: 5,
    title: "Dockerized Next.js and Python App with AWS ECR",
    description:
      "Containerized frontend and backend applications with production-ready Docker images, pushed secure tagged artifacts to Amazon ECR, and configured IAM plus AWS CLI authentication for cloud deployment workflows.",
    tags: ["Docker", "Next.js", "Python", "AWS ECR", "AWS CLI", "IAM"],
    categories: ["Docker", "AWS"],
    githubUrl: "https://github.com/Derakings/react-fastapi-app.git",
    liveUrl: null,
    featured: false,
  },
];

export const stats = [
  { number: "3+", label: "Years Experience" },
  { number: "15+", label: "Projects Delivered" },
  { number: "3", label: "Certifications" },
];

export const experience = [
  {
    company: "Oneflesh",
    role: "DevOps Engineer (Freelance)",
    summary:
      "Automated and deployed a secure, scalable multi-tier microservice app for an international Christian dating app using AWS services and serverless architecture, including VPC, EC2, MongoDB, and CloudWatch monitoring.",
  },
  {
    company: "Newsbridge AI",
    role: "Cloud & DevOps Engineer",
    summary:
      "Building and maintaining cloud infrastructure, deployment automation, and reliable delivery workflows.",
  },
];

export const navLinks = [
  { label: "About", to: "about" },
  { label: "Video", to: "video" },
  { label: "Skills", to: "skills" },
  { label: "Experience", to: "experience" },
  { label: "Projects", to: "projects" },
  { label: "Contact", to: "contact" },
];
