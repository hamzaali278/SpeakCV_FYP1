# SpeakCV
Our application, SpeakCV, is basically an automatic CV generating app which will help any Urdu speaking user in making a professional CV. The user will answer a few questions in Urdu and speech data will be recorded in phone. The data is then preprocessed and sent to a speaker independent ASR for speech recognition. The Urdu words are then translated to English. Our app will then use CV specific data and display it on a template.
# Architecture used
DeepSpeech2

# Dependencies
!pip install pympler
!pip install python_speech_features
!pip install aubio
!pip install kenlm
!pip install soundfile
!pip uninstall tensorflow tensorflow-gpu protocol --yes
!pip install tensorflow-gpu==1.14.0
!pip install keras==2.2.0

# Getting Started with Create React App

In the project directory, you can run:

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


