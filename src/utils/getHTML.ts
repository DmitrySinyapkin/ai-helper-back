import axios from "axios"
import * as cheerio from 'cheerio';
import { minify } from 'html-minifier'
import { CustomError } from '../types/errors.js'

export const getHtmlFromUrl = async (url: string): Promise<string> => {
    try {
        const response = await axios.get(url, {
            timeout: 10000, // 10 second timeout
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        })
        
        if (!response.data) {
            throw new CustomError('No content received from URL', 400, 'HTML_FETCH_ERROR');
        }

        return response.data;
    } catch (error: any) {
        if (error instanceof CustomError) {
            throw error;
        }

        if (error.code === 'ECONNREFUSED') {
            throw new CustomError('Unable to connect to the URL', 503, 'URL_CONNECTION_ERROR');
        }

        if (error.code === 'ETIMEDOUT') {
            throw new CustomError('Request to URL timed out', 408, 'URL_TIMEOUT');
        }

        if (error.response?.status === 404) {
            throw new CustomError('URL not found', 404, 'URL_NOT_FOUND');
        }

        if (error.response?.status === 403) {
            throw new CustomError('Access denied to URL', 403, 'URL_ACCESS_DENIED');
        }

        throw new CustomError(
            `Failed to fetch HTML from URL: ${error.message}`,
            400,
            'HTML_FETCH_ERROR'
        );
    }
}

export const getMinifiedHtmlFromUrl = async (url: string): Promise<string> => {
    try {
        const html = await getHtmlFromUrl(url);
        const minifiedHtml = minifyHtml(html);
        
        if (!minifiedHtml) {
            throw new CustomError('Failed to process HTML content', 400, 'HTML_PROCESSING_ERROR');
        }

        return minifiedHtml;
    } catch (error: any) {
        if (error instanceof CustomError) {
            throw error;
        }

        throw new CustomError(
            `Failed to process HTML: ${error.message}`,
            400,
            'HTML_PROCESSING_ERROR'
        );
    }
}

const minifyHtml = (html: string): string => {
    try {
        const $ = cheerio.load(html)
        const bodyElement = $('body').first()

        if (bodyElement.length === 0) {
            throw new Error('No body element found in HTML');
        }

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

        return minifiedHtml;
    } catch (error: any) {
        throw new CustomError(
            `HTML minification failed: ${error.message}`,
            400,
            'HTML_MINIFICATION_ERROR'
        );
    }
}
