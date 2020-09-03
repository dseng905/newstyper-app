
const apiKey : string = "e7daa0bd-ff4a-4910-bfcf-0c25d12381bc"
const baseUrl = "https://content.guardianapis.com"

export enum NewsSection {
    WORLD="world",
    POLITICS='politics',
    TECHNOLOGY='technology',
    SPORTS='sport',
    SCIENCE='science',
    ARTS='artanddesign',
    FOOD='food',
    HEALTH='health'
}


export async function fetchNews(section : NewsSection, showBody : boolean = false) : Promise<NewsInfo[]>{
    const uri = `${baseUrl}/search?api-key=${apiKey}&section=${section}&show-fields=body,thumbnail,headline,trailText`

    const res = await fetch(uri)
    const results = await res.json()
    const articles = results.response.results
    let output : NewsInfo[] = []

    for(let i = 0; i < 4; i++) {
        output.push({
            title : articles[i].webTitle,
            id : articles[i].id,
            description : articles[i].fields.trailText,
            date : new Date(articles[i].webPublicationDate),
            article : articles[i].fields.body,
            thumbnail : articles[i].fields.thumbnail,
            url : articles[i].webUrl
        })
    }

    //console.log(results)
    return output
}

export async function fetchArticle(articleId : string) : Promise<NewsInfo> {
    const uri = `${baseUrl}/${articleId}?api-key=${apiKey}&show-fields=trailText,body,thumbnail,shouldHideAdverts&show-elements=all&show-blocks=body`
    
    const res = await fetch(uri)
    const results = await res.json()
    const article = results.response.content

    return {
        title: article.webTitle,
        id : article.id,
        description : article.fields.trailText,
        date : new Date(article.webPublicationDate),
        article : extractParagraphs(article.fields.body),
        thumbnail : article.fields.thumbnail,
        url : article.webUrl
    }
}

function extractParagraphs(htmlString : string) : string {
    const pElements = htmlString.match(/<\s*p[^>]*>(.*?)<\/p>/g)
    let html = ""
    if(pElements) {
        for(const element of pElements) {
            html += element
        }
    }
    return html
}

