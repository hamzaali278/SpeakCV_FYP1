# SpeakCV
SpeakCV, is basically an automatic CV generating app which will help any Urdu speaking user in making a professional CV.
The user will answer a few questions in Urdu and speech data will be recorded in phone. The data is then preprocessed and
sent to a speaker independent ASR for speech recognition. The Urdu words are then translated to English. Our app will then
use CV specific data and display it on a template.

# Architecture used
DeepSpeech2

# Dependencies
!pip install pympler\
!pip install python_speech_features\
!pip install aubio\
!pip install kenlm\
!pip install soundfile\
!pip uninstall tensorflow tensorflow-gpu protocol --yes\
!pip install tensorflow-gpu==1.14.0\
!pip install keras==2.2.0

# Getting Started with Create React App

## Requirements:

- Node >=12.6.1
- Node Package Manager(npm) >=6.13.4
 Clone the repo locally.
- Install the required packages for server side by running `npm install` in the main directory for backend
In the project directory, you can run:

Runs the app in the development mode by running `npm start` on comand prompt
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.




