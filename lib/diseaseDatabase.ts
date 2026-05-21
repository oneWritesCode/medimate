export const diseaseDatabase = [
  // RESPIRATORY
  {
    disease: "Common Cold",
    symptoms: ["runny nose", "sneezing", "sore throat", "mild fever", "congestion"],
    medications: [
      { name: "Sinarest", generic: "Cetirizine + Paracetamol", use: "Cold and congestion relief" },
      { name: "Vicks Action 500", generic: "Paracetamol + Phenylephrine", use: "Multi-symptom cold relief" },
      { name: "Strepsils", generic: "Dichlorobenzyl alcohol", use: "Sore throat relief" }
    ],
    homeRemedies: ["Warm salt water gargle", "Steam inhalation", "Honey with ginger tea", "Stay hydrated"],
    hospitalType: "General Physician / Family Doctor",
    emergency: false,
    seeDoctor: "If symptoms last more than 7 days or fever exceeds 103°F"
  },
  {
    disease: "Influenza (Flu)",
    symptoms: ["high fever", "body ache", "fatigue", "chills", "headache", "dry cough"],
    medications: [
      { name: "Dolo 650", generic: "Paracetamol 650mg", use: "Fever and body pain" },
      { name: "Tamiflu", generic: "Oseltamivir", use: "Antiviral for flu (prescription)" },
      { name: "Combiflam", generic: "Ibuprofen + Paracetamol", use: "Fever and pain relief" }
    ],
    homeRemedies: ["Complete bed rest", "Plenty of fluids", "Warm soups", "Steam inhalation"],
    hospitalType: "General Physician",
    emergency: false,
    seeDoctor: "If fever exceeds 104°F or breathing difficulty occurs"
  },
  {
    disease: "Cough (Dry)",
    symptoms: ["persistent dry cough", "throat irritation", "no mucus"],
    medications: [
      { name: "Honitus", generic: "Vasaka + Tulsi", use: "Herbal cough relief" },
      { name: "Dextromethorphan", generic: "DXM", use: "Cough suppressant" },
      { name: "Benadryl Dry Cough", generic: "Diphenhydramine", use: "Dry cough relief" }
    ],
    homeRemedies: ["Honey with warm water", "Ginger tea", "Turmeric milk", "Humidifier"],
    hospitalType: "General Physician / ENT Specialist",
    emergency: false,
    seeDoctor: "If cough lasts more than 3 weeks or blood appears"
  },
  {
    disease: "Cough (Wet/Productive)",
    symptoms: ["cough with mucus", "chest congestion", "phlegm"],
    medications: [
      { name: "Ascoril", generic: "Salbutamol + Bromhexine", use: "Loosens mucus" },
      { name: "Mucinex", generic: "Guaifenesin", use: "Expectorant" },
      { name: "Alex Cough Syrup", generic: "Dextromethorphan + Guaifenesin", use: "Wet cough relief" }
    ],
    homeRemedies: ["Steam inhalation", "Warm fluids", "Elevation while sleeping"],
    hospitalType: "General Physician / Pulmonologist",
    emergency: false,
    seeDoctor: "If mucus is green/yellow or fever is present"
  },
  {
    disease: "Asthma",
    symptoms: ["wheezing", "shortness of breath", "chest tightness", "chronic cough"],
    medications: [
      { name: "Asthalin Inhaler", generic: "Salbutamol", use: "Quick relief bronchodilator" },
      { name: "Foracort Inhaler", generic: "Formoterol + Budesonide", use: "Long term control" },
      { name: "Montair", generic: "Montelukast", use: "Prevents asthma attacks" }
    ],
    homeRemedies: ["Avoid triggers", "Breathing exercises", "Keep windows closed during pollen season"],
    hospitalType: "Pulmonologist / Chest Specialist",
    emergency: true,
    seeDoctor: "Immediately if breathing is severely difficult"
  },
  {
    disease: "Pneumonia",
    symptoms: ["high fever", "productive cough", "chest pain", "difficulty breathing", "fatigue"],
    medications: [
      { name: "Azithromycin", generic: "Azithromycin 500mg", use: "Antibiotic (prescription)" },
      { name: "Amoxicillin", generic: "Amoxicillin 500mg", use: "Antibiotic (prescription)" },
      { name: "Dolo 650", generic: "Paracetamol", use: "Fever management" }
    ],
    homeRemedies: ["Complete rest", "Stay hydrated", "Warm compress on chest"],
    hospitalType: "Pulmonologist / Hospital Emergency",
    emergency: true,
    seeDoctor: "Immediately — pneumonia requires medical treatment"
  },

  // FEVER & INFECTIONS
  {
    disease: "Typhoid Fever",
    symptoms: ["sustained high fever", "weakness", "stomach pain", "headache", "loss of appetite"],
    medications: [
      { name: "Ciprofloxacin", generic: "Ciprofloxacin 500mg", use: "Antibiotic (prescription)" },
      { name: "Azithromycin", generic: "Azithromycin", use: "Antibiotic (prescription)" },
      { name: "Crocin", generic: "Paracetamol", use: "Fever management" }
    ],
    homeRemedies: ["Complete bed rest", "ORS for hydration", "Light easily digestible food"],
    hospitalType: "General Physician / Infectious Disease Specialist",
    emergency: true,
    seeDoctor: "As soon as possible — requires blood test and antibiotics"
  },
  {
    disease: "Dengue Fever",
    symptoms: ["sudden high fever", "severe headache", "joint pain", "skin rash", "bleeding gums"],
    medications: [
      { name: "Calpol", generic: "Paracetamol", use: "Fever (avoid ibuprofen/aspirin)" },
      { name: "ORS", generic: "Oral Rehydration Salts", use: "Prevent dehydration" }
    ],
    homeRemedies: ["Complete rest", "Papaya leaf juice", "Plenty of fluids", "Coconut water"],
    hospitalType: "Hospital Emergency / Infectious Disease",
    emergency: true,
    seeDoctor: "Immediately — platelet count monitoring required"
  },
  {
    disease: "Malaria",
    symptoms: ["cyclic fever", "chills", "sweating", "headache", "nausea", "muscle pain"],
    medications: [
      { name: "Chloroquine", generic: "Chloroquine phosphate", use: "Antimalarial (prescription)" },
      { name: "Artemether", generic: "Artemether + Lumefantrine", use: "Antimalarial (prescription)" }
    ],
    homeRemedies: ["Bed rest", "Keep warm during chills", "Stay hydrated"],
    hospitalType: "Hospital / Infectious Disease Specialist",
    emergency: true,
    seeDoctor: "Immediately — blood test required for confirmation"
  },
  {
    disease: "Viral Fever",
    symptoms: ["fever 99-103°F", "body ache", "weakness", "headache", "loss of appetite"],
    medications: [
      { name: "Dolo 650", generic: "Paracetamol 650mg", use: "Fever and body pain" },
      { name: "Crocin", generic: "Paracetamol 500mg", use: "Mild fever" },
      { name: "Combiflam", generic: "Ibuprofen + Paracetamol", use: "Fever with body pain" }
    ],
    homeRemedies: ["Rest", "Cold compress on forehead", "Plenty of fluids", "Light food"],
    hospitalType: "General Physician",
    emergency: false,
    seeDoctor: "If fever exceeds 103°F or lasts more than 3 days"
  },

  // DIGESTIVE
  {
    disease: "Acidity / GERD",
    symptoms: ["heartburn", "acid reflux", "chest burning", "sour taste", "bloating"],
    medications: [
      { name: "Pan 40", generic: "Pantoprazole 40mg", use: "Reduces stomach acid" },
      { name: "Omez", generic: "Omeprazole 20mg", use: "Proton pump inhibitor" },
      { name: "Gelusil", generic: "Magaldrate + Simethicone", use: "Instant antacid relief" },
      { name: "Digene", generic: "Magnesium Hydroxide", use: "Antacid syrup" }
    ],
    homeRemedies: ["Cold milk", "Avoid spicy food", "Don't lie down after eating", "Eat smaller meals"],
    hospitalType: "Gastroenterologist / General Physician",
    emergency: false,
    seeDoctor: "If symptoms are persistent or you have difficulty swallowing"
  },
  {
    disease: "Diarrhea",
    symptoms: ["loose stools", "frequent bowel movements", "stomach cramps", "dehydration"],
    medications: [
      { name: "ORS", generic: "Oral Rehydration Salts", use: "Rehydration" },
      { name: "Imodium", generic: "Loperamide", use: "Reduces frequency of stools" },
      { name: "Norflox TZ", generic: "Norfloxacin + Tinidazole", use: "Bacterial diarrhea (prescription)" },
      { name: "Econorm", generic: "Saccharomyces boulardii", use: "Probiotic for gut recovery" }
    ],
    homeRemedies: ["ORS every hour", "BRAT diet (Banana, Rice, Apple, Toast)", "Avoid dairy", "Stay hydrated"],
    hospitalType: "General Physician / Gastroenterologist",
    emergency: false,
    seeDoctor: "If blood in stool or diarrhea lasts more than 2 days"
  },
  {
    disease: "Constipation",
    symptoms: ["infrequent bowel movements", "hard stools", "straining", "bloating"],
    medications: [
      { name: "Dulcoflex", generic: "Bisacodyl", use: "Stimulant laxative" },
      { name: "Cremaffin", generic: "Liquid paraffin + Milk of magnesia", use: "Stool softener" },
      { name: "Isabgol", generic: "Psyllium husk", use: "Fiber supplement" }
    ],
    homeRemedies: ["Increase fiber intake", "Drink more water", "Exercise daily", "Warm water in morning"],
    hospitalType: "General Physician / Gastroenterologist",
    emergency: false,
    seeDoctor: "If constipation lasts more than 2 weeks"
  },
  {
    disease: "Food Poisoning",
    symptoms: ["nausea", "vomiting", "diarrhea", "stomach cramps", "fever"],
    medications: [
      { name: "ORS", generic: "Oral Rehydration Salts", use: "Rehydration" },
      { name: "Ondansetron", generic: "Ondansetron 4mg", use: "Stop vomiting" },
      { name: "Norflox TZ", generic: "Norfloxacin + Tinidazole", use: "Infection control (prescription)" }
    ],
    homeRemedies: ["Fast for a few hours", "Sip clear fluids", "Ginger tea", "Avoid solid food initially"],
    hospitalType: "General Physician / Emergency",
    emergency: false,
    seeDoctor: "If vomiting is severe or you cannot keep fluids down"
  },
  {
    disease: "Nausea / Vomiting",
    symptoms: ["nausea", "urge to vomit", "dizziness", "stomach discomfort"],
    medications: [
      { name: "Perinorm", generic: "Metoclopramide", use: "Anti-nausea" },
      { name: "Domstal", generic: "Domperidone", use: "Reduces nausea and vomiting" },
      { name: "Emeset", generic: "Ondansetron", use: "Strong anti-nausea" }
    ],
    homeRemedies: ["Ginger tea", "Peppermint", "Small sips of cold water", "Rest"],
    hospitalType: "General Physician",
    emergency: false,
    seeDoctor: "If vomiting lasts more than 24 hours"
  },
  {
    disease: "Irritable Bowel Syndrome (IBS)",
    symptoms: ["alternating diarrhea and constipation", "bloating", "abdominal pain", "gas"],
    medications: [
      { name: "Mebeverine", generic: "Mebeverine HCl", use: "Reduces bowel spasms" },
      { name: "Probiotics", generic: "Lactobacillus", use: "Gut health" },
      { name: "Librax", generic: "Chlordiazepoxide + Clidinium", use: "IBS symptoms (prescription)" }
    ],
    homeRemedies: ["High fiber diet", "Stress management", "Avoid trigger foods", "Regular meal times"],
    hospitalType: "Gastroenterologist",
    emergency: false,
    seeDoctor: "For proper diagnosis and management plan"
  },

  // PAIN
  {
    disease: "Headache (Tension)",
    symptoms: ["dull pressure headache", "band-like pain around head", "neck stiffness"],
    medications: [
      { name: "Saridon", generic: "Paracetamol + Propyphenazone + Caffeine", use: "Fast headache relief" },
      { name: "Disprin", generic: "Aspirin", use: "Pain relief" },
      { name: "Combiflam", generic: "Ibuprofen + Paracetamol", use: "Headache and pain" }
    ],
    homeRemedies: ["Rest in dark quiet room", "Cold/warm compress", "Massage temples", "Stay hydrated"],
    hospitalType: "General Physician / Neurologist",
    emergency: false,
    seeDoctor: "If headaches are frequent or severe"
  },
  {
    disease: "Migraine",
    symptoms: ["throbbing one-sided headache", "nausea", "light sensitivity", "visual disturbances"],
    medications: [
      { name: "Sumatriptan", generic: "Sumatriptan 50mg", use: "Migraine specific (prescription)" },
      { name: "Saridon", generic: "Paracetamol + Caffeine", use: "Mild migraine relief" },
      { name: "Stemetil", generic: "Prochlorperazine", use: "Nausea with migraine" }
    ],
    homeRemedies: ["Dark quiet room", "Cold compress on forehead", "Caffeine in small amounts", "Sleep"],
    hospitalType: "Neurologist",
    emergency: false,
    seeDoctor: "If migraine lasts more than 72 hours or is new and severe"
  },
  {
    disease: "Back Pain",
    symptoms: ["lower back pain", "muscle stiffness", "pain radiating to legs", "difficulty standing"],
    medications: [
      { name: "Volini Gel", generic: "Diclofenac gel", use: "Topical pain relief" },
      { name: "Combiflam", generic: "Ibuprofen + Paracetamol", use: "Pain and inflammation" },
      { name: "Myospaz", generic: "Chlorzoxazone + Diclofenac", use: "Muscle relaxant" }
    ],
    homeRemedies: ["Hot/cold compress", "Gentle stretching", "Avoid prolonged sitting", "Posture correction"],
    hospitalType: "Orthopedic / Physiotherapist",
    emergency: false,
    seeDoctor: "If pain radiates to legs or causes numbness"
  },
  {
    disease: "Joint Pain / Arthritis",
    symptoms: ["joint pain", "swelling", "stiffness", "reduced range of motion"],
    medications: [
      { name: "Brufen", generic: "Ibuprofen 400mg", use: "Anti-inflammatory" },
      { name: "Diclofenac", generic: "Diclofenac sodium", use: "Pain and swelling" },
      { name: "Shelcal", generic: "Calcium + Vitamin D3", use: "Bone strength" }
    ],
    homeRemedies: ["Warm compress", "Gentle exercise", "Weight management", "Omega-3 rich foods"],
    hospitalType: "Rheumatologist / Orthopedic",
    emergency: false,
    seeDoctor: "For diagnosis of arthritis type and proper management"
  },
  {
    disease: "Muscle Cramps",
    symptoms: ["sudden muscle pain", "muscle tightening", "spasm", "usually in legs"],
    medications: [
      { name: "Meftal Spas", generic: "Mefenamic acid + Dicyclomine", use: "Muscle spasm relief" },
      { name: "Magnesium supplement", generic: "Magnesium", use: "Prevents cramps" }
    ],
    homeRemedies: ["Stretch the muscle", "Massage", "Apply heat", "Stay hydrated", "Banana for potassium"],
    hospitalType: "General Physician",
    emergency: false,
    seeDoctor: "If cramps are frequent and severe"
  },

  // SKIN
  {
    disease: "Acne / Pimples",
    symptoms: ["pimples", "blackheads", "whiteheads", "oily skin", "skin inflammation"],
    medications: [
      { name: "Clindamycin gel", generic: "Clindamycin 1%", use: "Topical antibiotic" },
      { name: "Benzoyl Peroxide", generic: "Benzoyl Peroxide 2.5%", use: "Kills acne bacteria" },
      { name: "Retino A", generic: "Tretinoin", use: "Unclogs pores (prescription)" }
    ],
    homeRemedies: ["Wash face twice daily", "Don't pop pimples", "Tea tree oil", "Aloe vera gel"],
    hospitalType: "Dermatologist",
    emergency: false,
    seeDoctor: "For severe or cystic acne"
  },
  {
    disease: "Eczema / Dermatitis",
    symptoms: ["itchy skin", "red patches", "dry flaky skin", "skin inflammation"],
    medications: [
      { name: "Betnovate", generic: "Betamethasone cream", use: "Reduces inflammation" },
      { name: "Cetaphil", generic: "Moisturizing lotion", use: "Skin hydration" },
      { name: "Cetirizine", generic: "Cetirizine 10mg", use: "Reduces itching" }
    ],
    homeRemedies: ["Moisturize frequently", "Avoid harsh soaps", "Wear cotton clothes", "Cool compress"],
    hospitalType: "Dermatologist",
    emergency: false,
    seeDoctor: "If rash spreads rapidly or becomes infected"
  },
  {
    disease: "Fungal Infection (Skin)",
    symptoms: ["ring-shaped rash", "itching", "scaly skin", "redness between toes or groin"],
    medications: [
      { name: "Candid B cream", generic: "Clotrimazole + Beclomethasone", use: "Antifungal cream" },
      { name: "Fluconazole", generic: "Fluconazole 150mg", use: "Oral antifungal (prescription)" },
      { name: "Terbinafine", generic: "Terbinafine cream", use: "Ringworm and athlete's foot" }
    ],
    homeRemedies: ["Keep area dry", "Wear loose clothing", "Tea tree oil", "Change socks daily"],
    hospitalType: "Dermatologist / General Physician",
    emergency: false,
    seeDoctor: "If infection spreads or doesn't improve in 2 weeks"
  },
  {
    disease: "Psoriasis",
    symptoms: ["thick red patches", "silver scales", "dry cracked skin", "itching", "nail changes"],
    medications: [
      { name: "Coal tar shampoo", generic: "Coal tar 2%", use: "Scalp psoriasis" },
      { name: "Clobetasol cream", generic: "Clobetasol propionate", use: "Topical steroid" },
      { name: "Calcipotriol", generic: "Calcipotriol cream", use: "Vitamin D analogue" }
    ],
    homeRemedies: ["Moisturize daily", "Sunlight exposure in moderation", "Avoid stress", "Aloe vera"],
    hospitalType: "Dermatologist",
    emergency: false,
    seeDoctor: "For proper diagnosis and treatment plan"
  },
  {
    disease: "Urticaria (Hives)",
    symptoms: ["raised itchy welts", "redness", "swelling", "burning sensation"],
    medications: [
      { name: "Allegra", generic: "Fexofenadine 120mg", use: "Non-drowsy antihistamine" },
      { name: "Avil", generic: "Pheniramine maleate", use: "Antihistamine injection/tablet" },
      { name: "Cetirizine", generic: "Cetirizine 10mg", use: "Antihistamine" }
    ],
    homeRemedies: ["Cold compress", "Avoid triggers", "Loose cotton clothes", "Calamine lotion"],
    hospitalType: "Dermatologist / Allergist",
    emergency: false,
    seeDoctor: "Immediately if swelling involves throat or breathing difficulty"
  },

  // HAIR
  {
    disease: "Hair Fall / Alopecia",
    symptoms: ["excessive hair shedding", "thinning hair", "receding hairline", "bald patches"],
    medications: [
      { name: "Minoxidil", generic: "Minoxidil 5% solution", use: "Stimulates hair growth" },
      { name: "Finasteride", generic: "Finasteride 1mg", use: "DHT blocker (prescription, men)" },
      { name: "Biotin", generic: "Biotin 10mg", use: "Hair strength supplement" }
    ],
    homeRemedies: ["Scalp massage with coconut oil", "Onion juice application", "Balanced protein diet", "Reduce stress"],
    hospitalType: "Dermatologist / Trichologist",
    emergency: false,
    seeDoctor: "For diagnosis of underlying cause"
  },
  {
    disease: "Dandruff",
    symptoms: ["white flakes on scalp", "itchy scalp", "dry or oily scalp"],
    medications: [
      { name: "Selsun", generic: "Selenium sulfide shampoo", use: "Antifungal shampoo" },
      { name: "Nizoral", generic: "Ketoconazole shampoo", use: "Antifungal shampoo" },
      { name: "Head & Shoulders", generic: "Zinc pyrithione shampoo", use: "Dandruff control" }
    ],
    homeRemedies: ["Tea tree oil", "Apple cider vinegar rinse", "Neem paste", "Regular washing"],
    hospitalType: "Dermatologist",
    emergency: false,
    seeDoctor: "If dandruff is severe or associated with hair loss"
  },

  // EYE
  {
    disease: "Conjunctivitis (Pink Eye)",
    symptoms: ["red eyes", "discharge", "itching", "watering", "sensitivity to light"],
    medications: [
      { name: "Moxifloxacin eye drops", generic: "Moxifloxacin 0.5%", use: "Bacterial conjunctivitis" },
      { name: "Zaditor", generic: "Ketotifen eye drops", use: "Allergic conjunctivitis" },
      { name: "Lubricant eye drops", generic: "Carboxymethylcellulose", use: "Soothing drops" }
    ],
    homeRemedies: ["Warm compress", "Avoid touching eyes", "Clean discharge gently", "Separate towels"],
    hospitalType: "Ophthalmologist / General Physician",
    emergency: false,
    seeDoctor: "If vision is affected or pain is severe"
  },
  {
    disease: "Dry Eyes",
    symptoms: ["burning eyes", "gritty sensation", "redness", "blurred vision", "light sensitivity"],
    medications: [
      { name: "Systane Ultra", generic: "Polyethylene glycol drops", use: "Artificial tears" },
      { name: "Refresh Tears", generic: "Carboxymethylcellulose", use: "Lubricating drops" }
    ],
    homeRemedies: ["20-20-20 rule for screens", "Blink frequently", "Humidifier", "Omega-3 foods"],
    hospitalType: "Ophthalmologist",
    emergency: false,
    seeDoctor: "If dryness severely affects vision"
  },

  // ENT
  {
    disease: "Ear Infection (Otitis)",
    symptoms: ["ear pain", "hearing loss", "discharge from ear", "fever", "fullness in ear"],
    medications: [
      { name: "Ciplox ear drops", generic: "Ciprofloxacin ear drops", use: "Bacterial ear infection" },
      { name: "Otrivin", generic: "Xylometazoline", use: "Nasal decongestant for ear" },
      { name: "Amoxicillin", generic: "Amoxicillin 500mg", use: "Antibiotic (prescription)" }
    ],
    homeRemedies: ["Warm compress on ear", "Keep ear dry", "Avoid inserting objects in ear"],
    hospitalType: "ENT Specialist",
    emergency: false,
    seeDoctor: "As soon as possible to prevent hearing damage"
  },
  {
    disease: "Sinusitis",
    symptoms: ["facial pain", "blocked nose", "headache", "thick nasal discharge", "reduced smell"],
    medications: [
      { name: "Otrivin nasal spray", generic: "Xylometazoline", use: "Nasal decongestant" },
      { name: "Nasivion", generic: "Oxymetazoline", use: "Decongestant spray" },
      { name: "Amoxicillin", generic: "Amoxicillin", use: "Bacterial sinusitis (prescription)" }
    ],
    homeRemedies: ["Steam inhalation", "Warm compress on face", "Nasal saline rinse", "Stay hydrated"],
    hospitalType: "ENT Specialist",
    emergency: false,
    seeDoctor: "If symptoms last more than 10 days"
  },
  {
    disease: "Tonsillitis",
    symptoms: ["sore throat", "swollen tonsils", "difficulty swallowing", "fever", "bad breath"],
    medications: [
      { name: "Amoxicillin", generic: "Amoxicillin 500mg", use: "Antibiotic (prescription)" },
      { name: "Strepsils", generic: "Dichlorobenzyl alcohol", use: "Throat lozenges" },
      { name: "Dolo 650", generic: "Paracetamol", use: "Pain and fever" }
    ],
    homeRemedies: ["Warm salt water gargle", "Honey lemon tea", "Ice cream for comfort", "Rest"],
    hospitalType: "ENT Specialist / General Physician",
    emergency: false,
    seeDoctor: "If difficulty breathing or swallowing saliva"
  },

  // MENTAL HEALTH
  {
    disease: "Anxiety",
    symptoms: ["excessive worry", "restlessness", "rapid heartbeat", "sweating", "sleep problems"],
    medications: [
      { name: "Nexito", generic: "Escitalopram 10mg", use: "SSRI antidepressant (prescription)" },
      { name: "Clonazepam", generic: "Clonazepam 0.5mg", use: "Short term anxiety (prescription)" },
      { name: "Ashwagandha", generic: "Withania somnifera", use: "Herbal adaptogen" }
    ],
    homeRemedies: ["Deep breathing exercises", "Regular exercise", "Meditation", "Limit caffeine", "Sleep hygiene"],
    hospitalType: "Psychiatrist / Psychologist",
    emergency: false,
    seeDoctor: "If anxiety affects daily functioning"
  },
  {
    disease: "Depression",
    symptoms: ["persistent sadness", "loss of interest", "fatigue", "sleep changes", "hopelessness"],
    medications: [
      { name: "Fluoxetine", generic: "Fluoxetine 20mg", use: "SSRI (prescription)" },
      { name: "Sertraline", generic: "Sertraline 50mg", use: "SSRI (prescription)" }
    ],
    homeRemedies: ["Regular exercise", "Social connection", "Sunlight exposure", "Structured routine"],
    hospitalType: "Psychiatrist / Mental Health Clinic",
    emergency: false,
    seeDoctor: "As soon as possible — do not delay mental health care"
  },
  {
    disease: "Insomnia",
    symptoms: ["difficulty falling asleep", "frequent waking", "non-restorative sleep", "daytime fatigue"],
    medications: [
      { name: "Melatonin", generic: "Melatonin 5mg", use: "Sleep hormone supplement" },
      { name: "Benadryl", generic: "Diphenhydramine", use: "Short term sleep aid" },
      { name: "Nitrazepam", generic: "Nitrazepam", use: "Prescription sleeping pill" }
    ],
    homeRemedies: ["Fixed sleep schedule", "No screens before bed", "Dark cool room", "Chamomile tea", "No caffeine after 2pm"],
    hospitalType: "General Physician / Sleep Specialist",
    emergency: false,
    seeDoctor: "If insomnia lasts more than 3 weeks"
  },

  // CARDIOVASCULAR
  {
    disease: "Hypertension (High Blood Pressure)",
    symptoms: ["headache", "dizziness", "blurred vision", "chest pain", "often no symptoms"],
    medications: [
      { name: "Amlodipine", generic: "Amlodipine 5mg", use: "Calcium channel blocker (prescription)" },
      { name: "Telma", generic: "Telmisartan 40mg", use: "ARB (prescription)" },
      { name: "Atenolol", generic: "Atenolol 50mg", use: "Beta blocker (prescription)" }
    ],
    homeRemedies: ["Low sodium diet", "Regular exercise", "Stress reduction", "Limit alcohol", "DASH diet"],
    hospitalType: "Cardiologist / General Physician",
    emergency: true,
    seeDoctor: "Immediately if BP exceeds 180/120 or chest pain occurs"
  },
  {
    disease: "Chest Pain (Non-cardiac)",
    symptoms: ["chest pain", "no radiation to arm", "related to breathing or position", "after eating"],
    medications: [
      { name: "Gelusil", generic: "Antacid", use: "If due to acidity" },
      { name: "Pan 40", generic: "Pantoprazole", use: "If due to GERD" }
    ],
    homeRemedies: ["Deep breathing", "Antacid if burning type", "Rest"],
    hospitalType: "Emergency / Cardiologist",
    emergency: true,
    seeDoctor: "Immediately — always rule out heart attack first"
  },
  {
    disease: "Anemia",
    symptoms: ["fatigue", "pale skin", "shortness of breath", "dizziness", "cold hands and feet"],
    medications: [
      { name: "Ferrous sulfate", generic: "Iron supplement", use: "Iron deficiency anemia" },
      { name: "Folvite", generic: "Folic acid 5mg", use: "Folate deficiency" },
      { name: "Vitamin B12", generic: "Methylcobalamin 500mcg", use: "B12 deficiency" }
    ],
    homeRemedies: ["Iron rich foods (spinach, lentils, meat)", "Vitamin C with iron", "Avoid tea/coffee with meals"],
    hospitalType: "General Physician / Hematologist",
    emergency: false,
    seeDoctor: "For blood test to determine type of anemia"
  },

  // DIABETES & METABOLIC
  {
    disease: "Type 2 Diabetes",
    symptoms: ["frequent urination", "excessive thirst", "blurred vision", "slow healing wounds", "fatigue"],
    medications: [
      { name: "Metformin", generic: "Metformin 500mg", use: "First line diabetes medication (prescription)" },
      { name: "Glimepiride", generic: "Glimepiride 1mg", use: "Sulfonylurea (prescription)" }
    ],
    homeRemedies: ["Low sugar diet", "Regular exercise", "Weight management", "Monitor blood sugar"],
    hospitalType: "Endocrinologist / Diabetologist",
    emergency: false,
    seeDoctor: "As soon as possible for proper management"
  },
  {
    disease: "Hypoglycemia (Low Blood Sugar)",
    symptoms: ["shakiness", "sweating", "confusion", "rapid heartbeat", "hunger", "dizziness"],
    medications: [
      { name: "Glucose tablets", generic: "Dextrose", use: "Immediate sugar boost" },
      { name: "Glucagon kit", generic: "Glucagon", use: "Severe cases (prescription)" }
    ],
    homeRemedies: ["15g fast carbs immediately (juice, sugar, candy)", "Recheck after 15 minutes", "Eat a meal after recovery"],
    hospitalType: "Emergency / Endocrinologist",
    emergency: true,
    seeDoctor: "If unconscious or cannot swallow — call emergency"
  },
  {
    disease: "Thyroid (Hypothyroidism)",
    symptoms: ["weight gain", "fatigue", "cold intolerance", "dry skin", "hair loss", "depression"],
    medications: [
      { name: "Thyronorm", generic: "Levothyroxine 50mcg", use: "Thyroid hormone replacement (prescription)" },
      { name: "Eltroxin", generic: "Levothyroxine", use: "Hypothyroidism (prescription)" }
    ],
    homeRemedies: ["Iodine rich foods", "Selenium foods (Brazil nuts)", "Regular exercise", "Stress management"],
    hospitalType: "Endocrinologist",
    emergency: false,
    seeDoctor: "For TSH blood test and proper treatment"
  },

  // URINARY
  {
    disease: "UTI (Urinary Tract Infection)",
    symptoms: ["burning urination", "frequent urination", "cloudy urine", "pelvic pain", "strong odor"],
    medications: [
      { name: "Norfloxacin", generic: "Norfloxacin 400mg", use: "Antibiotic for UTI (prescription)" },
      { name: "Nitrofurantoin", generic: "Nitrofurantoin 100mg", use: "UTI antibiotic (prescription)" },
      { name: "Ural", generic: "Citric acid sachets", use: "Alkalinizes urine, reduces burning" }
    ],
    homeRemedies: ["Drink plenty of water", "Cranberry juice", "Avoid holding urine", "Maintain hygiene"],
    hospitalType: "Urologist / General Physician",
    emergency: false,
    seeDoctor: "As soon as possible — antibiotics required"
  },
  {
    disease: "Kidney Stones",
    symptoms: ["severe back or side pain", "pain during urination", "blood in urine", "nausea", "vomiting"],
    medications: [
      { name: "Diclofenac", generic: "Diclofenac injection/tablet", use: "Pain management" },
      { name: "Tamsulosin", generic: "Tamsulosin 0.4mg", use: "Helps pass small stones (prescription)" }
    ],
    homeRemedies: ["Drink 3-4 liters of water daily", "Lemon juice", "Avoid oxalate foods"],
    hospitalType: "Urologist / Hospital Emergency",
    emergency: true,
    seeDoctor: "Immediately if pain is unbearable or fever is present"
  },

  // WOMEN'S HEALTH
  {
    disease: "Menstrual Cramps (Dysmenorrhea)",
    symptoms: ["lower abdominal cramps", "back pain", "nausea", "during periods"],
    medications: [
      { name: "Meftal Spas", generic: "Mefenamic acid + Dicyclomine", use: "Period pain relief" },
      { name: "Ibuprofen", generic: "Ibuprofen 400mg", use: "Anti-inflammatory pain relief" },
      { name: "Drotin", generic: "Drotaverine", use: "Muscle spasm relief" }
    ],
    homeRemedies: ["Hot water bag on abdomen", "Light exercise", "Ginger tea", "Avoid caffeine"],
    hospitalType: "Gynecologist",
    emergency: false,
    seeDoctor: "If pain is severe or periods are irregular"
  },
  {
    disease: "PCOS (Polycystic Ovary Syndrome)",
    symptoms: ["irregular periods", "weight gain", "acne", "excess hair growth", "hair thinning"],
    medications: [
      { name: "Metformin", generic: "Metformin 500mg", use: "Insulin resistance (prescription)" },
      { name: "OCP", generic: "Oral Contraceptive Pills", use: "Hormonal regulation (prescription)" }
    ],
    homeRemedies: ["Low GI diet", "Regular exercise", "Weight management", "Stress reduction"],
    hospitalType: "Gynecologist / Endocrinologist",
    emergency: false,
    seeDoctor: "For proper hormonal evaluation"
  },

  // BONE & MUSCLE
  {
    disease: "Osteoporosis",
    symptoms: ["back pain", "loss of height", "stooped posture", "bone fractures easily"],
    medications: [
      { name: "Shelcal", generic: "Calcium + Vitamin D3", use: "Bone density support" },
      { name: "Alendronate", generic: "Alendronate 70mg", use: "Bisphosphonate (prescription)" }
    ],
    homeRemedies: ["Calcium rich diet", "Sunlight for Vitamin D", "Weight bearing exercise", "Avoid smoking"],
    hospitalType: "Orthopedic / Rheumatologist",
    emergency: false,
    seeDoctor: "For DEXA scan and proper treatment"
  },
  {
    disease: "Sciatica",
    symptoms: ["radiating leg pain", "lower back pain", "numbness in leg", "tingling", "weakness"],
    medications: [
      { name: "Pregabalin", generic: "Pregabalin 75mg", use: "Nerve pain (prescription)" },
      { name: "Diclofenac", generic: "Diclofenac 50mg", use: "Anti-inflammatory" },
      { name: "Myospaz", generic: "Muscle relaxant", use: "Muscle spasm" }
    ],
    homeRemedies: ["Ice and heat alternation", "Gentle stretching", "Avoid prolonged sitting", "Physiotherapy"],
    hospitalType: "Orthopedic / Neurologist / Physiotherapist",
    emergency: false,
    seeDoctor: "If numbness or weakness is severe"
  },

  // ALLERGIES
  {
    disease: "Allergic Rhinitis",
    symptoms: ["sneezing", "runny nose", "nasal congestion", "itchy eyes", "triggered by allergens"],
    medications: [
      { name: "Allegra", generic: "Fexofenadine 120mg", use: "Non-drowsy antihistamine" },
      { name: "Montair LC", generic: "Montelukast + Levocetirizine", use: "Allergy and nasal congestion" },
      { name: "Flonase", generic: "Fluticasone nasal spray", use: "Nasal steroid spray" }
    ],
    homeRemedies: ["Avoid allergens", "HEPA air purifier", "Saline nasal rinse", "Keep windows closed"],
    hospitalType: "ENT Specialist / Allergist",
    emergency: false,
    seeDoctor: "For allergy testing and immunotherapy options"
  },
  {
    disease: "Food Allergy",
    symptoms: ["hives", "swelling", "stomach pain", "vomiting", "difficulty breathing after eating"],
    medications: [
      { name: "Cetirizine", generic: "Cetirizine 10mg", use: "Mild allergic reaction" },
      { name: "Adrenaline (EpiPen)", generic: "Epinephrine", use: "Severe anaphylaxis (prescription)" }
    ],
    homeRemedies: ["Identify and avoid trigger food", "Read food labels carefully"],
    hospitalType: "Allergist / Emergency",
    emergency: true,
    seeDoctor: "Immediately if throat swelling or difficulty breathing"
  },

  // LIVER
  {
    disease: "Jaundice",
    symptoms: ["yellow skin and eyes", "dark urine", "pale stools", "fatigue", "abdominal pain"],
    medications: [
      { name: "Liv 52", generic: "Herbal liver tonic", use: "Liver support" },
      { name: "Ursodeoxycholic acid", generic: "UDCA", use: "Specific types (prescription)" }
    ],
    homeRemedies: ["Complete rest", "High carb low fat diet", "Plenty of fluids", "Avoid alcohol"],
    hospitalType: "Gastroenterologist / Hepatologist",
    emergency: true,
    seeDoctor: "Immediately — liver function tests required"
  },

  // NEUROLOGICAL
  {
    disease: "Vertigo",
    symptoms: ["spinning sensation", "dizziness", "nausea", "balance problems", "triggered by head movement"],
    medications: [
      { name: "Vertin", generic: "Betahistine 16mg", use: "Vertigo management" },
      { name: "Stemetil", generic: "Prochlorperazine", use: "Nausea and vertigo" },
      { name: "Meclizine", generic: "Meclizine 25mg", use: "Motion sickness and vertigo" }
    ],
    homeRemedies: ["Epley maneuver", "Avoid sudden head movements", "Sleep with head elevated", "Stay hydrated"],
    hospitalType: "ENT Specialist / Neurologist",
    emergency: false,
    seeDoctor: "If vertigo is severe or associated with hearing loss"
  },
  {
    disease: "Epilepsy / Seizures",
    symptoms: ["convulsions", "loss of consciousness", "staring spells", "muscle jerking"],
    medications: [
      { name: "Phenytoin", generic: "Phenytoin", use: "Antiepileptic (prescription)" },
      { name: "Valproate", generic: "Sodium valproate", use: "Antiepileptic (prescription)" }
    ],
    homeRemedies: ["Ensure safety during seizure", "Do not restrain", "Turn to side", "Time the seizure"],
    hospitalType: "Neurologist / Hospital Emergency",
    emergency: true,
    seeDoctor: "Immediately after first seizure"
  },

  // PEDIATRIC (common in children)
  {
    disease: "Chickenpox",
    symptoms: ["itchy blisters", "fever", "fatigue", "rash spreading from trunk"],
    medications: [
      { name: "Calamine lotion", generic: "Calamine", use: "Itching relief" },
      { name: "Calpol", generic: "Paracetamol", use: "Fever (avoid aspirin in children)" },
      { name: "Acyclovir", generic: "Acyclovir 400mg", use: "Antiviral (prescription)" }
    ],
    homeRemedies: ["Oatmeal bath", "Trim nails short", "Loose cotton clothes", "Isolation from others"],
    hospitalType: "Pediatrician / General Physician",
    emergency: false,
    seeDoctor: "If blisters near eyes or breathing difficulty"
  },
  {
    disease: "Hand Foot and Mouth Disease",
    symptoms: ["sores in mouth", "rash on hands and feet", "fever", "mainly in children"],
    medications: [
      { name: "Calpol", generic: "Paracetamol", use: "Fever and pain" },
      { name: "Mouth gel", generic: "Lidocaine gel", use: "Mouth pain relief" }
    ],
    homeRemedies: ["Cold foods like ice cream", "Plenty of fluids", "Rest", "Isolation"],
    hospitalType: "Pediatrician",
    emergency: false,
    seeDoctor: "If child cannot drink fluids or has high fever"
  }
]

// Helper function to find disease by symptoms or name
export function findDisease(query: string) {
  const q = query.toLowerCase()
  return diseaseDatabase.filter(d =>
    d.disease.toLowerCase().includes(q) ||
    d.symptoms.some(s => s.toLowerCase().includes(q))
  )
}

// Get all disease names for autocomplete
export function getAllDiseaseNames(): string[] {
  return diseaseDatabase.map(d => d.disease)
}

// Get all symptoms for matching
export function getAllSymptoms(): string[] {
  return [...new Set(diseaseDatabase.flatMap(d => d.symptoms))]
}
