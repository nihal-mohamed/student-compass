/**
 * Central translation table for the assessment.
 * Every user-facing string should live here so the language choice made on the
 * first screen controls all assessment text shown later.
 */
export const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ta", label: "தமிழ்", flag: "🇮🇳" },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]["code"];

export const DEFAULT_LANGUAGE: LanguageCode = "en";

export const isLanguageCode = (value: unknown): value is LanguageCode =>
  typeof value === "string" && LANGUAGES.some((l) => l.code === value);

type Dictionary = {
  appName: string;
  appTagline: string;
  privacyNote: string;
  stepOf: string;
  back: string;
  continue: string;
  finish: string;
  languageTitle: string;
  languageDescription: string;
  languageEnglish: string;
  languageTamil: string;
  languageEnglishHint: string;
  languageTamilHint: string;
<<<<<<< HEAD
  formatTitle: string;
  formatText: string;
  formatAudio: string;
  formatVideo: string;
  formatAudioUnavailable: string;
  question1Title: string;
  question1Prompt: string;
  question1SelectPrompt: string;
  question1NoRightWrong: string;
  question1Validation: string;
  question1OptionA: string;
  question1OptionADescription: string;
  question1OptionB: string;
  question1OptionBDescription: string;
  question1OptionC: string;
  question1OptionCDescription: string;
  question1OptionD: string;
  question1OptionDDescription: string;
  question1OptionE: string;
  question1OptionEDescription: string;
  question1OptionF: string;
  question1OptionFDescription: string;
  question1OptionG: string;
  question1OptionGDescription: string;
  question2Title: string;
  question2Prompt: string;
  question2Instruction: string;
  question2Speaking: string;
  question2Typing: string;
  question2Drawing: string;
  question2Validation: string;
  speakingStart: string;
  speakingStop: string;
  speakingRecordAgain: string;
  speakingPlay: string;
  speakingDelete: string;
  speakingPlaybackUnavailable: string;
  typingPrompt: string;
  typingPlaceholder: string;
  typingRequired: string;
  drawingPrompt: string;
  drawingClear: string;
  drawingUndo: string;
  drawingCanvasLabel: string;
  drawingRequired: string;
  profileTitle: string;
  profileDescription: string;
  profileActiveListener: string;
  profileIndependentReader: string;
  profileVisualExplorer: string;
  profileHandsOnLearner: string;
  profileExplainer: string;
  profileActiveWriter: string;
  profileIntegratedLearner: string;
  profileNoSelection: string;
  speakingActive: string;
  speakingDuration: string;
  speakingRequired: string;
  speakingPermissionDenied: string;
  speakingUnsupported: string;
=======
>>>>>>> origin/main
};

