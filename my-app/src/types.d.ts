interface NewsInfo {
    title : string
    id : string
    description : string
    date : Date
    article : string
    thumbnail? : string
    url : string
}

type CSSStyles = {[key : string] : React.CSSProperties}