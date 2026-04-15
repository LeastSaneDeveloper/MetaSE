import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { getRandom as getRandomUserAgent } from "random-useragent";

function getRandomHeaders() {
    return {
        "User-Agent": getRandomUserAgent(),
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Connection": "keep-alive",
        "Referer": "https://www.google.com/",
        "Upgrade-Insecure-Requests": "1",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-User": "?1",
    };
}

function randomDelay(min = 60, max = 100) {
    return new Promise(resolve => setTimeout(resolve, Math.random() * (max - min) + min));
}

async function fetchHtml(url, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const res = await fetch(url, { headers: getRandomHeaders() });
            if (res.status === 403 || res.status === 429) {
                await randomDelay(1000, 3000);
                continue;
            }
            return await res.text();
        } catch {
            await randomDelay(500, 1500);
        }
    }
    throw new Error(`Failed to fetch ${url}`);
}

// Mojeek

async function getMojeekSearchPageUrl(query, page = 1) {
    const baseUrl = `https://www.mojeek.com/search?q=${encodeURIComponent(query)}`;
    if (page === 1) return baseUrl;

    const html = await fetchHtml(baseUrl);
    const $ = cheerio.load(html);

    const paginationLinks = $(".pagination a")
        .map((_, el) => $(el).attr("href"))
        .get()
        .filter(href => href && href !== "Next");

    if (!paginationLinks[page - 1]) throw new Error("Page not found or blocked");

    return `https://www.mojeek.com${paginationLinks[page - 1]}`;
}

async function parseMojeekPage(query, page) {
    const url = await getMojeekSearchPageUrl(query, page);
    const html = await fetchHtml(url);
    const $ = cheerio.load(html);

    const links = $("a.title").toArray();
    const paragraphs = $("p.s").toArray();
    const length = Math.min(links.length, paragraphs.length);

    return await Promise.all(
        Array.from({ length }, async (_, i) => {
            await randomDelay();
            return {
                type: "search",
                link: $(links[i]).attr("href"),
                title: $(links[i]).text().trim(),
                description: $(paragraphs[i]).html()
            };
        })
    );
}

async function* scrapeMojeekSearchAsync(query, maxPages = 3) {
    for (let i = 1; i <= maxPages; i++) {
        const items = await parseMojeekPage(query, i);
        for (const item of items) yield item;
    }
}

// Bing

async function scrapeBingImages(query) {
    const html = await fetchHtml(`https://www.bing.com/images/search?q=${encodeURIComponent(query)}`);
    const $ = cheerio.load(html);

    return $("a.iusc").toArray().map(element => {
        const m = $(element).attr("m");
        if (!m) return null;
        const metadata = JSON.parse(m);
        return {
            type: "image",
            image: metadata.murl,
            url: metadata.purl,
            description: metadata.t
        };
    }).filter(Boolean);
}

// Brave Search

async function scrapeBraveSearchImages(query) {
    const html = await fetchHtml(`https://search.brave.com/images?q=${encodeURIComponent(query)}`);
    const $ = cheerio.load(html);

    return $("button.image-result").toArray().map(el => {
        const button = $(el);
        const img = button.find("img").first();
        if (!img.length) return null;
        const image = img.attr("src");
        const description = img.attr("alt");
        const index = button.attr("data-index");
        const source = button.find(".image-metadata-source").text().trim();
        return {
            type: "image",
            image,
            description,
            source,
            index
        };
    }).filter(Boolean);
}

(async () => {
    const query = "test";

    // console.log("=== Mojeek Search ===");
    // const results = await scrapeMojeekSearchAsync(query, 2);
    // results.forEach(result => console.log(result));

    console.log("=== Brave Search Images ===");
    const results = await scrapeBraveSearchImages(query);
    results.forEach(result => console.log(result));

    // console.log("\n=== Bing Images ===");
    // const images = await scrapeBingImages(query);
    // images.forEach(img => console.log(img));
})();
