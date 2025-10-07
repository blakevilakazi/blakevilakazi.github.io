import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  "https://fzdtusalfwrixafnzhfa.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6ZHR1c2FsZndyaXhhZm56aGZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4NDMzNTEsImV4cCI6MjA3NTQxOTM1MX0.fqZuBwpoUR4IBK0Mk3-Cry8uDlpbgqIrTck33NSBAM8"
);

const loginScreen = document.getElementById("login-screen");
const adminPanel = document.getElementById("admin-panel");
const googleSignIn = document.getElementById("googleSignIn");
const filename = document.getElementById("filename");
const filetype = document.getElementById("filetype");
const filecontent = document.getElementById("filecontent");
const saveBtn = document.getElementById("saveBtn");
const status = document.getElementById("status");

googleSignIn.onclick = async () => {
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: window.location.href },
  });
};

supabase.auth.onAuthStateChange(async (event, session) => {
  if (session?.user?.email === "vuyaniphila86@gmail.com") {
    loginScreen.classList.add("hidden");
    adminPanel.classList.remove("hidden");
  }
});

saveBtn.onclick = async () => {
  if (!filename.value || !filecontent.value) return;
  const { error } = await supabase.from("admin_files").upsert({
    filename: filename.value,
    filetype: filetype.value,
    content: filecontent.value,
  });
  status.textContent = error ? "❌ Error saving file" : "✅ File saved successfully!";
};
