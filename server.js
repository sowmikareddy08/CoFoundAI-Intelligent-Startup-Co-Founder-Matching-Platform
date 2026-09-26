const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/match", (req, res) => {
  const profile = req.body;
  const result = generateMatch(profile);
  res.json(result);
});

function generateMatch(profile) {
  const { name, skills = [], interests = [], idea = "", personality = "", goals = "" } = profile;

  const cofounder = {
    name: "Maya Chen",
    skills: [
      "Product strategy",
      "Growth marketing",
      "UX/UI design",
      "Startup operations",
      "Pitch deck creation"
    ]
  };

  let score = 80;
  score += skills.length > 3 ? 5 : 0;
  score += interests.length > 2 ? 5 : 0;
  score += idea.length > 20 ? 5 : 0;
  score += personality.toLowerCase().includes("action") ? 5 : 0;
  score += goals.toLowerCase().includes("win") ? 5 : 0;
  score = Math.min(100, score);

  const reasons = [
    "Your startup idea is clear and action-oriented.",
    "Maya brings complementary skills in design, growth, and go-to-market.",
    "This match balances product execution with business launch strength."
  ];

  return {
    cofounder,
    compatibilityScore: score,
    reasoning: reasons.join(" "),
    suggestedRoles: ["CEO / Founder", "COO / Growth Lead", "CPO / Product Lead"]
  };
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
