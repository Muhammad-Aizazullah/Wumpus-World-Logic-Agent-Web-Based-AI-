# 🧠 Wumpus World Logic Agent (Web-Based AI)

## 📌 Overview

This project implements a **Knowledge-Based Agent** that navigates a dynamic Wumpus World grid using **Propositional Logic** and **Resolution Refutation**.

The agent does not know the environment initially. It perceives clues like **Breeze** and **Stench**, updates its **Knowledge Base (KB)**, and uses logical inference to safely explore the grid.

---

## 🎯 Features

* 🔲 Dynamic Grid Size (User Input)
* ⚠️ Random Placement of Pits and Wumpus
* 👁️ Percept-Based Environment (Breeze & Stench)
* 🧠 Knowledge Base using CNF Clauses
* ⚡ Resolution Refutation Algorithm
* ✅ Safe Cell Deduction using Logical Inference
* 📊 Real-Time Metrics Dashboard
* 🎨 Interactive Web Visualization

---

## 🧠 AI Concepts Used

* Knowledge-Based Agent
* Propositional Logic
* CNF (Conjunctive Normal Form)
* Resolution Refutation
* Logical Entailment
* Inference Engine

---

## 🏗️ Project Structure

```
wumpus-agent/
│── index.html
│── style.css
│── app.js
│── README.md
```

---

## ⚙️ How It Works

1. The agent starts at position (0,0)
2. Environment generates random hazards (Pits & Wumpus)
3. Agent receives percepts:

   * Breeze → Pit nearby
   * Stench → Wumpus nearby
4. Percepts are converted into **logical clauses**
5. Clauses are stored in the **Knowledge Base**
6. Agent uses **Resolution Refutation** to check:

   * Is a cell safe?
7. Agent moves only to logically safe cells

---

## 🔍 Example Logic Rule

If Breeze is perceived:

```
B(x,y) ⇒ P(x+1,y) ∨ P(x-1,y) ∨ P(x,y+1) ∨ P(x,y-1)
```

If no Breeze:

```
¬B(x,y) ⇒ ¬P(neighbors)
```

---

## ⚡ Resolution Strategy

* Convert rules into CNF clauses
* Negate the query
* Apply resolution between clauses
* If empty clause is derived → contradiction found → query proven

---

## 📊 Metrics Displayed

* Total Steps Taken
* Number of KB Clauses
* Inference Steps (Resolution)
* Current Percepts (Breeze / Stench)

---

## 🚀 How to Run

1. Download or clone the repository:

```
git clone https://github.com/your-username/wumpus-agent.git
```

2. Open `index.html` in your browser

3. Set grid size and click **Start**

4. Click **Next Step** to watch the agent move

---

## 🌐 Deployment

This project can be easily deployed using:

* Vercel
* Netlify
* GitHub Pages

---

## 🧪 Challenges Faced

* Designing a logical Knowledge Base
* Converting percepts into CNF clauses
* Implementing resolution efficiently
* Avoiding infinite loops in inference
* Balancing accuracy and performance

---

## 🔗 Links

* 🌐 Live App: (Add your Vercel link)
* 💻 GitHub Repo: (Add your repo link)
* 💼 LinkedIn Post: (Add your post link)

---

## 👨‍💻 Author

**Muhammad Aizazullah**
BS Computer Science (4th Semester)
FAST NUCES

---

## ⭐ Final Note

This project demonstrates how **logical reasoning** can be applied in AI agents to make decisions under uncertainty.

---
