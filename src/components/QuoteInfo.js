import React from 'react';
import '../App.css';
import entities from "html-entities";


const QuoteInfo = (props) => (
    <div>
        <div className="w-quote">
            <div className="w-quote-content">
                {
                    props.dataQuote
                    &&
                    entities.AllHtmlEntities.decode(props.dataQuote[0].content.replace('<p>','').replace('</p>',''))
                }
            </div>
            <div className="w-quote-title">
                --&nbsp;
                {
                    props.dataQuote
                    &&
                    props.dataQuote[0].title
                }
            </div>
        </div>
    </div>
)

export default QuoteInfo;
