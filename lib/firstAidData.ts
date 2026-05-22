export const firstAidGuide = [ 
   { 
     id: "heart-attack", 
     title: "Heart Attack", 
     icon: "❤️", 
     color: "red", 
     warning: "Call 108 immediately", 
     symptoms: ["Chest pain or pressure", "Pain in arm or jaw", 
                 "Shortness of breath", "Cold sweat", "Nausea"], 
     steps: [ 
       "Call emergency services (108) immediately", 
       "Have the person sit or lie in comfortable position", 
       "Loosen tight clothing around neck and chest", 
       "Give aspirin 325mg if available and not allergic", 
       "If unconscious and not breathing, begin CPR", 
       "Stay with person until help arrives" 
     ], 
     doNot: ["Do not leave the person alone", 
              "Do not give food or water", 
              "Do not ignore symptoms hoping they pass"] 
   }, 
   { 
     id: "choking", 
     title: "Choking", 
     icon: "🫁", 
     color: "orange", 
     warning: "Act immediately — seconds matter", 
     symptoms: ["Cannot speak or cry", "Cannot breathe", 
                 "Turns blue", "Clutches throat"], 
     steps: [ 
       "Ask 'Are you choking?' if they can answer they are not fully blocked", 
       "Stand behind person and wrap arms around waist", 
       "Make fist with one hand, place above navel below chest", 
       "Grasp fist with other hand", 
       "Give 5 firm upward thrusts (Heimlich maneuver)", 
       "Repeat until object is expelled or person loses consciousness", 
       "If unconscious call 108 and begin CPR" 
     ], 
     doNot: ["Do not do blind finger sweeps in mouth", 
              "Do not slap back if Heimlich is working", 
              "Do not give water"] 
   }, 
   { 
     id: "burns", 
     title: "Burns", 
     icon: "🔥", 
     color: "orange", 
     warning: "Severe burns need immediate medical attention", 
     symptoms: ["Red painful skin (1st degree)", 
                 "Blisters (2nd degree)", 
                 "White/charred skin (3rd degree - emergency)"], 
     steps: [ 
       "Remove person from source of burn immediately", 
       "Cool burn with cool (not cold) running water for 10-20 minutes", 
       "Remove jewelry or tight items near burn area", 
       "Cover with clean non-fluffy material or cling film", 
       "Do not burst blisters", 
       "Give paracetamol for pain if conscious", 
       "Seek medical attention for burns larger than palm size" 
     ], 
     doNot: ["Do not use ice or ice water", 
              "Do not apply butter, toothpaste or oils", 
              "Do not remove clothing stuck to burn"] 
   }, 
   { 
     id: "stroke", 
     title: "Stroke", 
     icon: "🧠", 
     color: "red", 
     warning: "Call 108 immediately — time is brain", 
     symptoms: ["Face drooping on one side", "Arm weakness", 
                 "Speech difficulty", "Sudden severe headache", 
                 "Vision problems"], 
     steps: [ 
       "Use FAST test: Face drooping? Arm weak? Speech slurred? Time to call 108", 
       "Call emergency services immediately", 
       "Note the time symptoms started", 
       "Keep person calm and comfortable", 
       "Do not give food or water", 
       "If unconscious place in recovery position", 
       "Stay until help arrives" 
     ], 
     doNot: ["Do not give aspirin (different from heart attack)", 
              "Do not let person sleep it off", 
              "Do not give food or drink"] 
   }, 
   { 
     id: "fracture", 
     title: "Bone Fracture", 
     icon: "🦴", 
     color: "blue", 
     warning: "Do not move person if spine injury suspected", 
     symptoms: ["Intense pain", "Swelling and bruising", 
                 "Inability to move limb", "Visible bone (open fracture)"], 
     steps: [ 
       "Keep person still and calm", 
       "Immobilize the injured area — do not try to straighten", 
       "Apply ice wrapped in cloth to reduce swelling", 
       "For open fracture cover with clean cloth do not push bone in", 
       "Elevate injured limb if possible", 
       "Seek immediate medical attention" 
     ], 
     doNot: ["Do not try to realign the bone", 
              "Do not move person if neck/spine injury suspected", 
              "Do not ignore even if person can move it"] 
   }, 
   { 
     id: "allergic-reaction", 
     title: "Severe Allergic Reaction", 
     icon: "⚠️", 
     color: "red", 
     warning: "Anaphylaxis is life threatening — call 108", 
     symptoms: ["Throat swelling", "Difficulty breathing", 
                 "Hives all over body", "Rapid heartbeat", "Dizziness"], 
     steps: [ 
       "Call 108 immediately", 
       "Use EpiPen if available and prescribed", 
       "Have person lie down with legs elevated", 
       "If breathing stops begin CPR", 
       "Give antihistamine only for MILD reactions not anaphylaxis", 
       "Stay until emergency services arrive" 
     ], 
     doNot: ["Do not give antihistamine for severe breathing difficulty", 
              "Do not leave person alone", 
              "Do not have person stand up"] 
   }, 
   { 
     id: "seizure", 
     title: "Seizure / Epilepsy", 
     icon: "⚡", 
     color: "purple", 
     warning: "Call 108 if seizure lasts more than 5 minutes", 
     symptoms: ["Uncontrolled shaking", "Loss of consciousness", 
                 "Stiffening of body", "Blank staring"], 
     steps: [ 
       "Stay calm and time the seizure", 
       "Clear area of hard or sharp objects", 
       "Place something soft under their head", 
       "Turn person gently to their side", 
       "Do not restrain their movements", 
       "After seizure ends place in recovery position", 
       "Stay with them until fully conscious" 
     ], 
     doNot: ["Do not put anything in their mouth", 
              "Do not restrain the person", 
              "Do not give water until fully conscious"] 
   }, 
   { 
     id: "drowning", 
     title: "Drowning", 
     icon: "💧", 
     color: "blue", 
     warning: "Call 108 immediately after rescue", 
     symptoms: ["Unresponsive after water rescue", 
                 "Not breathing normally", "Coughing water"], 
     steps: [ 
       "Get person out of water safely", 
       "Call 108 immediately", 
       "Check for breathing", 
       "If not breathing begin rescue breathing", 
       "Begin CPR if no pulse", 
       "Keep person warm — hypothermia risk", 
       "Even if person seems okay get medical evaluation" 
     ], 
     doNot: ["Do not do not attempt rescue if it puts you in danger", 
              "Do not assume they are fine if conscious", 
              "Do not leave them alone"] 
   } 
 ] 
