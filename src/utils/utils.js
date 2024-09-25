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

export function convertMonthDayFromTimeUnits(instant){
    const months = ["Jan", "Feb", "Mar", "April", "May", "Jun", "Jul", "Aug", "Sept", "Nov", "Dec"]
    const dateTime = new Date(Number(instant));
    const date = dateTime.getDate();
    const month = months[dateTime.getMonth()-1];

    return `${month} ${date}`
}

export function extractSummaryFromArticle(htmlContent){
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;

    const paragraphs = tempDiv.querySelectorAll("p");

    const text = Array.from(paragraphs).map(paragraph => paragraph.textContent).join(" ");

    const words = text.split(/\+s/)

    const summary = words.slice(0, 200).join(" ");

    return summary;
}