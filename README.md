\# 🏘️ NeighborShare



Hyper-local community sharing platform where verified neighbors can borrow, trade, and share items instantly.



\*\*Built for 2 FAST 2 MCP Hackathon\*\*



---



\## 💡 The Problem



Ever forgot your geometry box the night before an exam? Or bought an expensive drill for one project that now sits unused?



Meanwhile, your neighbor 200m away has exactly what you need, but there's no way to connect.



---



\## ✨ The Solution



\*\*NeighborShare\*\* connects verified neighbors in real-time:



\- \*\*HAVE something?\*\* List it (borrow/sell/trade/free)

\- \*\*NEED something?\*\* Post your request (with urgency)

\- \*\*AI matches\*\* them instantly based on location, item type, and urgency



---



\## 🤖 How Archestra Powers It



\### \*\*MCP Agent #1: Smart Matcher\*\*

Instantly matches NEED posts with HAVE posts using:

\- Semantic matching (drill → power tools)

\- Distance ranking (closest first)

\- Urgency priority (exam tomorrow = top priority)



\### \*\*MCP Agent #2: Content Safety\*\*

Blocks prohibited items and scams:

\- Detects drugs, weapons, illegal items

\- Flags suspicious patterns

\- Protects community safety



\### \*\*Archestra Orchestrates Everything\*\*

\- Centralized MCP server management

\- Security guardrails prevent data leaks

\- Full observability of agent decisions

\- Production-ready deployment



---



\## 🎨 What I Built



\*\*Frontend\*\*: Beautiful Next.js app with:

\- Live feed of community posts

\- Urgent request animations

\- MCP agents status display

\- Responsive design



\*\*MCP Servers\*\*: Two custom servers

\- `smart-matcher` - Matching algorithm

\- `content-safety` - Moderation system



\*\*Infrastructure\*\*: 

\- Archestra for orchestration

\- Docker for deployment

\- All integrated and working



---



\## 🚀 Quick Start



\### Run the Project



\*\*1. Start Archestra:\*\*

```bash

docker run -d --name archestra -p 9000:9000 -p 3001:3000 -e ARCHESTRA\_QUICKSTART=true archestra/platform:latest

```



\*\*2. Run Frontend:\*\*

```bash

cd frontend

npm install

npm run dev

```



Open: http://localhost:3000



\*\*3. Test MCP Servers:\*\*

```bash

\# Terminal 1

cd mcp-servers/smart-matcher

node index.js



\# Terminal 2  

cd mcp-servers/content-safety

node index.js

```



---



\## 📸 Screenshots



\*\*Homepage\*\*: Shows active community posts (drill, geometry box, mangoes, ladder)



\*\*MCP Agents\*\*: Live status of Smart Matcher and Content Safety agents



\*\*Archestra Dashboard\*\*: http://localhost:3001



---



\## 🌍 Real Impact



✅ Student gets geometry box for exam tomorrow  

✅ Raj's unused drill earns money + helps neighbors  

✅ Ramesh Uncle's mangoes don't go to waste  

✅ Community actually connects  

✅ Zero waste, ultra-local, sustainable  



---



\## 🏆 Why This Project



\*\*Real Problem\*\*: Everyone has experienced this (forgotten item, unused stuff at home)



\*\*Heavy MCP Usage\*\*: 2 agents orchestrated by Archestra



\*\*Production Quality\*\*: Beautiful UI, working code, proper architecture



\*\*Scalable\*\*: Start with one building → grow to entire city



\*\*Social Good\*\*: Reduces waste, builds community, helps people



---



\## 🛠️ Tech Stack



\- \*\*Frontend\*\*: Next.js 16, TypeScript, Tailwind CSS

\- \*\*MCP Platform\*\*: Archestra

\- \*\*MCP Servers\*\*: Node.js, @modelcontextprotocol/sdk

\- \*\*Infrastructure\*\*: Docker



---





