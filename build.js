// Generator for "लोह आणि अध्यात्माची यशोगाथा" digital book site.
// Reads source articles from draft/articles/*.md and the chapter data below,
// and writes a static site into site/ (index.html + articles/*.html + assets/style.css).

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const ARTICLES_SRC = path.join(ROOT, 'draft', 'articles');
const OUT_DIR = __dirname;
const OUT_ARTICLES = path.join(OUT_DIR, 'articles');

const BOOK = {
  titleMr: 'लोह आणि अध्यात्माची यशोगाथा',
  titleEn: 'Chronicle of Steel and Spirit',
  tagline: 'एका अभियंत्याच्या पोलादी वाटचालीची आणि त्याच वाटचालीत उलगडत गेलेल्या आध्यात्मिक शरणागतीची साक्ष',
  author: 'श्री. भास्कर लक्ष्मण साठे',
  preface: [
    `हे पुस्तक म्हणजे एका अभियंत्याच्या पोलादी वाटचालीची आणि त्याच वाटचालीत हळूहळू उलगडत गेलेल्या आध्यात्मिक शोधाची साक्ष आहे. लेखक श्री. भास्कर लक्ष्मण साठे यांनी गेल्या काही दशकांत वेळोवेळी लिहिलेल्या चाळीस लेखांतून — कधी दैनंदिनीच्या रूपात, कधी मनोगत म्हणून, तर कधी शुद्ध तात्त्विक चिंतन म्हणून — हा प्रवास साकार झाला आहे.`,
    `हे सर्व लेख येथे कालानुक्रमे सहा प्रकरणांमध्ये गुंफले आहेत, जेणेकरून लेखकाच्या जीवनाचा ओघ — कल्याणमधील बालपणापासून ते आजवरच्या आध्यात्मिक शरणागतीपर्यंत — वाचकाला सलगपणे अनुभवता यावा. जे लेख निव्वळ तात्त्विक निबंध, सर्वसाधारण आध्यात्मिक प्रबंध किंवा सामाजिक-धार्मिक काव्य स्वरूपाचे आहेत, आणि ज्यांना कोणत्याही विशिष्ट कालखंडाचे बंधन नाही, ते एका स्वतंत्र परिशिष्टात — "शाश्वत तत्त्वज्ञानाचा संग्रह" — एकत्र केले आहेत. हा भाग या पुस्तकाचा कायमस्वरूपी आध्यात्मिक सोबती म्हणून वाचता यावा, हा त्यामागील हेतू आहे.`,
    `ही डिजिटल आवृत्ती लेखकाच्या मूळ हस्तलिखित नोंदी, दैनंदिनी आणि मनोगते जशाच्या तशा जपत, केवळ वाचनासाठी सुयोग्य अशा रचनेत सादर करण्यात आली आहे.`,
  ],
  editorNote: 'प्रत्येक लेखापुढे दिलेली आशय व कारण ही टिपणे लेखांची निवड व मांडणी करताना तयार केलेल्या मूळ आराखड्यातून घेतली आहेत; ती वाचकाला — आणि विशेषतः लेखकाला स्वतःला — प्रत्येक लेख या पुस्तकाच्या प्रवाहात कुठे व का बसतो हे उलगडून दाखवतात.',
};

