// ====================================
// 1. Preloader
// ====================================
const preloader = document.getElementById('preloader');

function hidePreloader() {
    setTimeout(() => {
        document.body.classList.add('loaded');
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    }, 2000);
}

hidePreloader();

// ====================================
// 2. Custom Cursor
// ====================================
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursor) {
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    }
});

function animateFollower() {
    if (cursorFollower) {
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
    }
    requestAnimationFrame(animateFollower);
}
animateFollower();

document.addEventListener('mousedown', () => {
    if (cursor) cursor.classList.add('active');
    if (cursorFollower) cursorFollower.classList.add('active');
});

document.addEventListener('mouseup', () => {
    if (cursor) cursor.classList.remove('active');
    if (cursorFollower) cursorFollower.classList.remove('active');
});

// Cursor hover effect on interactive elements
const hoverLinks = document.querySelectorAll('a, button, .filter-btn, .tech-icon');
hoverLinks.forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursor) cursor.classList.add('hovering');
        if (cursorFollower) cursorFollower.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
        if (cursor) cursor.classList.remove('hovering');
        if (cursorFollower) cursorFollower.classList.remove('hovering');
    });
});

// Cursor hover effect on cards
const hoverCards = document.querySelectorAll('.service-card, .project-card, .skill-category');
hoverCards.forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursorFollower) cursorFollower.classList.add('active');
    });
    el.addEventListener('mouseleave', () => {
        if (cursorFollower) cursorFollower.classList.remove('active');
    });
});

// Hide cursor on mobile
function toggleCursorVisibility() {
    if (window.innerWidth <= 768) {
        if (cursor) cursor.style.display = 'none';
        if (cursorFollower) cursorFollower.style.display = 'none';
    } else {
        if (cursor) cursor.style.display = 'block';
        if (cursorFollower) cursorFollower.style.display = 'block';
    }
}
toggleCursorVisibility();

// ====================================
// 3. Particles Background
// ====================================
function createParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.width = (Math.random() * 4 + 2) + 'px';
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
}
createParticles();

// ====================================
// 4. Navigation
// ====================================
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinkItems = document.querySelectorAll('.nav-link');

// Scroll effect - add .scrolled when scrollY > 100
window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Mobile hamburger toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        if (navLinks) navLinks.classList.toggle('active');
    });
}

// Close mobile menu on link click
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) hamburger.classList.remove('active');
        if (navLinks) navLinks.classList.remove('active');
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinkItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') && link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ====================================
// 5. Theme Toggle (with localStorage persistence)
// ====================================
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    const themeIcon = themeToggle.querySelector('i');

    // Restore saved theme
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light') {
        document.body.dataset.theme = 'light';
        if (themeIcon) themeIcon.className = 'fas fa-sun';
    }

    themeToggle.addEventListener('click', () => {
        const isLight = document.body.dataset.theme === 'light';
        document.body.dataset.theme = isLight ? '' : 'light';
        localStorage.setItem('portfolio-theme', isLight ? 'dark' : 'light');
        if (themeIcon) {
            themeIcon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
        }
    });
}

// ====================================
// 6. Typing Animation
// ====================================
const dynamicText = document.querySelector('.dynamic-text');
const roles = [
    'Senior DevOps Engineer',
    'Multi-Cloud Architect',
    'AWS EKS/ECS Specialist',
    'AI & RAG Systems Builder',
    'Serverless Solutions Expert',
    'Kubernetes Orchestrator',
    'Terraform Developer',
    'CI/CD Pipeline Architect',
    'DevSecOps Practitioner',
    'Azure & GCP Engineer'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    if (!dynamicText) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
        dynamicText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        dynamicText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500; // Pause before next word
    }

    setTimeout(typeText, typingSpeed);
}
typeText();

// ====================================
// 7. Counter Animations (Intersection Observer)
// ====================================
function animateCounter(counter) {
    const target = parseInt(counter.dataset.target);
    if (!target && target !== 0) return;
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += step;
        if (current < target) {
            counter.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    };

    updateCounter();
}

// Intersection Observer for stat-number elements
const statCounterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statCounterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.stat-number').forEach(counter => {
    statCounterObserver.observe(counter);
});

// Intersection Observer for github-stat-number elements
const githubCounterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            githubCounterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.github-stat-number').forEach(counter => {
    githubCounterObserver.observe(counter);
});

// Intersection Observer for achievement-number elements
const achievementCounterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            achievementCounterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.achievement-number').forEach(counter => {
    achievementCounterObserver.observe(counter);
});

// ====================================
// 8. Scroll Reveal (Intersection Observer)
// ====================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
    revealObserver.observe(el);
});

// ====================================
// 9. Skill Progress Bars (Intersection Observer)
// ====================================
const skillBarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.dataset.width;
            skillBarObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-progress').forEach(bar => {
    skillBarObserver.observe(bar);
});

