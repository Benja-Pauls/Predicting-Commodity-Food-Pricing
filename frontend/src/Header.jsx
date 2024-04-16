import './App.css'; // Import your CSS file for styling

const Header = (props) => {

    const onCountryChanged = (event) => {
        props.onCountrySelectChanged(event.target.id, event.target.checked);
        //console.log(event.target.checked);
    };

    const onLanguageChanged = (event) => {
        props.onLanguageSelectChanged(event.target.id, event.target.checked);
        //console.log(event.target.checked);
    };

    const countries = [
        {name: "Argentina" },
        {name: "Australia" },
        {name: "Brazil" },
        {name: "Canada" },
        {name: "India" },
        {name: "Pakistan" },
        {name: "Russian Federation" },
        {name: "Thailand" },
        {name: "Ukraine" },
        {name: "United Kingdom" },
        {name: "United States" },
        {name: "Uruguay" },
        {name: "Vietnam" },
        // Add more countries as needed
    ];

    const languages = [
        {name: "English" },
        {name: "Spanish" }
        // Add more languages as needed
    ];

    return (
        <>
            <div className="chat-header ">
                <img src='FAO_logo_white.png' alt="FAO Step Logo" className="header-image" />
                <h1>Food and Agriculture<br></br>Organization of the United Nations</h1>
                <div className='powered-by'>
                    <h5>Powered by GIEWS</h5>
                </div>
            </div>
            <div className="btn-group">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                    Country | {props.country}
                </button>
                <ul className="dropdown-menu">
                    {countries.map(country => (
                        <li><a id = {country.name} className="dropdown-item" href="#" onClick = {onCountryChanged}>{country.name}</a></li>
                    ))}
                </ul>
            </div>
            <div className="btn-group">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                    Language | {props.language}
                </button>
                <ul className="dropdown-menu">
                    {languages.map(language => (
                        <li><a id = {language.name} className="dropdown-item" href="#" onClick = {onLanguageChanged}>{language.name}</a></li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Header;