// chapters: order defines flattened reading sequence too
const CHAPTERS = [
  {
    key: 'ch1', num: '१', numArabic: 1,
    titleMr: 'वज्रपाया', years: '१९४४ – १९७३',
    subtitleMr: 'बालपण, शिक्षण आणि सुरुवातीचा संघर्ष',
    titleEn: 'Foundations of Steel — Childhood, Education, and Early Grit',
    desc: `हे प्रकरण लेखकाच्या सुरुवातीच्या वर्षांचा, तीव्र आर्थिक टंचाईतील शालेय जीवनाचा आणि पुण्याच्या अभियांत्रिकी क्षेत्रातील शैक्षणिक प्रवासाचा मागोवा घेते. सुरुवातीच्या अडचणींनी त्यांच्या व्यावसायिक उत्कृष्टतेसाठी आणि आध्यात्मिक लवचिकतेसाठी शारीरिक आणि नैतिक पाया कसा घातला, हे यातून स्पष्ट होते.`,
    color: '#6B4A2E',
    articles: [
      { id: 'LJ-012', type: 'Life Journey', date: '८ डिसेंबर २००३',
        aashay: 'लेखकाचा १९४४ मधील जन्म, कल्याणमधील सुरुवातीचे शालेय दिवस, शिष्यवृत्तीवर पुण्याच्या अनाथ विद्यार्थी गृहात प्रवेश, सीओईपी (COEP, १९६४) मधून पदवीधर होणे आणि एमएसईबीमध्ये (MSEB) रुजू होणे, यांची नोंद.',
        karan: 'लेखकाच्या सुरुवातीच्या जीवनाचे, कौटुंबिक संघर्षाचे आणि प्रौढावस्थेत झालेल्या स्थलांतराचे मूलभूत आत्मचरित्रात्मक संदर्भ म्हणून हे लेखन काम करते.' },
      { id: 'LJ-006', type: 'Life Journey', date: 'दिनांक नसलेला',
        aashay: 'शाळा आणि कॉलेजमधील राष्ट्रीय छात्र सेना (NCC) कॅम्पमधील खडतर आणि शिस्तबद्ध प्रशिक्षणाच्या दिवसांची आठवण.',
        karan: 'त्यांच्या कार्यपद्धतीला आकार देणारी सुरुवातीची शारीरिक तंदुरुस्ती, लष्करी शिस्त आणि देशभक्तीची मूल्ये यावर हे प्रकाश टाकते.' },
      { id: 'AT-013', type: 'Spiritual / Philosophy', date: 'दिनांक नसलेला',
        aashay: 'मानवी जाणीव आईच्या संगोपनापासून बौद्धिक, वैज्ञानिक आणि आध्यात्मिक परिपक्वतेपर्यंत कशी विकसित होते, याचा मागोवा घेणारे विकासात्मक तत्त्वज्ञान.',
        karan: 'हे संकल्पनात्मक पातळीवर लेखकाच्या शालेय आणि कॉलेजच्या दिवसांतील शारीरिक व मानसिक विकासाचे प्रतिबिंब दर्शवते.' },
    ],
  },
  {
    key: 'ch2', num: '२', numArabic: 2,
    titleMr: 'मध्यान्हाचा काळ', years: '१९७३ – २००३',
    subtitleMr: 'कारकीर्दीचा उच्चबिंदू आणि कौटुंबिक टप्पे',
    titleEn: 'The Rising Meridian — Career Apex and Family Milestones',
    desc: `हे प्रकरण बीएसईएस (BSES) मधील लेखकाच्या उत्कृष्ट कार्यकारी वर्षांचा, कॉर्पोरेट दबावाचा सामना करण्याचा आणि कौटुंबिक कार्यक्रमांचे व्यवस्थापन करण्याचा मागोवा घेते. एका मोठ्या नैसर्गिक आपत्तीतून बचावण्यासह — त्यांनी व्यावसायिक टप्पे आणि वैयक्तिक आयुष्य यांचा समतोल कसा राखला, हे यातून दिसून येते.`,
    color: '#1F5C6B',
    articles: [
      { id: 'LJ-002', type: 'Life Journey', date: '१८ फेब्रुवारी २००१',
        aashay: 'आयआयएम अहमदाबाद येथील मॅनेजमेंट डेव्हलपमेंट प्रोग्रामसाठी झालेली निवड आणि २६ जानेवारी २००१ च्या विनाशकारी गुजरात भूकंपाच्या प्रसंगी तेथून झालेली सुटका, याचा तपशील.',
        karan: 'एका मोठ्या नैसर्गिक संकटाच्या अनुभवासह कारकीर्दीतील एका उच्च टप्प्याला हे प्रकरण कवेत घेते.' },
      { id: 'LJ-003', type: 'Life Journey', date: '२० एप्रिल २००३',
        aashay: 'सांताक्रूझ कार्यालयात झालेली बढती आणि बदली, ज्यामुळे रोजचा लांबचा प्रवास टाळण्यासाठी तात्पुरते कंपनीच्या क्वार्टरमध्ये राहण्याचा निर्णय घ्यावा लागला, याचा तपशील.',
        karan: 'कारकीर्दीच्या सर्वोच्च काळात कामाचा ताण सांभाळण्यासाठी आणि कौटुंबिक कल्याणासाठी आवश्यक ठरलेले शारीरिक आणि कौटुंबिक बदल यातून अधोरेखित होतात.' },
      { id: 'LJ-001', type: 'In-Between', date: '२१ जुलै २००१',
        aashay: 'लेखकाच्या ५६ व्या श्रावण महिन्यात लिहिलेले टिपण, ज्यात पारंपरिक श्रद्धाप्रणालीत वैज्ञानिक दृष्टिकोनाचा परिचय करून देणाऱ्या बुद्धिवादी डॉ. नरेंद्र दाभोलकर यांच्या बीएसईएस येथील व्याख्यानाचा तपशील आहे.',
        karan: `हा सुरुवातीचा असा एक "दोन्हींच्या मधला" क्षण दर्शवतो, जिथे एका पवित्र महिन्यातील दैनंदिनी धार्मिक प्रथांच्या वैज्ञानिक व आधुनिक चौकशीशी जोडली गेली.` },
      { id: 'LJ-041', type: 'In-Between', date: '१६ फेब्रुवारी २००२',
        aashay: 'माघी गणेश चतुर्थीला बाल गणपती मंदिराला भेट दिल्यानंतर लिहिलेले, मंदिरातील निरीक्षणांना कौटुंबिक गैरसमज दूर करण्याच्या वैयक्तिक संकल्पात बदलणारे टिपण.',
        karan: 'वैयक्तिक संबंध आणि वर्तनाचे मूल्यमापन करण्यासाठी पवित्र दिवसांचा सक्रिय वापर कसा केला गेला, हे यातून दिसून येते.' },
      { id: 'AT-007', type: 'Spiritual / Wellness', date: '३ नोव्हेंबर २०२०', versionOf: 'AT-027', versionLabel: 'आवृत्ती १',
        aashay: 'दीर्घकालीन आनंद शोधणे, कामाचा आणि वैयक्तिक आयुष्याचा शाश्वत समतोल साधणे आणि घरात सकारात्मक वातावरण निर्माण करणे यावर भाष्य.',
        karan: 'या प्रकरणात वर्णन केलेल्या कॉर्पोरेट आणि कौटुंबिक दबावांचे व्यवस्थापन करण्यासाठी हे एक तात्विक मार्गदर्शक ठरते.' },
      { id: 'AT-027', type: 'Spiritual / Wellness', date: '३ नोव्हेंबर २०२०', versionOf: 'AT-007', versionLabel: 'आवृत्ती २',
        aashay: 'दीर्घकालीन आनंद शोधणे, कामाचा आणि वैयक्तिक आयुष्याचा शाश्वत समतोल साधणे आणि घरात सकारात्मक वातावरण निर्माण करणे यावर भाष्य — याच लेखाची लेखकाने पुन्हा शब्दांकित केलेली आवृत्ती.',
        karan: 'या प्रकरणात वर्णन केलेल्या कॉर्पोरेट आणि कौटुंबिक दबावांचे व्यवस्थापन करण्यासाठी हे एक तात्विक मार्गदर्शक ठरते.' },
    ],
  },
  {
    key: 'ch3', num: '३', numArabic: 3,
    titleMr: 'वैराग्याच्या उंबरठ्यावर', years: '२००३ – २००४',
    subtitleMr: 'निवृत्ती, दुःख आणि संक्रमण',
    titleEn: 'Threshold of Detachment — Retirement, Grief, and Transition',
    desc: `२००३ आणि २००४ या अत्यंत महत्त्वाच्या वर्षांवर लक्ष केंद्रित करून, हे प्रकरण रिलायन्सने बीएसईएसचे अधिग्रहण केल्यानंतरची निवृत्ती आणि त्याच सुमारास आई व सासूबाईंच्या झालेल्या अचानक निधनाशी संबंधित आहे. व्यावसायिक ओळखीपासून ते शांत वैराग्य, स्वतःची काळजी आणि आध्यात्मिक शरणागतीच्या प्रवासातील संक्रमण यावर यात भर दिला आहे.`,
    color: '#5A3A63',
    articles: [
      { id: 'LJ-004', type: 'Life Journey', date: '१२ जानेवारी २००३',
        aashay: 'निवृत्तीचा जवळ येत असलेला काळ, मुलाचे लग्न, कराडे येथे वडिलोपार्जित घराची जागा खरेदी करणे आणि गजानन महाराजांबद्दल कृतज्ञता व्यक्त करणे याविषयीचे चिंतन.',
        karan: 'कौटुंबिक सुखाचे टप्पे साजरे करत असतानाच निवृत्तीसाठी लागणारी भावनिक आणि संरचनात्मक तयारी यात टिपली आहे.' },
      { id: 'LJ-015', type: 'Life Journey', date: '१ नोव्हेंबर २००३',
        aashay: 'बीएसईएसमधून निवृत्ती (३० सप्टेंबर २००३), ठाण्यात परत येणे, आईचे निधन (फेब्रुवारी २००४) आणि मुलीचे लग्न याविषयीची सविस्तर माहिती.',
        karan: 'या अत्यंत संवेदनशील टप्प्यातील मुख्य जीवन बदल, दुःख आणि कौटुंबिक उलथापालथ यासाठी हे मुख्य लेखन म्हणून काम करते.' },
      { id: 'LJ-038', type: 'In-Between', date: '१ मे २००४',
        aashay: `वीज क्षेत्रातील सुधारणा आणि बीएसईएसचे रिलायन्सने केलेले अधिग्रहण यांचे विश्लेषण, जे पुढे जाऊन मानसिक व आध्यात्मिक आरोग्यासाठी सहा-पाऱ्यांच्या "हॉलिडे रिसॉर्ट ऑफ माइंड" या नित्यक्रमात परावर्तित होते.`,
        karan: 'निवृत्तीच्या मानसिक थकव्याचा सामना करण्यासाठी शेवटच्या व्यावसायिक विचारांना एका शिस्तबद्ध स्व-काळजी योजनेशी जोडणारा हा पूल आहे.' },
      { id: 'LJ-026', type: 'In-Between', date: '१ एप्रिल २००४',
        aashay: 'दिवंगत आईला आदरांजली वाहणारे आणि स्वतःच्या वृद्धत्वाविषयी चर्चा करणारे चिंतनशील टिपण, ज्यात कौटुंबिक अपेक्षांमधून बाहेर पडून समाजसेवेसाठी वेळ देण्याचा संकल्प आहे.',
        karan: 'वैयक्तिक दुःखाचे रूपांतर आध्यात्मिक मुक्तीच्या (जीवन मुक्ती) संकल्पात कसे झाले, हे यात टिपले आहे.' },
      { id: 'AT-035', type: 'Spiritual', date: '३ ऑक्टोबर २००३',
        aashay: 'स्वामी विवेकानंदांच्या राजयोग आणि सांख्य तत्त्वज्ञानाचा सारांश — पहिला भाग, जो दुःख दूर करण्यासाठी आणि आंतरिक शांतता मिळवण्यासाठी मनावर नियंत्रण ठेवण्यावर लक्ष केंद्रित करतो.',
        karan: 'या प्रकरणातील मोठ्या वैयक्तिक नुकसानीचा सामना करण्यासाठी अंगीकारलेल्या मानसिक शिस्त आणि वैराग्यासाठी हे तात्विक चौकट प्रदान करते.' },
      { id: 'AT-040', type: 'Spiritual', date: '३ ऑक्टोबर २००४',
        aashay: 'स्वामी विवेकानंदांच्या राजयोग आणि सांख्य तत्त्वज्ञानाचा सारांश — दुसरा भाग, पुढील वर्षी लिहिलेला.',
        karan: 'या प्रकरणातील मोठ्या वैयक्तिक नुकसानीचा सामना करण्यासाठी अंगीकारलेल्या मानसिक शिस्त आणि वैराग्यासाठी हे तात्विक चौकट प्रदान करते.' },
    ],
  },
  {
    key: 'ch4', num: '४', numArabic: 4,
    titleMr: 'समष्टीला समर्पण', years: '२००४ – २०१०',
    subtitleMr: 'निवृत्तीनंतरचे सामाजिक कार्य',
    titleEn: 'Dedicated to the Collective — Post-Retirement Social Action',
    desc: `हे प्रकरण निवृत्तीनंतरच्या सक्रिय जीवनावर प्रकाश टाकते, जिथे लेखकाने आपली ऊर्जा कॉर्पोरेट जीवनापासून दूर वळवून नि:स्वार्थ समाजसेवेकडे लावली. स्थानिक रक्तपेढीतील स्वयंसेवक म्हणून त्यांची भूमिका आणि आरएसएसमधील (RSS) प्रशिक्षण व नेतृत्व यांचा तपशील यात आहे.`,
    color: '#1F6B3A',
    articles: [
      { id: 'AT-029', type: 'Life Journey', date: 'दिनांक नसलेला',
        aashay: 'वामनराव ओक रक्तपेढीतील स्वयंसेवी सेवा, राष्ट्रीय स्वयंसेवक संघात प्रवेश, उज्जैन येथील प्रशिक्षण (२००५) आणि स्थानिक शाखांचे व्यवस्थापन यांची नोंद.',
        karan: 'कॉर्पोरेट इंजिनिअर ते समाजसेवक आणि प्रशिक्षक या प्रवासातील संक्रमण यात नोंदवले आहे.' },
      { id: 'LJ-027', type: 'In-Between', date: '२३ ऑक्टोबर २००५',
        aashay: '६१ व्या वाढदिवशी लिहिलेले, वडिलांच्या आणि कष्टाळू आईच्या आठवणींचा उल्लेख करणारे टिपण, ज्यात नि:स्वार्थ व्यक्ती आणि स्वार्थी नातेवाईक यांच्यातील फरक स्पष्ट केला आहे.',
        karan: 'एक चिंतनशील वाढदिवसाची नोंद, जिथे नि:स्वार्थ जीवनशैलीप्रती असलेली बांधिलकी दृढ करण्यासाठी वैयक्तिक कौटुंबिक इतिहासाचे विश्लेषण केले आहे.' },
      { id: 'AT-020', type: 'In-Between', date: '१ फेब्रुवारी २००६',
        aashay: 'विनायक चतुर्थीला लिहिलेले, शारीरिक वृद्धत्व, पिढ्यांमधील अंतर आणि आंतरिक शक्तीसाठी नामस्मरणावर विसंबून राहण्याबद्दलच्या भावना मांडणारे टिपण.',
        karan: 'वृद्धत्वाच्या शारीरिक वास्तवावर आणि बदलत्या कौटुंबिक वातावरणात मानसिक शांतता मिळवण्यावर हे लक्ष केंद्रित करते.' },
      { id: 'LJ-008', type: 'Socio-Religious', date: '२५ डिसेंबर २००६',
        aashay: 'ठाण्यात गोळवलकर गुरुजी यांच्या जन्मशताब्दीनिमित्त आयोजित सामाजिक समरसतेवरील व्याख्याने आणि संघटनात्मक सत्रांचा तपशील देणारा अहवाल.',
        karan: 'दैनंदिन नागरी सहभागाला सामाजिक ऐक्याच्या मोठ्या सामाजिक-धार्मिक चळवळीशी हे जोडते.' },
      { id: 'LJ-033', type: 'Socio-Religious', date: 'दिनांक नसलेला',
        aashay: `राष्ट्रीय स्वयंसेवक संघाचे नेते गोळवलकर गुरुजींना आदरांजली वाहणारे, त्यांचे "राष्ट्र प्रथम" आणि नि:स्वार्थतेचे तत्त्वज्ञान मांडणारे सामाजिक-आध्यात्मिक टिपण.`,
        karan: 'निवृत्तीनंतरच्या स्वयंसेवा कार्याला दिशा देणारे संघटनात्मक तत्त्वज्ञान हे स्पष्ट करते.' },
      { id: 'AT-003', type: 'Spiritual', date: '२२ जून २०२५',
        aashay: 'निरोगी शरीर राखणे, मन शुद्ध ठेवणे आणि उपेक्षित घटकांच्या कल्याणासाठी सक्रियपणे काम करणे या त्रिसूत्री मार्गाची रूपरेषा.',
        karan: 'या प्रकरणात सविस्तर मांडलेल्या सक्रिय सामाजिक स्वयंसेवा आणि समाजसेवेसाठी मार्गदर्शक आराखडा म्हणून हे काम करते.' },
    ],
  },
  {
    key: 'ch5', num: '५', numArabic: 5,
    titleMr: 'वेदनेची कसोटी', years: '२०१४ – २०२२',
    subtitleMr: 'आरोग्य, उपचार आणि जागरूक निरोगीपणा',
    titleEn: 'The Crucible of Pain — Health, Healing, and Conscious Wellness',
    desc: `हे प्रकरण वृद्धत्व आणि आजारपणाच्या आव्हानांचे दस्तऐवजीकरण करते, विशेषतः २०१४-२०१५ मधील गंभीर पोटाच्या रक्तवाहिन्यांशी संबंधित आजारातून झालेल्या बरे होण्याचा प्रवास यात आहे. या आजारपणाच्या कालावधीचा उपयोग समग्र आरोग्य, आयुर्वेदिक आहार आणि योगाभ्यासासाठी कसा केला गेला, हे यात दर्शवले आहे.`,
    color: '#8A2E2E',
    articles: [
      { id: 'LJ-030', type: 'Life Journey', date: '१४ एप्रिल २०१८',
        aashay: 'लहानपणापासूनच्या दैनंदिनी लिहिण्याच्या सवयी, १९६२ मधील आजारपण आणि २०१४-१५ मधील पोटाच्या गंभीर आजाराची सविस्तर नोंद.',
        karan: 'आजारपणातून झालेल्या शारीरिक बरे होण्याचा मागोवा घेते, ज्याने पुन्हा आरएसएसच्या दैनंदिन कामांकडे आणि निरोगी जीवनशैलीकडे वळवले.' },
      { id: 'LJ-011', type: 'Wellness / Spiritual', date: '२१ जून २०१५',
        aashay: `३३ मिनिटांच्या "कॉमन योग प्रोटोकॉल"चे टप्प्याटप्प्याने सादरीकरण, ज्याची सांगता एका औपचारिक देशभक्तीपर संकल्पाने होते.`,
        karan: 'आरोग्य टिकवून ठेवण्यासाठी आजारपणानंतर अंगीकारलेल्या शारीरिक योगाभ्यासाची नोंद करते.' },
      { id: 'AT-025', type: 'Wellness / Spiritual', date: '१ जून २०२२',
        aashay: 'हलके जेवण, सकाळी उपवास आणि पोटाकडून मेंदूकडे ऊर्जा वळवण्यावर लक्ष केंद्रित करणारे आयुर्वेदिक आणि शारीरिक मार्गदर्शक.',
        karan: 'पचनक्रिया सुदृढ ठेवण्यासाठी आणि लक्ष केंद्रित करण्यासाठी वापरलेल्या आहाराचा आराखडा हे प्रदान करते.' },
      { id: 'AT-023', type: 'Spiritual / Philosophy', date: '३ ऑक्टोबर २०१९',
        aashay: 'वेदना आणि मानवी संबंधांवर चिंतन, मानवी जीवनाचे सकाळ, दुपार आणि संध्याकाळ अशा तीन टप्प्यांत वर्गीकरण.',
        karan: 'वेदना आणि वृद्धत्वाच्या अपरिहार्यतेवर एक तात्विक चिंतन, जे शारीरिक आरोग्याच्या घसरणीच्या काळात शांतता शोधण्यास मदत करते.' },
    ],
  },
  {
    key: 'ch6', num: '६', numArabic: 6,
    titleMr: 'अनंत किनारा', years: '२०१८ – २०२५',
    subtitleMr: 'ग्रंथ अभ्यास आणि अंतिम शरणागती',
    titleEn: 'The Infinite Shore — Scriptural Study and Ultimate Surrender',
    desc: `हे अंतिम प्रकरण आध्यात्मिक आयुष्यातील शेवटच्या वर्षांवर लक्ष केंद्रित करते, जे ग्रंथांचा अभ्यास, नामस्मरण आणि ध्यानासाठी समर्पित आहे. शांततापूर्ण मुक्तीची तयारी करण्यासाठी वैयक्तिक अनुभव, निरोगी राहण्याच्या पद्धती आणि धर्मशास्त्रीय अभ्यास कसे एकत्र जोडले गेले, हे यात दिसून येते.`,
    color: '#1F3B6B',
    articles: [
      { id: 'LJ-032', type: 'Spiritual', date: '११ ऑगस्ट २०१८',
        aashay: 'मृणालिनी देसाई यांच्या पुस्तकांच्या आधारे ईशावास्य आणि मांडुक्य उपनिषदांचा अभ्यास करण्याचा दीप अमावस्येचा संकल्प.',
        karan: 'सक्रिय स्वयंसेवी कामाकडून सखोल ग्रंथ अभ्यासाकडे झालेल्या संक्रमणावर प्रकाश टाकते.' },
      { id: 'LJ-034', type: 'Spiritual', date: '११ जुलै २०१८',
        aashay: 'के. व्ही. बेलसरे यांच्या ईश्वर-साक्षात्कारावरील पुस्तकाचे परीक्षण, ज्यात समाधीच्या अवस्था आणि गोंदवलेकर महाराजांच्या शिकवणीचे विश्लेषण आहे.',
        karan: 'शांत नामस्मरण आणि देवाकडे स्वतःचा अहंकार समर्पित करण्याच्या पद्धतींचा शोध घेते.' },
      { id: 'AT-004', type: 'Spiritual', date: 'दिनांक नसलेला',
        aashay: 'ग्रंथज्ञानाचा उपयोग आचरणात आणल्याशिवाय निरर्थक आहे यावर भर देणारे आणि नामस्मरणाला अंतिम मार्ग मानणारे भक्तिमय चिंतन.',
        karan: `उर्वरित आयुष्य देवाच्या शांत स्मरणात घालवण्याच्या संकल्पाला व्यक्त करणारी ही "शेवटची प्रार्थना" ठरते.` },
      { id: 'AT-022', type: 'Spiritual', date: '२४ जानेवारी २०१९',
        aashay: `कर्तव्य, सत्य आणि पूर्ण शरणागतीचा अंतर्गत आदर्श म्हणून "राम" या आध्यात्मिक संकल्पनेचा शोध.`,
        karan: 'रामनवमीच्या बाह्य उत्सवांना हृदयातील भक्तीच्या आंतरिक साधनेशी हे जोडते.' },
      { id: 'AT-031', type: 'Wellness / Spiritual', date: 'दिनांक नसलेला',
        aashay: 'वृद्धत्व, आजारपण आणि मृत्यूची भीती दूर करण्यासाठी सकारात्मक दृष्टिकोनासह तयार केलेली एक मार्गदर्शित शिथिलीकरण पद्धती.',
        karan: 'अंतिम आध्यात्मिक सराव, जो वैयक्तिक अस्तित्वाला सर्वोच्च ब्रह्मामध्ये विलीन करण्यास मदत करतो.' },
    ],
  },
  {
    key: 'appendix', num: 'परिशिष्ट', numArabic: 7, isAppendix: true,
    titleMr: 'शाश्वत तत्त्वज्ञानाचा संग्रह', years: 'कालातीत',
    subtitleMr: 'आध्यात्मिक सोबती',
    titleEn: 'Appendix: Compendium of Eternal Philosophy',
    desc: `या परिशिष्टात निव्वळ तात्विक निबंध, धर्मशास्त्रीय मार्गदर्शक तत्त्वे आणि सांस्कृतिक कविता एकत्रित केल्या आहेत. या मजकुरात वैयक्तिक कालक्रमानुसार तपशील नाहीत, तर ते लेखकाच्या विचारसरणीला सतत माहिती देणारे सखोल बौद्धिक आणि सामाजिक-धार्मिक चौकट म्हणून काम करतात.`,
    color: '#8A5A0A',
    articles: [
      { id: 'AT-002', type: 'Theological Essay', date: 'दिनांक नसलेला',
        aashay: 'अहंकार सोडून आत्मसाक्षात्कार मिळवण्याचा पुरस्कार करत, विज्ञान आणि उपनिषदांसोबत वैदिक सनातन धर्माचे एकत्रीकरण शोधते.',
        karan: 'कोणताही वैयक्तिक तपशील नसलेले हे निव्वळ शैक्षणिक आणि धर्मशास्त्रीय विश्लेषण असल्याने येथे ठेवले आहे.' },
      { id: 'AT-006', type: 'Patriotic Poetry', date: 'दिनांक नसलेला',
        aashay: `एका "हिंदू बांधवाला" उद्देशून लिहिलेली सांस्कृतिक, देशभक्तीपर कविता — पहिला भाग, जी हिंदू संस्कृतीच्या ऐतिहासिक लवचिकतेचा गौरव करते.`,
        karan: 'ही आत्मचरित्रात्मक नोंद नसून एक सर्जनशील आणि प्रतीकात्मक सामाजिक-धार्मिक कविता असल्याने येथे वर्गीकृत केली आहे.' },
      { id: 'AT-028', type: 'Patriotic Poetry', date: 'दिनांक नसलेला',
        aashay: `एका "हिंदू बांधवाला" उद्देशून लिहिलेली सांस्कृतिक, देशभक्तीपर कविता — पुढील भाग, जी हिंदू संस्कृतीच्या ऐतिहासिक लवचिकतेचा गौरव करते.`,
        karan: 'ही आत्मचरित्रात्मक नोंद नसून एक सर्जनशील आणि प्रतीकात्मक सामाजिक-धार्मिक कविता असल्याने येथे वर्गीकृत केली आहे.' },
      { id: 'AT-008', type: 'Theological Essay', date: 'दिनांक नसलेला',
        aashay: 'आत्मसाक्षात्काराचे नियम सांगून, सत्संग, स्मरण आणि सेवा याभोवतीचा मार्ग तयार करते.',
        karan: 'गुरूंच्या मार्गदर्शनाखालील भक्तीची संपूर्णतः सामान्य धर्मशास्त्रीय प्रणाली हे तयार करते.' },
      { id: 'AT-009', type: 'Theological Essay', date: 'दिनांक नसलेला',
        aashay: 'नि:स्वार्थ प्रेम पसरवणाऱ्या आणि सर्व परिस्थितीत मनाची खोल शांतता राखणाऱ्या खऱ्या आध्यात्मिक साधकाची लक्षणे स्पष्ट करते.',
        karan: 'कोणतीही दैनंदिनी नोंद नसलेला, आध्यात्मिक विकासाचा एक अमूर्त, तात्विक मार्गदर्शक म्हणून लिहिलेला लेख.' },
      { id: 'AT-010', type: 'Devotional Essay', date: 'दिनांक नसलेला',
        aashay: 'रामनामाचे सततचे स्मरण मन शुद्ध करते, शाश्वत आनंद देते आणि भौतिक इच्छा कमी करण्यास मदत करते, असा युक्तिवाद यात मांडला आहे.',
        karan: 'वैयक्तिक कालक्रमाचा कोणताही उल्लेख नसलेले हे निव्वळ सामान्य भक्तिपर प्रवचन असल्याने येथे समाविष्ट केले आहे.' },
      { id: 'AT-011', type: 'Philosophical Essay', date: 'दिनांक नसलेला',
        aashay: 'ईश्वराच्या निर्मितीचे परिपूर्ण आणि तात्पुरते स्वरूप सांगून मानवांना निसर्गाशी सुसंगत राहण्याचा सल्ला देते.',
        karan: 'कोणत्याही आत्मचरित्रात्मक नोंदीशिवाय अनित्यतेवर केलेले हे सामान्य तात्विक चिंतन आहे.' },
      { id: 'AT-018', type: 'Philosophical Compendium', date: '३ जून २००४',
        aashay: 'संतांचे कौतुक करणारी मराठी कविता आणि ध्यान पद्धतीचा वापर करून अंतर्मुख होण्यावर स्वामी विवेकानंदांच्या व्याख्यानांतील विचारांचे संकलन.',
        karan: 'वैयक्तिक वर्णनाशिवाय अनेक सामान्य आध्यात्मिक मजकूर आणि स्वामी विवेकानंदांच्या अवतरणांना एकत्र जोडते.' },
      { id: 'AT-021', type: 'Spiritual Discourse', date: '१५ सप्टेंबर २०१८',
        aashay: 'वेदान्तिक नि:स्वार्थतेला नागरी कर्तव्याशी जोडणारा अत्यंत सविस्तर मजकूर, ज्यात लोकांची सेवा करणे म्हणजेच देवाची पूजा करणे आहे हे स्पष्ट केले आहे.',
        karan: 'वैयक्तिक नोंदींशिवाय नागरिकत्व आणि वैश्विक व्यवस्थेवर लिहिलेला हा एक व्यापक सामाजिक-आध्यात्मिक निबंध आहे.' },
      { id: 'AT-024', type: 'Spiritual Essay', date: '३ ऑक्टोबर २०२१',
        aashay: 'सामाजिक परिघाबाहेरील लोकांना मदत करण्याच्या इंग्रजी अवतरणाने सुरुवात होऊन, कौटुंबिक कर्तव्याकडून संन्यासाकडे जाण्याचे मराठीतील विवेचन यात आहे.',
        karan: 'वैयक्तिक दैनंदिनी नोंदींशिवाय सामान्य आध्यात्मिक प्रगतीचा मार्ग रेखाटणारा लेख असल्याने येथे ठेवला आहे.' },
    ],
  },
];

