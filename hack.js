const debugLog = false

// see https://gist.github.com/thorsten/148812e9cc4fb6a19215ce22afd4e5a8
// other see https://stackoverflow.com/questions/23202136/changing-navigator-useragent-using-chrome-extension
function setPlatform(window, platform) {
    // Works on Firefox, Chrome, Opera and IE9+
    if (navigator.__defineGetter__) {
        if (debugLog) {
            console.log("use navigator.__defineGetter__")
        }
        navigator.__defineGetter__('platform', function () {
            return platform;
        });
    } else if (Object.defineProperty) {
        if (debugLog) {
            console.log("use Object.defineProperty")
        }
        Object.defineProperty(navigator, 'platform', {
            get: function () {
                return platform;
            }
        });
    }
    // Works on Safari
    if (window.navigator.platform !== platform) {
        if (debugLog) {
            console.log("detect window.navigator.platform !== platform")
        }

        var platformProp = {
            get: function () {
                return platform;
            }
        };
        try {
            Object.defineProperty(window.navigator, 'platform', platformProp);
        } catch (e) {
            window.navigator = Object.create(navigator, {
                platform: platformProp
            });
        }
    }
}

// see https://stackoverflow.com/questions/23202136/changing-navigator-useragent-using-chrome-extension
(function () {
    // Get the correct platform for navigator.userAgent
    var candidates = ["Android", "iPhone", "iPod", "iPad"];
    var modifiedPlatform;
    for (var maybe of candidates) {
        if (navigator.userAgent.match(maybe)) {
            modifiedPlatform = maybe;
            break;
        }
    }
    if (debugLog) {
        console.log("read navigator.userAgent is", navigator.userAgent)
    }
    if (!modifiedPlatform) {
        return;
    }
    if (debugLog) {
        console.log("set navigator.platform to", modifiedPlatform)
    }
    setPlatform(window, modifiedPlatform)
})();