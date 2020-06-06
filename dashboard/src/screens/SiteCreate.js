import React, {useState} from 'react';
import Header from "../components/Header";
import config from '../configs/config.json';
import '../stylesheets/screens/SiteCreate.css';
import Back from "../components/Back";
import List from "../components/List";
import loading from "../images/loading.svg";

function SiteList() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [data, setData] = useState(null);

    const handleSubmit = function (event) {
        event.preventDefault();
        const data = new FormData(event.target);

        fetch(process.env.REACT_APP_API_URL + config.apiUrl + config.apiVersion + config.routes.siteCreate, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({site: data.get('site')})
        }).then(res => res.json())
            .then(res => {
            setData(res);
            setIsSubmitted(true);
        });
    };

    return (
        <div>
            <Header>
                <Back/>
            </Header>
            <h3 className="App-create-title">Create</h3>
            <form className="App-form"  onSubmit={handleSubmit}>
                <input type="url" name="site" placeholder="Site Address" required />
                <input type="submit" value="Submit" />
            </form>
            {isSubmitted && (
                <pre className="App-code">
{`(function(b,u,n,s,e,k,i){
    e=u.getElementsByTagName('head')[0];
    k=u.createElement('script');k.async=s;k.src=n;
    e.appendChild(k);
    k.addEventListener('loaded', function() {
    Bunseki.init(b,i);
});
})(window,document,"`+process.env.REACT_APP_STATIC_URL+`bunseki.min.1.0.0.js", true, "`+data.key+`");`}
                </pre>
            )}
        </div>
    );
}

export default SiteList;
