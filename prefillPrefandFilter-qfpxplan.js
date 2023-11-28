// ==UserScript==
// @name         QFP - Xplan Default No Preferences and Filters
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Default all options within the Preferences and Filters on QFP - Xplan
// @author       Kira https://github.com/Joshua-Noakes1
// @match        https://quilter.xplan-mortgage.iress.co.uk/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=iress.co.uk
// @grant        none
// @updateURL    https://raw.githubusercontent.com/Mortgage-Steps/scripts/main/prefillPrefandFilter-qfpxplan.js
// @downloadURL  https://raw.githubusercontent.com/Mortgage-Steps/scripts/main/prefillPrefandFilter-qfpxplan.js
// ==/UserScript==

function checkAndSetPref(pref) {
    try {
        console.log(`[QFP (Script)] Setting ${pref.id} to "No"`);
        if (pref.value == '') { // if the value is empty, set it to "No"; A user most likely hasn't set it yet
            pref.value = '0';
        }
        return true;
    } catch (err) {
        console.error(`[QFP (Script) - Error] ${err}`);
        return false;
    }
}

(function () {
    'use strict';
    // Wait for the page to fully load or we get stuck with a "Loading..." screen
    window.addEventListener('load', function () {
        try {
            // we need to ensure that spash screen is gone
            let splashGone = false;
            let scriptFinished = false;
            setInterval(() => {
                if (this.document.getElementById('apply_preferences_btn') != null) {
                    if (!splashGone) console.log('[QFP (Script)] Splash screen is gone');
                    splashGone = true;
                }


                if (splashGone && !scriptFinished) {
                    // ensure we are on a P&F page
                    let pageURL = new URL(window.location.href);
                    if (pageURL.origin !== 'https://quilter.xplan-mortgage.iress.co.uk' && (!pageURL.href?.toString().includes('/#/') && !pageURL.href?.toString().includes('/preferences'))) {
                        console.log('[QFP (Script) - Error] Not on a P&F page');
                        return;
                    }

                    // loop over all of the pref dropdown and select no
                    for (let i = 0; i <= 17; i++) {
                        let init_pref = document.getElementById(`initialPref_${i}`);
                        let agree_pref = document.getElementById(`agreedPref_${i}`);
                        checkAndSetPref(init_pref);
                        checkAndSetPref(agree_pref);
                    }
                    console.log('[QFP (Script)] All preferences set to "No"');

                    scriptFinished = true;
                }
            }, 1000);
        } catch (err) {
            console.error(`[QFP (Script) - Error] ${err}`);
            alert(`[QFP (Script) - Error] ${err}`);
        }

    }, false);
})();