// ---------- helpers ----------

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function readArticle(id) {
  const file = path.join(ARTICLES_SRC, `${id}.md`);
  let raw = fs.readFileSync(file, 'utf8');
  raw = raw.replace(/^﻿/, '');
  const lines = raw.split(/\r?\n/);

  let i = 0;
  while (i < lines.length && lines[i].trim() === '') i++;
  const titleLine = (lines[i] || '').replace(/^#+\s*/, '').trim();
  const title = titleLine.replace(/\s+/g, ' ');
  i++;

  while (i < lines.length && (lines[i].trim() === '' || /^#\S/.test(lines[i].trim()))) i++;

  const bodyLines = lines.slice(i);
  // drop a leading line that just repeats the title
  const titleNorm = title.trim();
  let firstContentIdx = 0;
  while (firstContentIdx < bodyLines.length && bodyLines[firstContentIdx].trim() === '') firstContentIdx++;
  if (bodyLines[firstContentIdx] && bodyLines[firstContentIdx].trim() === titleNorm) {
    bodyLines.splice(firstContentIdx, 1);
  }

  const bodyText = bodyLines.join('\n').trim();
  const paragraphs = bodyText
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => esc(p).replace(/\n/g, '<br>\n'));

  return { title, paragraphs };
}

// ---------- flattened order + lookup ----------

const flat = [];
const chapterByArticleId = {};
CHAPTERS.forEach((ch) => {
  ch.articles.forEach((a) => {
    flat.push({ chapter: ch, article: a });
    chapterByArticleId[a.id] = ch;
  });
});

// ---------- CSS ----------

const css = fs.readFileSync(path.join(OUT_DIR, 'assets', 'style.src.css'), 'utf8');
fs.writeFileSync(path.join(OUT_DIR, 'assets', 'style.css'), css);

// ---------- page shell ----------

function shell({ title, bodyClass, chapterColor, content }) {
  return `<!doctype html>
<html lang="mr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(BOOK.titleMr)} — ${esc(BOOK.author)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Marathi:ital@0;1&family=Noto+Serif+Devanagari:wght@400;500;600;700&family=EB+Garamond:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='46' fill='%23F4EFE4' stroke='%23A6491E' stroke-width='6'/%3E%3Ctext x='50' y='68' font-size='54' text-anchor='middle' fill='%23A6491E'%3E%E0%A5%90%3C/text%3E%3C/svg%3E">
<link rel="stylesheet" href="${bodyClass === 'article-page' ? '../assets/style.css' : 'assets/style.css'}">
${chapterColor ? `<style>:root{--chapter-accent:${chapterColor};}</style>` : ''}
<script>try{if(localStorage.getItem('lj-theme')==='dark'){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}</script>
</head>
<body class="${bodyClass}">
${content}
<script>
(function init(){
  var root = document.documentElement;
  var btn = document.getElementById('themeToggle');
  if (!btn) { if (document.readyState !== 'complete') { window.addEventListener('DOMContentLoaded', init); } return; }
  function sync(){ btn.textContent = root.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙'; }
  sync();
  btn.addEventListener('click', function(){
    var goingDark = root.getAttribute('data-theme') !== 'dark';
    if (goingDark) { root.setAttribute('data-theme', 'dark'); } else { root.removeAttribute('data-theme'); }
    try { localStorage.setItem('lj-theme', goingDark ? 'dark' : 'light'); } catch (e) {}
    sync();
  });
})();
</script>
</body>
</html>
`;
}

function themeToggleButton() {
  return `<button class="theme-toggle" id="themeToggle" type="button" aria-label="रंगमोड बदला (dark / light)">🌙</button>`;
}

function emblemSvg() {
  return `<svg class="emblem" viewBox="0 0 160 160" role="img" aria-label="लोह आणि अध्यात्म - चिन्ह">
  <circle cx="80" cy="80" r="70" class="emblem-ring"/>
  ${Array.from({ length: 24 }).map((_, i) => {
    const a = (i / 24) * Math.PI * 2;
    const x1 = 80 + Math.cos(a) * 70, y1 = 80 + Math.sin(a) * 70;
    const x2 = 80 + Math.cos(a) * 62, y2 = 80 + Math.sin(a) * 62;
    return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" class="emblem-tick"/>`;
  }).join('\n  ')}
  <circle cx="80" cy="80" r="54" class="emblem-inner"/>
  <text x="80" y="102" text-anchor="middle" class="emblem-om">ॐ</text>
