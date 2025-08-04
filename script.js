const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const outputSection = document.getElementById("outputSection");
const outputBox = document.getElementById("output");

generateBtn.addEventListener("click", async () => {
  const resume = document.getElementById("resume").value.trim();
  const jobDesc = document.getElementById("jobDesc").value.trim();

  if (!resume || !jobDesc) {
    alert("❌ Please paste both your resume and the job description.");
    return;
  }

  generateBtn.disabled = true;
  generateBtn.textContent = "⏳ Generating...";

  try {
    const response = await fetch("http://127.0.0.1:8000/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ resume, job_description: jobDesc })
    });

    if (!response.ok) {
      throw new Error("Something went wrong.");
    }

    const data = await response.json();
    outputBox.value = data.cover_letter;
    outputSection.classList.remove("hidden");
    outputBox.scrollIntoView({ behavior: "smooth" });

  } catch (error) {
    alert("🚨 Error generating cover letter.");
    console.error(error);
  } finally {
    generateBtn.disabled = false;
    generateBtn.textContent = "✨ Generate Cover Letter";
  }
});

copyBtn.addEventListener("click", () => {
  outputBox.select();
  document.execCommand("copy");
  copyBtn.textContent = "✅ Copied!";
  setTimeout(() => {
    copyBtn.textContent = "📋 Copy to Clipboard";
  }, 2000);
});
