
export const projects = [
    {
        title: "Quantum-Based IoT Air Pollution Monitoring System",
        description: "Co-inventor of Indian Patent No. 589285, granted 13 May 2026, for Quantum-Secured IoT Air-Pollution Monitoring. Designed hybrid blockchain/IPFS storage and integrated QKD with AES encryption for secure IoT data handling.",
        tech: ["QKD", "AES", "Blockchain", "IPFS", "IoT"],
        tags: ["Patent Granted", "IoT Security", "Co-inventor"],
        links: {
            github: "",
            demo: ""
        }
    },
    {
        title: "Self-Hosted Homelab & Secure Network Infrastructure",
        description: "Operate nine containerized services across a NAS and Raspberry Pi behind authenticated web access. Automated power-loss recovery with systemd, Wake-on-LAN, and campus-session renewal, reducing recovery from about 20 minutes to 150 seconds.",
        tech: ["Debian", "Docker Compose", "Nginx", "OAuth2 Proxy", "systemd"],
        tags: ["Infrastructure", "Networking", "Self-Hosted"],
        links: {
            github: "",
            demo: "/homelab"
        }
    },
    {
        title: "AI-Enhanced Adaptive Honeypot",
        description: "Built an SSH decoy that simulates a Linux terminal and records authentication attempts, commands, source IPs, and timestamps. Deployed on Kubernetes in a Proxmox cluster with Grafana telemetry and bounded ML/LLM retries, validation, and fallback responses.",
        tech: ["Python", "Paramiko", "Kubernetes", "Proxmox VE", "Grafana", "Implicit Q-Learning", "Gemini API"],
        tags: ["Cybersecurity", "AI/ML", "Threat Intel"],
        links: {
            github: "https://github.com/Kush69420/ShadowHive/tree/main/shadowhive/ssh",
            demo: ""
        }
    },
    {
        title: "SENTINEL: OSINT Platform",
        description: "Built subscriber-record lookups, bulk imports, and audited reports. Made imports resumable using database checkpoints, streaming reads, batched inserts, and dry-run validation. Automated delivery using GitHub Actions, OIDC, ECR, and SSM with deployment locks, health checks, and rollback paths.",
        tech: ["Python", "Flask", "MySQL", "Docker Compose", "Nginx", "GitHub Actions", "AWS ECR/EC2/SSM"],
        tags: ["OSINT", "Resumable Imports", "CI/CD"],
        links: {
            github: "",
            demo: ""
        }
    }
];
