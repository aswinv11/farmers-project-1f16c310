export type Language = 'en' | 'ta';

export interface Translations {
  header: {
    title: string;
    online: string;
    offline: string;
  };
  tabs: {
    input: string;
    data: string;
    tips: string;
    weather: string;
    report: string;
  };
  soilForm: {
    title: string;
    nitrogen: string;
    ph: string;
    moisture: string;
    plant: string;
    plantPlaceholder: string;
    submit: string;
    nitrogenHelper: string;
    phHelper: string;
    moistureHelper: string;
  };
  dashboard: {
    title: string;
    noData: string;
    nitrogen: string;
    ph: string;
    moisture: string;
    recentReadings: string;
  };
  recommendations: {
    title: string;
    noData: string;
    fertilizerRecommendations: string;
    pestManagement: string;
    cropSuggestions: string;
    general: string;
    soilHealthStatus: string;
    optimalFor: string;
    recommendedFertilizers: string;
    generalTips: string;
    lowNitrogen: string;
    excessNitrogen: string;
    soilAcidic: string;
    soilAlkaline: string;
    lowMoisture: string;
    excessMoisture: string;
    nitrogenOptimal: string;
    phOptimal: string;
    moistureOptimal: string;
    basedOnLatest: string;
  };
  weather: {
    title: string;
    noData: string;
    temperature: string;
    humidity: string;
    getWeather: string;
  };
  report: {
    title: string;
    generate: string;
    download: string;
    noData: string;
    contents: string;
    description: string;
  };
  auth: {
    welcome: string;
    signInDescription: string;
    signIn: string;
    signUp: string;
    email: string;
    password: string;
    confirmPassword: string;
    enterEmail: string;
    enterPassword: string;
    createPassword: string;
    confirmPasswordPlaceholder: string;
    signingIn: string;
    creatingAccount: string;
    createAccount: string;
    loggedInSuccess: string;
    accountCreatedSuccess: string;
    passwordsNoMatch: string;
    unexpectedError: string;
    logout: string;
  };
  common: {
    loading: string;
    error: string;
    success: string;
    language: string;
  };
  messages: {
    dataRecorded: string;
    connectionRestored: string;
    workingOffline: string;
  };
  plants: {
    rice: string;
    wheat: string;
    corn: string;
    tomato: string;
    potato: string;
    cotton: string;
    sugarcane: string;
    beans: string;
    spinach: string;
    cabbage: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    header: {
      title: 'Smart Soil Monitor',
      online: 'Online',
      offline: 'Offline',
    },
    tabs: {
      input: 'Input',
      data: 'Data',
      tips: 'Tips',
      weather: 'Weather',
      report: 'Report',
    },
    soilForm: {
      title: 'Record Soil Data',
      nitrogen: 'Nitrogen Level',
      ph: 'pH Level',
      moisture: 'Moisture Content',
      plant: 'Plant/Crop',
      plantPlaceholder: 'Select your plant',
      submit: 'Record Data',
      nitrogenHelper: 'Enter nitrogen level (0-100 ppm)',
      phHelper: 'Enter pH level (0-14)',
      moistureHelper: 'Enter moisture percentage (0-100%)',
    },
    dashboard: {
      title: 'Soil Health Dashboard',
      noData: 'No soil data recorded yet. Start by adding your first measurement!',
      nitrogen: 'Nitrogen',
      ph: 'pH Level',
      moisture: 'Moisture',
      recentReadings: 'Recent Readings',
    },
    recommendations: {
      title: 'Smart Recommendations',
      noData: 'Record soil data to get personalized recommendations.',
      fertilizerRecommendations: 'Fertilizer Recommendations',
      pestManagement: 'Pest Management',
      cropSuggestions: 'Crop Suggestions',
      general: 'General Tips',
      soilHealthStatus: 'Soil Health Status',
      optimalFor: 'optimal for',
      recommendedFertilizers: 'Recommended Fertilizers for',
      generalTips: 'General Tips for',
      lowNitrogen: 'Low nitrogen for',
      excessNitrogen: 'Excess nitrogen for',
      soilAcidic: 'Soil too acidic for',
      soilAlkaline: 'Soil too alkaline for',
      lowMoisture: 'Insufficient moisture for',
      excessMoisture: 'Excessive moisture for',
      nitrogenOptimal: 'Nitrogen levels optimal for',
      phOptimal: 'pH levels optimal for',
      moistureOptimal: 'Moisture levels optimal for',
      basedOnLatest: 'Based on your latest soil readings',
    },
    weather: {
      title: 'Weather Information',
      noData: 'Weather data unavailable in offline mode.',
      temperature: 'Temperature',
      humidity: 'Humidity',
      getWeather: 'Get Current Weather',
    },
    report: {
      title: 'Generate Report',
      generate: 'Generate PDF Report',
      download: 'Download PDF',
      noData: 'No data available for report generation.',
      contents: 'Report Contents',
      description: 'Download a comprehensive PDF report of your soil health data',
    },
    auth: {
      welcome: 'Welcome',
      signInDescription: 'Sign in to your account or create a new one',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      enterEmail: 'Enter your email',
      enterPassword: 'Enter your password',
      createPassword: 'Create a password',
      confirmPasswordPlaceholder: 'Confirm your password',
      signingIn: 'Signing in...',
      creatingAccount: 'Creating account...',
      createAccount: 'Create Account',
      loggedInSuccess: 'Logged in successfully!',
      accountCreatedSuccess: 'Account created successfully! You can now sign in.',
      passwordsNoMatch: 'Passwords do not match',
      unexpectedError: 'An unexpected error occurred',
      logout: 'Logout',
    },
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      language: 'Language',
    },
    messages: {
      dataRecorded: 'Soil data recorded successfully!',
      connectionRestored: 'Connection restored',
      workingOffline: 'Working offline - data will sync when connected',
    },
    plants: {
      rice: 'Rice',
      wheat: 'Wheat',
      corn: 'Corn/Maize',
      tomato: 'Tomato',
      potato: 'Potato',
      cotton: 'Cotton',
      sugarcane: 'Sugarcane',
      beans: 'Beans',
      spinach: 'Spinach',
      cabbage: 'Cabbage',
    },
  },
  ta: {
    header: {
      title: 'ஸ்மார்ட் மண் கண்காணிப்பு',
      online: 'ஆன்லைன்',
      offline: 'ஆஃப்லைன்',
    },
    tabs: {
      input: 'உள்ளீடு',
      data: 'தரவு',
      tips: 'குறிப்புகள்',
      weather: 'வானிலை',
      report: 'அறிக்கை',
    },
    soilForm: {
      title: 'மண் தரவு பதிவு',
      nitrogen: 'நைட்ரஜன் அளவு',
      ph: 'பிஎச் அளவு',
      moisture: 'ஈரப்பதம்',
      plant: 'செடி/பயிர்',
      plantPlaceholder: 'உங்கள் செடியை தேர்ந்தெடுக்கவும்',
      submit: 'தரவு பதிவு செய்',
      nitrogenHelper: 'நைட்ரஜன் அளவை உள்ளிடவும் (0-100 ppm)',
      phHelper: 'பிஎச் அளவை உள்ளிடவும் (0-14)',
      moistureHelper: 'ஈரப்பத சதவீதத்தை உள்ளிடவும் (0-100%)',
    },
    dashboard: {
      title: 'மண் சுகாதார டாஷ்போர்டு',
      noData: 'இன்னும் மண் தரவு பதிவு செய்யப்படவில்லை. உங்கள் முதல் அளவீட்டைச் சேர்ப்பதன் மூலம் தொடங்கவும்!',
      nitrogen: 'நைட்ரஜன்',
      ph: 'பிஎச் அளவு',
      moisture: 'ஈரப்பதம்',
      recentReadings: 'சமீபத்திய அளவீடுகள்',
    },
    recommendations: {
      title: 'ஸ்மார்ட் பரிந்துரைகள்',
      noData: 'தனிப்பயனாக்கப்பட்ட பரிந்துரைகளைப் பெற மண் தரவைப் பதிவு செய்யவும்.',
      fertilizerRecommendations: 'உர பரிந்துரைகள்',
      pestManagement: 'பூச்சி மேலாண்மை',
      cropSuggestions: 'பயிர் பரிந்துரைகள்',
      general: 'பொதுவான குறிப்புகள்',
      soilHealthStatus: 'மண் சுகாதார நிலை',
      optimalFor: 'க்கு உகந்தது',
      recommendedFertilizers: 'பரிந்துரைக்கப்பட்ட உரங்கள்',
      generalTips: 'பொதுவான குறிப்புகள்',
      lowNitrogen: 'குறைந்த நைட்ரஜன்',
      excessNitrogen: 'அதிகமான நைட்ரஜன்',
      soilAcidic: 'மண் மிகவும் அமிலத்தன்மை',
      soilAlkaline: 'மண் மிகவும் கார',
      lowMoisture: 'போதுமான ஈரப்பதம் இல்லை',
      excessMoisture: 'அதிகமான ஈரப்பதம்',
      nitrogenOptimal: 'நைட்ரஜன் அளவு உகந்தது',
      phOptimal: 'பிஎச் அளவு உகந்தது',
      moistureOptimal: 'ஈரப்பத அளவு உகந்தது',
      basedOnLatest: 'உங்கள் சமீபத்திய மண் அளவீடுகளின் அடிப்படையில்',
    },
    weather: {
      title: 'வானிலை தகவல்',
      noData: 'ஆஃப்லைன் பயன்முறையில் வானிலை தரவு கிடைக்கவில்லை.',
      temperature: 'வெப்பநிலை',
      humidity: 'ஈரப்பதம்',
      getWeather: 'தற்போதைய வானிலையைப் பெறுங்கள்',
    },
    report: {
      title: 'அறிக்கை உருவாக்கு',
      generate: 'PDF அறிக்கை உருவாக்கு',
      download: 'PDF பதிவிறக்கு',
      noData: 'அறிக்கை உருவாக்க தரவு கிடைக்கவில்லை.',
      contents: 'அறிக்கை உள்ளடக்கங்கள்',
      description: 'உங்கள் மண் சுகாதார தரவின் விரிவான PDF அறிக்கையைப் பதிவிறக்கவும்',
    },
    auth: {
      welcome: 'வரவேற்கிறோம்',
      signInDescription: 'உங்கள் கணக்கில் உள்நுழையவும் அல்லது புதிய கணக்கை உருவாக்கவும்',
      signIn: 'உள்நுழைய',
      signUp: 'பதிவு செய்ய',
      email: 'மின்னஞ்சல்',
      password: 'கடவுச்சொல்',
      confirmPassword: 'கடவுச்சொல்லை உறுதிப்படுத்தவும்',
      enterEmail: 'உங்கள் மின்னஞ்சலை உள்ளிடவும்',
      enterPassword: 'உங்கள் கடவுச்சொல்லை உள்ளிடவும்',
      createPassword: 'கடவுச்சொல்லை உருவாக்கவும்',
      confirmPasswordPlaceholder: 'உங்கள் கடவுச்சொல்லை உறுதிப்படுத்தவும்',
      signingIn: 'உள்நுழைகிறது...',
      creatingAccount: 'கணக்கு உருவாக்குகிறது...',
      createAccount: 'கணக்கை உருவாக்கு',
      loggedInSuccess: 'வெற்றிகரமாக உள்நுழைந்தீர்கள்!',
      accountCreatedSuccess: 'கணக்கு வெற்றிகரமாக உருவாக்கப்பட்டது! இப்போது நீங்கள் உள்நுழையலாம்.',
      passwordsNoMatch: 'கடவுச்சொற்கள் பொருந்தவில்லை',
      unexpectedError: 'எதிர்பாராத பிழை ஏற்பட்டது',
      logout: 'வெளியேறு',
    },
    common: {
      loading: 'ஏற்றுகிறது...',
      error: 'பிழை',
      success: 'வெற்றி',
      language: 'மொழி',
    },
    messages: {
      dataRecorded: 'மண் தரவு வெற்றிகரமாக பதிவு செய்யப்பட்டது!',
      connectionRestored: 'இணைப்பு மீட்டமைக்கப்பட்டது',
      workingOffline: 'ஆஃப்லைனில் வேலை செய்கிறது - இணைக்கப்படும் போது தரவு ஒத்திசைக்கப்படும்',
    },
    plants: {
      rice: 'அரிசி',
      wheat: 'கோதுமை',
      corn: 'சோளம்',
      tomato: 'தக்காளி',
      potato: 'உருளைக்கிழங்கு',
      cotton: 'பருத்தி',
      sugarcane: 'கரும்பு',
      beans: 'பீன்ஸ்',
      spinach: 'கீரை',
      cabbage: 'முட்டைகோஸ்',
    },
  },
};