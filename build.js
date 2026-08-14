// Generator for "मनोगताची शब्दफुले — भास्कर, एक प्रकाशाचा प्रवासी" digital book site.
// Reads source articles from draft/articles/*.md and the chapter data below,
// and writes a static site into site/ (index.html + articles/*.html + assets/style.css).

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const ARTICLES_SRC = path.join(ROOT, 'draft', 'articles');
const OUT_DIR = __dirname;
const OUT_ARTICLES = path.join(OUT_DIR, 'articles');

const BOOK = {
  titleMr: 'मनोगताची शब्दफुले',
  subtitleMr: 'भास्कर, एक प्रकाशाचा प्रवासी',
  tagline: 'आयुष्यभर तेवत राहिलेल्या मूल्यांच्या प्रकाशाची आणि निरपेक्ष प्रेमाची साक्ष',
  author: 'श्री. भास्कर लक्ष्मण साठे',
  preface: [
    `"मनोगताची शब्दफुले" — या नावातूनच या पुस्तकाचे स्वरूप उलगडते. लेखक श्री. भास्कर लक्ष्मण साठे यांनी गेल्या काही दशकांत वेळोवेळी मनोगत, दैनंदिनी आणि तात्त्विक चिंतनाच्या रूपात फुलवलेले शब्द इथे एकत्र गुंफले आहेत. "भास्कर" म्हणजे सूर्य — आणि हा त्यांचाच, एका प्रकाशाच्या प्रवाशाचा प्रवास आहे.`,
    `हे सर्व लेख येथे कालानुक्रमे नव्हे, तर लेखकाच्या आयुष्याला घडवणाऱ्या सहा मूल्यांभोवती गुंफले आहेत — बालपणी मिळालेले संस्कार, कामातील परिश्रम, कठीण प्रसंगांतील तत्त्वनिष्ठा, कुटुंबावरचे वात्सल्य, समाजाशी जोडलेले ऋणानुबंध आणि अखेरीस गवसलेली चिरंतन प्रकाशवाट. जे लेख निव्वळ तात्त्विक निबंध, सर्वसाधारण आध्यात्मिक प्रबंध किंवा सामाजिक-धार्मिक काव्य स्वरूपाचे आहेत, आणि ज्यांना कोणत्याही विशिष्ट प्रसंगाचे बंधन नाही, ते एका स्वतंत्र परिशिष्टात — "शाश्वत तत्त्वज्ञानाचा संग्रह" — एकत्र केले आहेत.`,
    `ही डिजिटल आवृत्ती लेखकाच्या मूळ हस्तलिखित नोंदी, दैनंदिनी आणि मनोगते जशाच्या तशा जपत, केवळ वाचनासाठी सुयोग्य अशा रचनेत सादर करण्यात आली आहे.`,
  ],
  editorNote: 'प्रत्येक लेखापुढे दिलेली आशय व कारण ही टिपणे, तो लेख या प्रकाशवाटेच्या कोणत्या टप्प्यावर व का बसतो हे वाचकाला — आणि विशेषतः लेखकाला स्वतःला — उलगडून दाखवण्यासाठी दिली आहेत.',
};