</svg>`;
}

// ---------- index.html ----------

function chapterNavLinks() {
  return CHAPTERS.map((ch) => `<a href="#${ch.key}" class="qn-link" style="--c:${ch.color}">${esc(ch.num)}</a>`).join('');
}

function tocChapterCard(ch) {
  const items = ch.articles.map((a) => {
    const versionBadge = a.versionLabel ? `<span class="tag tag-version">${esc(a.versionLabel)}</span>` : '';
    return `<li class="toc-item">
      <a class="toc-link" href="articles/${a.id}.html">${esc(chapterArticleTitle(a))}</a>
      <div class="toc-meta">
        <span class="tag">${esc(a.type)}</span>
        <span class="dot">·</span>
        <span class="date">${esc(a.date)}</span>
        ${versionBadge}
      </div>
      <p class="toc-aashay">${esc(a.aashay)}</p>
    </li>`;
  }).join('\n');

  const numBadge = ch.isAppendix ? 'प.' : ch.num;

  return `<section id="${ch.key}" class="chapter-card" style="--c:${ch.color}">
    <div class="chapter-head">
      <div class="chapter-num">${esc(numBadge)}</div>
      <div class="chapter-titles">
        <h3 class="chapter-title">${ch.isAppendix ? '' : `प्रकरण ${esc(ch.num)}: `}${esc(ch.titleMr)}</h3>
        <p class="chapter-sub">${esc(ch.subtitleMr)} <span class="chapter-years">· ${esc(ch.years)}</span></p>
        <p class="chapter-title-en">${esc(ch.titleEn)}</p>
      </div>
    </div>
    <p class="chapter-desc">${esc(ch.desc)}</p>
    <ol class="toc-list">${items}</ol>
  </section>`;
}

function chapterArticleTitle(a) {
  const map = readArticleTitleCache;
  return map[a.id] || a.id;
}

const readArticleTitleCache = {};
flat.forEach(({ article }) => {
  const { title } = readArticle(article.id);
  readArticleTitleCache[article.id] = title;
});

function buildIndex() {
  const content = `
