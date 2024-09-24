import DOMPurify from 'dompurify';


export function createMarkup(dirty) {
    return { __html: DOMPurify.sanitize(dirty) };
  }
  
export function extractTokenFromUrl(url) {
    // Use URLSearchParams to parse the query parameters
    console.log(url)
    let params = new URL(url).searchParams;
    // Get the 'token' parameter
    let token = params.get('token');
    console.log(token)
    return token;
}