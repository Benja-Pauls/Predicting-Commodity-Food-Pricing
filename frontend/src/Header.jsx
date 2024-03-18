import './App.css'; // Import your CSS file for styling
import Dropdown from "react-bootstrap/Dropdown"

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
        {name: "Afghanistan" },
        {name: "Another one" },
        {name: "sup" },
        // Add more countries as needed
    ];

    const languages = [
        {name: "languages" },
        {name: "Another one" },
        {name: "sup" },
        // Add more countries as needed
    ];

    return (
        <>
            <div className="chat-header">
                <img src='FAO_logo_white.png' alt=" Next Step Logo" className="header-image" />
                <h1>Food and Agriculture<br></br>Organization of the United Nations</h1>
                <div className='powered-by'>
                    <h5>Powered by GIEWS</h5>
                </div>
            </div>
            <div className="btn-group">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Country | {props.country}
                </button>
                <ul className="dropdown-menu">
                    {countries.map(country => (
                        <li><a id = {country.name} className="dropdown-item" href="#" onClick = {onCountryChanged}>{country.name}</a></li>
                    ))}
                </ul>
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
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