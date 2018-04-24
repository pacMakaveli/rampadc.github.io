var cdn = {
    host: "https://twxen.innogamescdn.com",
    tiles: {
        "/img/tiles/day/bfortress.png": "39fb379ddc",
        "/img/tiles/day/border.png": "3068d208ba",
        "/img/tiles/day/btown01.png": "62391314e8",
        "/img/tiles/day/btown02.png": "67e3c5069b",
        "/img/tiles/day/btown03.png": "eece0ae6f5",
        "/img/tiles/day/btown04.png": "a8b5510f58",
        "/img/tiles/day/btown05.png": "bdb30bf4b0",
        "/img/tiles/day/btown06.png": "5be21829d8",
        "/img/tiles/day/desert-0.png": "42015ff563",
        "/img/tiles/day/desert-1.png": "02e4de6d04",
        "/img/tiles/day/desert-2.png": "fb3c46167b",
        "/img/tiles/day/desert-3.png": "59eb3993eb",
        "/img/tiles/day/desert-4.png": "ac18f42be8",
        "/img/tiles/day/desert-5.png": "9eed7c75bb",
        "/img/tiles/day/gras-0.png": "d5fa422d6b",
        "/img/tiles/day/gras-1.png": "a97a937658",
        "/img/tiles/day/gras-2.png": "d41f359023",
        "/img/tiles/day/gras-3.png": "7083e9de33",
        "/img/tiles/day/gras-4.png": "00ee67f2f1",
        "/img/tiles/day/gras-5.png": "42cfd4b1fb",
        "/img/tiles/day/hover.png": "ea8e50d64e",
        "/img/tiles/day/invite-friend.png": "8ba7142b10",
        "/img/tiles/day/noob-protection.png": "578d52b7ba",
        "/img/tiles/day/production-boost.png": "0c0c09de80",
        "/img/tiles/day/second-village-effect.png": "5f190704b0",
        "/img/tiles/day/second-village-hourglass-effect.png": "092df9122b",
        "/img/tiles/day/second-village.png": "4010fc9f08",
        "/img/tiles/day/selected-village.png": "43bc0a83c7",
        "/img/tiles/day/fortress.png": "dde34c29ae",
        "/img/tiles/day/town01.png": "e834567f99",
        "/img/tiles/day/town02.png": "1f8f51bd89",
        "/img/tiles/day/town03.png": "dc14a4c3aa",
        "/img/tiles/day/town04.png": "98866609bd",
        "/img/tiles/day/town05.png": "e0b5fb29d5",
        "/img/tiles/day/town06.png": "551fcef300",
        "/img/tiles/day/tree-1.png": "1fc30c498f",
        "/img/tiles/day/tree-2.png": "69445f8ea6",
        "/img/tiles/day/tree-3.png": "55202dad0e",
        "/img/tiles/day/tree-4.png": "66cd824b53",
        "/img/tiles/day/village-locator-pointer.png": "b1e4cc35bf",
        "/img/tiles/day/village-locator.png": "eb0673183e",
        "/img/tiles/day/village-mask.png": "6147a298d0",
        "/img/tiles/day/waste-0.png": "cac02d10cb",
        "/img/tiles/day/waste-1.png": "9ce557a648",
        "/img/tiles/day/waste-2.png": "68bce25f2c",
        "/img/tiles/day/waste-3.png": "30dc58560f",
        "/img/tiles/day/waste-4.png": "8faa3df440",
        "/img/tiles/day/waste-5.png": "873b3742c0"
    }
};

function getTilesURLs() {
    var str = "";
    for(var urlPath in cdn.tiles) {
        str += tiles_urlSplitCombine(cdn.host, urlPath, cdn.tiles[urlPath]) + "\n";
    }

    download("tilesLink.txt", str);
}

function tiles_urlSplitCombine(host, path, value) {
    var a = path.split(".");
    a = host + a[0] + "_" + value + "." + a[1];
    return a;
}