// chapters: order defines flattened reading sequence too — thematic (values), not chronological
const CHAPTERS = [
  {
    key: 'ch1', num: '१', numArabic: 1,
    titleMr: 'संस्कारांची पहाट',
    subtitleMr: 'बालपण आणि कुटुंबाकडून मिळालेली मूल्ये व शिकवण',
    desc: `हे प्रकरण लेखकाच्या बालपणातील आणि कुटुंबाकडून मिळालेल्या मूळ संस्कारांचा वेध घेते — कल्याणमधील शालेय दिवस, शिस्तप्रिय एनसीसी प्रशिक्षण, आणि आई-वडिलांकडून मिळालेली निःस्वार्थतेची शिकवण. हीच पहाटेची शिदोरी पुढील संपूर्ण जीवनप्रवासाला दिशा देत राहिली.`,
    color: '#6B4A2E',
    articles: [
      { id: 'LJ-012', tags: ['जीवनप्रवास'], date: '८ डिसेंबर २००३',
        aashay: 'लेखकाचा १९४४ मधील जन्म, कल्याणमधील सुरुवातीचे शालेय दिवस, शिष्यवृत्तीवर पुण्याच्या अनाथ विद्यार्थी गृहात प्रवेश, सीओईपी (COEP, १९६४) मधून पदवीधर होणे आणि एमएसईबीमध्ये (MSEB) रुजू होणे, यांची नोंद.',
        karan: 'लेखकाच्या बालपणातील संघर्ष, शिक्षणासाठी घेतलेले कष्ट आणि त्यातून घडलेल्या मूळ संस्कारांचे हे पायाभूत आत्मचरित्रात्मक साक्षीदार आहे.' },
      { id: 'LJ-006', tags: ['जीवनप्रवास'], date: 'दिनांक नसलेला',
        aashay: 'शाळा आणि कॉलेजमधील राष्ट्रीय छात्र सेना (NCC) कॅम्पमधील खडतर आणि शिस्तबद्ध प्रशिक्षणाच्या दिवसांची आठवण.',
        karan: 'एनसीसी शिबिरातील शिस्त आणि देशभक्तीने बालपणातच रुजवलेली मूल्ये यातून दिसतात — हीच शिस्त पुढे संपूर्ण आयुष्यभर सोबत राहिली.' },
      { id: 'AT-013', tags: ['आध्यात्मिक', 'तात्त्विक'], date: 'दिनांक नसलेला',
        aashay: 'मानवी जाणीव आईच्या संगोपनापासून बौद्धिक, वैज्ञानिक आणि आध्यात्मिक परिपक्वतेपर्यंत कशी विकसित होते, याचा मागोवा घेणारे विकासात्मक तत्त्वज्ञान.',
        karan: 'आईच्या संगोपनापासून सुरू होणाऱ्या जाणिवेच्या विकासाचे हे तात्त्विक चिंतन, बालपणातील संस्कारांना वैचारिक बैठक देते.' },
      { id: 'LJ-027', tags: ['कौटुंबिक', 'चिंतन'], date: '२३ ऑक्टोबर २००५',
        aashay: '६१ व्या वाढदिवशी लिहिलेले, वडिलांच्या आणि कष्टाळू आईच्या आठवणींचा उल्लेख करणारे टिपण, ज्यात नि:स्वार्थ व्यक्ती आणि स्वार्थी नातेवाईक यांच्यातील फरक स्पष्ट केला आहे.',
        karan: 'वडिलांच्या आणि कष्टाळू आईच्या आठवणींमधून मिळालेली निःस्वार्थतेची शिकवण या वाढदिवसाच्या चिंतनात स्पष्ट दिसते — हीच संस्कारांची पहाट आयुष्यभर तेवत राहिली.' },
    ],
  },
  {
    key: 'ch2', num: '२', numArabic: 2,
    titleMr: 'परिश्रमाचे तेज',
    subtitleMr: 'नोकरी व व्यवसायातील अपार मेहनत आणि प्रामाणिकपणा',
    desc: `हे प्रकरण बीएसईएसमधील लेखकाच्या कारकिर्दीतील अथक परिश्रम, प्रामाणिकपणा आणि जबाबदारीने पेललेल्या आव्हानांचा मागोवा घेते — व्यवस्थापन प्रशिक्षणापासून ते क्षेत्रीय सुधारणांच्या विश्लेषणापर्यंत, कामावरील निष्ठा हाच या प्रकरणाचा गाभा आहे.`,
    color: '#1F5C6B',
    articles: [
      { id: 'LJ-002', tags: ['जीवनप्रवास'], date: '१८ फेब्रुवारी २००१',
        aashay: 'आयआयएम अहमदाबाद येथील मॅनेजमेंट डेव्हलपमेंट प्रोग्रामसाठी झालेली निवड आणि २६ जानेवारी २००१ च्या विनाशकारी गुजरात भूकंपाच्या प्रसंगी तेथून झालेली सुटका, याचा तपशील.',
        karan: 'आयआयएम अहमदाबादसारख्या उच्च व्यावसायिक प्रशिक्षणासाठी झालेली निवड आणि तेथून एका मोठ्या संकटातून झालेली सुटका, कारकिर्दीतील तेजस्वी पण आव्हानात्मक टप्पा अधोरेखित करते.' },
      { id: 'LJ-003', tags: ['जीवनप्रवास'], date: '२० एप्रिल २००३',
        aashay: 'सांताक्रूझ कार्यालयात झालेली बढती आणि बदली, ज्यामुळे रोजचा लांबचा प्रवास टाळण्यासाठी तात्पुरते कंपनीच्या क्वार्टरमध्ये राहण्याचा निर्णय घ्यावा लागला, याचा तपशील.',
        karan: 'बढती आणि बदली स्वीकारून कामासाठी घेतलेले कष्ट आणि तडजोडी, व्यावसायिक निष्ठेचे उदाहरण ठरतात.' },
      { id: 'LJ-038', tags: ['व्यावसायिक', 'चिंतन'], date: '१ मे २००४',
        aashay: `वीज क्षेत्रातील सुधारणा आणि बीएसईएसचे रिलायन्सने केलेले अधिग्रहण यांचे विश्लेषण, जे पुढे जाऊन मानसिक व आध्यात्मिक आरोग्यासाठी सहा-पाऱ्यांच्या "हॉलिडे रिसॉर्ट ऑफ माइंड" या नित्यक्रमात परावर्तित होते.`,
        karan: 'वीज क्षेत्रातील सुधारणांचे सखोल विश्लेषण, निवृत्तीच्या उंबरठ्यावरही कामाप्रती असलेली बांधिलकी आणि व्यावसायिक तेज दाखवते.' },
    ],
  },
  {
    key: 'ch3', num: '३', numArabic: 3,
    titleMr: 'तत्त्वांचा दीपस्तंभ',
    subtitleMr: 'जीवनातील कठीण प्रसंगातही न डगमगणारी मूल्ये',
    desc: `निवृत्ती, आईचे निधन आणि मोठे वैयक्तिक नुकसान — अशा कठीण काळातही लेखकाने जपलेली तात्त्विक स्थिरता आणि मानसिक शिस्त या प्रकरणात दिसते. राजयोगासारख्या तत्त्वज्ञानाचा आधार घेत, दुःखातही तेवत राहिलेला दीपस्तंभ म्हणजे हे प्रकरण.`,
    color: '#5A3A63',
    articles: [
      { id: 'LJ-015', tags: ['जीवनप्रवास'], date: '१ नोव्हेंबर २००३',
        aashay: 'बीएसईएसमधून निवृत्ती (३० सप्टेंबर २००३), ठाण्यात परत येणे, आईचे निधन (फेब्रुवारी २००४) आणि मुलीचे लग्न याविषयीची सविस्तर माहिती.',
        karan: 'निवृत्ती आणि आईच्या निधनासारख्या अत्यंत कठीण काळातही स्थिर राहून कर्तव्य पार पाडण्याची वृत्ती, या प्रकरणाचे मूळ तत्त्व स्पष्ट करते.' },
      { id: 'LJ-026', tags: ['कौटुंबिक', 'चिंतन'], date: '१ एप्रिल २००४',
        aashay: 'दिवंगत आईला आदरांजली वाहणारे आणि स्वतःच्या वृद्धत्वाविषयी चर्चा करणारे चिंतनशील टिपण, ज्यात कौटुंबिक अपेक्षांमधून बाहेर पडून समाजसेवेसाठी वेळ देण्याचा संकल्प आहे.',
        karan: 'वैयक्तिक दुःखाचे रूपांतर आध्यात्मिक स्थैर्यात आणि समाजसेवेच्या संकल्पात कसे झाले, हे यातून दिसते — तत्त्वांवरची निष्ठा डगमगली नाही.' },
      { id: 'AT-035', tags: ['आध्यात्मिक'], date: '३ ऑक्टोबर २००३',
        aashay: 'स्वामी विवेकानंदांच्या राजयोग आणि सांख्य तत्त्वज्ञानाचा सारांश — पहिला भाग, जो दुःख दूर करण्यासाठी आणि आंतरिक शांतता मिळवण्यासाठी मनावर नियंत्रण ठेवण्यावर लक्ष केंद्रित करतो.',
        karan: 'स्वामी विवेकानंदांच्या राजयोगातील मनोनिग्रहाचे तत्त्वज्ञान, दुःखातही मन स्थिर ठेवण्याचा दीपस्तंभ ठरते.' },
      { id: 'AT-040', tags: ['आध्यात्मिक'], date: '३ ऑक्टोबर २००४',
        aashay: 'स्वामी विवेकानंदांच्या राजयोग आणि सांख्य तत्त्वज्ञानाचा सारांश — दुसरा भाग, पुढील वर्षी लिहिलेला.',
        karan: 'राजयोगाच्या याच तत्त्वज्ञानाचा पुढचा भाग, मानसिक शिस्तीचा पाया अधिक दृढ करतो.' },
    ],
  },
  {
    key: 'ch4', num: '४', numArabic: 4,
    titleMr: 'वात्सल्याची ऊब',
    subtitleMr: 'कुटुंब, मुले आणि नातेवाईकांप्रती असलेले प्रेम आणि जबाबदारी',
    desc: `मुलांची लग्ने, घरातील सलोखा राखण्याची धडपड आणि कामाचा व्याप सांभाळत कुटुंबाला दिलेली प्राथमिकता — या प्रकरणात लेखकाच्या वात्सल्यपूर्ण, जबाबदार कौटुंबिक भूमिकेचे दर्शन घडते.`,
    color: '#1F6B3A',
    articles: [
      { id: 'LJ-004', tags: ['जीवनप्रवास'], date: '१२ जानेवारी २००३',
        aashay: 'निवृत्तीचा जवळ येत असलेला काळ, मुलाचे लग्न, कराडे येथे वडिलोपार्जित घराची जागा खरेदी करणे आणि गजानन महाराजांबद्दल कृतज्ञता व्यक्त करणे याविषयीचे चिंतन.',
        karan: 'मुलाचे लग्न आणि कौटुंबिक स्थैर्यासाठी घेतलेले निर्णय, कुटुंबाप्रती असलेल्या जबाबदारीचे आणि प्रेमाचे प्रतिबिंब आहेत.' },
      { id: 'LJ-041', tags: ['सण', 'कौटुंबिक'], date: '१६ फेब्रुवारी २००२',
        aashay: 'माघी गणेश चतुर्थीला बाल गणपती मंदिराला भेट दिल्यानंतर लिहिलेले, मंदिरातील निरीक्षणांना कौटुंबिक गैरसमज दूर करण्याच्या वैयक्तिक संकल्पात बदलणारे टिपण.',
        karan: 'मंदिरातील निरीक्षणांचे रूपांतर कौटुंबिक गैरसमज दूर करण्याच्या वैयक्तिक संकल्पात होणे, हे वात्सल्याचे प्रत्यक्ष उदाहरण आहे.' },
      { id: 'AT-007', tags: ['आध्यात्मिक', 'आरोग्य'], date: '३ नोव्हेंबर २०२०', versionOf: 'AT-027', versionLabel: 'आवृत्ती १',
        aashay: 'दीर्घकालीन आनंद शोधणे, कामाचा आणि वैयक्तिक आयुष्याचा शाश्वत समतोल साधणे आणि घरात सकारात्मक वातावरण निर्माण करणे यावर भाष्य.',
        karan: 'घरात सकारात्मक व सुखी वातावरण राखण्यासाठी केलेले जाणीवपूर्वक प्रयत्न, या प्रकरणाचा गाभा आहेत.' },
      { id: 'AT-027', tags: ['आध्यात्मिक', 'आरोग्य'], date: '३ नोव्हेंबर २०२०', versionOf: 'AT-007', versionLabel: 'आवृत्ती २',
        aashay: 'दीर्घकालीन आनंद शोधणे, कामाचा आणि वैयक्तिक आयुष्याचा शाश्वत समतोल साधणे आणि घरात सकारात्मक वातावरण निर्माण करणे यावर भाष्य — याच लेखाची लेखकाने पुन्हा शब्दांकित केलेली आवृत्ती.',
        karan: 'याच लेखाची लेखकाने पुन्हा शब्दांकित केलेली आवृत्ती — घरातील सुख-समाधानाचा तोच जिव्हाळ्याचा विषय.' },
    ],
  },
  {
    key: 'ch5', num: '५', numArabic: 5,
    titleMr: 'ऋणानुबंधांचा उजेड',
    subtitleMr: 'मित्रपरिवार, सहकारी आणि सामाजिक बांधिलकी',
    desc: `रक्तपेढीतील स्वयंसेवा, संघकार्य आणि सामाजिक चळवळींमधील सहभाग — निवृत्तीनंतर लेखकाने आपली ऊर्जा समाजासाठी, मित्रपरिवारासाठी आणि सहकाऱ्यांसाठी कशी वापरली, हे या प्रकरणात दिसते.`,
    color: '#8A2E2E',
    articles: [
      { id: 'LJ-001', tags: ['चिंतन', 'सामाजिक'], date: '२१ जुलै २००१',
        aashay: 'लेखकाच्या ५६ व्या श्रावण महिन्यात लिहिलेले टिपण, ज्यात पारंपरिक श्रद्धाप्रणालीत वैज्ञानिक दृष्टिकोनाचा परिचय करून देणाऱ्या बुद्धिवादी डॉ. नरेंद्र दाभोलकर यांच्या बीएसईएस येथील व्याख्यानाचा तपशील आहे.',
        karan: 'कार्यालयातील एका विचारप्रवर्तक व्याख्यानाचा हा संदर्भ, सामाजिक जाणिवेशी असलेले ऋणानुबंध दर्शवतो.' },
      { id: 'AT-029', tags: ['जीवनप्रवास'], date: 'दिनांक नसलेला',
        aashay: 'वामनराव ओक रक्तपेढीतील स्वयंसेवी सेवा, राष्ट्रीय स्वयंसेवक संघात प्रवेश, उज्जैन येथील प्रशिक्षण (२००५) आणि स्थानिक शाखांचे व्यवस्थापन यांची नोंद.',
        karan: 'रक्तपेढीतील स्वयंसेवा आणि संघातील प्रशिक्षण-नेतृत्व, समाजाशी जोडलेल्या ऋणानुबंधांचे मूर्त रूप आहे.' },
      { id: 'LJ-008', tags: ['सामाजिक', 'धार्मिक'], date: '२५ डिसेंबर २००६',
        aashay: 'ठाण्यात गोळवलकर गुरुजी यांच्या जन्मशताब्दीनिमित्त आयोजित सामाजिक समरसतेवरील व्याख्याने आणि संघटनात्मक सत्रांचा तपशील देणारा अहवाल.',
        karan: 'सामाजिक समरसतेच्या कार्यक्रमातील सक्रिय सहभाग, सहकारी आणि समविचारी मित्रपरिवाराशी असलेले नाते अधोरेखित करतो.' },
      { id: 'LJ-033', tags: ['सामाजिक', 'धार्मिक'], date: 'दिनांक नसलेला',
        aashay: `राष्ट्रीय स्वयंसेवक संघाचे नेते गोळवलकर गुरुजींना आदरांजली वाहणारे, त्यांचे "राष्ट्र प्रथम" आणि नि:स्वार्थतेचे तत्त्वज्ञान मांडणारे सामाजिक-आध्यात्मिक टिपण.`,
        karan: 'गुरुतुल्य नेत्याला वाहिलेली आदरांजली, समाजसेवेमागील प्रेरणास्रोत उलगडून दाखवते.' },
      { id: 'AT-003', tags: ['आध्यात्मिक'], date: '२२ जून २०२५',
        aashay: 'निरोगी शरीर राखणे, मन शुद्ध ठेवणे आणि उपेक्षित घटकांच्या कल्याणासाठी सक्रियपणे काम करणे या त्रिसूत्री मार्गाची रूपरेषा.',
        karan: 'उपेक्षित घटकांच्या कल्याणासाठी सक्रिय राहण्याचा संकल्प, ऋणानुबंधांच्या उजेडाचे मार्गदर्शक सूत्र ठरतो.' },
    ],
  },
  {
    key: 'ch6', num: '६', numArabic: 6,
    titleMr: 'चिरंतन प्रकाशवाट',
    subtitleMr: 'आरोग्यभान, ग्रंथाभ्यास आणि पुढच्या पिढीला दिलेला वारसा',
    desc: `आजारपणातून सावरताना जपलेले आरोग्यभान, योग-आयुर्वेदाचा अंगीकार, आणि उपनिषदांपासून नामस्मरणापर्यंतचा ग्रंथाभ्यास — जीवनाच्या सांजवेळी शांत समाधानाकडे नेणारी ही चिरंतन प्रकाशवाट आहे.`,
    color: '#1F3B6B',
    articles: [
      { id: 'LJ-030', tags: ['जीवनप्रवास'], date: '१४ एप्रिल २०१८',
        aashay: 'लहानपणापासूनच्या दैनंदिनी लिहिण्याच्या सवयी, १९६२ मधील आजारपण आणि २०१४-१५ मधील पोटाच्या गंभीर आजाराची सविस्तर नोंद.',
        karan: 'आजारपणातून झालेले शारीरिक बरे होणे, आरोग्याकडे वळलेल्या जागरूक दृष्टिकोनाची सुरुवात दाखवते.' },
      { id: 'LJ-011', tags: ['आरोग्य', 'आध्यात्मिक'], date: '२१ जून २०१५',
        aashay: `३३ मिनिटांच्या "कॉमन योग प्रोटोकॉल"चे टप्प्याटप्प्याने सादरीकरण, ज्याची सांगता एका औपचारिक देशभक्तीपर संकल्पाने होते.`,
        karan: 'योगाभ्यासाचा नियमित अंगीकार, शांत व निरोगी उत्तरायुष्याच्या वाटचालीचा भाग आहे.' },
      { id: 'AT-025', tags: ['आरोग्य', 'आध्यात्मिक'], date: '१ जून २०२२',
        aashay: 'हलके जेवण, सकाळी उपवास आणि पोटाकडून मेंदूकडे ऊर्जा वळवण्यावर लक्ष केंद्रित करणारे आयुर्वेदिक आणि शारीरिक मार्गदर्शक.',
        karan: 'आयुर्वेदिक आहारशैली, शारीरिक व मानसिक स्वास्थ्यासाठी जपलेल्या शिस्तीचे उदाहरण आहे.' },
      { id: 'AT-023', tags: ['आध्यात्मिक', 'तात्त्विक'], date: '३ ऑक्टोबर २०१९',
        aashay: 'वेदना आणि मानवी संबंधांवर चिंतन, मानवी जीवनाचे सकाळ, दुपार आणि संध्याकाळ अशा तीन टप्प्यांत वर्गीकरण.',
        karan: 'जीवनाच्या सकाळ-दुपार-संध्याकाळ या टप्प्यांचे चिंतन, याच प्रकरणाच्या सांजवेळेच्या भावनेशी थेट जोडलेले आहे.' },
      { id: 'AT-020', tags: ['सण', 'आध्यात्मिक'], date: '१ फेब्रुवारी २००६',
        aashay: 'विनायक चतुर्थीला लिहिलेले, शारीरिक वृद्धत्व, पिढ्यांमधील अंतर आणि आंतरिक शक्तीसाठी नामस्मरणावर विसंबून राहण्याबद्दलच्या भावना मांडणारे टिपण.',
        karan: 'वृद्धत्व आणि पिढ्यांमधील अंतर स्वीकारत नामस्मरणाचा आधार घेणे, याच प्रकाशवाटेवरचे एक पाऊल आहे.' },
      { id: 'LJ-032', tags: ['आध्यात्मिक'], date: '११ ऑगस्ट २०१८',
        aashay: 'मृणालिनी देसाई यांच्या पुस्तकांच्या आधारे ईशावास्य आणि मांडुक्य उपनिषदांचा अभ्यास करण्याचा दीप अमावस्येचा संकल्प.',
        karan: 'उपनिषदांच्या अभ्यासाचा संकल्प, ग्रंथाभ्यासाकडे झालेल्या वाटचालीची सुरुवात आहे.' },
      { id: 'LJ-034', tags: ['आध्यात्मिक'], date: '११ जुलै २०१८',
        aashay: 'के. व्ही. बेलसरे यांच्या ईश्वर-साक्षात्कारावरील पुस्तकाचे परीक्षण, ज्यात समाधीच्या अवस्था आणि गोंदवलेकर महाराजांच्या शिकवणीचे विश्लेषण आहे.',
        karan: 'ईश्वरसाक्षात्काराच्या मार्गावरील चिंतन, चिरंतन प्रकाशाच्या शोधाचा एक टप्पा आहे.' },
      { id: 'AT-004', tags: ['आध्यात्मिक'], date: 'दिनांक नसलेला',
        aashay: 'ग्रंथज्ञानाचा उपयोग आचरणात आणल्याशिवाय निरर्थक आहे यावर भर देणारे आणि नामस्मरणाला अंतिम मार्ग मानणारे भक्तिमय चिंतन.',
        karan: `नामस्मरणाला अंतिम मार्ग मानणारे हे चिंतन, या चिरंतन प्रकाशवाटेचे हृदय आहे.` },
      { id: 'AT-022', tags: ['आध्यात्मिक'], date: '२४ जानेवारी २०१९',
        aashay: `कर्तव्य, सत्य आणि पूर्ण शरणागतीचा अंतर्गत आदर्श म्हणून "राम" या आध्यात्मिक संकल्पनेचा शोध.`,
        karan: 'कर्तव्य व शरणागतीचे प्रतीक असलेल्या "राम" संकल्पनेचे चिंतन, याच वाटेवरील एक महत्त्वाचा टप्पा आहे.' },
      { id: 'AT-031', tags: ['आरोग्य', 'आध्यात्मिक'], date: 'दिनांक नसलेला',
        aashay: 'वृद्धत्व, आजारपण आणि मृत्यूची भीती दूर करण्यासाठी सकारात्मक दृष्टिकोनासह तयार केलेली एक मार्गदर्शित शिथिलीकरण पद्धती.',
        karan: 'वृद्धत्व व मृत्युभयावर मात करणारी शिथिलीकरण पद्धती, शांत सांजवेळेची तयारी दर्शवते.' },
    ],
  },
  {
    key: 'appendix', num: 'परिशिष्ट', numArabic: 7, isAppendix: true,
    titleMr: 'शाश्वत तत्त्वज्ञानाचा संग्रह',
    subtitleMr: 'आध्यात्मिक सोबती',
    desc: `या परिशिष्टात निव्वळ तात्विक निबंध, धर्मशास्त्रीय मार्गदर्शक तत्त्वे आणि सांस्कृतिक कविता एकत्रित केल्या आहेत. या मजकुरात वैयक्तिक प्रसंगांचे तपशील नाहीत, तर ते लेखकाच्या विचारसरणीला सतत माहिती देणारे सखोल बौद्धिक आणि सामाजिक-धार्मिक चौकट म्हणून काम करतात.`,
    color: '#8A5A0A',
    articles: [
      { id: 'AT-002', tags: ['धर्मशास्त्रीय'], date: 'दिनांक नसलेला',
        aashay: 'अहंकार सोडून आत्मसाक्षात्कार मिळवण्याचा पुरस्कार करत, विज्ञान आणि उपनिषदांसोबत वैदिक सनातन धर्माचे एकत्रीकरण शोधते.',
        karan: 'कोणताही वैयक्तिक तपशील नसलेले हे निव्वळ शैक्षणिक आणि धर्मशास्त्रीय विश्लेषण असल्याने येथे ठेवले आहे.' },
      { id: 'AT-006', tags: ['देशभक्तीपर', 'काव्य'], date: 'दिनांक नसलेला',
        aashay: `एका "हिंदू बांधवाला" उद्देशून लिहिलेली सांस्कृतिक, देशभक्तीपर कविता — पहिला भाग, जी हिंदू संस्कृतीच्या ऐतिहासिक लवचिकतेचा गौरव करते.`,
        karan: 'ही आत्मचरित्रात्मक नोंद नसून एक सर्जनशील आणि प्रतीकात्मक सामाजिक-धार्मिक कविता असल्याने येथे वर्गीकृत केली आहे.' },
      { id: 'AT-028', tags: ['देशभक्तीपर', 'काव्य'], date: 'दिनांक नसलेला',
        aashay: `एका "हिंदू बांधवाला" उद्देशून लिहिलेली सांस्कृतिक, देशभक्तीपर कविता — पुढील भाग, जी हिंदू संस्कृतीच्या ऐतिहासिक लवचिकतेचा गौरव करते.`,
        karan: 'ही आत्मचरित्रात्मक नोंद नसून एक सर्जनशील आणि प्रतीकात्मक सामाजिक-धार्मिक कविता असल्याने येथे वर्गीकृत केली आहे.' },
      { id: 'AT-008', tags: ['धर्मशास्त्रीय'], date: 'दिनांक नसलेला',
        aashay: 'आत्मसाक्षात्काराचे नियम सांगून, सत्संग, स्मरण आणि सेवा याभोवतीचा मार्ग तयार करते.',
        karan: 'गुरूंच्या मार्गदर्शनाखालील भक्तीची संपूर्णतः सामान्य धर्मशास्त्रीय प्रणाली हे तयार करते.' },
      { id: 'AT-009', tags: ['धर्मशास्त्रीय'], date: 'दिनांक नसलेला',
        aashay: 'नि:स्वार्थ प्रेम पसरवणाऱ्या आणि सर्व परिस्थितीत मनाची खोल शांतता राखणाऱ्या खऱ्या आध्यात्मिक साधकाची लक्षणे स्पष्ट करते.',
        karan: 'कोणतीही दैनंदिनी नोंद नसलेला, आध्यात्मिक विकासाचा एक अमूर्त, तात्विक मार्गदर्शक म्हणून लिहिलेला लेख.' },
      { id: 'AT-010', tags: ['भक्तिपर'], date: 'दिनांक नसलेला',
        aashay: 'रामनामाचे सततचे स्मरण मन शुद्ध करते, शाश्वत आनंद देते आणि भौतिक इच्छा कमी करण्यास मदत करते, असा युक्तिवाद यात मांडला आहे.',
        karan: 'वैयक्तिक कालक्रमाचा कोणताही उल्लेख नसलेले हे निव्वळ सामान्य भक्तिपर प्रवचन असल्याने येथे समाविष्ट केले आहे.' },
      { id: 'AT-011', tags: ['तात्त्विक'], date: 'दिनांक नसलेला',
        aashay: 'ईश्वराच्या निर्मितीचे परिपूर्ण आणि तात्पुरते स्वरूप सांगून मानवांना निसर्गाशी सुसंगत राहण्याचा सल्ला देते.',
        karan: 'कोणत्याही आत्मचरित्रात्मक नोंदीशिवाय अनित्यतेवर केलेले हे सामान्य तात्विक चिंतन आहे.' },
      { id: 'AT-018', tags: ['तात्त्विक', 'काव्य'], date: '३ जून २००४',
        aashay: 'संतांचे कौतुक करणारी मराठी कविता आणि ध्यान पद्धतीचा वापर करून अंतर्मुख होण्यावर स्वामी विवेकानंदांच्या व्याख्यानांतील विचारांचे संकलन.',
        karan: 'वैयक्तिक वर्णनाशिवाय अनेक सामान्य आध्यात्मिक मजकूर आणि स्वामी विवेकानंदांच्या अवतरणांना एकत्र जोडते.' },
      { id: 'AT-021', tags: ['आध्यात्मिक', 'प्रवचन'], date: '१५ सप्टेंबर २०१८',
        aashay: 'वेदान्तिक नि:स्वार्थतेला नागरी कर्तव्याशी जोडणारा अत्यंत सविस्तर मजकूर, ज्यात लोकांची सेवा करणे म्हणजेच देवाची पूजा करणे आहे हे स्पष्ट केले आहे.',
        karan: 'वैयक्तिक नोंदींशिवाय नागरिकत्व आणि वैश्विक व्यवस्थेवर लिहिलेला हा एक व्यापक सामाजिक-आध्यात्मिक निबंध आहे.' },
      { id: 'AT-024', tags: ['आध्यात्मिक'], date: '३ ऑक्टोबर २०२१',
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
<meta name="description" content="${esc(BOOK.titleMr)} · ${esc(BOOK.subtitleMr)} — ${esc(BOOK.author)}">
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
(function initTheme(){
  var root = document.documentElement;
  var btn = document.getElementById('themeToggle');
  if (!btn) { if (document.readyState !== 'complete') { window.addEventListener('DOMContentLoaded', initTheme); } return; }
  function sync(){ btn.textContent = root.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙'; }
  sync();
  btn.addEventListener('click', function(){
    var goingDark = root.getAttribute('data-theme') !== 'dark';
    if (goingDark) { root.setAttribute('data-theme', 'dark'); } else { root.removeAttribute('data-theme'); }
    try { localStorage.setItem('lj-theme', goingDark ? 'dark' : 'light'); } catch (e) {}
    sync();
  });
})();

(function initChapterToggles(){
  var heads = document.querySelectorAll('.chapter-head');
  heads.forEach(function(head){
    function toggle(){
      var card = head.closest('.chapter-card');
      var expanded = card.classList.toggle('is-expanded');
      head.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    }
    head.addEventListener('click', toggle);
    head.addEventListener('keydown', function(e){
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  });
})();

(function initTagFilter(){
  var pills = document.querySelectorAll('.tagpill');
  if (!pills.length) return;
  var items = document.querySelectorAll('.toc-item');
  var cards = document.querySelectorAll('.chapter-card');
  function apply(tag){
    pills.forEach(function(p){ p.classList.toggle('is-active', p.getAttribute('data-tag') === tag); });
    items.forEach(function(li){
      var tags = (li.getAttribute('data-tags') || '').split('|');
      li.hidden = !!tag && tags.indexOf(tag) === -1;
    });
    cards.forEach(function(card){
      var visible = card.querySelectorAll('.toc-item:not([hidden])').length > 0;
      card.hidden = !visible;
    });
  }
  pills.forEach(function(p){
    p.addEventListener('click', function(){
      var tag = p.getAttribute('data-tag') || '';
      var already = p.classList.contains('is-active') && tag !== '';
      apply(already ? '' : tag);
    });
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

function renderTagCloud() {
  const counts = {};
  flat.forEach(({ article }) => {
    article.tags.forEach((t) => { counts[t] = (counts[t] || 0) + 1; });
  });
  const max = Math.max(...Object.values(counts));
  const tierOf = (n) => (n >= max * 0.7 ? 4 : n >= max * 0.45 ? 3 : n >= max * 0.2 ? 2 : 1);
  const tags = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
  return `<button type="button" class="tagpill tagpill-all is-active" data-tag="">सर्व</button>` +
    tags.map((t) => `<button type="button" class="tagpill tagpill-${tierOf(counts[t])}" data-tag="${esc(t)}">#${esc(t)} <span class="tagpill-count">${counts[t]}</span></button>`).join('');
}

function chapterNavLinks() {
  return CHAPTERS.map((ch) => `<a href="#${ch.key}" class="qn-link" style="--c:${ch.color}">${esc(ch.num)}</a>`).join('');
}

function tagChips(tags) {
  return tags.map((t) => `<span class="tag">#${esc(t)}</span>`).join(' ');
}

function tocChapterCard(ch) {
  const items = ch.articles.map((a) => {
    const versionBadge = a.versionLabel ? `<span class="tag tag-version">${esc(a.versionLabel)}</span>` : '';
    return `<li class="toc-item" data-tags="${esc(a.tags.join('|'))}">
      <a class="toc-link" href="articles/${a.id}.html">${esc(chapterArticleTitle(a))}</a>
      <div class="toc-meta">
        ${tagChips(a.tags)}
        <span class="dot">·</span>
        <span class="date">${esc(a.date)}</span>
        ${versionBadge}
      </div>
      <p class="toc-aashay">${esc(a.aashay)}</p>
    </li>`;
  }).join('\n');

  const numBadge = ch.isAppendix ? 'प.' : ch.num;

  return `<section id="${ch.key}" class="chapter-card" style="--c:${ch.color}">
    <div class="chapter-head" role="button" tabindex="0" aria-expanded="false">
      <div class="chapter-num">${esc(numBadge)}</div>
      <div class="chapter-titles">
        <h3 class="chapter-title">${ch.isAppendix ? '' : `प्रकरण ${esc(ch.num)}: `}${esc(ch.titleMr)}</h3>
        <p class="chapter-sub">${esc(ch.subtitleMr)}</p>
      </div>
      <span class="chapter-chevron" aria-hidden="true">▾</span>
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
    <p class="cover-subtitle">${esc(BOOK.subtitleMr)}</p>
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
      <div class="stat"><span class="stat-num">८१</span><span class="stat-label">प्रवास चालू...</span></div>
    </div>
    <p class="editor-note">${esc(BOOK.editorNote)}</p>
  </section>

  <section id="tags" class="tagcloud">
    <h2 class="section-label">टॅगनुसार शोधा</h2>
    <p class="tagcloud-hint">एखादा टॅग निवडला की खालील अनुक्रमणिकेत तेवढेच लेख उरतील. पुन्हा तोच टॅग किंवा "सर्व" दाबून यादी पूर्ववत होईल.</p>
    <div class="tagcloud-cloud">${renderTagCloud()}</div>
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
  const html = shell({ title: `${BOOK.titleMr} — ${BOOK.subtitleMr}`, bodyClass: 'home', content });
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

<main class="art-page" style="--c:${chapter.color}">
  <p class="art-breadcrumb">${esc(chapterLabel)}</p>
  <h1 class="art-title">${esc(title)}</h1>
  <div class="art-badges">
    ${tagChips(article.tags)}
    <span class="dot">·</span>
    <span class="date">${esc(article.date)}</span>
    <span class="dot">·</span>
    <span class="art-id">${esc(article.id)}</span>
  </div>

  <aside class="art-context">
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
