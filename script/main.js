// start music and animation when user interacts with the page
let musicStarted = false;
let audioElement = null;

function initializeAudio() {
    audioElement = document.querySelector('.song');
    if (!audioElement) {
        console.error('Audio element not found!');
        return false;
    }
    
    // Set audio properties
    audioElement.loop = true;
    audioElement.volume = 0.7; // Set volume to 70%
    
    // Check if audio file exists
    audioElement.addEventListener('error', (e) => {
        console.error('Audio file error:', e);
        showError('Audio file not found. Please check if hbd.mp3 exists in the music folder.');
    });
    
    return true;
}

function startBirthdayExperience() {
    if (musicStarted) return;
    musicStarted = true;
    
    if (!audioElement) {
        if (!initializeAudio()) {
            showError('Audio system not available');
            animationTimeline();
            return;
        }
    }
    
    // Try to play audio
    const playPromise = audioElement.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log('Music started successfully!');
            // Stop audio after 1 minute and 15 seconds (75 seconds)
            setTimeout(() => {
                audioElement.pause();
                audioElement.currentTime = 0; // Reset to beginning
                console.log('Music stopped after 1min 15sec');
            }, 75000); // 75 seconds = 1 minute 15 seconds
        }).catch(error => {
            console.log('Autoplay prevented:', error);
            showMusicButton();
        });
    }
    
    animationTimeline();
}

function showMusicButton() {
    const button = document.createElement('button');
    button.innerHTML = '🎵 Start Birthday Music 🎵';
    button.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #ff69b4;
        color: white;
        border: none;
        padding: 15px 30px;
        font-size: 18px;
        border-radius: 25px;
        cursor: pointer;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        font-family: 'Poppins', sans-serif;
    `;
    
    button.addEventListener('click', () => {
        if (audioElement) {
            audioElement.play().then(() => {
                console.log('Music started via button!');
                // Stop audio after 1 minute and 15 seconds (75 seconds)
                setTimeout(() => {
                    audioElement.pause();
                    audioElement.currentTime = 0;
                }, 75000);
            }).catch(error => {
                console.error('Failed to play audio:', error);
                showError('Could not play audio. Please check your browser settings.');
            });
        }
        button.remove();
        if (!musicStarted) {
            animationTimeline();
        }
    });
    
    document.body.appendChild(button);
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.innerHTML = `⚠️ ${message}`;
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #ff6b6b;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        z-index: 1001;
        font-family: 'Poppins', sans-serif;
    `;
    document.body.appendChild(errorDiv);
    
    // Remove error after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 5000);
}

// Initialize when page loads
window.addEventListener('load', () => {
    console.log('Page loaded, initializing birthday experience...');
    initializeAudio();
    startBirthdayExperience();
});

// Also try to start on any user interaction
document.addEventListener('click', startBirthdayExperience);
document.addEventListener('keydown', startBirthdayExperience);
document.addEventListener('touchstart', startBirthdayExperience);


