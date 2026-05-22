export function saveSymptomLog(data: { 
  condition: string, 
  symptoms: string[], 
  medicines: string[], 
  severity: "mild" | "moderate" | "severe", 
  feelingScore: number,
  isAutoCaptured?: boolean
}) { 
  if (typeof window === 'undefined') return;

  const existing = JSON.parse( 
    localStorage.getItem("healthbuddy_symptoms") || "[]" 
  ) 
  
  const today = new Date().toISOString().split("T")[0] 
  
  // Check if already logged today — update instead of duplicate 
  const todayIndex = existing.findIndex((log: any) => 
    log.date === today 
  ) 
  
  const newLog = { 
    id: Date.now().toString(), 
    date: today, 
    condition: data.condition, 
    symptoms: data.symptoms, 
    medicines: data.medicines, 
    severity: data.severity, 
    feelingScore: data.feelingScore, 
    timestamp: new Date().toISOString(),
    isAutoCaptured: data.isAutoCaptured || false
  } 
  
  if (todayIndex >= 0) { 
    existing[todayIndex] = { ...existing[todayIndex], ...newLog } 
  } else { 
    existing.unshift(newLog) 
  } 
  
  localStorage.setItem("healthbuddy_symptoms", JSON.stringify(existing)) 
} 
 
export function getSymptomLogs() { 
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem("healthbuddy_symptoms") || "[]") 
} 
 
export function getLast14Days() { 
  const logs = getSymptomLogs() 
  const days = [] 
  for (let i = 13; i >= 0; i--) { 
    const date = new Date() 
    date.setDate(date.getDate() - i) 
    const dateStr = date.toISOString().split("T")[0] 
    const log = logs.find((l: any) => l.date === dateStr) 
    days.push({ 
      date: dateStr, 
      label: date.toLocaleDateString("en-IN", { 
        month: "short", day: "numeric" 
      }), 
      feelingScore: log?.feelingScore || null, 
      condition: log?.condition || null, 
      symptoms: log?.symptoms || [], 
      logged: !!log 
    }) 
  } 
  return days 
}

export function getStreak() {
  const logs = getSymptomLogs();
  if (logs.length === 0) return 0;
  
  // Sort logs by date descending
  const sortedLogs = [...logs].sort((a: any, b: any) => b.date.localeCompare(a.date));
  
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  
  // If no log today or yesterday, streak is broken
  if (sortedLogs[0].date !== today && sortedLogs[0].date !== yesterday) return 0;
  
  let streak = 0;
  let currentDate = new Date(sortedLogs[0].date);
  
  // Create a set of dates for faster lookup
  const loggedDates = new Set(sortedLogs.map((l: any) => l.date));
  
  while (loggedDates.has(currentDate.toISOString().split("T")[0])) {
    streak++;
    currentDate.setDate(currentDate.getDate() - 1);
  }
  
  return streak;
}
