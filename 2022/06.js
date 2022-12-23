function getMarker(markerLength) {
    const input = document.body.textContent.trim();
    for(let i = markerLength; i < input.length; i++) {
        const slice = input.slice(i - markerLength, i);
        if([...new Set([...slice])].length === markerLength)
            return i;
    }
}

// 5.1
getMarker(4);
// 1140

// 5.2
getMarker(14);
// 3495