<header class="cover">
  <div class="cover-inner">
    ${emblemSvg()}
    <p class="kicker">एक आत्मकथनात्मक व आध्यात्मिक लेखसंग्रह</p>
    <h1 class="cover-title">${esc(BOOK.titleMr)}</h1>
    <p class="cover-title-en">${esc(BOOK.titleEn)}</p>
    <p class="cover-tagline">${esc(BOOK.tagline)}</p>
    <div class="cover-author">
      <span class="author-name">${esc(BOOK.author)}</span>
    </div>
    <div class="cover-cta">
      <a href="#prastavana" class="btn btn-primary">प्रस्तावना वाचा</a>
      <a href="#toc" class="btn btn-ghost">अनुक्रमणिका पहा</a>
    </div>
  </div>
  <a href="#prastavana" class="scroll-hint" aria-hidden="true">&#8595;</a>
</header>

<nav class="quicknav">
  <span class="qn-title">${esc(BOOK.titleMr)}</span>
  <div class="qn-right">
    <div class="qn-links">${chapterNavLinks()}</div>
    ${themeToggleButton()}
  </div>
</nav>

<main>
  <section id="prastavana" class="preface">
    <h2 class="section-label">प्रस्तावना</h2>
    ${BOOK.preface.map((p) => `<p>${esc(p)}</p>`).join('\n    ')}
    <div class="book-stats">
      <div class="stat"><span class="stat-num">४०</span><span class="stat-label">लेख</span></div>
      <div class="stat"><span class="stat-num">६</span><span class="stat-label">प्रकरणे</span></div>
      <div class="stat"><span class="stat-num">१</span><span class="stat-label">परिशिष्ट</span></div>
      <div class="stat"><span class="stat-num">८१</span><span class="stat-label">वर्षांचा प्रवास</span></div>
    </div>
    <p class="editor-note">${esc(BOOK.editorNote)}</p>
  </section>

  <section id="toc" class="toc">
    <h2 class="section-label">अनुक्रमणिका</h2>
    ${CHAPTERS.map(tocChapterCard).join('\n    ')}
  </section>
