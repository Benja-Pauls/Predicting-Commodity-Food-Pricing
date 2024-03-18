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
        {name: "Canada" },
        {name: "Russia" },
        {name: "Ukraine" },
        {name: "United States" }
        // Add more countries as needed
    ];

    const languages = [
        {name: "English" },
        {name: "Spanish" }
        // Add more languages as needed
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
            <div>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" onClick={console.log('test')}>
                        Country | {props.country}
                    </button>
                    <ul className="dropdown-menu">
                        {countries.map(country => (
                            <li key={country.name}><a className="dropdown-item" href="#">{country.name}</a></li>
                        ))}
                    </ul>
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Language | {props.language}
                    </button>
                    <ul className="dropdown-menu">
                        {languages.map(language => (
                            <li key={language.name}><a className="dropdown-item" href="#">{language.name}</a></li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Header;