const form = document.getElementById("profileForm");
const result = document.getElementById("result");
const matchScore = document.getElementById("matchScore");
const matchReason = document.getElementById("matchReason");
const matchName = document.getElementById("matchName");
const matchSkills = document.getElementById("matchSkills");
const matchRoles = document.getElementById("matchRoles");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const payload = {
    name: document.getElementById("name").value.trim(),
    skills: document.getElementById("skills").value.split(",").map(s => s.trim()).filter(Boolean),
    interests: document.getElementById("interests").value.split(",").map(s => s.trim()).filter(Boolean),
    idea: document.getElementById("idea").value.trim(),
    personality: document.getElementById("personality").value.trim(),
    goals: document.getElementById("goals").value.trim()
  };

  const response = await fetch("/api/match", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await response.json();
  showResult(data);
});

function showResult(data) {
  result.classList.remove("hidden");
  matchScore.textContent = `Compatibility score: ${data.compatibilityScore}/100`;
  matchReason.textContent = data.reasoning;
  matchName.textContent = `Name: ${data.cofounder.name}`;
  matchSkills.textContent = `Skills: ${data.cofounder.skills.join(", ")}`;
  matchRoles.textContent = data.suggestedRoles.join(" → ");
}
