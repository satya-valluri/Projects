var RTCPeerConnection = window.webkitRTCPeerConnection || window.mozRTCPeerConnection;

const getip = async () => {

    let localip = ""

    if (RTCPeerConnection) {
        var rtc = new RTCPeerConnection({ iceServers: [] });
        if (1 || window.mozRTCPeerConnection) {
            rtc.createDataChannel('', { reliable: false });
        }

        rtc.onicecandidate = (evt) => {
            if (evt.candidate) {
                grepSDP("a=" + evt.candidate.candidate)
            }
        }

        rtc.createOffer(
            (offerDesc) => {
                grepSDP(offerDesc.sdp);
                rtc.setLocalDescription(offerDesc)
            },
            (e) => {
                console.warn("offer failed", e);
            }
        )

        function grepSDP(sdp) {
            sdp.split('\r\n').forEach(function (line) {
                if (~line.indexOf("a=candidate")) {
                    const parts = line.split(' '),
                        addr = parts[4],
                        type = parts[7];
                    if (type === 'host')
                        updateDisplay(addr);
                }
                else if (~line.indexOf("c=")) {
                    const parts = line.split(' '),
                        addr = parts[2];
                    updateDisplay(addr);
                }
            });
        }

        var addrs = Object.create(null);
        addrs["0.0.0.0"] = false;
        const updateDisplay = (newAddr) => {
            if (newAddr in addrs) return;
            else addrs[newAddr] = true;
            var displayAddrs = Object.keys(addrs).filter((k) => (addrs[k]))
            //return displayAddrs;
            //cbfn(displayAddrs);
            localip = displayAddrs;
        }
    }
    
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve(localip)
        }, 2000)
    });
}

export default getip;