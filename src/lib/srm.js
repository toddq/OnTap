const colormap = [
    {srm: 1, hex: '#FFE699'},
    {srm: 2, hex: '#FFD878'},
    {srm: 3, hex: '#FFCA5A'},
    {srm: 4, hex: '#FFBF42'},
    {srm: 5, hex: '#FBB123'},
    {srm: 6, hex: '#F8A600'},
    {srm: 7, hex: '#F39C00'},
    {srm: 8, hex: '#EA8F00'},
    {srm: 9, hex: '#E58500'},
    {srm: 10, hex: '#DE7C00'},
    {srm: 11, hex: '#D77200'},
    {srm: 12, hex: '#CF6900'},
    {srm: 13, hex: '#CB6200'},
    {srm: 14, hex: '#C35900'},
    {srm: 15, hex: '#BB5100'},
    {srm: 16, hex: '#B54C00'},
    {srm: 17, hex: '#B04500'},
    {srm: 18, hex: '#A63E00'},
    {srm: 19, hex: '#A13700'},
    {srm: 20, hex: '#9B3200'},
    {srm: 21, hex: '#952D00'},
    {srm: 22, hex: '#8E2900'},
    {srm: 23, hex: '#882300'},
    {srm: 24, hex: '#821E00'},
    {srm: 25, hex: '#7B1A00'},
    {srm: 26, hex: '#771900'},
    {srm: 27, hex: '#701400'},
    {srm: 28, hex: '#6A0E00'},
    {srm: 29, hex: '#660D00'},
    {srm: 30, hex: '#5E0B00'},
    {srm: 31, hex: '#5A0A02'},
    {srm: 32, hex: '#600903'},
    {srm: 33, hex: '#520907'},
    {srm: 34, hex: '#4C0505'},
    {srm: 35, hex: '#470606'},
    {srm: 36, hex: '#440607'},
    {srm: 37, hex: '#3F0708'},
    {srm: 38, hex: '#3B0607'},
    {srm: 39, hex: '#3A070B'},
    {srm: 40, hex: '#36080A'}
]

export default {
    toHex (srm) {
        for (let color of colormap) {
            if (color.srm === srm) {
                return color.hex
            }
        }
    }
}