</main>

<footer class="site-footer">
  <p>© ${esc(BOOK.author)}</p>
  <p class="footer-note">ही डिजिटल आवृत्ती कौटुंबिक व वैयक्तिक वाचनासाठी तयार करण्यात आली आहे.</p>
</footer>
`;
  const html = shell({ title: `${BOOK.titleMr} · ${BOOK.author}`, bodyClass: 'home', content });
  fs.writeFileSync(path.join(OUT_DIR, 'index.html'), html);
}

// ---------- article pages ----------

function articlePagerLink(idx, dir) {
  const item = flat[idx];
  if (!item) return '';
  const { title } = readArticle(item.article.id);
  const label = dir === 'prev' ? '← मागील लेख' : 'पुढील लेख →';
  const cls = dir === 'prev' ? 'pager-prev' : 'pager-next';
  return `<a class="pager-link ${cls}" href="${item.article.id}.html">
    <span class="pager-label">${label}</span>
    <span class="pager-title">${esc(title)}</span>
  </a>`;
}

function buildArticlePage(entry, idx) {
  const { chapter, article } = entry;
  const { title, paragraphs } = readArticle(article.id);

  const versionNote = article.versionOf
    ? `<p class="version-note">हा लेख लेखकाच्या याच विषयावरील दुसऱ्या शब्दांकनाशी (<a href="${article.versionOf}.html">${esc(article.versionOf)}</a>) संबंधित आहे — दोन्ही आवृत्त्या मुळाबरहुकूम जपल्या आहेत.</p>`
    : '';

  const prevLink = idx > 0 ? articlePagerLink(idx - 1, 'prev') : `<span class="pager-link pager-prev pager-disabled"><span class="pager-label">← मागील लेख</span><span class="pager-title">पुस्तकाची सुरुवात</span></span>`;
  const nextLink = idx < flat.length - 1 ? articlePagerLink(idx + 1, 'next') : `<span class="pager-link pager-next pager-disabled"><span class="pager-label">पुढील लेख →</span><span class="pager-title">पुस्तकाचा शेवट</span></span>`;

  const numBadge = chapter.isAppendix ? 'प.' : chapter.num;
  const chapterLabel = chapter.isAppendix ? chapter.titleMr : `प्रकरण ${chapter.num}: ${chapter.titleMr}`;

  const content = `
