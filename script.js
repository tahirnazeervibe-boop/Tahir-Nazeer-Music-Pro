// جیسے ہی یوزر اسکرین پر کہیں بھی پہلا ٹچ یا کلک کرے گا، آواز شروع ہو جائے گی
document.body.addEventListener('click', function() {
    
    const musicBars = document.getElementById('music-bars');

    // اباؤٹ سیکشن کی کہانی ڈائیلاگ اسٹائل میں بولنا
    if (!window.speechSynthesis.speaking) {
        const storyElement = document.getElementById('story-paragraph');
        if (storyElement) {
            const storyText = storyElement.innerText;
            const speech = new SpeechSynthesisUtterance(storyText);
            
            // سسٹم سے بہترین اردو/ہندی آواز تلاش کرنا
            const voices = window.speechSynthesis.getVoices();
            for (let i = 0; i < voices.length; i++) {
                if (voices[i].lang.includes('ur') || voices[i].lang.includes('hi')) {
                    if (voices[i].name.toLowerCase().includes('male') || voices[i].name.toLowerCase().includes('google')) {
                        speech.voice = voices[i];
                        break;
                    }
                }
            }
            
            speech.rate = 0.88; // پروقار فلمی رفتار
            speech.pitch = 1.0;  // کڑک مردانہ آواز
            
            // جیسے ہی آواز شروع ہو، لہروں کی اینیمیشن آن کر دیں
            speech.onstart = function() {
                if (musicBars) {
                    musicBars.classList.add('playing');
                }
            };

            // جیسے ہی آواز ختم ہو، لہروں کی اینیمیشن روک دیں
            speech.onend = function() {
                if (musicBars) {
                    musicBars.classList.remove('playing');
                }
            };
            
            window.speechSynthesis.speak(speech);
        }
    }
}, { once: true }); // ایک بار کلک پر ایک ہی بار چلے گا

window.speechSynthesis.onvoiceschanged = function() {
    window.speechSynthesis.getVoices();
};
