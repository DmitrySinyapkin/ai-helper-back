import axios from "axios"
import * as cheerio from 'cheerio';
import { minify } from 'html-minifier'

export const getHtmlFromUrl = async (url: string) => {
    try {
        const response = await axios.get(url)
        
        if (response.data) {
            return response.data
        }

        return null
    } catch (error) {
        return null
    }
}

export const getMinifiedHtmlFromUrl = async (url: string) => {
    try {
        const html = await getHtmlFromUrl(url)

        if (!html) {
            return null
        }

        const minifiedHtml = minifyHtml(html)
        return minifiedHtml
    } catch (error) {
        return null
    }
}

const minifyHtml = (html: string) => {
    const $ = cheerio.load(html)
    const bodyElement = $('body').first()

    bodyElement.find('script, style, noscript').remove()
    bodyElement.contents().each((i, el) => {
      if (el.type === 'comment') $(el).remove()
    })

    const cleanedHtml = $.html(bodyElement)

    const minifiedHtml = minify(cleanedHtml, {
      removeComments: true,
      collapseWhitespace: true,
      minifyJS: true,
      minifyCSS: true,
      ignoreCustomFragments: [/[\s\S]*?/],
    })

    return minifiedHtml
}