<header class="art-topbar" style="--c:${chapter.color}">
  <a class="art-back" href="../index.html#toc">← अनुक्रमणिका</a>
  <span class="art-topbar-title">${esc(BOOK.titleMr)}</span>
  <div class="art-topbar-right">
    <a class="art-chapter-badge" href="../index.html#${chapter.key}">${esc(numBadge)} · ${esc(chapter.titleMr)}</a>
    ${themeToggleButton()}
  </div>
</header>

<main class="art-page">
  <p class="art-breadcrumb" style="--c:${chapter.color}">${esc(chapterLabel)}</p>
  <h1 class="art-title">${esc(title)}</h1>
  <div class="art-badges">
    <span class="tag">${esc(article.type)}</span>
    <span class="dot">·</span>
    <span class="date">${esc(article.date)}</span>
    <span class="dot">·</span>
    <span class="art-id">${esc(article.id)}</span>
  </div>

  <aside class="art-context" style="--c:${chapter.color}">
    <p><strong>आशय —</strong> ${esc(article.aashay)}</p>
    <p><strong>कारण —</strong> ${esc(article.karan)}</p>
  </aside>
  ${versionNote}

  <hr class="ornament">

  <article class="art-body">
    ${paragraphs.map((p) => `<p>${p}</p>`).join('\n    ')}
  </article>
</main>

<nav class="art-pager">
  ${prevLink}
  ${nextLink}
</nav>

<footer class="site-footer art-footer">
  <a href="../index.html#toc">अनुक्रमणिकेकडे परत</a>
  <span class="dot">·</span>
  <span>© ${esc(BOOK.author)}</span>
</footer>
`;

  const html = shell({
    title: `${title} · ${BOOK.titleMr}`,
    bodyClass: 'article-page',
    chapterColor: chapter.color,
    content,
  });
  fs.writeFileSync(path.join(OUT_ARTICLES, `${article.id}.html`), html);
}

// ---------- run ----------

if (!fs.existsSync(OUT_ARTICLES)) fs.mkdirSync(OUT_ARTICLES, { recursive: true });

buildIndex();
flat.forEach((entry, idx) => buildArticlePage(entry, idx));

console.log(`Built index.html and ${flat.length} article pages.`);
