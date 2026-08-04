// Screenshot capture for T3-AR verification.
import { chromium } from "playwright";

const URL = "http://127.0.0.1:4321/applied-research";

(async () => {
  const browser = await chromium.launch();
  try {
    // Desktop 1280x800
    const dctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const dpage = await dctx.newPage();
    await dpage.goto(URL, { waitUntil: "networkidle", timeout: 30000 });
    // Allow legacy CSS + fontawesome to settle
    await dpage.waitForTimeout(1500);
    await dpage.screenshot({ path: "/tmp/t3-ar-visual/ar-1280.png", fullPage: false });
    console.log("desktop OK");
    await dctx.close();

    // Mobile 390x844 (iPhone 14)
    const mctx = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    const mpage = await mctx.newPage();
    await mpage.goto(URL, { waitUntil: "networkidle", timeout: 30000 });
    await mpage.waitForTimeout(1500);
    await mpage.screenshot({ path: "/tmp/t3-ar-visual/ar-390.png", fullPage: false });
    console.log("mobile OK");
    await mctx.close();
  } finally {
    await browser.close();
  }
})();