// ====================================
// 10. Project Filtering
// ====================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projectCards.forEach((card, index) => {
            const shouldShow = filter === 'all' || (card.dataset.category && card.dataset.category.includes(filter));

            if (shouldShow) {
                card.style.display = '';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ====================================
// 11. Contact Form
// ====================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Create mailto link with form data
        const mailtoLink = `mailto:ranausmanali5241@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
        window.location.href = mailtoLink;

        // Reset form
        contactForm.reset();
    });
}

// ====================================
// 12. Back to Top
// ====================================
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (backToTopBtn) {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
});

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ====================================
// 13. Smooth Scroll for Anchor Links
// ====================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetSelector = this.getAttribute('href');
        if (targetSelector && targetSelector !== '#') {
            const target = document.querySelector(targetSelector);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ====================================
// 14. Enhanced Chatbot
// ====================================
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotForm = document.getElementById('chatbotForm');
const chatInput = document.getElementById('chatInput');
const chatbotMessages = document.getElementById('chatbotMessages');
const suggestions = document.getElementById('suggestions');
const notification = document.querySelector('.chatbot-notification');

// Toggle chatbot window
if (chatbotToggle) {
    chatbotToggle.addEventListener('click', () => {
        if (chatbotWindow) chatbotWindow.classList.toggle('active');
        if (notification) notification.style.display = 'none';
    });
}

// Close chatbot
if (chatbotClose) {
    chatbotClose.addEventListener('click', () => {
        if (chatbotWindow) chatbotWindow.classList.remove('active');
    });
}

// Suggestion buttons
const suggestionBtns = document.querySelectorAll('.suggestion-btn');
suggestionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const question = btn.textContent.trim();
        if (question === 'Solve an error') {
            // For error solving, show prompt instead of sending directly
            if (chatInput) {
                chatInput.value = '';
                chatInput.placeholder = 'Paste your error message here...';
                chatInput.focus();
            }
            handleChat('I need help solving an error');
        } else {
            if (chatInput) chatInput.value = question;
            handleChat(question);
        }
    });
});

// Handle chat form submission
if (chatbotForm) {
    chatbotForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = chatInput ? chatInput.value.trim() : '';
        if (message) {
            handleChat(message);
        }
    });
}

function handleChat(message) {
    addMessage(message, 'user');
    if (chatInput) chatInput.value = '';

    // Hide suggestions after first message
    if (suggestions) suggestions.style.display = 'none';

    // Show typing indicator
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot typing';
    typingDiv.innerHTML = `
        <div class="message-avatar"><i class="fas fa-robot"></i></div>
        <div class="message-content"><p><span class="typing-dots"><span></span><span></span><span></span></span></p></div>
    `;
    if (chatbotMessages) {
        chatbotMessages.appendChild(typingDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Get response after 800ms delay
    setTimeout(() => {
        typingDiv.remove();
        const response = getDevOpsResponse(message);
        addMessage(response, 'bot');
    }, 800);
}

function addMessage(text, sender) {
    if (!chatbotMessages) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;

    const icon = sender === 'bot' ? 'fa-robot' : 'fa-user';

    // Format text: convert \n to <br>, escape HTML to prevent XSS
    const formattedText = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n/g, '<br>');

    messageDiv.innerHTML = `
        <div class="message-avatar"><i class="fas ${icon}"></i></div>
        <div class="message-content"><p>${formattedText}</p></div>
    `;

    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// ====================================
// Enhanced DevOps Knowledge Base + Smart Error Solver
// ====================================

// Smart error/solution patterns for common DevOps & programming errors
const errorPatterns = [
    // Docker Errors
    { pattern: /docker.*daemon.*not running|cannot connect.*docker/i, solution: "Docker Daemon Not Running:\n1. Start Docker Desktop (Windows/Mac) or run: sudo systemctl start docker\n2. Check status: docker info\n3. If using WSL2: wsl --shutdown then restart Docker Desktop\n4. Verify: docker ps" },
    { pattern: /permission denied.*docker\.sock|got permission denied.*docker/i, solution: "Docker Permission Denied:\n1. Add your user to docker group: sudo usermod -aG docker $USER\n2. Log out and back in, or run: newgrp docker\n3. Verify: docker ps\n4. If still failing, check socket permissions: sudo chmod 666 /var/run/docker.sock" },
    { pattern: /no space left on device.*docker|docker.*disk space/i, solution: "Docker Disk Space Full:\n1. Remove unused containers: docker container prune\n2. Remove unused images: docker image prune -a\n3. Remove unused volumes: docker volume prune\n4. Nuclear option: docker system prune -a --volumes\n5. Check space: docker system df" },
    { pattern: /port.*already.*use|bind.*address already in use/i, solution: "Port Already in Use:\n1. Find process: lsof -i :PORT_NUMBER (Linux/Mac) or netstat -ano | findstr :PORT_NUMBER (Windows)\n2. Kill process: kill -9 PID (Linux/Mac) or taskkill /PID PID /F (Windows)\n3. Or change your container's port mapping: docker run -p NEW_PORT:CONTAINER_PORT\n4. For Docker Compose: change the ports mapping in docker-compose.yml" },
    { pattern: /image.*not found|pull.*not found|manifest.*not found/i, solution: "Docker Image Not Found:\n1. Check image name spelling and tag: docker pull image:tag\n2. Verify on Docker Hub: hub.docker.com\n3. If private registry, login first: docker login registry-url\n4. Check if image exists: docker search image-name\n5. For ECR: aws ecr get-login-password | docker login --username AWS --password-stdin ACCOUNT.dkr.ecr.REGION.amazonaws.com" },

    // Kubernetes Errors
    { pattern: /crashloopbackoff|crash.*loop.*back/i, solution: "CrashLoopBackOff Fix:\n1. Check logs: kubectl logs pod-name --previous\n2. Describe pod: kubectl describe pod pod-name\n3. Common causes:\n   - Application crash (check code/config)\n   - Missing env vars or secrets\n   - Wrong command/entrypoint\n   - Insufficient resources (increase requests/limits)\n   - Failed health checks (adjust probes)\n4. Debug: kubectl exec -it pod-name -- sh" },
    { pattern: /imagepullbackoff|errimagepull|image.*pull.*back/i, solution: "ImagePullBackOff Fix:\n1. Check image name/tag: kubectl describe pod pod-name\n2. Verify image exists: docker pull image:tag\n3. For private registries, create secret:\n   kubectl create secret docker-registry regcred --docker-server=SERVER --docker-username=USER --docker-password=PASS\n4. Add to pod spec: imagePullSecrets: [{name: regcred}]\n5. For ECR: Ensure IAM permissions and region match" },
    { pattern: /oomkilled|out of memory|memory.*limit/i, solution: "OOMKilled (Out of Memory) Fix:\n1. Increase memory limits in your deployment:\n   resources:\n     limits:\n       memory: '512Mi'\n     requests:\n       memory: '256Mi'\n2. Profile your app's memory usage\n3. Check for memory leaks in your application\n4. Consider HPA for auto-scaling\n5. Monitor with: kubectl top pods" },
    { pattern: /kubectl.*connection refused|unable to connect.*cluster/i, solution: "Kubectl Connection Refused:\n1. Check kubeconfig: kubectl config view\n2. Verify context: kubectl config current-context\n3. For EKS: aws eks update-kubeconfig --name CLUSTER --region REGION\n4. Check cluster status in cloud console\n5. Verify VPN/network connectivity to cluster\n6. Test: kubectl cluster-info" },
    { pattern: /pending.*pod|pod.*pending|stuck.*pending/i, solution: "Pod Stuck in Pending:\n1. Describe pod: kubectl describe pod pod-name\n2. Common causes:\n   - Insufficient resources: Scale up nodes or reduce requests\n   - No matching node: Check node selectors/affinity\n   - PVC not bound: Check PersistentVolumeClaims\n   - Taints preventing scheduling: Check tolerations\n3. Check nodes: kubectl get nodes\n4. Check events: kubectl get events --sort-by=.metadata.creationTimestamp" },

    // Terraform Errors
    { pattern: /terraform.*state.*lock|lock.*state/i, solution: "Terraform State Lock Error:\n1. If the lock is stale: terraform force-unlock LOCK_ID\n2. Check DynamoDB table for lock entries\n3. Verify no other terraform processes running\n4. For S3 backend, check the lock table\n5. Never force-unlock if someone else is running terraform" },
    { pattern: /terraform.*init.*fail|provider.*not found/i, solution: "Terraform Init Failed:\n1. Check internet connectivity\n2. Verify provider versions in required_providers block\n3. Clear cache: rm -rf .terraform && terraform init\n4. For private registries, check credentials\n5. Set mirror if behind proxy: terraform { provider_installation { filesystem_mirror { ... } } }" },
    { pattern: /terraform.*plan.*error|terraform.*apply.*error/i, solution: "Terraform Plan/Apply Error:\n1. Read the error message carefully - it usually tells you exactly what's wrong\n2. Check your variables: terraform plan -var-file=vars.tfvars\n3. Validate syntax: terraform validate\n4. Format code: terraform fmt\n5. Check state drift: terraform refresh\n6. Import existing resources: terraform import resource.name ID" },

    // AWS Errors
    { pattern: /access denied|not authorized|insufficient permissions|iam.*denied/i, solution: "AWS Access Denied Fix:\n1. Check IAM policy attached to user/role\n2. Verify the correct AWS profile: aws sts get-caller-identity\n3. Check SCP (Service Control Policies) from Organizations\n4. Verify resource-based policies (S3 bucket policy, etc.)\n5. Use IAM Policy Simulator to test\n6. Check for explicit Deny statements\n7. Ensure MFA is satisfied if required" },
    { pattern: /aws.*credentials|no.*credentials|unable to locate credentials/i, solution: "AWS Credentials Error:\n1. Configure credentials: aws configure\n2. Check ~/.aws/credentials file\n3. For EC2/EKS: Verify IAM instance profile/role\n4. Set environment variables: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY\n5. For SSO: aws sso login --profile PROFILE\n6. Verify: aws sts get-caller-identity" },
    { pattern: /timeout|connection timed out|request timeout/i, solution: "Connection Timeout Fix:\n1. Check network connectivity and DNS\n2. Verify Security Groups allow traffic\n3. Check NACLs (Network ACLs)\n4. Ensure target is in correct VPC/subnet\n5. For EKS: Check cluster security group rules\n6. Verify NAT Gateway for private subnets\n7. Increase timeout settings in your client" },

    // Git Errors
    { pattern: /git.*merge conflict|conflict.*merge/i, solution: "Git Merge Conflict Fix:\n1. Open conflicted files - look for <<<<<<< HEAD markers\n2. Choose which changes to keep (yours, theirs, or both)\n3. Remove conflict markers (<<<, ===, >>>)\n4. Stage resolved files: git add .\n5. Complete merge: git commit\n6. Tools: git mergetool, VS Code merge editor\n7. To abort: git merge --abort" },
    { pattern: /git.*push.*rejected|failed to push|non-fast-forward/i, solution: "Git Push Rejected Fix:\n1. Pull latest changes first: git pull origin branch-name\n2. If merge conflicts, resolve them\n3. Or rebase: git pull --rebase origin branch-name\n4. Then push: git push origin branch-name\n5. LAST RESORT (use carefully): git push --force-with-lease\n6. Never force push to main/master without team agreement" },
    { pattern: /git.*detached head|detached.*head/i, solution: "Git Detached HEAD Fix:\n1. Create a branch from current state: git checkout -b new-branch\n2. Or return to your branch: git checkout main\n3. If you made commits in detached state:\n   - Note the commit hash\n   - Switch to branch: git checkout main\n   - Cherry-pick: git cherry-pick COMMIT_HASH" },

    // CI/CD Errors
    { pattern: /pipeline.*fail|build.*fail|ci.*fail/i, solution: "CI/CD Pipeline Failure Fix:\n1. Check the build logs for the exact error\n2. Common causes:\n   - Test failures: Run tests locally first\n   - Dependency issues: Clear cache, update lockfile\n   - Environment variables missing: Check pipeline config\n   - Permissions: Verify service account/tokens\n3. For Jenkins: Check Jenkinsfile syntax\n4. For GitHub Actions: Validate workflow YAML\n5. Run pipeline in debug mode if available" },

    // Node.js Errors
    { pattern: /node.*module.*not found|cannot find module|module not found/i, solution: "Module Not Found Fix:\n1. Install dependencies: npm install or yarn install\n2. Delete node_modules and reinstall: rm -rf node_modules && npm install\n3. Clear npm cache: npm cache clean --force\n4. Check package.json for the module\n5. Verify import path (case-sensitive on Linux)\n6. For global modules: npm install -g module-name" },
    { pattern: /eacces.*permission|npm.*permission|npm err.*eacces/i, solution: "NPM Permission Error Fix:\n1. Don't use sudo with npm!\n2. Fix npm permissions: mkdir ~/.npm-global && npm config set prefix '~/.npm-global'\n3. Add to PATH: export PATH=~/.npm-global/bin:$PATH\n4. Or use nvm (Node Version Manager) to manage Node.js\n5. For Docker: Use non-root user in Dockerfile" },

    // Python Errors
    { pattern: /modulenotfounderror|no module named|importerror.*no module/i, solution: "Python Module Not Found Fix:\n1. Install the module: pip install module-name\n2. Check virtual environment: source venv/bin/activate\n3. Verify Python version: python --version\n4. Use requirements.txt: pip install -r requirements.txt\n5. For conda: conda install module-name\n6. Check if using correct pip: pip3 vs pip" },
    { pattern: /syntaxerror|syntax error.*python/i, solution: "Python Syntax Error Fix:\n1. Check the line number in the error message\n2. Common causes:\n   - Missing colon after if/for/def/class\n   - Mismatched parentheses/brackets\n   - Incorrect indentation (use 4 spaces)\n   - Using Python 2 syntax in Python 3\n   - Missing quotes in strings\n3. Use a linter: pylint or flake8" },

    // SSL/TLS Errors
    { pattern: /ssl.*certificate|certificate.*verify|ssl.*handshake/i, solution: "SSL Certificate Error Fix:\n1. Check certificate expiry: openssl s_client -connect domain:443\n2. For self-signed certs in dev: Use --insecure or verify=False (not in production!)\n3. Install CA certificates: apt-get install ca-certificates\n4. For Python: pip install certifi\n5. For Node.js: NODE_TLS_REJECT_UNAUTHORIZED=0 (dev only)\n6. Renew with Let's Encrypt: certbot renew" },

    // DNS Errors
    { pattern: /dns.*resolution|could not resolve host|name.*resolution/i, solution: "DNS Resolution Error Fix:\n1. Check DNS: nslookup domain.com or dig domain.com\n2. Flush DNS cache: ipconfig /flushdns (Windows) or sudo systemd-resolve --flush-caches (Linux)\n3. Try different DNS: echo 'nameserver 8.8.8.8' | sudo tee /etc/resolv.conf\n4. Check /etc/hosts for overrides\n5. For Kubernetes: Check CoreDNS pods and ConfigMap" },

    // 502/503/504 Errors
    { pattern: /502 bad gateway|503 service unavailable|504 gateway timeout/i, solution: "HTTP 502/503/504 Error Fix:\n1. 502 Bad Gateway:\n   - Backend service crashed - check container/app logs\n   - Restart the backend service\n   - Check health check configuration\n2. 503 Service Unavailable:\n   - Service overloaded - scale up replicas\n   - Check readiness probes\n   - Verify deployment rollout status\n3. 504 Gateway Timeout:\n   - Increase timeout in load balancer/proxy\n   - Optimize slow backend queries\n   - Check network connectivity between services" },

    // General Error Patterns
    { pattern: /error|fail|issue|problem|bug|not working|broken|crash|fix|solve|debug|help.*with/i, solution: null } // Catch-all for error-related queries
];

function getDevOpsResponse(question) {
    const q = question.toLowerCase();

    // ========== CHECK FOR ERROR PATTERNS FIRST ==========
    for (const ep of errorPatterns) {
        if (ep.pattern.test(question) && ep.solution) {
            return ep.solution;
        }
    }

    // ========== ERROR SOLVING PROMPT ==========
    if (q.includes('i need help solving an error') || q.includes('solve an error')) {
        return "Sure! I can help diagnose DevOps & programming errors. Just paste the exact error message you're seeing.\n\nI can solve errors from:\n- Docker & Docker Compose\n- Kubernetes & kubectl\n- Terraform & IaC\n- AWS (IAM, EC2, EKS, S3, etc.)\n- Git & GitHub\n- CI/CD Pipelines (Jenkins, GitHub Actions)\n- Python, Node.js, npm\n- SSL/TLS, DNS, HTTP (502/503/504)\n- Linux permissions & services\n\nGo ahead - paste your error!";
    }

    // ========== ABOUT USMAN ALI ==========
    if (q.includes('who is usman') || q.includes('about usman') || q.includes('who are you') || q.includes('tell me about') || q.includes('introduce')) {
        return "Usman Ali is a Senior DevOps Engineer with 3+ years of AWS expertise, currently at GoCloud Pvt Ltd. He specializes in multi-cloud architecture (AWS, Azure, GCP), EKS/ECS/RDS management, AI-powered RAG systems, serverless solutions, and CI/CD automation. He's delivered 30+ projects and 50+ production deployments. Contact: ranausmanali5241@gmail.com | GitHub: github.com/Usman5241";
    }

    if (q.includes('skill') || q.includes('expertise') || q.includes('good at') || q.includes('know') || q.includes('tech stack')) {
        return "Usman Ali's core skills include: AWS (EKS, ECS, RDS, Lambda, S3, CloudFormation), Azure (AKS, Functions, DevOps), GCP (GKE, Cloud Run), Docker, Kubernetes, Terraform, Jenkins, Ansible, Python, Bash, AI/RAG with LangChain, Prometheus, Grafana, ArgoCD, and Istio service mesh. He has deep expertise across the entire DevOps and multi-cloud lifecycle.";
    }

    if (q.includes('experience') || q.includes('work') || q.includes('job') || q.includes('company')) {
        return "Usman Ali has 3+ years of professional experience. He currently works as a Senior DevOps Engineer at GoCloud Pvt Ltd, where he manages production EKS clusters handling 100K+ requests/day, implements RDS Multi-AZ deployments, builds AI-powered RAG systems, architects multi-cloud solutions, and designs serverless applications. He has reduced deployment time by 70% through CI/CD automation.";
    }

    if (q.includes('education') || q.includes('study') || q.includes('degree') || q.includes('university') || q.includes('college')) {
        return "Usman Ali is pursuing a BS in Information Technology from Times Institute Multan (2023-2027). His academic focus complements his extensive hands-on professional experience in DevOps and cloud engineering.";
    }

    if (q.includes('certification') || q.includes('certified') || q.includes('cert')) {
        return "Usman Ali holds the following certifications: AWS Certified (Amazon Web Services), Azure Practitioner (Microsoft Azure), and GCP Practitioner (Google Cloud Platform). These certifications validate his expertise across all three major cloud platforms.";
    }

    if (q.includes('project') || q.includes('github') || q.includes('repository') || q.includes('repo')) {
        return "Usman has 30+ projects on GitHub (github.com/Usman5241). Key projects include: RAG AI System (LangChain + AWS), AWS Nitro Enclave for secure key management, Serverless REST API (Lambda + API Gateway + DynamoDB), EKS Microservices Platform with Istio, Multi-Cloud Kubernetes Deployment, Helm Charts Collection, CI/CD Pipeline Automation, and many more across Python, JavaScript, Docker, Terraform, and DevOps tools.";
    }

    if (q.includes('show') && q.includes('project')) {
        return "Usman's featured projects: 1) RAG AI System - LangChain + vector databases on AWS, 2) AWS Nitro Enclave - Secure key management, 3) Serverless REST API - Lambda/API Gateway/DynamoDB, 4) EKS Microservices - With Istio service mesh & ArgoCD, 5) Multi-Cloud K8s - Deployment across AWS/Azure/GCP, 6) Helm Charts Collection, 7) Full CI/CD Pipeline with Jenkins/GitHub Actions. View all at github.com/Usman5241";
    }

    // ========== CLOUD PLATFORMS ==========
    if (q.includes('aws') && !q.includes('rds') && !q.includes('eks') && !q.includes('ecs') && !q.includes('lambda') && !q.includes('s3') && !q.includes('cloudformation') && !q.includes('iam') && !q.includes('vpc') && !q.includes('nitro') && !q.includes('enclave') && !q.includes('ec2')) {
        return "Usman has 3+ years of deep AWS expertise covering: EKS (Elastic Kubernetes Service), ECS (Elastic Container Service), RDS (Relational Database Service), Lambda, S3, CloudFormation, IAM, CodePipeline, Nitro Enclaves, and VPC networking. He designs and manages production AWS infrastructure handling enterprise-grade workloads, and holds AWS Certification.";
    }

    if (q.includes('azure')) {
        return "Usman has strong Azure skills including: AKS (Azure Kubernetes Service), Azure DevOps pipelines, Azure Functions for serverless compute, Logic Apps for workflow automation, Azure Monitor for observability, and ARM Templates for infrastructure as code. He holds Azure Practitioner certification and architects multi-cloud solutions spanning Azure alongside AWS and GCP.";
    }

    if (q.includes('gcp') || q.includes('google cloud')) {
        return "Usman works with GCP (Google Cloud Platform) services including: GKE (Google Kubernetes Engine), Cloud Run for serverless containers, Cloud Functions for event-driven compute, Cloud Build for CI/CD, BigQuery for data analytics, and Cloud Storage. He holds GCP Practitioner certification and integrates GCP into multi-cloud architectures.";
    }

    if (q.includes('multi-cloud') || q.includes('multi cloud') || q.includes('multicloud')) {
        return "Usman specializes in multi-cloud architecture across AWS, Azure, and GCP. He designs solutions that leverage the best services from each provider, implements cross-cloud disaster recovery strategies, builds unified monitoring dashboards, and ensures workload portability using Kubernetes and Terraform. His multi-cloud expertise enables resilient, vendor-agnostic infrastructure.";
    }

    // ========== AI / RAG ==========
    if (q.includes('rag') || q.includes('ai') || q.includes('langchain') || q.includes('llm') || q.includes('vector')) {
        return "Usman has built production RAG (Retrieval-Augmented Generation) pipelines using LangChain, vector databases, and LLM orchestration deployed on AWS. His AI/RAG systems combine document ingestion, embedding generation, semantic search, and large language model integration to deliver intelligent, context-aware applications. This is one of his cutting-edge specializations.";
    }

    // ========== SERVERLESS ==========
    if (q.includes('serverless')) {
        return "Usman is a Serverless Solutions Expert. He builds event-driven architectures using AWS Lambda, API Gateway, Step Functions, DynamoDB, Azure Functions, and Google Cloud Run. His serverless implementations reduce operational overhead, provide automatic scaling, and optimize costs with pay-per-execution pricing. He has designed multiple production serverless REST APIs and workflows.";
    }

    // ========== EKS / ECS / RDS ==========
    if (q.includes('eks')) {
        return "Usman is an AWS EKS Specialist managing production Kubernetes clusters handling 100K+ requests/day. His EKS expertise includes: Istio service mesh for traffic management, HPA (Horizontal Pod Autoscaler) for dynamic scaling, Helm charts for application packaging, ArgoCD for GitOps-based continuous delivery, cluster security with RBAC and network policies, and cost optimization.";
    }

    if (q.includes('ecs')) {
        return "Usman has extensive ECS (Elastic Container Service) experience including: AWS Fargate for serverless containers, task definitions and service configurations, ALB (Application Load Balancer) integration for traffic routing, auto-scaling policies, service discovery, and CI/CD pipeline integration with CodePipeline. He selects ECS for simpler container workloads and EKS for complex Kubernetes ecosystems.";
    }

    if (q.includes('rds')) {
        return "Usman manages production RDS (Relational Database Service) deployments including: Multi-AZ configurations for high availability, read replicas for horizontal scaling, Aurora for high-performance workloads, automated backups and point-in-time recovery, performance tuning with Parameter Groups, encryption at rest and in transit, and monitoring with CloudWatch and Performance Insights.";
    }

    // ========== DOCKER ==========
    if (q.includes('docker') && (q.includes('what is') || q.includes('explain'))) {
        return "Docker is a platform for developing, shipping, and running applications in containers. Containers are lightweight, isolated environments that package an application with all its dependencies. Key concepts: Images (templates), Containers (running instances), Dockerfile (build instructions), Docker Hub (image registry). Docker enables consistent environments across development, testing, and production.";
    }

    if (q.includes('docker') && q.includes('command')) {
        return "Essential Docker commands: docker build -t name . (build image), docker run -d -p 80:80 name (run container), docker ps (list containers), docker images (list images), docker stop/start (manage containers), docker exec -it container bash (enter container), docker-compose up (run multi-container apps), docker pull/push (manage registry images), docker logs (view logs).";
    }

    if (q.includes('dockerfile')) {
        return "A Dockerfile is a text file with instructions to build a Docker image. Key instructions: FROM (base image), RUN (execute commands), COPY/ADD (copy files), WORKDIR (set directory), ENV (environment variables), EXPOSE (declare ports), CMD/ENTRYPOINT (default command). Best practices: Use multi-stage builds, minimize layers, use .dockerignore, run as non-root user.";
    }

    if (q.includes('docker compose') || q.includes('docker-compose')) {
        return "Docker Compose is a tool for defining and running multi-container Docker applications. You use a YAML file (docker-compose.yml) to configure your application's services, networks, and volumes. Commands: docker-compose up -d (start), docker-compose down (stop), docker-compose logs (view logs), docker-compose build (rebuild images), docker-compose ps (list services).";
    }

    if (q.includes('docker') && q.includes('network')) {
        return "Docker networking types: bridge (default, containers on same host), host (shares host networking), overlay (multi-host communication), macvlan (assigns MAC address), none (no networking). Commands: docker network create, docker network ls, docker network inspect. Use custom bridge networks for better container-to-container communication.";
    }

    if (q.includes('docker') && q.includes('volume')) {
        return "Docker volumes provide persistent data storage for containers. Types: Named volumes (managed by Docker), Bind mounts (host filesystem paths), tmpfs mounts (in-memory). Commands: docker volume create, docker volume ls, docker volume inspect, docker volume rm. Use volumes for databases, configuration files, and any data that should persist beyond the container lifecycle.";
    }

    // ========== KUBERNETES ==========
    if (q.includes('kubernetes') || q.includes('k8s')) {
        if (q.includes('what is') || q.includes('explain')) {
            return "Kubernetes (K8s) is an open-source container orchestration platform for automating deployment, scaling, and management of containerized applications. Key concepts: Pods (smallest unit), Services (networking), Deployments (desired state), ReplicaSets (scaling), ConfigMaps/Secrets (configuration), Namespaces (isolation). Originally developed by Google, now maintained by CNCF.";
        }
        if (q.includes('architecture') || q.includes('components')) {
            return "Kubernetes architecture: Control Plane (Master) - API Server (frontend), etcd (storage), Scheduler (pod placement), Controller Manager (state management). Worker Nodes - Kubelet (node agent), Kube-proxy (networking), Container Runtime (Docker/containerd). Other components: CoreDNS, Dashboard, Ingress Controller, Metrics Server.";
        }
        if (q.includes('command') || q.includes('kubectl')) {
            return "Essential kubectl commands: kubectl get pods/services/deployments (list resources), kubectl describe (details), kubectl apply -f file.yaml (create/update), kubectl delete (remove), kubectl logs (view logs), kubectl exec -it pod -- bash (enter pod), kubectl scale deployment name --replicas=3 (scale), kubectl rollout status/undo (manage deployments).";
        }
        return "Kubernetes (K8s) is an open-source container orchestration platform. Usman is a Kubernetes Orchestrator with deep expertise in EKS, AKS, and GKE. He manages production clusters with Istio service mesh, ArgoCD GitOps, Helm charts, HPA auto-scaling, and RBAC security. Ask about specific K8s topics like pods, helm, ingress, or architecture!";
    }

    if (q.includes('pod')) {
        return "A Pod is the smallest deployable unit in Kubernetes. It can contain one or more containers that share storage and network resources. Pods are ephemeral and disposable. Types: Single-container pods (most common), Multi-container pods (sidecar pattern). Pods are created through Deployments, ReplicaSets, or directly via YAML manifests.";
    }

    if (q.includes('helm') || q.includes('helm chart')) {
        return "Helm is the package manager for Kubernetes. Helm Charts are packages of pre-configured Kubernetes resources. Key concepts: Charts (packages), Releases (instances), Repositories (chart collections), Values (configuration). Commands: helm install, helm upgrade, helm rollback, helm list, helm repo add. Usman has created Helm charts for production deployments!";
    }

    if (q.includes('ingress')) {
        return "Kubernetes Ingress manages external access to services, typically HTTP/HTTPS. It provides load balancing, SSL termination, and name-based virtual hosting. Popular Ingress Controllers: NGINX, Traefik, AWS ALB. Ingress rules define how traffic is routed to services based on host and path. Use annotations for custom configuration.";
    }

    // ========== CI/CD ==========
    if (q.includes('ci/cd') || q.includes('cicd') || (q.includes('ci') && q.includes('cd'))) {
        return "CI/CD stands for Continuous Integration and Continuous Delivery/Deployment. CI: Developers frequently merge code changes into a shared repository, with automated builds and tests. CD (Delivery): Code changes are automatically prepared for release. CD (Deployment): Every change that passes tests is automatically deployed to production. Tools: Jenkins, GitLab CI, GitHub Actions, CircleCI, Azure DevOps.";
    }

    if (q.includes('pipeline')) {
        return "A CI/CD pipeline is an automated workflow that builds, tests, and deploys code. Typical stages: 1) Source (code commit triggers pipeline), 2) Build (compile, package), 3) Test (unit, integration, security tests), 4) Deploy to staging, 5) Approval gate, 6) Deploy to production, 7) Monitor. Pipelines are defined as code (Jenkinsfile, .gitlab-ci.yml, etc.). Usman is a CI/CD Pipeline Architect who has reduced deployment time by 70%.";
    }

    if (q.includes('github actions')) {
        return "GitHub Actions is a CI/CD platform built into GitHub. Key concepts: Workflows (automated processes), Jobs (groups of steps), Steps (individual tasks), Actions (reusable components), Runners (execution environments). Workflows are defined in .github/workflows/ as YAML files. Triggered by events like push, pull_request, schedule, or manual dispatch.";
    }

    // ========== JENKINS ==========
    if (q.includes('jenkins')) {
        if (q.includes('what is') || q.includes('explain')) {
            return "Jenkins is an open-source automation server used for CI/CD. It supports building, deploying, and automating software development. Key features: Pipeline as Code (Jenkinsfile), 1800+ plugins, distributed builds, extensive integrations. Jenkins can run on-premises or in cloud, supports agents for parallel execution.";
        }
        if (q.includes('pipeline') || q.includes('jenkinsfile')) {
            return "Jenkins Pipeline is defined in a Jenkinsfile using declarative or scripted syntax. Structure: pipeline { agent any; stages { stage('Build') { steps { sh 'mvn build' }}}}. Key concepts: agents (where to run), stages (logical divisions), steps (actual commands), post actions (cleanup/notifications). Store Jenkinsfile in your repo for version control.";
        }
        return "Jenkins is an open-source automation server used for CI/CD. It supports building, deploying, and automating software development with 1800+ plugins, Pipeline as Code (Jenkinsfile), distributed builds, and extensive integrations. Usman uses Jenkins extensively for production CI/CD pipelines.";
    }

    // ========== TERRAFORM ==========
    if (q.includes('terraform')) {
        if (q.includes('what is') || q.includes('explain')) {
            return "Terraform is an Infrastructure as Code (IaC) tool by HashiCorp. It allows you to define cloud and on-premises resources in human-readable configuration files. Key concepts: Providers (AWS, Azure, GCP), Resources, Variables, State file, Modules. Terraform uses HCL (HashiCorp Configuration Language) and supports plan, apply, destroy workflow.";
        }
        if (q.includes('command')) {
            return "Essential Terraform commands: terraform init (initialize), terraform plan (preview changes), terraform apply (create/update resources), terraform destroy (delete resources), terraform fmt (format code), terraform validate (check syntax), terraform state list/show (inspect state), terraform import (import existing resources), terraform output (show outputs).";
        }
        if (q.includes('state')) {
            return "Terraform state tracks the mapping between your configuration and real-world resources. It's stored in terraform.tfstate file. Best practices: Use remote state (S3, Azure Blob, Terraform Cloud), enable state locking (DynamoDB for AWS), never edit state manually, use terraform state commands for modifications.";
        }
        if (q.includes('module')) {
            return "Terraform modules are reusable, self-contained packages of Terraform configurations. They help organize code, promote reuse, and enforce standards. Structure: main.tf, variables.tf, outputs.tf. Use the Terraform Registry for community modules. Call modules with: module \"name\" { source = \"./modules/vpc\" }.";
        }
        return "Terraform is an Infrastructure as Code (IaC) tool by HashiCorp that Usman uses extensively. It supports AWS, Azure, and GCP providers. Ask about specific Terraform topics: 'what is terraform', 'terraform commands', 'terraform state', or 'terraform modules'.";
    }

    // ========== AWS SPECIFIC SERVICES ==========
    if (q.includes('ec2')) {
        return "Amazon EC2 (Elastic Compute Cloud) provides scalable virtual servers in the cloud. Key concepts: Instance types (t3, m5, c5, etc.), AMIs (machine images), Security Groups (firewall), Key Pairs (SSH access), EBS (storage), Auto Scaling, Load Balancers. Instance pricing: On-Demand, Reserved, Spot, Savings Plans.";
    }

    if (q.includes('s3')) {
        return "Amazon S3 (Simple Storage Service) is object storage with 99.999999999% durability. Features: Buckets (containers), Objects (files), Versioning, Lifecycle policies, Encryption, Access control (bucket policies, ACLs), Storage classes (Standard, IA, Glacier, Deep Archive). Used for backups, static websites, data lakes, and content delivery.";
    }

    if (q.includes('lambda')) {
        return "AWS Lambda is serverless compute that runs code without provisioning servers. You pay only for compute time consumed. Supports: Node.js, Python, Java, Go, Ruby, .NET. Triggered by: API Gateway, S3, DynamoDB, CloudWatch Events, SQS, SNS, and 200+ AWS services. Max execution: 15 minutes, memory: up to 10GB.";
    }

    if (q.includes('cloudformation') || q.includes('cfn')) {
        return "AWS CloudFormation is Infrastructure as Code for AWS resources. You define resources in YAML/JSON templates. Key concepts: Stacks, Templates, Parameters, Outputs, Mappings, Conditions, Nested Stacks. CloudFormation handles resource creation order, rollback on failure, drift detection, and change sets for safe updates.";
    }

    if (q.includes('iam')) {
        return "AWS IAM (Identity and Access Management) controls access to AWS resources. Components: Users, Groups, Roles, Policies (JSON documents defining permissions). Best practices: Use roles over users, follow least privilege, enable MFA, use IAM Access Analyzer, regularly rotate credentials, use service-linked roles.";
    }

    if (q.includes('vpc')) {
        return "AWS VPC (Virtual Private Cloud) lets you create isolated networks in AWS. Components: Subnets (public/private), Route Tables, Internet Gateway, NAT Gateway, Security Groups, Network ACLs, VPC Peering, VPN, Transit Gateway. Best practice: Use multiple AZs, separate public/private subnets, restrict ingress rules.";
    }

    if (q.includes('nitro') || q.includes('enclave')) {
        return "AWS Nitro Enclaves provide isolated compute environments for processing highly sensitive data. They create an isolated virtual machine with no persistent storage, no external networking, and no admin access. Use cases: Private key management, financial data processing, healthcare data. Usman has built a Nitro Enclave project for secure key management!";
    }

    // ========== DEVOPS GENERAL ==========
    if (q.includes('what is devops') || q.includes('devops meaning') || q.includes('define devops')) {
        return "DevOps is a set of practices that combines software development (Dev) and IT operations (Ops). It aims to shorten the development lifecycle while delivering features, fixes, and updates frequently in close alignment with business objectives. Key principles include automation, continuous integration, continuous delivery, and collaboration between teams.";
    }

    if (q.includes('devops lifecycle') || q.includes('devops stages')) {
        return "The DevOps lifecycle consists of 8 phases: 1) Plan - Define requirements 2) Code - Write application code 3) Build - Compile and package 4) Test - Run automated tests 5) Release - Prepare for deployment 6) Deploy - Push to production 7) Operate - Manage infrastructure 8) Monitor - Track performance. This cycle is continuous and iterative.";
    }

    if (q.includes('devops benefits') || q.includes('why devops')) {
        return "DevOps benefits include: Faster delivery of features, more stable operating environments, improved communication and collaboration, better quality products through continuous testing, reduced deployment failures and faster recovery, automation of repetitive tasks, and improved resource utilization through Infrastructure as Code.";
    }

    if (q.includes('devops tools') || q.includes('devops tool')) {
        return "Popular DevOps tools by category: Version Control: Git, GitHub, GitLab | CI/CD: Jenkins, GitHub Actions, GitLab CI, CircleCI | Containers: Docker, Podman | Orchestration: Kubernetes, Docker Swarm | IaC: Terraform, CloudFormation, Ansible, Puppet | Monitoring: Prometheus, Grafana, CloudWatch, Datadog | Cloud: AWS, Azure, GCP | Scripting: Bash, Python.";
    }

    // ========== LINUX ==========
    if (q.includes('linux')) {
        if (q.includes('command') || q.includes('basic')) {
            return "Essential Linux commands: ls (list), cd (change dir), pwd (current dir), cp/mv/rm (file ops), mkdir/rmdir (directories), cat/less/head/tail (view files), grep (search), find (locate files), chmod/chown (permissions), ps/top/htop (processes), systemctl (services), df/du (disk), ssh/scp (remote), tar/gzip (compression).";
        }
        if (q.includes('permission')) {
            return "Linux permissions use rwx (read, write, execute) for owner, group, and others. Numeric: 4=read, 2=write, 1=execute. Examples: chmod 755 file (rwxr-xr-x), chmod 644 file (rw-r--r--). chown user:group file changes ownership. Special: SUID (4), SGID (2), Sticky bit (1). Use 'ls -la' to view permissions.";
        }
        return "Linux is the foundation of modern DevOps. Ask about 'linux commands' or 'linux permissions' for detailed information. Usman has strong Linux administration skills including shell scripting (Bash), package management, process management, and server configuration.";
    }

    // ========== GIT ==========
    if (q.includes('git')) {
        if (q.includes('what is') || q.includes('explain')) {
            return "Git is a distributed version control system for tracking changes in source code. Key concepts: Repository, Commit, Branch, Merge, Pull Request. Branching strategies: Git Flow, GitHub Flow, Trunk-based development. Git enables collaboration, code review, and version history for software development teams.";
        }
        if (q.includes('command')) {
            return "Essential Git commands: git init/clone (start), git add/commit (save changes), git push/pull (sync), git branch/checkout/switch (branches), git merge/rebase (integrate), git stash (temporary save), git log/diff (history), git reset/revert (undo), git fetch (download updates), git cherry-pick (selective merge).";
        }
        return "Git is a distributed version control system that Usman uses daily. Ask about 'git commands' or 'what is git' for more details. Usman's GitHub: github.com/Usman5241 with 30+ repositories.";
    }

    // ========== ANSIBLE ==========
    if (q.includes('ansible')) {
        return "Ansible is an open-source automation tool for configuration management, application deployment, and task automation. It uses YAML playbooks, is agentless (uses SSH), and follows a push-based model. Key concepts: Inventory (hosts), Playbooks (tasks), Roles (reusable content), Modules (units of work), Handlers (triggered tasks), Galaxy (community roles).";
    }

    // ========== MONITORING ==========
    if (q.includes('prometheus')) {
        return "Prometheus is an open-source monitoring and alerting toolkit. Features: Multi-dimensional data model, PromQL query language, pull-based metrics collection, built-in alerting. Architecture: Prometheus server, exporters (node, application), Alertmanager, Grafana for visualization. Excellent for Kubernetes and microservices monitoring. Usman uses Prometheus extensively for infrastructure monitoring.";
    }

    if (q.includes('grafana')) {
        return "Grafana is an open-source analytics and monitoring platform. It provides dashboards for visualizing metrics from Prometheus, InfluxDB, Elasticsearch, CloudWatch, etc. Features: Alerting, annotations, templates, plugins, team collaboration, dashboard sharing. Usman builds custom Grafana dashboards for comprehensive infrastructure observability.";
    }

    if (q.includes('cloudwatch')) {
        return "Amazon CloudWatch is AWS's monitoring and observability service. Features: Metrics (CPU, memory, custom), Logs (aggregate, search, analyze), Alarms (notifications, auto-scaling triggers), Dashboards, Events/EventBridge, Synthetics (canary monitoring), Container Insights, Application Insights. Essential for AWS infrastructure monitoring.";
    }

    if (q.includes('monitor') || q.includes('observ')) {
        return "Monitoring & Observability tools: Metrics - Prometheus, CloudWatch, Datadog | Logging - ELK Stack, CloudWatch Logs, Loki | Tracing - Jaeger, AWS X-Ray, Zipkin | Dashboards - Grafana, Kibana | APM - New Relic, Datadog | Alerting - PagerDuty, OpsGenie. The three pillars of observability are metrics, logs, and traces.";
    }

    // ========== MICROSERVICES ==========
    if (q.includes('microservice')) {
        return "Microservices architecture structures an application as a collection of loosely coupled, independently deployable services. Benefits: Scalability, flexibility, resilience, faster development. Challenges: Complexity, data consistency, debugging. Related concepts: API Gateway, Service Mesh (Istio), Service Discovery, Circuit Breaker pattern, Event-driven architecture.";
    }

    // ========== SECURITY ==========
    if (q.includes('devsecops') || (q.includes('security') && q.includes('devops'))) {
        return "DevSecOps integrates security practices into the DevOps pipeline. Key practices: SAST (static analysis), DAST (dynamic testing), SCA (dependency scanning), container scanning, secrets management, infrastructure security scanning. Tools: SonarQube, Snyk, Trivy, HashiCorp Vault, OWASP ZAP, AWS Inspector. Usman is a DevSecOps Practitioner who implements shift-left security in all pipelines.";
    }

    // ========== NETWORKING ==========
    if (q.includes('load balancer') || q.includes('load balancing')) {
        return "Load balancers distribute incoming traffic across multiple targets. AWS Load Balancers: ALB (Application - Layer 7, HTTP/HTTPS), NLB (Network - Layer 4, TCP/UDP), CLB (Classic - legacy), GWLB (Gateway - third-party appliances). Features: Health checks, sticky sessions, SSL termination, cross-zone balancing.";
    }

    if (q.includes('dns') || q.includes('route 53')) {
        return "DNS (Domain Name System) translates domain names to IP addresses. AWS Route 53 is a scalable DNS web service. Features: Domain registration, DNS routing, health checking. Routing policies: Simple, Weighted, Latency, Failover, Geolocation, Multi-value. Supports both public and private hosted zones.";
    }

    // ========== ARCHITECTURE ==========
    if (q.includes('12 factor') || q.includes('twelve factor')) {
        return "The 12-Factor App methodology for building SaaS applications: 1) Codebase, 2) Dependencies, 3) Config, 4) Backing Services, 5) Build/Release/Run, 6) Processes, 7) Port Binding, 8) Concurrency, 9) Disposability, 10) Dev/Prod Parity, 11) Logs, 12) Admin Processes. These principles align well with DevOps and cloud-native practices.";
    }

    // ========== SERVICES ==========
    if (q.includes('service') || q.includes('offer') || q.includes('help with') || q.includes('what do you do') || q.includes('what can you do')) {
        return "Usman Ali offers: 1) Multi-Cloud Architecture - AWS, Azure, GCP infrastructure design, 2) CI/CD Pipeline Architecture - Jenkins, GitHub Actions, Azure DevOps, ArgoCD, 3) Containerization & Orchestration - Docker, Kubernetes (EKS/AKS/GKE), Helm, Istio, 4) Infrastructure as Code - Terraform, CloudFormation, Ansible, 5) AI & RAG Systems - LangChain, vector databases, LLM integration, 6) Serverless Solutions - Lambda, API Gateway, Step Functions, 7) DevSecOps - Security scanning, secrets management, 8) Monitoring - Prometheus, Grafana, CloudWatch. Contact him for any DevOps needs!";
    }

    if (q.includes('hire') || q.includes('available') || q.includes('freelance') || q.includes('consult')) {
        return "Yes! Usman Ali is available for hire. He's open to DevOps consulting, multi-cloud architecture projects, freelance work, and full-time opportunities. He specializes in AWS, Azure, GCP, Docker, Kubernetes, Terraform, CI/CD, AI/RAG systems, and serverless solutions. Reach out at ranausmanali5241@gmail.com or connect on LinkedIn.";
    }

    // ========== CONTACT ==========
    if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('connect') || q.includes('how to contact')) {
        return "You can contact Usman Ali through: Email: ranausmanali5241@gmail.com | GitHub: github.com/Usman5241 | Location: Multan, Punjab, Pakistan. He's available for DevOps consulting, cloud architecture projects, and full-time opportunities. Use the contact form on this page to send a message directly!";
    }

    if (q.includes('location') || q.includes('where') || q.includes('city') || q.includes('country')) {
        return "Usman Ali is based in Multan, Punjab, Pakistan. He works at GoCloud Pvt Ltd in Multan and is open to both local and remote opportunities worldwide.";
    }

    if (q.includes('resume') || q.includes('cv') || q.includes('download')) {
        return "You can download Usman Ali's resume/CV by clicking the 'Download CV' button in the About section of this portfolio. It contains his complete professional experience, skills, certifications, and project details.";
    }

    // ========== GREETINGS & SMALL TALK ==========
    if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('good morning') || q.includes('good evening') || q.includes('assalam') || q.includes('salam')) {
        return "Hello! I'm Usman's AI Assistant. I can answer questions about Usman Ali's skills, experience, projects, and services. I also know about DevOps, AWS, Azure, GCP, Docker, Kubernetes, CI/CD, Terraform, AI/RAG systems, and more. What would you like to know?";
    }

    if (q.includes('thank') || q.includes('thanks') || q.includes('shukriya')) {
        return "You're welcome! Feel free to ask more questions about Usman Ali's services or any DevOps topics. I'm here to help! You can also reach out to Usman directly at ranausmanali5241@gmail.com.";
    }

    if (q.includes('bye') || q.includes('goodbye') || q.includes('khuda hafiz')) {
        return "Goodbye! If you have more questions later, feel free to come back. Don't forget to connect with Usman Ali on GitHub or send him an email for any DevOps projects!";
    }

    if (q.includes('how are you') || q.includes('how r u')) {
        return "I'm doing great, thanks for asking! I'm always ready to help you learn about Usman Ali's DevOps expertise or answer technical questions. What can I help you with today?";
    }

    if (q.includes('name')) {
        return "I'm Usman's AI Assistant! I'm built into this portfolio to help visitors learn about Usman Ali's skills, experience, and services. I can also answer DevOps-related technical questions. Ask me anything!";
    }

    // ========== PORTFOLIO ==========
    if (q.includes('portfolio') || q.includes('website') || q.includes('this site')) {
        return "This is Usman Ali's professional portfolio showcasing his Senior DevOps Engineering and multi-cloud architecture expertise. It features: About section, Services offered, Skills & tech stack, Projects from GitHub, Work experience, Education, Certifications, AI Chatbot assistant, and Contact information. Built with modern animations and dark/light theme support.";
    }

    // ========== SMART ERROR SOLVING (catch-all) ==========
    // Check if the question seems like an error/debugging request
    const errorKeywords = ['error', 'fail', 'issue', 'problem', 'bug', 'not working', 'broken', 'crash', 'fix', 'solve', 'debug', 'troubleshoot', 'help me with', 'how to fix', 'why is', 'doesn\'t work', 'exception', 'warning'];
    const isErrorQuery = errorKeywords.some(keyword => q.includes(keyword));

    if (isErrorQuery) {
        return "I'd love to help you troubleshoot! To give you the best solution, please share:\n\n" +
            "1. The exact error message you're seeing\n" +
            "2. What tool/service is involved (Docker, K8s, AWS, Terraform, etc.)\n" +
            "3. What you were trying to do when the error occurred\n\n" +
            "I can solve errors related to:\n" +
            "- Docker (daemon, permissions, disk space, networking)\n" +
            "- Kubernetes (CrashLoopBackOff, ImagePullBackOff, OOMKilled, pending pods)\n" +
            "- Terraform (state locks, init failures, plan/apply errors)\n" +
            "- AWS (access denied, credentials, timeouts, IAM)\n" +
            "- Git (merge conflicts, push rejected, detached HEAD)\n" +
            "- CI/CD (pipeline failures, build errors)\n" +
            "- Python/Node.js (module not found, syntax errors)\n" +
            "- SSL/DNS/HTTP errors (502, 503, 504)\n\n" +
            "Paste your error message and I'll diagnose it!";
    }

    // ========== DEFAULT RESPONSE ==========
    return "I'm Usman's AI Assistant with DevOps expertise! Here's what I can help with:\n\n" +
        "About Usman: 'Who is Usman?', 'skills', 'experience', 'projects', 'certifications'\n" +
        "Cloud: 'AWS', 'Azure', 'GCP', 'multi-cloud', 'serverless'\n" +
        "Containers: 'Docker', 'Kubernetes', 'EKS', 'ECS', 'Helm'\n" +
        "IaC & CI/CD: 'Terraform', 'Jenkins', 'GitHub Actions', 'Ansible'\n" +
        "AI/ML: 'RAG', 'AI', 'LangChain'\n" +
        "Monitoring: 'Prometheus', 'Grafana', 'CloudWatch'\n\n" +
        "Error Solving: Paste any error message (Docker, K8s, Terraform, AWS, Git, Python, Node.js) and I'll diagnose it!\n\n" +
        "Services: 'hire', 'contact', 'resume'\n\n" +
        "Try asking a question or paste an error to get started!";
}

// ====================================
// 15. Window Load
// ====================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Disable cursor on mobile
    if (window.innerWidth <= 768) {
        if (cursor) cursor.style.display = 'none';
        if (cursorFollower) cursorFollower.style.display = 'none';
    }
});

// ====================================
// 16. Resize Handler
// ====================================
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        if (cursor) cursor.style.display = 'none';
        if (cursorFollower) cursorFollower.style.display = 'none';
    } else {
        if (cursor) cursor.style.display = 'block';
        if (cursorFollower) cursorFollower.style.display = 'block';
    }
});
