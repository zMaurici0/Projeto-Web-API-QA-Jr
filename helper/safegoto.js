export async function adBlock(page) {
    await page.route('**/*google_vignette*', route => route.abort());
}