// animation timeline
const animationTimeline = () => {
    // split chars that needs to be animated individually
    const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
    const hbd = document.getElementsByClassName("wish-hbd")[0];

    textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
        .split("")
        .join("</span><span>")}</span>`;

    hbd.innerHTML = `<span>${hbd.innerHTML
        .split("")
        .join("</span><span>")}</span>`;

    const ideaTextTrans = {
        opacity: 0,
        y: -20,
        rotationX: 5,
        skewX: "15deg"
    }

    const ideaTextTransLeave = {
        opacity: 0,
        y: 20,
        rotationY: 5,
        skewX: "-15deg"
    }

    // timeline
    const tl = new TimelineMax();

    tl.to(".container", 0.6, {
        visibility: "visible"
    })
    .from(".one", 0.7, {
        opacity: 0,
        y: 10
    })
    .from(".two", 0.4, {
        opacity: 0,
        y: 10
    })
    .to(".one",
        0.7,
        {
            opacity: 0,
            y: 10
        },
    "+=3.5")
    .to(".two",
        0.7,
        {
            opacity: 0,
            y: 10
        },
    "-=1")
    .from(".three", 0.7, {
        opacity: 0,
        y: 10
    })
    .to(".three",
        0.7,
        {
            opacity: 0,
            y: 10
        },
    "+=3")
    .from(".four", 0.7, {
        scale: 0.2,
        opacity: 0,
    })
    .from(".fake-btn", 0.3, {
        scale: 0.2,
        opacity: 0,
    })
    .staggerTo(
        ".hbd-chatbox span",
        1.5, {
            visibility: "visible",
        },
        0.05
    )
    .to(".fake-btn", 0.1, {
        backgroundColor: "rgb(127, 206, 248)",
    },
    "+=4")
    .to(
        ".four",
        0.5, {
            scale: 0.2,
            opacity: 0,
            y: -150
        },
    "+=1")
    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-2", 0.7, ideaTextTrans)
    .to(".idea-2", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-3", 0.7, ideaTextTrans)
    .to(".idea-3 strong", 0.5, {
        scale: 1.2,
        x: 10,
        backgroundColor: "rgb(21, 161, 237)",
        color: "#fff",
    })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-4", 0.7, ideaTextTrans)
    .to(".idea-4", 0.7, ideaTextTransLeave, "+=2.5")
    .from(
        ".idea-5",
        0.7, {
            rotationX: 15,
            rotationZ: -10,
            skewY: "-5deg",
            y: 50,
            z: 10,
            opacity: 0,
        },
        "+=1.5"
    )
    .to(
        ".idea-5 span",
        0.7, {
            rotation: 90,
            x: 8,
        },
        "+=1.4"
    )
    .to(
        ".idea-5",
        0.7, {
            scale: 0.2,
            opacity: 0,
        },
        "+=2"
    )
    .staggerFrom(
        ".idea-6 span",
        0.8, {
            scale: 3,
            opacity: 0,
            rotation: 15,
            ease: Expo.easeOut,
        },
        0.2
    )
    .staggerTo(
        ".idea-6 span",
        0.8, {
            scale: 3,
            opacity: 0,
            rotation: -15,
            ease: Expo.easeOut,
        },
        0.2,
        "+=1.5"
    )
    .staggerFromTo(
        ".baloons img",
        2.5, {
            opacity: 0.9,
            y: 1400,
        }, {
            opacity: 1,
            y: -1000,
        },
        0.2
    )
    .from(
        ".profile-picture",
        0.5, {
            scale: 3.5,
            opacity: 0,
            x: 25,
            y: -25,
            rotationZ: -45,
        },
        "-=2"
    )
    .from(".hat", 0.5, {
        x: -100,
        y: 350,
        rotation: -180,
        opacity: 0,
    })
    .staggerFrom(
        ".wish-hbd span",
        0.7, {
            opacity: 0,
            y: -50,
            // scale: 0.3,
            rotation: 150,
            skewX: "30deg",
            ease: Elastic.easeOut.config(1, 0.5),
        },
        0.1
    )
    .staggerFromTo(
        ".wish-hbd span",
        0.7, {
            scale: 1.4,
            rotationY: 150,
        }, {
            scale: 1,
            rotationY: 0,
            color: "#ff69b4",
            ease: Expo.easeOut,
        },
        0.1,
        "party"
    )
    .from(
        ".wish h5",
        0.5, {
            opacity: 0,
            y: 10,
            skewX: "-15deg",
        },
        "party"
    )
    .staggerTo(
        ".eight svg",
        1.5, {
            visibility: "visible",
            opacity: 0,
            scale: 80,
            repeat: 3,
            repeatDelay: 1.4,
        },
        0.3
    )
    .to(".six", 0.5, {
        opacity: 0,
        y: 30,
        zIndex: "-1",
    })
    .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
    .to(
        ".last-smile",
        0.5, {
            rotation: 90,
        },
        "+=1"
    );

    // Restart Animation on click
    const replyBtn = document.getElementById("replay");
    replyBtn.addEventListener("click", () => {
        tl.restart();
    });
}