export const TRANSLATIONS: Record<LanguageCode, Dictionary> = {
  en: {
    appName: "Learning Preference",
    appTagline: "Student assessment",
    privacyNote: "Your answers stay on this device.",
    stepOf: "Step {current} of {total}",
    back: "Back",
    continue: "Continue",
    finish: "Finish",
    languageTitle: "Which language would you like to answer in?",
    languageDescription: "You can change this later by restarting the assessment.",
    languageEnglish: "English",
    languageTamil: "தமிழ்",
    languageEnglishHint: "Answer the assessment in English.",
    languageTamilHint: "Answer the assessment in Tamil.",
<<<<<<< HEAD
    formatTitle: "How would you like to receive the questions?",
    formatText: "📝 Text",
    formatAudio: "🔊 Audio",
    formatVideo: "🎬 Animation / Video",
    formatAudioUnavailable: "Audio is not available yet.",
    question1Title: "Question 1",
    question1Prompt:
      "Think about your favourite subject—a subject that you studied well and scored well.\n\nThink about how you prepared for that exam.\n\nYour teacher may have explained the topic in class. You may have gone home and studied it again. Perhaps you had doubts and looked for additional explanations. Maybe you practised many questions, taught the topic to a friend, watched YouTube videos, or wrote things down repeatedly while studying.\n\nLooking back at what you actually did, which methods helped you learn, prepare and score well?",
    question1SelectPrompt: "Select the 1 or 2 or 3 methods that helped you the most:",
    question1NoRightWrong:
      "There is no right or wrong answer.\n\nChoose the methods that actually helped you learn and perform well, based on your own experience—not what you think you are supposed to choose.",
    question1Validation: "Please select at least one method before continuing.",
    question1OptionA: "A — Listen",
    question1OptionADescription: "I learn well when someone explains the topic to me.",
    question1OptionB: "B — Read",
    question1OptionBDescription: "I learn well when I read the textbook, notes or other material myself.",
    question1OptionC: "C — Watch",
    question1OptionCDescription: "I learn well when I watch examples, demonstrations, animations or videos.",
    question1OptionD: "D — Do / Practise",
    question1OptionDDescription: "I learn well when I solve problems, practise questions or apply what I have learned.",
    question1OptionE: "E — Teach",
    question1OptionEDescription: "I learn well when I explain the topic to someone else or teach a friend.",
    question1OptionF: "F — Write",
    question1OptionFDescription: "I learn well when I write notes, answers, formulas or explanations while studying.",
    question1OptionG: "G — Combination",
    question1OptionGDescription: "I need a combination of two or more of these methods.",
    question2Title: "Question 2",
    question2Prompt: "Can you explain if you understood the question?",
    question2Instruction: "How would you like to explain your understanding?",
    question2Speaking: "🎤 Speaking",
    question2Typing: "⌨️ Typing",
    question2Drawing: "🖼️ Showing / Drawing",
    question2Validation: "Please select one way to explain your understanding before continuing.",
    speakingStart: "Start recording",
    speakingStop: "Stop recording",
    speakingRecordAgain: "Record again",
    speakingPlay: "Play recording",
    speakingDelete: "Delete recording",
    speakingPlaybackUnavailable: "This recording could not be played in the current browser.",
    typingPrompt: "Explain in your own words whether you understood the question.",
    typingPlaceholder: "Type your explanation here...",
    typingRequired: "Please type an explanation before continuing.",
    drawingPrompt: "Show or draw how you understood the question.",
    drawingClear: "Clear",
    drawingUndo: "Undo",
    drawingCanvasLabel: "Drawing area",
    drawingRequired: "Please add a drawing before continuing.",
    profileTitle: "Your Learning Profile",
    profileDescription: "These are the learning methods you reported as helpful for you in this assessment. They describe your experience here, not a permanent type or limit.",
    profileActiveListener: "You reported that listening when someone explains a topic helped you learn and prepare.",
    profileIndependentReader: "You reported that reading textbooks, notes or other material yourself helped you learn and prepare.",
    profileVisualExplorer: "You reported that watching examples, demonstrations, animations or videos helped you learn and prepare.",
    profileHandsOnLearner: "You reported that solving problems, practising questions or applying what you learned helped you prepare.",
    profileExplainer: "You reported that explaining a topic to someone else or teaching a friend helped you learn.",
    profileActiveWriter: "You reported that writing notes, answers, formulas or explanations helped you learn and prepare.",
    profileIntegratedLearner: "You reported that a combination of two or more learning methods helped you learn and prepare.",
    profileNoSelection: "No learning methods were selected.",
    speakingActive: "Recording in progress",
    speakingDuration: "Duration: {duration}",
    speakingRequired: "Please provide a recording before continuing.",
    speakingPermissionDenied: "Microphone access was denied. Please allow microphone access in your browser settings and try again.",
    speakingUnsupported: "Recording is not supported by this browser. Please use a browser that supports microphone recording.",
=======
>>>>>>> origin/main
  },
  ta: {
    appName: "கற்றல் விருப்பம்",
    appTagline: "மாணவர் மதிப்பீடு",
    privacyNote: "உங்கள் பதில்கள் இந்தச் சாதனத்திலேயே இருக்கும்.",
    stepOf: "படி {current} / {total}",
    back: "பின்செல்",
    continue: "தொடரவும்",
    finish: "முடிக்கவும்",
    languageTitle: "எந்த மொழியில் பதிலளிக்க விரும்புகிறீர்கள்?",
    languageDescription: "மதிப்பீட்டை மீண்டும் தொடங்கி இதை பின்னர் மாற்றலாம்.",
    languageEnglish: "English",
    languageTamil: "தமிழ்",
    languageEnglishHint: "மதிப்பீட்டை ஆங்கிலத்தில் பதிலளிக்கவும்.",
    languageTamilHint: "மதிப்பீட்டை தமிழில் பதிலளிக்கவும்.",
<<<<<<< HEAD
    formatTitle: "கேள்விகளை எவ்வாறு பெற விரும்புகிறீர்கள்?",
    formatText: "📝 உரை",
    formatAudio: "🔊 ஒலி",
    formatVideo: "🎬 அசைவூட்டம் / காணொளி",
    formatAudioUnavailable: "ஒலி வசதி இன்னும் கிடைக்கவில்லை.",
    // Approved Tamil translations can be inserted here without changing the Question 1 component.
    question1Title: "கேள்வி 1",
    question1Prompt:
      "நீங்கள் விரும்பும் ஒரு பாடத்தைப் பற்றி சிந்தியுங்கள்—நன்றாகப் படித்து நல்ல மதிப்பெண் பெற்ற பாடம்.\n\nஅந்தத் தேர்வுக்காக நீங்கள் எவ்வாறு தயாரானீர்கள் என்பதைப் பற்றி சிந்தியுங்கள்.\n\nஉங்கள் ஆசிரியர் வகுப்பில் அந்தத் தலைப்பை விளக்கியிருக்கலாம். நீங்கள் வீட்டிற்குச் சென்று அதை மீண்டும் படித்திருக்கலாம். உங்களுக்கு சந்தேகங்கள் இருந்து, கூடுதல் விளக்கங்களைத் தேடியிருக்கலாம். பல கேள்விகளைப் பயிற்சி செய்திருக்கலாம், அந்தத் தலைப்பை நண்பருக்குக் கற்றுக் கொடுத்திருக்கலாம், YouTube காணொளிகளைப் பார்த்திருக்கலாம் அல்லது படிக்கும்போது குறிப்புகளைத் தொடர்ந்து எழுதியிருக்கலாம்.\n\nநீங்கள் உண்மையில் செய்தவற்றை நினைத்துப் பார்க்கும்போது, நன்றாகக் கற்றுக்கொள்ளவும், தயாராகவும், நல்ல மதிப்பெண் பெறவும் எந்த முறைகள் உதவின?",
    question1SelectPrompt: "உங்களுக்கு மிகவும் உதவிய 1, 2 அல்லது 3 முறைகளைத் தேர்ந்தெடுக்கவும்:",
    question1NoRightWrong:
      "சரியான அல்லது தவறான பதில் என்று எதுவும் இல்லை.\n\nநீங்கள் தேர்ந்தெடுக்க வேண்டும் என்று நினைப்பதைப் பொறுத்து அல்லாமல், உங்கள் சொந்த அனுபவத்தின் அடிப்படையில் உண்மையில் கற்றுக்கொள்ளவும் சிறப்பாகச் செயல்படவும் உதவிய முறைகளைத் தேர்ந்தெடுக்கவும்.",
    question1Validation: "தொடர்வதற்கு முன் குறைந்தது ஒரு முறையையாவது தேர்ந்தெடுக்கவும்.",
    question1OptionA: "A — கேட்பது",
    question1OptionADescription: "யாராவது தலைப்பை எனக்கு விளக்கும்போது நான் நன்றாகக் கற்றுக்கொள்கிறேன்.",
    question1OptionB: "B — படிப்பது",
    question1OptionBDescription: "பாடப்புத்தகம், குறிப்புகள் அல்லது பிற பொருட்களை நானே படிக்கும்போது நன்றாகக் கற்றுக்கொள்கிறேன்.",
    question1OptionC: "C — பார்ப்பது",
    question1OptionCDescription: "எடுத்துக்காட்டுகள், விளக்கங்கள், அசைவூட்டங்கள் அல்லது காணொளிகளைப் பார்க்கும்போது நன்றாகக் கற்றுக்கொள்கிறேன்.",
    question1OptionD: "D — செய்வது / பயிற்சி செய்வது",
    question1OptionDDescription: "சிக்கல்களைத் தீர்த்து, கேள்விகளைப் பயிற்சி செய்து அல்லது கற்றதைப் பயன்படுத்தும்போது நன்றாகக் கற்றுக்கொள்கிறேன்.",
    question1OptionE: "E — கற்றுக் கொடுப்பது",
    question1OptionEDescription: "தலைப்பை வேறொருவருக்கு விளக்கும்போது அல்லது நண்பருக்குக் கற்றுக் கொடுக்கும்போது நன்றாகக் கற்றுக்கொள்கிறேன்.",
    question1OptionF: "F — எழுதுவது",
    question1OptionFDescription: "படிக்கும்போது குறிப்புகள், பதில்கள், சூத்திரங்கள் அல்லது விளக்கங்களை எழுதும்போது நன்றாகக் கற்றுக்கொள்கிறேன்.",
    question1OptionG: "G — கலவை",
    question1OptionGDescription: "இந்த முறைகளில் இரண்டு அல்லது அதற்கு மேற்பட்டவற்றின் கலவை எனக்குத் தேவை.",
    question2Title: "கேள்வி 2",
    question2Prompt: "கேள்வியை நீங்கள் புரிந்துகொண்டீர்கள் என்பதை விளக்க முடியுமா?",
    question2Instruction: "உங்கள் புரிதலை எவ்வாறு விளக்க விரும்புகிறீர்கள்?",
    question2Speaking: "🎤 பேசுதல்",
    question2Typing: "⌨️ தட்டச்சு செய்தல்",
    question2Drawing: "🖼️ காட்டுதல் / வரைதல்",
    question2Validation: "தொடர்வதற்கு முன் உங்கள் புரிதலை விளக்கும் ஒரு முறையைத் தேர்ந்தெடுக்கவும்.",
    speakingStart: "பதிவைத் தொடங்கவும்",
    speakingStop: "பதிவை நிறுத்தவும்",
    speakingRecordAgain: "மீண்டும் பதிவு செய்யவும்",
    speakingPlay: "பதிவை இயக்கவும்",
    speakingDelete: "பதிவை நீக்கவும்",
    speakingPlaybackUnavailable: "இந்த உலாவியில் இந்தப் பதிவை இயக்க முடியவில்லை.",
    typingPrompt: "கேள்வியை நீங்கள் புரிந்துகொண்டீர்களா என்பதை உங்கள் சொந்த வார்த்தைகளில் விளக்கவும்.",
    typingPlaceholder: "உங்கள் விளக்கத்தை இங்கே தட்டச்சு செய்யவும்...",
    typingRequired: "தொடர்வதற்கு முன் ஒரு விளக்கத்தைத் தட்டச்சு செய்யவும்.",
    drawingPrompt: "கேள்வியை நீங்கள் எவ்வாறு புரிந்துகொண்டீர்கள் என்பதை காட்டவும் அல்லது வரையவும்.",
    drawingClear: "அழிக்கவும்",
    drawingUndo: "செயலை மீளமைக்கவும்",
    drawingCanvasLabel: "வரையும் பகுதி",
    drawingRequired: "தொடர்வதற்கு முன் ஒரு வரைபடத்தைச் சேர்க்கவும்.",
    profileTitle: "உங்கள் கற்றல் சுயவிவரம்",
    profileDescription: "இந்த மதிப்பீட்டில் உங்களுக்கு உதவியாக இருந்ததாக நீங்கள் தெரிவித்த கற்றல் முறைகள் இவை. இவை உங்கள் அனுபவத்தை மட்டுமே விவரிக்கின்றன; நிரந்தர வகையையோ வரம்பையையோ குறிக்கவில்லை.",
    profileActiveListener: "யாராவது ஒரு தலைப்பை விளக்கும்போது கேட்பது கற்றுக்கொள்ளவும் தயாராகவும் உதவியது என்று தெரிவித்தீர்கள்.",
    profileIndependentReader: "பாடப்புத்தகங்கள், குறிப்புகள் அல்லது பிற பொருட்களை நீங்களே படிப்பது கற்றுக்கொள்ளவும் தயாராகவும் உதவியது என்று தெரிவித்தீர்கள்.",
    profileVisualExplorer: "எடுத்துக்காட்டுகள், விளக்கங்கள், அசைவூட்டங்கள் அல்லது காணொளிகளைப் பார்ப்பது கற்றுக்கொள்ளவும் தயாராகவும் உதவியது என்று தெரிவித்தீர்கள்.",
    profileHandsOnLearner: "சிக்கல்களைத் தீர்ப்பது, கேள்விகளைப் பயிற்சி செய்வது அல்லது கற்றதைப் பயன்படுத்துவது தயாராக உதவியது என்று தெரிவித்தீர்கள்.",
    profileExplainer: "ஒரு தலைப்பை வேறொருவருக்கு விளக்குவது அல்லது நண்பருக்குக் கற்றுக் கொடுப்பது கற்றுக்கொள்ள உதவியது என்று தெரிவித்தீர்கள்.",
    profileActiveWriter: "குறிப்புகள், பதில்கள், சூத்திரங்கள் அல்லது விளக்கங்களை எழுதுவது கற்றுக்கொள்ளவும் தயாராகவும் உதவியது என்று தெரிவித்தீர்கள்.",
    profileIntegratedLearner: "இரண்டு அல்லது அதற்கு மேற்பட்ட கற்றல் முறைகளின் கலவை கற்றுக்கொள்ளவும் தயாராகவும் உதவியது என்று தெரிவித்தீர்கள்.",
    profileNoSelection: "கற்றல் முறைகள் எதுவும் தேர்ந்தெடுக்கப்படவில்லை.",
    speakingActive: "பதிவு நடைபெறுகிறது",
    speakingDuration: "நேரம்: {duration}",
    speakingRequired: "தொடர்வதற்கு முன் ஒரு பதிவை உருவாக்கவும்.",
    speakingPermissionDenied: "ஒலிவாங்கி அணுகல் மறுக்கப்பட்டது. உலாவி அமைப்புகளில் ஒலிவாங்கி அணுகலை அனுமதித்து மீண்டும் முயற்சிக்கவும்.",
    speakingUnsupported: "இந்த உலாவியில் பதிவு செய்யும் வசதி ஆதரிக்கப்படவில்லை. ஒலிவாங்கி பதிவை ஆதரிக்கும் உலாவியைப் பயன்படுத்தவும்.",
=======
>>>>>>> origin/main
  },
};

export type TranslationKey = keyof Dictionary;
